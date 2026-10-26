export function getServiceRequestPrefill(serviceId, serviceCatalogue) {
  const service = serviceCatalogue.find((entry) => entry.id === serviceId);
  if (!service) return null;

  return {
    audience: service.audience === "business" ? "Kurumsal" : "Bireysel",
    service: service.title,
  };
}
