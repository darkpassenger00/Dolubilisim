import test from "node:test";
import assert from "node:assert/strict";
import { breadcrumbStructuredData, homepageStructuredData, serializeJsonLd } from "../lib/structured-data.mjs";
import { readFile } from "node:fs/promises";

const homePage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const servicePage = await readFile(new URL("../app/hizmetler/[slug]/page.tsx", import.meta.url), "utf8");
const guidePage = await readFile(new URL("../app/rehber/[slug]/page.tsx", import.meta.url), "utf8");

test("homepage publishes truthful Organization and WebSite JSON-LD", () => {
  const [organization, website] = homepageStructuredData;
  assert.equal(organization["@type"], "Organization");
  assert.equal(organization.name, "Dolu Bilişim");
  assert.equal(organization.url, "https://dolubilisim.com");
  assert.equal("telephone" in organization, false);
  assert.equal("address" in organization, false);
  assert.equal(website["@type"], "WebSite");
  assert.equal(website.inLanguage, "tr-TR");
  assert.deepEqual(website.publisher, { "@id": "https://dolubilisim.com/#organization" });
  assert.ok(homePage.includes('type="application/ld+json"'));
});

test("JSON-LD serialization escapes script-closing input", () => {
  const serialized = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.equal(serialized.includes("</"), false);
  assert.ok(serialized.includes("\\u003c/script>"));
});

test("service and guide breadcrumb data preserves ordered canonical links", () => {
  const breadcrumbs = breadcrumbStructuredData([
    { name: "Ana sayfa", url: "https://dolubilisim.com" },
    { name: "Rehberler", url: "https://dolubilisim.com/#rehberler" },
    { name: "SEO rehberi", url: "https://dolubilisim.com/rehber/site-ici-seo" },
  ]);
  assert.equal(breadcrumbs["@type"], "BreadcrumbList");
  assert.deepEqual(breadcrumbs.itemListElement.map(({ position }) => position), [1, 2, 3]);
  assert.equal(breadcrumbs.itemListElement[2].item, "https://dolubilisim.com/rehber/site-ici-seo");
  assert.match(servicePage, /breadcrumbStructuredData/);
  assert.match(guidePage, /breadcrumbStructuredData/);
});
