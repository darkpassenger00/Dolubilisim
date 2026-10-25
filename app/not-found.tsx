import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı | Dolu Bilişim",
  description: "Aradığınız sayfa bulunamadı. Dolu Bilişim ana sayfasına veya hizmetlere dönebilirsiniz.",
};

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Dolu Bilişim ana sayfa">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>DOLU<span className="brand-light">BİLİŞİM</span></span>
        </a>
        <a className="header-cta" href="/#iletisim">Bize ulaşın <span className="arrow" aria-hidden="true">↗</span></a>
      </header>

      <section className="not-found-content" aria-labelledby="not-found-title">
        <div className="not-found-orbit" aria-hidden="true"><span>404</span></div>
        <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> ARADIĞINIZ SAYFA BURADA DEĞİL</div>
        <h1 id="not-found-title">Kaybolmadınız,<br /><span>yalnızca yanlış yerdesiniz.</span></h1>
        <p>Bu bağlantı değişmiş veya kaldırılmış olabilir. İhtiyacınız olan hizmete ya da destek talebine devam edebilirsiniz.</p>
        <nav className="not-found-actions" aria-label="Sayfa bulunamadı seçenekleri">
          <a className="button button-primary" href="/">Ana sayfaya dön <span aria-hidden="true">→</span></a>
          <a className="text-link" href="/#hizmetler">Hizmetleri keşfet <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="/#iletisim">Destek talebi oluştur <span aria-hidden="true">↗</span></a>
        </nav>
      </section>

      <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true">✳</span><span>DOLU<span className="brand-light">BİLİŞİM</span></span></a><span>Teknoloji, güven ve dijital büyüme.</span><span>© {new Date().getFullYear()} Dolu Bilişim</span></footer>
    </main>
  );
}
