import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { audienceLabels, audienceMix, services, supportPromise } from "../lib/site-content.mjs";

const servicePage = await readFile(new URL("../app/hizmetler/[slug]/page.tsx", import.meta.url), "utf8");
const homepage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

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

test("email setup serves both audiences and social media support is explicit", () => {
  assert.equal(services.find(({ id }) => id === "email-setup").audience, "both");
  assert.equal(services.find(({ id }) => id === "social-media").audience, "business");
});

test("service cards identify their intended audience in Turkish", () => {
  assert.deepEqual(audienceLabels, { individual: "Bireysel", business: "Kurumsal", both: "Her ikisi" });
  assert.match(homepage, /audienceLabel\(service\.audience\)/);
  assert.match(homepage, /className="service-audience"/);
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
