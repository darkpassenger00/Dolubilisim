import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { seoGuides } from "../lib/seo-guides.mjs";

const route = await readFile(new URL("../app/rehber/[slug]/page.tsx", import.meta.url), "utf8");
const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");

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
