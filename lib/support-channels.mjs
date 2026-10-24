function normalizeNumber(value) {
  if (typeof value !== "string") return null;
  const compact = value.trim().replace(/[\s().-]/g, "");
  if (!/^\+?\d{7,15}$/.test(compact)) return null;
  return compact;
}

export function getSupportChannels({ phone = "", whatsapp = "" } = {}) {
  const cleanPhone = normalizeNumber(phone);
  const cleanWhatsapp = normalizeNumber(whatsapp);
  const links = [];

  if (cleanPhone) {
    links.push({
      kind: "phone",
      label: "Telefon desteği",
      detail: "7/24 ulaşılabilir destek",
      displayValue: phone.trim(),
      href: `tel:${cleanPhone}`,
    });
  }

  if (cleanWhatsapp) {
    links.push({
      kind: "whatsapp",
      label: "WhatsApp desteği",
      detail: "WhatsApp üzerinden yazın",
      displayValue: whatsapp.trim(),
      href: `https://wa.me/${cleanWhatsapp.replace(/^\+/, "")}`,
    });
  }

  return links;
}
