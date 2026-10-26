import test from "node:test";
import assert from "node:assert/strict";
import { seoGuides } from "../lib/seo-guides.mjs";
import { createGuideSearchIndex, filterSeoGuides } from "../lib/search-guides.mjs";
import { readFile } from "node:fs/promises";

const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");
const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const searchComponent = await readFile(new URL("../app/guide-search.tsx", import.meta.url), "utf8");

test("sitemap exposes the Turkish homepage on the planned canonical domain", () => {
  assert.match(sitemap, /MetadataRoute\.Sitemap/);
  assert.match(sitemap, /https:\/\/dolubilisim\.com/);
  assert.match(sitemap, /url:\s*siteUrl/);
});

test("robots allows public search crawling and links the sitemap", () => {
  assert.match(robots, /MetadataRoute\.Robots/);
  assert.match(robots, /allow:\s*"\/"/);
  assert.match(robots, /const siteUrl = "https:\/\/dolubilisim\.com"/);
  assert.match(robots, /sitemap:\s*`\$\{siteUrl\}\/sitemap\.xml`/);
});

test("sitemap uses explicit guide update dates for crawler freshness", () => {
  assert.match(sitemap, /lastModified:\s*new Date\(guide\.updatedAt\)/);
  assert.match(sitemap, /seoGuides\.map\(\(guide\) => \(\{[\s\S]*?lastModified:/);
});

test("all SEO guides carry valid update dates for the sitemap", () => {
  assert.ok(seoGuides.length > 0);
  for (const guide of seoGuides) {
    assert.match(guide.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(guide.updatedAt >= guide.publishedAt, `${guide.slug} update date predates publication`);
  }
});

test("guide search finds titles, categories and article text case-insensitively", () => {
  assert.deepEqual(filterSeoGuides(seoGuides, "MICROSOFT 365").map(({ slug }) => slug), ["site-ici-site-disi-seo", "microsoft-365-kurulum-kontrol-listesi"]);
  assert.deepEqual(filterSeoGuides(seoGuides, "ÇOCUK").map(({ slug }) => slug), ["guvenli-konum-paylasimi-ve-ebeveyn-kontrolleri"]);
  assert.equal(filterSeoGuides(seoGuides, "   ").length, seoGuides.length);
  assert.deepEqual(filterSeoGuides(seoGuides, "eşleşmeyen ifade"), []);
});

test("guide category filters combine with the text query", () => {
  assert.deepEqual(filterSeoGuides(seoGuides, "", "SEO rehberi").map(({ slug }) => slug), ["site-ici-site-disi-seo"]);
  assert.deepEqual(filterSeoGuides(seoGuides, "365", "Kurumsal rehber").map(({ slug }) => slug), ["microsoft-365-kurulum-kontrol-listesi"]);
  assert.deepEqual(filterSeoGuides(seoGuides, "bilgisayar", "SEO rehberi"), []);
});

test("homepage search uses compact keyword metadata instead of shipping article bodies", () => {
  const searchIndex = createGuideSearchIndex(seoGuides);
  assert.deepEqual(Object.keys(searchIndex[0]), ["slug", "title", "description", "category", "readingTime", "keywords"]);
  assert.ok(searchIndex.every((guide) => !("sections" in guide) && guide.keywords.length >= 3));
  assert.deepEqual(filterSeoGuides(searchIndex, "MFA").map(({ slug }) => slug), ["microsoft-365-kurulum-kontrol-listesi"]);
  assert.deepEqual(filterSeoGuides(searchIndex, "ÇOCUK").map(({ slug }) => slug), ["guvenli-konum-paylasimi-ve-ebeveyn-kontrolleri"]);
  assert.match(home, /const guideSearchIndex = createGuideSearchIndex\(seoGuides\)/);
  assert.match(home, /<GuideSearch guides=\{guideSearchIndex\}\s*\/>/);
  assert.doesNotMatch(searchComponent, /sections:/);
});

test("homepage guide search announces results and provides an empty state", () => {
  assert.match(home, /<GuideSearch guides=\{guideSearchIndex\}\s*\/>/);
  assert.match(searchComponent, /htmlFor="guide-search"/);
  assert.match(searchComponent, /id="guide-search"[\s\S]*?type="search"/);
  assert.match(searchComponent, /aria-live="polite"/);
  assert.match(searchComponent, /aria-pressed=\{selectedCategory === category\}/);
  assert.match(searchComponent, /aria-label="Rehber kategorileri"/);
  assert.match(searchComponent, /Bu aramayla eşleşen rehber bulunamadı/);
});
