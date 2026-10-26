function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/ı/g, "i")
    .trim();
}

export function createGuideSearchIndex(guides) {
  return guides.map(({ slug, title, description, category, readingTime, keywords = [] }) => ({
    slug,
    title,
    description,
    category,
    readingTime,
    keywords,
  }));
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
    const keywordText = (guide.keywords || []).join(" ");
    return normalize([guide.title, guide.description, guide.category, keywordText, articleText].join(" ")).includes(needle);
  });
}
