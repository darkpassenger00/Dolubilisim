export function createServiceDiscoveryIndex(services) {
  return services.map(({ id, audience, category, title, detail }) => ({ id, audience, category, title, detail }));
}

export function countServicesByCategory(services, audience = "all") {
  return filterServicesForAudience(services, audience).reduce((counts, service) => {
    counts[service.category] = (counts[service.category] ?? 0) + 1;
    return counts;
  }, {});
}

/**
 * @template T
 * @param {readonly T[]} services
 * @param {unknown} audience
 * @returns {T[]}
 */
function normalizeServiceQuery(value) {
  return String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .trim();
}

export function filterServicesForAudience(services, audience = "all", category = "all", query = "") {
  const normalizedQuery = normalizeServiceQuery(query);
  return services.filter((service) => {
    const matchesAudience = audience !== "individual" && audience !== "business"
      || service.audience === audience
      || service.audience === "both";
    const matchesCategory = category === "all" || service.category === category;
    const searchableText = normalizeServiceQuery(`${service.title} ${service.detail} ${service.category}`);
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
    return matchesAudience && matchesCategory && matchesQuery;
  });
}
