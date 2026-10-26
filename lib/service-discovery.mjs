export function createServiceDiscoveryIndex(services) {
  return services.map(({ id, audience, category, title, detail }) => ({ id, audience, category, title, detail }));
}

/**
 * @template T
 * @param {readonly T[]} services
 * @param {unknown} audience
 * @returns {T[]}
 */
export function filterServicesForAudience(services, audience = "all", category = "all") {
  return services.filter((service) => {
    const matchesAudience = audience !== "individual" && audience !== "business"
      || service.audience === audience
      || service.audience === "both";
    const matchesCategory = category === "all" || service.category === category;
    return matchesAudience && matchesCategory;
  });
}
