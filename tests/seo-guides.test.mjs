import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { seoGuides } from "../lib/seo-guides.mjs";

const route = await readFile(new URL("../app/rehber/[slug]/page.tsx", import.meta.url), "utf8");
const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");

test("SEO guides use editable structured content and search metadata", () => {
  assert.equal(seoGuides.length, 1);
  assert.equal(seoGuides[0].sections.length >= 3, true);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /notFound\(\)/);
});

test("guide details expose a semantic breadcrumb back to the guide list", () => {
  assert.match(route, /<nav aria-label="Gezinme yolu" className="breadcrumbs">/);
  assert.match(route, /href="\/"[^>]*>Ana sayfa/);
  assert.match(route, /href="\/#rehberler"[^>]*>Rehberler/);
  assert.match(route, /aria-current="page">\{guide\.title\}/);
});

test("the guide is linked from the homepage and included in the sitemap", () => {
  assert.match(home, /id="rehberler"/);
  assert.match(home, /\/rehber\/\$\{guide\.slug\}/);
  assert.match(sitemap, /seoGuides\.map\(\(guide\) => \(\{[\s\S]*?url: `\$\{siteUrl\}\/rehber\/\$\{guide\.slug\}`/);
});
