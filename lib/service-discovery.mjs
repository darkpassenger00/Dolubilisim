export function createServiceDiscoveryIndex(services) {
  return services.map(({ id, audience, title, detail }) => ({ id, audience, title, detail }));
}

/**
 * @template T
 * @param {readonly T[]} services
 * @param {unknown} audience
 * @returns {T[]}
 */
export function filterServicesForAudience(services, audience = "all") {
  if (audience !== "individual" && audience !== "business") return [...services];
  return services.filter((service) => service.audience === audience || service.audience === "both");
}
