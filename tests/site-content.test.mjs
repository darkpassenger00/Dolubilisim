import test from "node:test";
import assert from "node:assert/strict";
import { audienceMix, services, supportPromise } from "../lib/site-content.mjs";

test("homepage audience mix follows the agreed 55/45 balance", () => {
  assert.deepEqual(audienceMix, { individual: 55, business: 45 });
});

test("service catalogue covers consumer, business, cloud and security needs", () => {
  const ids = new Set(services.map(({ id }) => id));
  for (const id of ["computer-support", "family-safety", "web-design", "microsoft-365", "google-workspace", "security-consulting"]) {
    assert.ok(ids.has(id), `missing ${id}`);
  }
  assert.ok(services.some(({ audience }) => audience === "individual"));
  assert.ok(services.some(({ audience }) => audience === "business"));
});

test("support promises remain consistent with the approved service brief", () => {
  assert.equal(supportPromise.firstResponseMinutes, 30);
  assert.equal(supportPromise.availability, "24/7");
  assert.equal(supportPromise.requestFlow, "email-draft");
});
