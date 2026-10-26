import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getRelatedServices, services } from "../lib/site-content.mjs";

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

test("related service recommendations resolve from catalogue data and render links", () => {
  for (const service of services) {
    const related = getRelatedServices(service.id);
    assert.ok(related.length > 0, `${service.id} should have a related service`);
    assert.ok(related.every((item) => item.id !== service.id));
  }
  assert.match(route, /getRelatedServices\(service\.id\)/);
  assert.match(route, /className="related-service-card" href=\{`\/hizmetler\/\$\{relatedService\.id\}`\}/);
  assert.match(route, /aria-labelledby="related-services-title"/);
});

test("service catalogue relations use unique, existing service IDs", () => {
  const serviceIds = new Set(services.map(({ id }) => id));
  for (const service of services) {
    const relatedIds = service.relatedServiceIds || [];
    assert.equal(new Set(relatedIds).size, relatedIds.length, `${service.id} repeats a related service`);
    for (const relatedId of relatedIds) {
      assert.notEqual(relatedId, service.id, `${service.id} cannot recommend itself`);
      assert.ok(serviceIds.has(relatedId), `${service.id} references missing service ${relatedId}`);
    }
  }
});

test("each service page has service-specific scope and setup steps in the catalogue", () => {
  for (const service of services) {
    assert.ok(service.scope?.length >= 3, `${service.id} needs at least three concrete scope items`);
    assert.ok(service.setupSteps?.length >= 3, `${service.id} needs at least three setup steps`);
    assert.ok(service.scope.every((item) => typeof item === "string" && item.trim()));
    assert.ok(service.setupSteps.every((item) => typeof item === "string" && item.trim()));
  }

  assert.match(route, /service\.scope\.map\(/);
  assert.match(route, /service\.setupSteps\.map\(/);
  assert.match(route, /aria-labelledby="service-scope-title"/);
  assert.match(route, /aria-labelledby="service-setup-title"/);
});
