export function extractLaravelCollection<T = any>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const candidate = payload as Record<string, unknown>;

  if (Array.isArray(candidate.data)) {
    return candidate.data as T[];
  }

  const alternateKeys = ["posts", "blogs", "items"];
  for (const key of alternateKeys) {
    const value = candidate[key];
    if (Array.isArray(value)) {
      return value as T[];
    }
  }

  const values = Object.values(candidate);
  const firstArray = values.find((value) => Array.isArray(value));

  return Array.isArray(firstArray) ? (firstArray as T[]) : [];
}
