"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Section = { id: string; title: string; text: string };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalizeText(raw: string, maxChars: number) {
  const t = (raw || "").replace(/\s+/g, " ").trim();
  if (!t) return "";
  if (t.length <= maxChars) return t;

  // cümle sonundan kırpmaya çalış (çok kaba kesmesin)
  const slice = t.slice(0, maxChars);
  const lastDot = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("! "),
    slice.lastIndexOf("? ")
  );
  const cut = lastDot > maxChars * 0.6 ? slice.slice(0, lastDot + 1) : slice;
  return cut + "…";
}

export default function ScrollNarrator({
  selector = "[data-narration-section]",
  voiceId,
  autoHideMs = 1200, // scroll durduktan sonra saklama
  sectionDebounceMs = 700, // section kesinleşme (debounce)
  maxNarrationChars = 900, // data-text yoksa okunacak max karakter
}: {
  selector?: string;
  voiceId?: string;
  autoHideMs?: number;
  sectionDebounceMs?: number;
  maxNarrationChars?: number;
}) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // popup state
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const draggingRef = useRef(false);
  const hideTimerRef = useRef<number | null>(null);

  // debounce timer
  const sectionDebounceRef = useRef<number | null>(null);
  const pendingIndexRef = useRef<number | null>(null);

  // cache: sectionId -> objectURL
  const cacheRef = useRef<Map<string, string>>(new Map());

  const active = sections[activeIndex];

  // 1) DOM'dan sectionları topla - sadece h1, h2, h3, p içeriğini al
  useEffect(() => {
    const collectSections = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(selector)
      );
      const mapped = nodes
        .map((el) => {
          const id = el.id || el.getAttribute("data-id") || "";
          const title =
            el.getAttribute("data-title") ||
            el.querySelector("h1, h2, h3")?.textContent?.trim() ||
            "Section";

          // Her zaman h1, h2, h3, h4, h5, h6, p tag'lerinden tüm içeriği topla
          // data-text attribute'unu ignore et, çünkü sadece özet olabilir
          const contentElements = el.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p"
          );
          const raw = Array.from(contentElements)
            .map((elem) => elem.textContent?.trim() || "")
            .filter(Boolean)
            .join(" ");

          // Debug: Kaç element bulundu ve ne kadar text var?
          console.log(
            `Section "${title}": ${contentElements.length} elements, ${raw.length} chars`
          );

          // Metni normalize et ama karakter limiti koy (ElevenLabs quota için)
          // Her section maksimum 200 karakter olsun (p tag'leri de okumak için)
          const text = normalizeText(raw, 200);

          if (!text) return null;

          return {
            id: id || title.replace(/\s+/g, "-").toLowerCase(),
            title: title.replace(/^#+\s*/, ""), // "//" kaldırıldı
            text,
          } as Section;
        })
        .filter(Boolean) as Section[];

      setSections(mapped);
    };

    // DOM hazır olana kadar bekle
    if (document.readyState === "complete") {
      collectSections();
    } else {
      window.addEventListener("load", collectSections);
      // Ayrıca kısa bir delay ile de dene (Next.js hydration için)
      const timeoutId = setTimeout(collectSections, 100);
      return () => {
        window.removeEventListener("load", collectSections);
        clearTimeout(timeoutId);
      };
    }
  }, [selector, maxNarrationChars]);

  // 2) Aktif section takibi (debounce’lu)
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (!visible) return;

        const idx = nodes.findIndex((n) => n === visible.target);
        if (idx < 0) return;

        // DEBOUNCE: hızlı scroll’da sürekli activeIndex set etme
        pendingIndexRef.current = idx;
        if (sectionDebounceRef.current)
          window.clearTimeout(sectionDebounceRef.current);

        sectionDebounceRef.current = window.setTimeout(() => {
          if (pendingIndexRef.current !== null)
            setActiveIndex(pendingIndexRef.current);
        }, sectionDebounceMs);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-10% 0px -55% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => {
      io.disconnect();
      if (sectionDebounceRef.current)
        window.clearTimeout(sectionDebounceRef.current);
    };
  }, [selector, sectionDebounceMs]);

  // 3) Scroll başlayınca popup göster + scroll durunca sakla
  useEffect(() => {
    const onScroll = () => {
      setIsVisible(true);

      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        setIsVisible((v) => (isExpanded ? v : false));
      }, autoHideMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [autoHideMs, isExpanded]);

  // 4) Audio init
  useEffect(() => {
    const a = new Audio();
    a.preload = "auto";
    audioRef.current = a;

    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => !draggingRef.current && setCurrent(a.currentTime || 0);
    const onEnd = () => {
      setIsPlaying(false);
      // Bir sonraki section'a geç
      if (sections.length > 0 && activeIndex < sections.length - 1) {
        const nextIndex = activeIndex + 1;
        const nextSection = sections[nextIndex];
        if (nextSection) {
          setActiveIndex(nextIndex);
          // Kısa bir delay sonra bir sonraki section'ı çal
          setTimeout(() => {
            const nextA = audioRef.current;
            if (nextA) {
              const cached = cacheRef.current.get(nextSection.id);
              if (cached) {
                nextA.src = cached;
                nextA
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch((err) => {
                    console.error("Failed to play next section:", err);
                  });
              } else {
                // Cache'de yoksa fetch et
                setIsLoading(true);
                fetch("/api/tts", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ text: nextSection.text, voiceId }),
                })
                  .then((res) => {
                    if (!res.ok) throw new Error(`TTS failed ${res.status}`);
                    return res.blob();
                  })
                  .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    cacheRef.current.set(nextSection.id, url);
                    nextA.src = url;
                    return nextA.play();
                  })
                  .then(() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    console.error("Failed to load next section:", err);
                    setIsLoading(false);
                  });
              }
            }
          }, 300); // 300ms delay
        }
      }
    };

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);

    return () => {
      a.pause();
      a.src = "";
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);

      const cache = cacheRef.current;
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, [activeIndex, sections]);

  // 5) Section değişince: audio reset + cache varsa src setle
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.pause();
    setIsPlaying(false);
    setIsLoading(false);
    setCurrent(0);
    setDuration(0);

    if (active?.id) {
      const cached = cacheRef.current.get(active.id);
      a.src = cached || "";
    } else {
      a.src = "";
    }
  }, [activeIndex]);

  async function fetchTTS(text: string, sectionId: string) {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voiceId }),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => "");
      let errorMsg = `TTS failed ${res.status}: ${msg}`;

      // Quota exceeded hatası için özel mesaj
      try {
        const errorData = JSON.parse(msg);
        if (
          errorData.error === "ElevenLabs failed" &&
          errorData.status === 401
        ) {
          const details = JSON.parse(errorData.details || "{}");
          if (details.detail?.status === "quota_exceeded") {
            errorMsg = "Text-to-speech is currently unavailable.";
          }
        }
      } catch {
        // JSON parse hatası, normal hata mesajını kullan
      }

      throw new Error(errorMsg);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    cacheRef.current.set(sectionId, url);
    return url;
  }

  async function ensureAudio() {
    if (!active?.text || !active?.id) return;
    const a = audioRef.current;
    if (!a) return;

    const cached = cacheRef.current.get(active.id);
    if (cached) {
      a.src = cached;
      return;
    }

    setIsLoading(true);
    try {
      const url = await fetchTTS(active.text, active.id);
      a.src = url;
    } finally {
      setIsLoading(false);
    }
  }

  async function togglePlay() {
    const a = audioRef.current;
    if (!a || !active?.text) return;

    // user dinlemek istedi: açık kalsın
    setIsVisible(true);
    setIsExpanded(true);

    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setErrorMessage(null); // Hata mesajını temizle
      await ensureAudio();
      await a.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("ScrollNarrator: Play failed:", error);
      setIsPlaying(false);
      setIsLoading(false);
      // Quota hatası için kullanıcıya bilgi ver
      if (error instanceof Error) {
        if (
          error.message.includes("unavailable") ||
          error.message.includes("quota")
        ) {
          setErrorMessage("Text-to-speech is currently unavailable.");
        } else {
          setErrorMessage(error.message);
        }
      }
    }
  }

  const progress = useMemo(
    () => (duration ? clamp(current / duration, 0, 1) : 0),
    [current, duration]
  );

  function seekByRatio(r: number) {
    const a = audioRef.current;
    if (!a || !duration) return;
    a.currentTime = clamp(r, 0, 1) * duration;
    setCurrent(a.currentTime);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    seekByRatio((e.clientX - rect.left) / rect.width);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekByRatio((e.clientX - rect.left) / rect.width);
  }
  function onPointerUp() {
    draggingRef.current = false;
  }

  function collapse() {
    setIsExpanded(false);
    if (!isPlaying) setIsVisible(false);
  }

  if (!sections.length) return null;
  if (!isVisible && !isExpanded && !isPlaying) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-5 sm:bottom-5 sm:w-auto">
      <div className="flex flex-col overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-lg">
        {/* MINI */}
        {!isExpanded && (
          <button
            type="button"
            onClick={() => {
              setIsExpanded(true);
              setIsVisible(true);
            }}
            className="bg-[#0a0a0a] border border-white/10 flex items-center gap-3 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm hover:border-white/20 transition-colors w-full sm:w-auto"
          >
            <div className="flex-1 text-left min-w-0">
              <div className="text-xs text-white/60 mb-0.5">
                {active?.title ?? "Section"}
              </div>
              <div className="text-sm text-white/90 line-clamp-1 font-medium">
                {active?.title ?? "Reading content"}
              </div>
            </div>

            <div className="grid place-items-center rounded-md opacity-70 shrink-0">
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 6v12" />
                  <path d="M16 6v12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 5l12 7-12 7z" fill="currentColor" stroke="none" />
                </svg>
              )}
            </div>
          </button>
        )}

        {/* EXPANDED */}
        {isExpanded && (
          <>
            <div className="bg-[#0a0a0a] border-b border-white/10 flex w-full rounded-t-xl p-4 sm:p-5 relative">
              <div className="flex-1 min-w-0 pr-12 sm:pr-16">
                <div className="text-sm font-semibold text-white mb-1 line-clamp-2">
                  {active?.title ?? "Section"}
                </div>
                <div className="text-xs text-white/60 line-clamp-2 mb-3">
                  {active?.text?.substring(0, 100)}...
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="mb-3 p-2 rounded-md bg-red-500/20 border border-red-500/30">
                    <p className="text-xs text-red-400">{errorMessage}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span>
                    {isLoading
                      ? "Loading voice..."
                      : isPlaying
                        ? "Playing"
                        : "Ready"}
                  </span>
                  {duration > 0 && (
                    <span>
                      • {Math.floor(current)}s / {Math.floor(duration)}s
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={collapse}
                  className="grid size-7 sm:size-8 place-items-center rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Collapse"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="grid size-7 sm:size-8 place-items-center rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M8 6v12" />
                      <path d="M16 6v12" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M8 5l12 7-12 7z"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              className="bg-[#0a0a0a] cursor-grab rounded-b-xl px-4 sm:px-5 will-change-transform active:cursor-grabbing select-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              <div className="py-3 sm:py-4">
                <div className="relative flex h-[36px] sm:h-[40px] items-center justify-center gap-1 overflow-hidden rounded-xl bg-white/5">
                  {Array.from({ length: 41 }).map((_, i) => {
                    const t = i / 40;
                    const isOn = t <= progress;
                    return (
                      <div
                        key={i}
                        className="bg-white/30 h-[12px] sm:h-[15px] w-[1px]"
                        style={{ opacity: isOn ? 1 : 0.2 }}
                      />
                    );
                  })}

                  <div
                    className="absolute left-0 h-[28px] sm:h-[32px] w-1.5 sm:w-2 cursor-grab rounded-full bg-white active:cursor-grabbing shadow-lg"
                    draggable={false}
                    style={{
                      transform: `translateX(${progress * 100}%)`,
                      userSelect: "none",
                      touchAction: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
