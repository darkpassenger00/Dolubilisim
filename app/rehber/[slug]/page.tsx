import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seoGuides } from "../../../lib/seo-guides.mjs";
import { breadcrumbStructuredData, serializeJsonLd } from "../../../lib/structured-data.mjs";
import SupportLinks from "../../support-links";

const siteUrl = "https://dolubilisim.com";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

function findGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function generateStaticParams() {
  return seoGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return { title: "Rehber bulunamadı | Dolu Bilişim" };

  return {
    title: `${guide.title} | Dolu Bilişim`,
    description: guide.description,
    alternates: { canonical: `${siteUrl}/rehber/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | Dolu Bilişim`,
      description: guide.description,
      url: `${siteUrl}/rehber/${guide.slug}`,
      siteName: "Dolu Bilişim",
      locale: "tr_TR",
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();
  const breadcrumbData = breadcrumbStructuredData([
    { name: "Ana sayfa", url: siteUrl },
    { name: "Rehberler", url: `${siteUrl}/#rehberler` },
    { name: guide.title, url: `${siteUrl}/rehber/${guide.slug}` },
  ]);

  return (
    <main id="main-content" className="guide-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />
      <header className="site-header">
        <a className="brand" href="/" aria-label="Dolu Bilişim ana sayfa">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>DOLU<span className="brand-light">BİLİŞİM</span></span>
        </a>
        <a className="header-cta" href="/#iletisim">Talep oluştur <span className="arrow" aria-hidden="true">↗</span></a>
      </header>

      <article className="guide-article">
        <nav aria-label="Gezinme yolu" className="breadcrumbs">
          <ol>
            <li><a href="/">Ana sayfa</a></li>
            <li><a href="/#rehberler">Rehberler</a></li>
            <li><span aria-current="page">{guide.title}</span></li>
          </ol>
        </nav>
        <div className="guide-article-meta">
          <span>{guide.category}</span>
          <span>{guide.readingTime} dakikalık okuma</span>
          <time dateTime={guide.publishedAt}>
            {new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${guide.publishedAt}T12:00:00Z`))}
          </time>
        </div>
        <h1>{guide.title}</h1>
        <p className="guide-article-lede">{guide.description}</p>
        <div className="guide-article-body">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        {guide.sources.length > 0 && (
          <aside className="guide-sources" aria-labelledby="guide-sources-title">
            <h2 id="guide-sources-title">Resmî kaynaklar</h2>
            <ul>
              {guide.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span aria-hidden="true">↗</span></a></li>
              ))}
            </ul>
          </aside>
        )}
        <aside className="guide-article-cta">
          <strong>Yardım mı gerekiyor?</strong>
          <p>İhtiyacınızı formda anlatın; talep e-posta uygulamanızda taslak olarak açılır.</p>
          <a href="/#iletisim">Destek talebi oluştur <span aria-hidden="true">↗</span></a>
        </aside>
      </article>
      <SupportLinks />

      <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true">✳</span><span>DOLU<span className="brand-light">BİLİŞİM</span></span></a><span>Teknoloji, güven ve dijital büyüme.</span><a href="/#hizmetler">Hizmetler</a></footer>
    </main>
  );
}
