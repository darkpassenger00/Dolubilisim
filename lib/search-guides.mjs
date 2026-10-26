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
 * @param {unknown} category
 * @returns {T[]}
 */
export function filterSeoGuides(guides, query, category = "") {
  const needle = normalize(query);
  const categoryNeedle = normalize(category);
  if (!needle && !categoryNeedle) return [...guides];

  return guides.filter((guide) => {
    if (categoryNeedle && normalize(guide.category) !== categoryNeedle) return false;
    if (!needle) return true;
    const articleText = (guide.sections || [])
      .flatMap((section) => [section.heading, ...(section.paragraphs || [])])
      .join(" ");
    return normalize([guide.title, guide.description, guide.category, articleText].join(" ")).includes(needle);
  });
}
