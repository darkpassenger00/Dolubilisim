import { audienceMix, services, supportPromise } from "../lib/site-content.mjs";
import { seoGuides } from "../lib/seo-guides.mjs";
import { faqItems } from "../lib/faq.mjs";
import RequestForm from "./request-form";
import SupportLinks from "./support-links";

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

export default function HomePage() {
  return (
    <main>
      <div className="announcement">
        <span className="status-dot" />
        <span>İhtiyacınıza uygun teknoloji desteği, tek noktada</span>
        <a href="#cozumler">Çözümleri keşfet <Arrow /></a>
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
        <a className="header-cta" href="#iletisim">Bize ulaşın <Arrow diagonal /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Teknoloji desteği, insan gibi</div>
          <h1>Teknoloji<br />işinizi <span>kolaylaştırsın.</span></h1>
          <p className="hero-lede">Günlük dijital ihtiyaçlarınızdan işletmenizin dönüşümüne kadar, doğru çözüm için yanınızdayız.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#cozumler">Çözümleri keşfet <Arrow /></a>
            <a className="text-link" href="#iletisim">Nasıl çalışıyoruz? <Arrow /></a>
          </div>
          <div className="hero-proof">
            <div className="proof-icon"><span>24</span><span>/7</span></div>
            <div><strong>İhtiyacınız olduğunda</strong><span>ulaşılabilir destek</span></div>
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
            <div className="card-welcome">Bugün neye ihtiyacınız var?</div>
            <div className="solution-row">
              <div className="solution-icon personal-icon"><span>⌂</span></div>
              <div><strong>Kendiniz için</strong><span>Günlük teknoloji desteği</span></div>
              <Arrow />
            </div>
            <div className="solution-row">
              <div className="solution-icon business-icon"><span>▦</span></div>
              <div><strong>İşletmeniz için</strong><span>Bulut, web ve güvenlik</span></div>
              <Arrow />
            </div>
            <div className="card-foot"><span className="status-dot" /> Sizin için doğru çözümü birlikte bulalım</div>
          </div>
          <div className="floating-note note-cloud"><span className="note-icon">✳</span><span><strong>Bulut çözümleri</strong><small>Microsoft 365 · Workspace</small></span></div>
          <div className="floating-note note-secure"><span className="secure-check">✓</span><span><strong>Güvenli yaklaşım</strong><small>İhtiyacınıza özel danışmanlık</small></span></div>
          <span className="art-label art-label-top">Dijitalde yanınızda</span>
          <span className="art-label art-label-bottom">01 — 03</span>
        </div>
        <div className="hero-side-note">Dijital hayatınızda<br />daha az karmaşa.</div>
      </section>

      <div className="trust-strip" aria-label="Destek özellikleri">
        <span>İlk dönüş en geç <strong>{supportPromise.firstResponseMinutes} dakika</strong></span>
        <span className="strip-separator">✳</span>
        <span><strong>{supportPromise.availability}</strong> ulaşılabilirlik</span>
        <span className="strip-separator">✳</span>
        <span>Bireysel ve <strong>kurumsal</strong> çözümler</span>
        <span className="strip-separator">✳</span>
        <span>Önce <strong>ihtiyacınızı</strong> anlarız</span>
      </div>

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
          <div className="service-grid">
            {services.map((service, index) => (
              <a className="service-card" href={`/hizmetler/${service.id}`} key={service.id}>
                <div className="service-card-top"><span className="service-number">0{index + 1}</span><span className="service-arrow"><Arrow diagonal /></span></div>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-section section-shell" id="rehberler">
        <div className="section-heading">
          <div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> Bilgi köşesi</div><h2>Dijital işler için<br /><span>kısa rehberler.</span></h2></div>
          <p>Destek talebi oluşturmadan önce işinize yarayacak sade ve uygulanabilir notlar.</p>
        </div>
        <div className="guide-card-grid">
          {seoGuides.map((guide) => (
            <a className="guide-card" href={`/rehber/${guide.slug}`} key={guide.slug}>
              <div className="guide-card-meta"><span>{guide.category}</span><span>{guide.readingTime} dk</span></div>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <span className="guide-card-link">Rehberi oku <Arrow diagonal /></span>
            </a>
          ))}
        </div>
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
