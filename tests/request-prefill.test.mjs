import test from "node:test";
import assert from "node:assert/strict";
import { services } from "../lib/site-content.mjs";
import { getServiceRequestPrefill } from "../lib/request-prefill.mjs";
import { readFile } from "node:fs/promises";

const requestForm = await readFile(new URL("../app/request-form.tsx", import.meta.url), "utf8");
const servicePage = await readFile(new URL("../app/hizmetler/[slug]/page.tsx", import.meta.url), "utf8");
const contentGuide = await readFile(new URL("../docs/content-management.md", import.meta.url), "utf8");

test("service request prefill chooses a compatible audience and exact service", () => {
  assert.deepEqual(getServiceRequestPrefill("microsoft-365", services), { audience: "Kurumsal", service: "Microsoft 365 ve SharePoint" });
  assert.deepEqual(getServiceRequestPrefill("computer-support", services), { audience: "Bireysel", service: "Bilgisayar desteği" });
  assert.deepEqual(getServiceRequestPrefill("email-setup", services), { audience: "Bireysel", service: "E-posta kurulumu ve taşıma" });
  assert.equal(getServiceRequestPrefill("not-a-service", services), null);
  assert.equal(getServiceRequestPrefill("", services), null);
});

test("service detail CTAs pass the current service into the request form", () => {
  assert.match(servicePage, /href=\{`\/?\?hizmet=\$\{service\.id\}#iletisim`\}/);
  assert.match(requestForm, /getServiceRequestPrefill\(new URLSearchParams\(window\.location\.search\)\.get\("hizmet"\), services\)/);
  assert.match(requestForm, /setService\(prefill\.service\)/);
});

test("content guide documents the stable service-to-request URL and manual email send", () => {
  assert.match(contentGuide, /\/?\?hizmet=<hizmet-id>#iletisim/);
  assert.match(contentGuide, /form e-posta taslağı oluşturur, mesajı kendiliğinden göndermez/);
});
