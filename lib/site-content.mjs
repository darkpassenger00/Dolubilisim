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
  {
    id: "computer-support", audience: "individual", category: "Kişisel teknoloji", title: "Bilgisayar desteği", detail: "Kurulum, sorun giderme ve günlük teknoloji desteği.", relatedServiceIds: ["backup-recovery", "email-setup"],
    scope: ["Bilgisayarın ilk kurulumu ve temel ayarları", "Yavaşlama, bağlantı ve uygulama sorunlarının incelenmesi", "Yazıcı ve çevre birimlerinin kuruluma uygunluğunun kontrolü"],
    setupSteps: ["Cihazı ve yaşadığınız sorunu birlikte netleştiririz", "Uygun çözüm adımlarını ve ihtiyaç duyulan erişimi açıklarız", "Kurulum veya kontrolleri yapıp sonucu sizinle gözden geçiririz"],
  },
  {
    id: "email-setup", audience: "both", category: "E-posta ve bulut", title: "E-posta kurulumu ve taşıma", detail: "Gmail ve Microsoft 365 hesaplarının cihazlara kurulumu ve e-posta geçiş desteği.", relatedServiceIds: ["microsoft-365", "google-workspace"],
    scope: ["E-posta hesabının bilgisayar ve mobil cihazlara eklenmesi", "Eski posta kutusundan geçiş için kapsam ve hazırlık kontrolü", "Giden ve gelen ileti ayarlarının test edilmesi"],
    setupSteps: ["Mevcut e-posta sağlayıcısı ve hesap sayısını belirleriz", "Taşıma öncesi yedek ve erişim gereksinimlerini planlarız", "Hesapları kurup örnek ileti alışverişini doğrularız"],
  },
  {
    id: "family-safety",
    audience: "individual",
    category: "Kişisel teknoloji",
    title: "Aile ve çocuk güvenliği",
    detail: "Ebeveyn denetimi, yaşa uygun cihaz ayarları ve rızaya dayalı konum paylaşımı.",
    safetyNotice:
      "Konum paylaşımı kurulumu yalnızca ilgili yetişkinlerin açık rızasıyla desteklenir. Çocuklar için ebeveyn denetimi ve yaşa uygun güvenlik ayarları esas alınır; gizli takip kurulumu yapılmaz.",
    scope: ["Çocuk cihazlarında yaşa uygun ebeveyn denetimi ayarları", "Yetişkinler arasında açık rızaya dayalı konum paylaşımı seçenekleri", "Aile hesapları, uygulama izinleri ve gizlilik ayarlarının gözden geçirilmesi"],
    setupSteps: ["Kimlerin hangi bilgiyi göreceğini ilgili kişilerle netleştiririz", "Her yetişkin kendi cihazında paylaşım iznini verir; çocuklarda ebeveyn araçlarını esas alırız", "Paylaşımı durdurma ve izinleri gözden geçirme adımlarını birlikte deneriz"],
    relatedServiceIds: ["computer-support", "backup-recovery"],
  },
  {
    id: "backup-recovery", audience: "individual", category: "Kişisel teknoloji", title: "Yedekleme ve veri kurtarma", detail: "Önemli dosyalarınız için planlı ve dikkatli destek.", relatedServiceIds: ["computer-support", "email-setup"],
    scope: ["Mevcut dosyaların ve kullanılan cihazların envanteri", "Yedekleme hedefi ve sıklığının ihtiyaca göre belirlenmesi", "Kullanılabilir yedeklerden dosya geri yükleme denemesi"],
    setupSteps: ["Önemli verileri ve mevcut yedekleri birlikte belirleriz", "Uygun yedekleme konumunu ve erişim yöntemini seçeriz", "Örnek dosyayı geri yükleyerek planı kontrol ederiz"],
  },
  {
    id: "web-design", audience: "business", category: "Web ve sosyal medya", title: "Web sitesi ve dijital görünürlük", detail: "Web tasarımı, sosyal medya ve SEO çalışmaları.", relatedServiceIds: ["social-media", "security-consulting"],
    scope: ["Sayfa yapısı, içerik ihtiyaçları ve kullanıcı akışının planlanması", "Mobil uyum, temel erişilebilirlik ve sayfa başlıklarının düzenlenmesi", "Teknik SEO temelleri ve arama motoru tarama ayarlarının gözden geçirilmesi"],
    setupSteps: ["Hedef kitleyi ve sitenin amacını netleştiririz", "Sayfa taslağı ve içerik kapsamını birlikte onaylarız", "Yayına hazırlık kontrollerini yapıp düzenleme notlarını teslim ederiz"],
  },
  {
    id: "social-media", audience: "business", category: "Web ve sosyal medya", title: "Sosyal medya desteği", detail: "İşletme profillerinin düzenlenmesi, içerik planı ve platform ayarları için destek.", relatedServiceIds: ["web-design"],
    scope: ["İşletme profillerindeki temel bilgi ve bağlantıların düzenlenmesi", "Paylaşım konuları ve yayın sıklığı için içerik takvimi taslağı", "Hesap erişimi, rol ve güvenlik ayarlarının gözden geçirilmesi"],
    setupSteps: ["Kullanılan platformları ve işletme hedefini belirleriz", "Profil düzenlemeleri ve içerik takvimi taslağını hazırlarız", "Yetkileri ve yayın öncesi kontrol adımlarını birlikte inceleriz"],
  },
  {
    id: "microsoft-365", audience: "business", category: "E-posta ve bulut", title: "Microsoft 365 ve SharePoint", detail: "Microsoft 365, SharePoint ve OneDrive kurulum desteği.", relatedServiceIds: ["email-setup", "google-workspace"],
    scope: ["Microsoft 365 kullanıcıları ve lisans ihtiyacının gözden geçirilmesi", "SharePoint site ve OneDrive dosya paylaşımının yapılandırılması", "Çok adımlı doğrulama ve temel erişim ayarlarının değerlendirilmesi"],
    setupSteps: ["Alan adı, kullanıcılar ve mevcut lisansları kontrol ederiz", "Posta, SharePoint ve OneDrive kurulum sırasını planlarız", "Kullanıcı erişimi ve örnek dosya paylaşımını test ederiz"],
  },
  {
    id: "google-workspace", audience: "business", category: "E-posta ve bulut", title: "Google Workspace", detail: "Kurulum, taşıma ve kullanıcı desteği.", relatedServiceIds: ["email-setup", "microsoft-365"],
    scope: ["Alan adı doğrulama ve kullanıcı hesaplarının planlanması", "Gmail, Drive ve paylaşılan alanların temel yapılandırması", "Güvenlik, kurtarma ve posta teslim ayarlarının incelenmesi"],
    setupSteps: ["Alan adı erişimini ve kullanıcı ihtiyaçlarını netleştiririz", "E-posta geçişi ve ekip dosyaları için bir kurulum planı çıkarırız", "Hesap girişini, paylaşım izinlerini ve örnek e-postayı test ederiz"],
  },
  {
    id: "security-consulting", audience: "both", category: "Güvenlik danışmanlığı", title: "Güvenlik danışmanlığı", detail: "İhtiyacınıza uygun güvenli kurulum ve danışmanlık.", relatedServiceIds: ["microsoft-365", "computer-support"],
    scope: ["Hesaplarda çok adımlı doğrulama ve kurtarma seçeneklerinin gözden geçirilmesi", "Cihaz, yazılım ve yedekleme alışkanlıkları için temel risk değerlendirmesi", "İhtiyaca göre güvenli ayar ve iyileştirme önerilerinin sunulması"],
    setupSteps: ["Kapsamı ve incelenmesine izin verilen hesap veya cihazları belirleriz", "Gözlemleri önem sırasına göre ve anlaşılır biçimde paylaşırız", "Uygulanacak ayarları sizinle birlikte seçip sonucu kontrol ederiz"],
  },
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
