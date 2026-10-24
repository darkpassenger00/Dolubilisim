export const audienceMix = Object.freeze({ individual: 55, business: 45 });

export const supportPromise = Object.freeze({
  availability: "24/7",
  firstResponseMinutes: 30,
  requestFlow: "email-draft",
});

export const services = Object.freeze([
  { id: "computer-support", audience: "individual", title: "Bilgisayar desteği", detail: "Kurulum, sorun giderme ve günlük teknoloji desteği." },
  { id: "family-safety", audience: "individual", title: "Aile ve çocuk güvenliği", detail: "Ebeveyn denetimi ve güvenli cihaz ayarları." },
  { id: "backup-recovery", audience: "individual", title: "Yedekleme ve veri kurtarma", detail: "Önemli dosyalarınız için planlı ve dikkatli destek." },
  { id: "web-design", audience: "business", title: "Web sitesi ve dijital görünürlük", detail: "Web tasarımı, sosyal medya ve SEO çalışmaları." },
  { id: "microsoft-365", audience: "business", title: "Microsoft 365 ve SharePoint", detail: "Microsoft 365, SharePoint ve OneDrive kurulum desteği." },
  { id: "google-workspace", audience: "business", title: "Google Workspace", detail: "Kurulum, taşıma ve kullanıcı desteği." },
  { id: "security-consulting", audience: "both", title: "Güvenlik danışmanlığı", detail: "İhtiyacınıza uygun güvenli kurulum ve danışmanlık." },
]);
