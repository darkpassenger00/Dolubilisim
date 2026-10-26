import test from "node:test";
import assert from "node:assert/strict";
import { services } from "../lib/site-content.mjs";
import { createServiceDiscoveryIndex, filterServicesForAudience } from "../lib/service-discovery.mjs";
import { readFile } from "node:fs/promises";

const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const component = await readFile(new URL("../app/service-discovery.tsx", import.meta.url), "utf8");

test("service discovery index contains only fields needed by service cards", () => {
  const index = createServiceDiscoveryIndex(services);
  assert.deepEqual(Object.keys(index[0]), ["id", "audience", "category", "title", "detail"]);
  assert.ok(index.every((service) => service.category));
  assert.ok(index.every((service) => !("scope" in service) && !("setupSteps" in service)));
});

test("audience filter includes shared services and retains the full catalog option", () => {
  const index = createServiceDiscoveryIndex(services);
  assert.equal(filterServicesForAudience(index, "all").length, services.length);
  assert.deepEqual(
    filterServicesForAudience(index, "individual").map(({ id }) => id),
    ["computer-support", "email-setup", "family-safety", "backup-recovery", "security-consulting"],
  );
  assert.deepEqual(
    filterServicesForAudience(index, "business").map(({ id }) => id),
    ["email-setup", "web-design", "social-media", "microsoft-365", "google-workspace", "security-consulting"],
  );
  assert.deepEqual(
    filterServicesForAudience(index, "all", "E-posta ve bulut").map(({ id }) => id),
    ["email-setup", "microsoft-365", "google-workspace"],
  );
  assert.deepEqual(
    filterServicesForAudience(index, "individual", "E-posta ve bulut").map(({ id }) => id),
    ["email-setup"],
  );
});

test("service search matches Turkish titles, details, and categories together with filters", () => {
  const index = createServiceDiscoveryIndex(services);
  assert.deepEqual(filterServicesForAudience(index, "all", "all", "microsoft").map(({ id }) => id), ["email-setup", "microsoft-365"]);
  assert.deepEqual(filterServicesForAudience(index, "all", "all", "GUVENLİK").map(({ id }) => id), ["security-consulting"]);
  assert.deepEqual(filterServicesForAudience(index, "business", "E-posta ve bulut", "Google Workspace").map(({ id }) => id), ["google-workspace"]);
  assert.deepEqual(filterServicesForAudience(index, "all", "all", "bulunmayan").map(({ id }) => id), []);
});

test("homepage renders accessible audience and category filters with result announcements", () => {
  assert.match(home, /const serviceDiscoveryIndex = createServiceDiscoveryIndex\(services\)/);
  assert.match(home, /<ServiceDiscovery services=\{serviceDiscoveryIndex\}\s*\/>/);
  assert.match(component, /aria-label="Hizmet türü"/);
  assert.match(component, /aria-pressed=\{audience === filter\.id\}/);
  assert.match(component, /aria-label="Hizmet kategorisi"/);
  assert.match(component, /aria-pressed=\{selectedCategory === category\}/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /aria-label="Hizmet ara"/);
  assert.match(component, /Hizmet bulunamadı/);
  assert.ok(services.some(({ category }) => category === "Kişisel teknoloji"));
});
