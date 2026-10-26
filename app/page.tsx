import { audienceMix, services, supportPromise } from "../lib/site-content.mjs";
import { seoGuides } from "../lib/seo-guides.mjs";
import { createGuideSearchIndex } from "../lib/search-guides.mjs";
import { createServiceDiscoveryIndex } from "../lib/service-discovery.mjs";
import { faqItems } from "../lib/faq.mjs";
import RequestForm from "./request-form";
import SupportLinks from "./support-links";
import MobileNav from "./mobile-nav";
import GuideSearch from "./guide-search";
import ServiceDiscovery from "./service-discovery";
import { homepageStructuredData, serializeJsonLd } from "../lib/structured-data.mjs";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function SparkMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="brand-mark">
      <path d="M20 2.5 24.3 15.7 37.5 20l-13.2 4.3L20 37.5l-4.3-13.2L2.5 20l13.2-4.3L20 2.5Z" fill="currentColor" />
      <circle cx="31.5" cy="8.5" r="3" fill="currentColor" opacity=".56" />
    </svg>
  );
}

const guideSearchIndex = createGuideSearchIndex(seoGuides);
const serviceDiscoveryIndex = createServiceDiscoveryIndex(services);

export default function HomePage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homepageStructuredData) }}
      />
      <div className="announcement">
        <span className="status-dot" />
        <span>Bireysel ve kurumsal hizmetlerde 7/24 destek</span>
        <a href="#iletisim">Hızlı destek talebi aç <Arrow /></a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Dolu Bilişim ana sayfa">
          <SparkMark />
          <span>DOLU<span className="brand-light">BİLİŞİM</span></span>
        </a>
        <nav aria-label="Ana menü" className="main-nav">
          <a href="#cozumler">Çözümler</a>
          <a href="#bireysel">Bireysel</a>
          <a href="#kurumsal">Kurumsal</a>
          <a href="#rehberler">Rehberler</a>
          <a href="#sss">SSS</a>
          <a href="#yaklasim">Yaklaşımımız</a>
        </nav>
        <MobileNav />
        <a className="header-cta" href="#iletisim">Hızlı destek al <Arrow diagonal /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Bireysel ve kurumsal destek · 7/24</div>
          <h1>Teknoloji desteği<br /><span>hep yanınızda.</span></h1>
          <p className="hero-lede">Bilgisayar ve e-posta kurulumundan Microsoft 365, Google Workspace, web, sosyal medya ve güvenlik danışmanlığına kadar ihtiyacınız olan çözüm için yanınızdayız.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#iletisim">Hızlı destek talebi aç <Arrow /></a>
            <a className="text-link" href="#hizmetler">Hizmetleri keşfet <Arrow /></a>
          </div>
          <p className="hero-request-note">Talebiniz e-posta taslağı olarak açılır; göndermeyi siz onaylarsınız.</p>
          <div className="hero-proof">
            <div className="proof-icon"><span>24</span><span>/7</span></div>
            <div><strong>7/24 destek</strong><span>tüm hizmet alanlarında</span></div>
            <span className="proof-divider" />
            <div className="proof-icon response-icon">30<span>dk</span></div>
            <div><strong>En geç 30 dakika</strong><span>içinde ilk dönüş</span></div>
          </div>
        </div>

        <div className="hero-art" aria-label="Bireysel ve kurumsal teknoloji hizmetlerini temsil eden görsel panel">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-glow" />
          <div className="hero-card hero-card-main">
            <div className="card-topline"><span className="mini-brand"><SparkMark /> DOLU BİLİŞİM</span><span className="card-menu">···</span></div>
            <div className="card-welcome">Hangi konuda destek arıyorsunuz?</div>
            <a className="solution-row" href="#bireysel">
              <div className="solution-icon personal-icon"><span>⌂</span></div>
              <div><strong>Kişisel teknoloji</strong><span>Bilgisayar · e-posta · yedekleme</span></div>
              <Arrow />
            </a>
            <a className="solution-row" href="#hizmetler">
              <div className="solution-icon business-icon"><span>▦</span></div>
              <div><strong>Kurumsal hizmetler</strong><span>Microsoft 365 · web · güvenlik</span></div>
              <Arrow />
            </a>
            <div className="card-foot"><span className="status-dot" /> Hızlı destek talebi oluşturun</div>
          </div>
          <div className="floating-note note-cloud"><span className="note-icon">✳</span><span><strong>Bulut çözümleri</strong><small>Microsoft 365 · Workspace</small></span></div>
          <div className="floating-note note-secure"><span className="secure-check">✓</span><span><strong>Güvenli yaklaşım</strong><small>İhtiyacınıza özel danışmanlık</small></span></div>
          <span className="art-label art-label-top">Dijitalde yanınızda</span>
          <span className="art-label art-label-bottom">01 — 03</span>
        </div>
        <div className="hero-side-note">Dijital hayatınızda<br />daha az karmaşa.</div>
      </section>

      <div className="trust-strip" aria-label="Destek özellikleri">
        <span><strong>{supportPromise.availability}</strong> tüm hizmetlerde destek</span>
        <span className="strip-separator">✳</span>
        <span>En geç <strong>{supportPromise.firstResponseMinutes} dakika</strong> içinde ilk dönüş</span>
        <span className="strip-separator">✳</span>
        <span>Talep formu <strong>e-posta taslağı</strong> açar</span>
        <span className="strip-separator">✳</span>
        <span>Bireysel ve <strong>kurumsal</strong> çözümler</span>
      </div>

      <section className="service-shortcuts section-shell" aria-labelledby="service-shortcuts-title">
        <div className="service-shortcuts-heading">
          <div>
            <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Hizmetlerimiz</div>
            <h2 id="service-shortcuts-title">Hızlı erişim</h2>
          </div>
          <a className="text-link" href="#hizmetler">Tüm hizmetleri gör <Arrow /></a>
        </div>
        <nav className="service-shortcut-grid" aria-label="Hizmet alanlarına hızlı erişim">
          <a className="service-shortcut" href="#bireysel"><span className="service-shortcut-index">01</span><span className="service-shortcut-copy"><strong>Kişisel teknoloji</strong><small>Bilgisayar · e-posta · yedekleme</small></span><Arrow diagonal /></a>
          <a className="service-shortcut" href="#hizmetler"><span className="service-shortcut-index">02</span><span className="service-shortcut-copy"><strong>E-posta ve bulut</strong><small>Microsoft 365 · Workspace</small></span><Arrow diagonal /></a>
          <a className="service-shortcut" href="#hizmetler"><span className="service-shortcut-index">03</span><span className="service-shortcut-copy"><strong>Web ve sosyal medya</strong><small>Web tasarımı · SEO · içerik</small></span><Arrow diagonal /></a>
          <a className="service-shortcut" href="#hizmetler"><span className="service-shortcut-index">04</span><span className="service-shortcut-copy"><strong>Güvenlik danışmanlığı</strong><small>İhtiyaca uygun güvenli kurulum</small></span><Arrow diagonal /></a>
        </nav>
      </section>

      <section className="audience-section section-shell" id="cozumler">
        <div className="section-heading">
          <div>
            <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Size uygun olanı bulun</div>
            <h2>Teknoloji herkes için<br /><span>daha anlaşılır.</span></h2>
          </div>
          <p>İster kişisel bir konuda yardıma, ister işletmeniz için güvenilir bir teknoloji ortağına ihtiyaç duyun; doğru yerden başlayın.</p>
        </div>
        <div className="audience-grid">
          <a className="audience-card individual-card" id="bireysel" href="#hizmetler">
            <div className="audience-card-top"><span className="audience-kicker">01 / BİREYSEL</span><span className="audience-symbol">⌂</span></div>
            <div className="audience-card-copy"><h3>Günlük teknoloji<br />desteği, içiniz rahat.</h3><p>Bilgisayar, e-posta, yedekleme ve aile güvenliği konularında yanınızdayız.</p></div>
            <span className="audience-link">Bireysel çözümleri gör <Arrow diagonal /></span>
            <div className="card-index">%{audienceMix.individual}</div>
          </a>
          <a className="audience-card business-card" id="kurumsal" href="#hizmetler">
            <div className="audience-card-top"><span className="audience-kicker">02 / KURUMSAL</span><span className="audience-symbol">▦</span></div>
            <div className="audience-card-copy"><h3>İşiniz büyüsün,<br />teknoloji yetişsin.</h3><p>Web, bulut araçları ve dijital görünürlük için ihtiyaç odaklı destek.</p></div>
            <span className="audience-link">Kurumsal çözümleri gör <Arrow diagonal /></span>
            <div className="card-index">%{audienceMix.business}</div>
          </a>
        </div>
      </section>

      <section className="services-section" id="hizmetler">
        <div className="section-shell">
          <div className="section-heading services-heading">
            <div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Çözüm alanlarımız</div><h2>İhtiyacınız ne olursa<br /><span>birlikte çözelim.</span></h2></div>
            <a className="text-link" href="#iletisim">Tüm hizmetleri keşfet <Arrow /></a>
          </div>
          <ServiceDiscovery services={serviceDiscoveryIndex} />
        </div>
      </section>

      <section className="guide-section section-shell" id="rehberler">
        <div className="section-heading">
          <div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Bilgi köşesi</div><h2>Dijital işler için<br /><span>kısa rehberler.</span></h2></div>
          <p>Destek talebi oluşturmadan önce işinize yarayacak sade ve uygulanabilir notlar.</p>
        </div>
        <GuideSearch guides={guideSearchIndex} />
      </section>

      <section className="faq-section section-shell" id="sss">
        <div className="section-heading">
          <div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Merak edilenler</div><h2>Başlamadan önce<br /><span>bilmeniz gerekenler.</span></h2></div>
          <p>Destek talebi, çalışma süreci ve hizmet kapsamıyla ilgili kısa yanıtlar.</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details className="faq-item" key={item.question}>
              <summary><span className="faq-index">0{index + 1}</span><span>{item.question}</span><span className="faq-toggle" aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="approach-section section-shell" id="yaklasim">
        <div className="approach-mark"><SparkMark /><span>TEKNOLOJİ<br />DAHA DOLU.</span></div>
        <div className="approach-copy"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Dolu Bilişim yaklaşımı</div><h2>Önce sizi dinler,<br /><span>sonra çözüm üretiriz.</span></h2><p>Karmaşık terimler yerine anlaşılır anlatım, hazır paketler yerine ihtiyacınıza göre kurulum. Her adımda ne yaptığımızı bilirsiniz.</p><a className="text-link" href="#iletisim">Yaklaşımımızı tanıyın <Arrow /></a></div>
        <div className="approach-points"><div><span className="point-number">01</span><div><strong>İhtiyaç odaklı</strong><p>Önce ihtiyacı netleştirir, gereksiz adımlardan kaçınırız.</p></div></div><div><span className="point-number">02</span><div><strong>Anlaşılır iletişim</strong><p>Teknik konuları açık ve sade bir dille aktarırız.</p></div></div><div><span className="point-number">03</span><div><strong>Güvenli kurulum</strong><p>Güvenlik ve gizliliği her çözümün parçası görürüz.</p></div></div></div>
      </section>

      <section className="contact-banner" id="iletisim">
        <div className="contact-inner">
          <div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line" /> İlk adım basit</div><h2>Birlikte doğru<br />çözümü bulalım.</h2><p>İhtiyacınızı anlatın; size uygun destek yolunu belirleyelim.</p><div className="contact-response"><span className="response-clock">30</span><span><strong>En geç 30 dakika</strong><small>içinde ilk dönüş hedefi</small></span></div><div className="contact-hours"><span className="status-dot" /> 7/24 destek yaklaşımı</div><SupportLinks /></div>
          <RequestForm />
        </div>
      </section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><SparkMark /><span>DOLU<span className="brand-light">BİLİŞİM</span></span></a><span>Teknoloji, güven ve dijital büyüme.</span><span>© {new Date().getFullYear()} Dolu Bilişim</span></footer>
    </main>
  );
}
