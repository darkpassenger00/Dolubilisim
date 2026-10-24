import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../../lib/site-content.mjs";
import SupportLinks from "../../support-links";

const siteUrl = "https://dolubilisim.com";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function findService(slug: string) {
  return services.find((service) => service.id === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: "Hizmet bulunamadı | Dolu Bilişim" };

  return {
    title: `${service.title} | Dolu Bilişim`,
    description: service.detail,
    alternates: { canonical: `${siteUrl}/hizmetler/${service.id}` },
    openGraph: {
      title: `${service.title} | Dolu Bilişim`,
      description: service.detail,
      url: `${siteUrl}/hizmetler/${service.id}`,
      siteName: "Dolu Bilişim",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return (
    <main className="service-detail-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Dolu Bilişim ana sayfa">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>DOLU<span className="brand-light">BİLİŞİM</span></span>
        </a>
        <a className="header-cta" href="/#iletisim">Talep oluştur <span className="arrow" aria-hidden="true">↗</span></a>
      </header>

      <section className="service-detail-hero">
        <div className="eyebrow"><span className="eyebrow-line" /> DOLU BİLİŞİM / HİZMETLER</div>
        <p className="service-detail-kicker">{service.audience === "individual" ? "BİREYSEL DESTEK" : service.audience === "business" ? "KURUMSAL DESTEK" : "BİREYSEL VE KURUMSAL"}</p>
        <h1>{service.title}</h1>
        <p className="service-detail-lede">{service.detail}</p>
        <div className="service-detail-actions">
          <a className="button button-primary" href="/#iletisim">İhtiyacımı anlat <span className="arrow" aria-hidden="true">→</span></a>
          <a className="text-link" href="/">Tüm çözümlere dön <span className="arrow" aria-hidden="true">↗</span></a>
        </div>
      </section>

      {service.safetyNotice && (
        <aside className="service-safety-note" aria-label="Gizlilik ve güvenlik ilkesi">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>Gizlilik ve güvenlik ilkesi</strong>
            <p>{service.safetyNotice}</p>
          </div>
        </aside>
      )}

      <section className="service-detail-content">
        <div>
          <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> NASIL İLERLİYORUZ</div>
          <h2>İhtiyacınıza göre<br /><span>birlikte planlayalım.</span></h2>
          <p>Önce mevcut durumu ve beklentinizi konuşuruz. Ardından kapsamı, uygulanacak adımları ve ihtiyaç duyulacak erişimleri netleştiririz. Kurulum veya danışmanlık boyunca anlaşılır bilgi verir, tamamlanan adımları sizinle paylaşırız.</p>
        </div>
        <aside className="service-detail-note">
          <span className="service-detail-number">7/24</span>
          <strong>İhtiyaç duyduğunuzda ulaşılabilir destek</strong>
          <p>İlk dönüş hedefimiz en geç 30 dakikadır. Size uygun çözüm için talep formundan bize yazın.</p>
          <a href="/#iletisim">Talep formuna git <span aria-hidden="true">↗</span></a>
        </aside>
      </section>
      <SupportLinks />

      <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true">✳</span><span>DOLU<span className="brand-light">BİLİŞİM</span></span></a><span>Teknoloji, güven ve dijital büyüme.</span><a href="/#hizmetler">Diğer hizmetler</a></footer>
    </main>
  );
}
