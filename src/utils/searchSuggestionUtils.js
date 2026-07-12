export function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function normalizedWords(value) {
  return normalizeSearchText(value).split(/\s+/).filter(Boolean);
}

function hashString(value) {
  return [...String(value)].reduce((hash, char) => {
    const nextHash = (hash << 5) - hash + char.charCodeAt(0);
    return nextHash | 0;
  }, 0);
}

function seededRandom(seed) {
  let state = Math.abs(hashString(seed)) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function stableShuffle(items, seed) {
  const shuffled = [...items];
  const random = seededRandom(seed);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function getRelevancePriority(candidate, keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  const normalizedLabel = normalizeSearchText(candidate.label);
  const normalizedMetadata = normalizeSearchText((candidate.metadata || []).join(" "));

  if (!normalizedKeyword || !normalizedLabel) return null;
  if (normalizedLabel.startsWith(normalizedKeyword)) return 1;
  if (normalizedWords(normalizedLabel).some((word) => word.startsWith(normalizedKeyword))) return 2;
  if (normalizedLabel.includes(normalizedKeyword)) return 3;
  if (normalizedMetadata.includes(normalizedKeyword)) return 4;

  return null;
}

export function rankSearchCandidates(candidates, keyword, { uniqueKey = (item) => item.label } = {}) {
  const normalizedKeyword = normalizeSearchText(keyword);
  const uniqueCandidates = [];
  const seen = new Set();

  candidates.forEach((candidate) => {
    const key = normalizeSearchText(uniqueKey(candidate));
    if (!key || seen.has(key)) return;
    seen.add(key);
    uniqueCandidates.push(candidate);
  });

  return [1, 2, 3, 4].flatMap((priority) => {
    const group = uniqueCandidates
      .map((candidate) => ({
        ...candidate,
        priority: getRelevancePriority(candidate, normalizedKeyword),
      }))
      .filter((candidate) => candidate.priority === priority);

    return stableShuffle(group, `${normalizedKeyword}:${priority}`);
  });
}

export function highlightKeywordParts(text, keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) return [{ value: text, match: false }];

  const characters = [...String(text)];
  const normalizedCharacters = characters.map((char) => normalizeSearchText(char));
  const normalizedText = normalizedCharacters.join("");
  const startIndex = normalizedText.indexOf(normalizedKeyword);

  if (startIndex < 0) return [{ value: text, match: false }];

  let normalizedCount = 0;
  let matchStart = 0;
  let matchEnd = characters.length;

  characters.forEach((char, index) => {
    if (normalizedCount <= startIndex) matchStart = index;
    normalizedCount += normalizeSearchText(char).length;
    if (normalizedCount < startIndex + normalizedKeyword.length) return;
    matchEnd = Math.min(index + 1, characters.length);
  });

  return [
    { value: characters.slice(0, matchStart).join(""), match: false },
    { value: characters.slice(matchStart, matchEnd).join(""), match: true },
    { value: characters.slice(matchEnd).join(""), match: false },
  ].filter((part) => part.value);
}
