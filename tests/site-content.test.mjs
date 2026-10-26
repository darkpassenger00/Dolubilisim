import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { audienceLabels, audienceMix, getServicesForAudience, services, supportPromise } from "../lib/site-content.mjs";

const servicePage = await readFile(new URL("../app/hizmetler/[slug]/page.tsx", import.meta.url), "utf8");
const homepage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const serviceDiscovery = await readFile(new URL("../app/service-discovery.tsx", import.meta.url), "utf8");
const requestForm = await readFile(new URL("../app/request-form.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("homepage audience mix follows the agreed 55/45 balance", () => {
  assert.deepEqual(audienceMix, { individual: 55, business: 45 });
});

test("service catalogue covers consumer, business, cloud and security needs", () => {
  const ids = new Set(services.map(({ id }) => id));
  for (const id of ["computer-support", "family-safety", "backup-recovery", "email-setup", "web-design", "social-media", "microsoft-365", "google-workspace", "security-consulting"]) {
    assert.ok(ids.has(id), `missing ${id}`);
  }
  assert.ok(services.some(({ audience }) => audience === "individual"));
  assert.ok(services.some(({ audience }) => audience === "business"));
});

test("homepage reading text uses more comfortable type sizes", () => {
  assert.match(styles, /\.service-card p\{font-size:12px/);
  assert.match(styles, /\.audience-card p\{[^}]*font-size:12px/);
  assert.match(styles, /\.faq-item>p\{[^}]*font-size:14px/);
  assert.match(styles, /\.form-grid label\{[^}]*font-size:11px/);
});

test("email setup serves both audiences and social media support is explicit", () => {
  assert.equal(services.find(({ id }) => id === "email-setup").audience, "both");
  assert.equal(services.find(({ id }) => id === "social-media").audience, "business");
});

test("request form only offers audience-matched and shared services", () => {
  const individual = getServicesForAudience("individual").map(({ id }) => id);
  const business = getServicesForAudience("business").map(({ id }) => id);
  assert.deepEqual(individual, ["computer-support", "email-setup", "family-safety", "backup-recovery", "security-consulting"]);
  assert.deepEqual(business, ["email-setup", "web-design", "social-media", "microsoft-365", "google-workspace", "security-consulting"]);
  assert.match(requestForm, /getServicesForAudience\(audience === "Bireysel" \? "individual" : "business"\)/);
  assert.match(requestForm, /onChange=\{handleAudienceChange\}/);
  assert.match(requestForm, /setService\(""\)/);
});

test("request form keeps email-draft messages concise and shows a live character count", () => {
  assert.match(requestForm, /maxLength=\{1800\}/);
  assert.match(requestForm, /setMessageLength\(event\.currentTarget\.value\.length\)/);
  assert.match(requestForm, /aria-live="polite">\{messageLength\}\/1800 karakter/);
});

test("service cards identify their intended audience in Turkish", () => {
  assert.deepEqual(audienceLabels, { individual: "Bireysel", business: "Kurumsal", both: "Her ikisi" });
  assert.match(homepage, /createServiceDiscoveryIndex\(services\)/);
  assert.match(serviceDiscovery, /audienceLabel\(service\.audience\)/);
  assert.match(serviceDiscovery, /className="service-audience"/);
});

test("family safety service makes consent and child controls explicit", () => {
  const familySafety = services.find(({ id }) => id === "family-safety");
  assert.match(familySafety.safetyNotice, /yetişkinlerin açık rızası/);
  assert.match(familySafety.safetyNotice, /ebeveyn denetimi/);
  assert.match(familySafety.safetyNotice, /gizli takip/);
  assert.match(servicePage, /service\.safetyNotice/);
});

test("support promises remain consistent with the approved service brief", () => {
  assert.equal(supportPromise.firstResponseMinutes, 30);
  assert.equal(supportPromise.availability, "24/7");
  assert.equal(supportPromise.requestFlow, "email-draft");
});
