function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/ı/g, "i")
    .trim();
}

/**
 * @template T
 * @param {readonly T[]} guides
 * @param {unknown} query
 * @returns {T[]}
 */
export function filterSeoGuides(guides, query) {
  const needle = normalize(query);
  if (!needle) return [...guides];

  return guides.filter((guide) => {
    const articleText = (guide.sections || [])
      .flatMap((section) => [section.heading, ...(section.paragraphs || [])])
      .join(" ");
    return normalize([guide.title, guide.description, guide.category, articleText].join(" ")).includes(needle);
  });
}
