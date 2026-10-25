import test from "node:test";
import assert from "node:assert/strict";
import { seoGuides } from "../lib/seo-guides.mjs";
import { readFile } from "node:fs/promises";

const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");

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
