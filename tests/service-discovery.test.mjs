import test from "node:test";
import assert from "node:assert/strict";
import { services } from "../lib/site-content.mjs";
import { createServiceDiscoveryIndex, filterServicesForAudience } from "../lib/service-discovery.mjs";
import { readFile } from "node:fs/promises";

const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const component = await readFile(new URL("../app/service-discovery.tsx", import.meta.url), "utf8");

test("service discovery index contains only fields needed by service cards", () => {
  const index = createServiceDiscoveryIndex(services);
  assert.deepEqual(Object.keys(index[0]), ["id", "audience", "title", "detail"]);
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
});

test("homepage renders accessible audience filters with result announcements", () => {
  assert.match(home, /const serviceDiscoveryIndex = createServiceDiscoveryIndex\(services\)/);
  assert.match(home, /<ServiceDiscovery services=\{serviceDiscoveryIndex\}\s*\/>/);
  assert.match(component, /aria-label="Hizmet türü"/);
  assert.match(component, /aria-pressed=\{audience === filter\.id\}/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /individual|business/);
});
