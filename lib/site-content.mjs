export const audienceMix = Object.freeze({ individual: 55, business: 45 });

export const audienceLabels = Object.freeze({
  individual: "Bireysel",
  business: "Kurumsal",
  both: "Her ikisi",
});

export const supportPromise = Object.freeze({
  availability: "24/7",
  firstResponseMinutes: 30,
  requestFlow: "email-draft",
});

export const services = Object.freeze([
  { id: "computer-support", audience: "individual", title: "Bilgisayar desteği", detail: "Kurulum, sorun giderme ve günlük teknoloji desteği.", relatedServiceIds: ["backup-recovery", "email-setup"] },
  { id: "email-setup", audience: "both", title: "E-posta kurulumu ve taşıma", detail: "Gmail ve Microsoft 365 hesaplarının cihazlara kurulumu ve e-posta geçiş desteği.", relatedServiceIds: ["microsoft-365", "google-workspace"] },
  {
    id: "family-safety",
    audience: "individual",
    title: "Aile ve çocuk güvenliği",
    detail: "Ebeveyn denetimi, yaşa uygun cihaz ayarları ve rızaya dayalı konum paylaşımı.",
    safetyNotice:
      "Konum paylaşımı kurulumu yalnızca ilgili yetişkinlerin açık rızasıyla desteklenir. Çocuklar için ebeveyn denetimi ve yaşa uygun güvenlik ayarları esas alınır; gizli takip kurulumu yapılmaz.",
    relatedServiceIds: ["computer-support", "backup-recovery"],
  },
  { id: "backup-recovery", audience: "individual", title: "Yedekleme ve veri kurtarma", detail: "Önemli dosyalarınız için planlı ve dikkatli destek.", relatedServiceIds: ["computer-support", "email-setup"] },
  { id: "web-design", audience: "business", title: "Web sitesi ve dijital görünürlük", detail: "Web tasarımı, sosyal medya ve SEO çalışmaları.", relatedServiceIds: ["social-media", "security-consulting"] },
  { id: "social-media", audience: "business", title: "Sosyal medya desteği", detail: "İşletme profillerinin düzenlenmesi, içerik planı ve platform ayarları için destek.", relatedServiceIds: ["web-design"] },
  { id: "microsoft-365", audience: "business", title: "Microsoft 365 ve SharePoint", detail: "Microsoft 365, SharePoint ve OneDrive kurulum desteği.", relatedServiceIds: ["email-setup", "google-workspace"] },
  { id: "google-workspace", audience: "business", title: "Google Workspace", detail: "Kurulum, taşıma ve kullanıcı desteği.", relatedServiceIds: ["email-setup", "microsoft-365"] },
  { id: "security-consulting", audience: "both", title: "Güvenlik danışmanlığı", detail: "İhtiyacınıza uygun güvenli kurulum ve danışmanlık.", relatedServiceIds: ["microsoft-365", "computer-support"] },
]);

export function getServicesForAudience(audience) {
  return services.filter((service) => service.audience === audience || service.audience === "both");
}

export function getRelatedServices(serviceId) {
  const service = services.find((item) => item.id === serviceId);
  if (!service?.relatedServiceIds) return [];
  return service.relatedServiceIds
    .map((id) => services.find((item) => item.id === id))
    .filter((relatedService) => relatedService !== undefined);
}
