export function createEmailDraftHref(recipient, request) {
  const to = typeof recipient === "string" ? recipient.trim() : "";
  const subject = `Dolu Bilişim destek talebi — ${request.service || "Genel destek"}`;
  const body = [
    "Dolu Bilişim destek talebi",
    "",
    `Müşteri türü: ${request.audience || "Belirtilmedi"}`,
    `Hizmet: ${request.service || "Belirtilmedi"}`,
    `Aciliyet: ${request.urgency || "Normal"}`,
    `Ad soyad: ${request.name || "Belirtilmedi"}`,
    `E-posta: ${request.email || "Belirtilmedi"}`,
    `Telefon: ${request.phone || "Belirtilmedi"}`,
    `Tercih edilen iletişim: ${request.preferredContact || "E-posta"}`,
    "",
    "Talep açıklaması:",
    request.message || "",
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
