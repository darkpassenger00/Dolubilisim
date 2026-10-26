import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { seoGuides } from "../lib/seo-guides.mjs";
import { guideSectionId } from "../lib/guide-sections.mjs";

const route = await readFile(new URL("../app/rehber/[slug]/page.tsx", import.meta.url), "utf8");
const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("SEO guides use editable structured content and search metadata", () => {
  assert.equal(seoGuides.length >= 2, true);
  assert.equal(seoGuides[0].sections.length >= 3, true);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /notFound\(\)/);
});

test("site-in and off-site SEO guide is sourced and avoids ranking promises", () => {
  const guide = seoGuides.find(({ slug }) => slug === "site-ici-site-disi-seo");
  assert.ok(guide);
  assert.ok(guide.sections.length >= 4);
  assert.match(guide.sections.flatMap(({ paragraphs }) => paragraphs).join(" "), /sıralama garantisi/i);
  assert.ok(guide.sources.length >= 2);
  assert.ok(guide.sources.every(({ url }) => url.startsWith("https://developers.google.com/search/")));
  assert.match(route, /guide\.sources\.map/);
  assert.match(route, /className="guide-sources"/);
});

test("Microsoft 365 setup guide covers secure rollout and cites Microsoft documentation", () => {
  const guide = seoGuides.find(({ slug }) => slug === "microsoft-365-kurulum-kontrol-listesi");
  assert.ok(guide);
  assert.equal(guide.publishedAt, "2026-10-25");
  assert.ok(guide.sections.length >= 5);
  assert.ok(guide.sources.length >= 4);
  assert.ok(guide.sources.every(({ url }) => url.startsWith("https://learn.microsoft.com/")));
  const content = guide.sections.flatMap(({ heading, paragraphs }) => [heading, ...paragraphs]).join(" ");
  assert.match(content, /MX kayd/);
  assert.match(content, /MFA/);
  assert.match(content, /OneDrive/);
  assert.match(content, /SharePoint/);
  assert.match(content, /pilot/i);
});

test("Google Workspace setup guide covers domain, mail, account security and Drive", () => {
  const guide = seoGuides.find(({ slug }) => slug === "google-workspace-kurulum-kontrol-listesi");
  assert.ok(guide);
  assert.equal(guide.publishedAt, "2026-10-25");
  assert.ok(guide.sections.length >= 5);
  assert.ok(guide.sources.length >= 5);
  assert.ok(guide.sources.every(({ url }) => url.startsWith("https://support.google.com/")));
  const content = guide.sections.flatMap(({ heading, paragraphs }) => [heading, ...paragraphs]).join(" ");
  for (const topic of [/alan adı/, /MX kayıt/, /2 Adımlı Doğrulama/, /paylaşılan Drive/, /SPF, DKIM ve DMARC/]) {
    assert.match(content, topic);
  }
});

test("guide details expose a semantic breadcrumb back to the guide list", () => {
  assert.match(route, /<nav aria-label="Gezinme yolu" className="breadcrumbs">/);
  assert.match(route, /href="\/"[^>]*>Ana sayfa/);
  assert.match(route, /href="\/#rehberler"[^>]*>Rehberler/);
  assert.match(route, /aria-current="page">\{guide\.title\}/);
});

test("guide detail pages show the publication date as semantic time", () => {
  assert.match(route, /<time dateTime=\{guide\.publishedAt\}>/);
  assert.match(route, /Intl\.DateTimeFormat\("tr-TR"/);
});

test("the guide is linked from the homepage and included in the sitemap", () => {
  assert.match(home, /id="rehberler"/);
  assert.match(home, /\/rehber\/\$\{guide\.slug\}/);
  assert.match(sitemap, /seoGuides\.map\(\(guide\) => \(\{[\s\S]*?url: `\$\{siteUrl\}\/rehber\/\$\{guide\.slug\}`/);
});


test("guide cards use balanced desktop columns and a single mobile column", () => {
  assert.match(styles, /\.guide-card-grid\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:14px\}/);
  assert.match(styles, /@media\(max-width:760px\)[\s\S]*?\.guide-card-grid\{grid-template-columns:1fr\}/);
});


test("guide social previews include publication and last-update timestamps", () => {
  assert.match(route, /publishedTime: guide\.publishedAt/);
  assert.match(route, /modifiedTime: guide\.updatedAt/);
});

test("related guide links are valid, unique, and rendered as internal links", () => {
  const guideSlugs = new Set(seoGuides.map(({ slug }) => slug));
  for (const guide of seoGuides) {
    assert.ok(Array.isArray(guide.relatedSlugs), `${guide.slug} should define related guides`);
    assert.ok(guide.relatedSlugs.length >= 1 && guide.relatedSlugs.length <= 2);
    assert.equal(new Set(guide.relatedSlugs).size, guide.relatedSlugs.length);
    assert.ok(guide.relatedSlugs.every((slug) => slug !== guide.slug && guideSlugs.has(slug)));
  }
  assert.match(route, /guide\.relatedSlugs/);
  assert.match(route, /relatedGuides\.map/);
  assert.match(route, /className="related-guide-card"/);
  assert.match(styles, /\.related-guide-grid\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(styles, /\.related-guide-grid\{grid-template-columns:1fr\}/);
});

test("guide table of contents anchors every section with a stable unique Turkish slug", () => {
  for (const guide of seoGuides) {
    const sectionIds = guide.sections.map(({ heading }) => guideSectionId(heading));
    assert.ok(sectionIds.every((id) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)));
    assert.equal(new Set(sectionIds).size, sectionIds.length);
  }
  assert.equal(guideSectionId("Alan adını doğrulayın; e-posta DNS değişikliğini planlayın"), "alan-adini-dogrulayin-e-posta-dns-degisikligini-planlayin");
  assert.match(route, /aria-label="Bu rehberde"/);
  assert.match(route, /href=\{`#\$\{guideSectionId\(section\.heading\)\}`\}/);
  assert.match(route, /id=\{guideSectionId\(section\.heading\)\}/);
  assert.match(styles, /\.guide-toc/);
});

test("guide publication and update dates are visibly labeled without implying an edit", () => {
  assert.match(route, /className="guide-date-label">Yayınlandı<\/span>/);
  assert.match(route, /guide\.updatedAt !== guide\.publishedAt/);
  assert.match(route, /className="guide-date-label">Güncellendi<\/span>/);
  assert.match(route, /<time dateTime=\{guide\.updatedAt\}>/);
  assert.match(styles, /\.guide-date-label/);
});

test("location sharing guide prioritizes consent, child controls and official platform sources", () => {
  const guide = seoGuides.find(({ slug }) => slug === "guvenli-konum-paylasimi-ve-ebeveyn-kontrolleri");
  assert.ok(guide);
  assert.equal(guide.publishedAt, "2026-10-26");
  assert.ok(guide.sections.length >= 4);
  assert.equal(guide.sources.length, 3);
  assert.ok(guide.sources.some(({ url }) => url.startsWith("https://support.apple.com/")));
  assert.ok(guide.sources.some(({ url }) => url.startsWith("https://support.google.com/maps/")));
  assert.ok(guide.sources.some(({ url }) => url.startsWith("https://support.google.com/families/")));
  const content = guide.sections.flatMap(({ heading, paragraphs }) => [heading, ...paragraphs]).join(" ");
  assert.match(content, /açık onayıyla/);
  assert.match(content, /gizlice takip/);
  assert.match(content, /ebeveyn/);
  assert.match(content, /paylaşımı durdur/);
  assert.match(route, /guide\.sections\.map/);
});
