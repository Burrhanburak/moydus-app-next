// MOYDUS — No-locale, single-language hreflang builder
export function buildHreflang(path: string) {
  return {
    hreflang: "en",
    url: `https://moydus.com${path}`,
  };
}
