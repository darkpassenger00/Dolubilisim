import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { services } from "../lib/site-content.mjs";

const route = await readFile(new URL("../app/hizmetler/[slug]/page.tsx", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("service detail pages are generated from the editable service catalogue", () => {
  assert.match(route, /generateStaticParams/);
  assert.match(route, /services\.map\(\(service\) => \(\{ slug: service\.id \}\)\)/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /notFound\(\)/);
});

test("service details expose a semantic breadcrumb back to the catalogue", () => {
  assert.match(route, /<nav aria-label="Gezinme yolu" className="breadcrumbs">/);
  assert.match(route, /href="\/"[^>]*>Ana sayfa/);
  assert.match(route, /href="\/#hizmetler"[^>]*>Hizmetler/);
  assert.match(route, /aria-current="page">\{service\.title\}/);
});

test("every catalogue service is linked from the homepage and included in the sitemap", () => {
  assert.match(home, /services\.map\(/);
  assert.match(home, /href=\{`\/hizmetler\/\$\{service\.id\}`\}/);
  assert.match(sitemap, /services\.map\(\(service\) => \(\{[\s\S]*?url: `\$\{siteUrl\}\/hizmetler\/\$\{service\.id\}`/);
  assert.ok(services.length >= 7);
});
