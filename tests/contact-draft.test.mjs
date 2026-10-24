import test from "node:test";
import assert from "node:assert/strict";
import { createEmailDraftHref } from "../lib/contact-draft.mjs";

const request = {
  audience: "Bireysel",
  service: "Bilgisayar desteği",
  urgency: "Acil",
  name: "Sinan Örnek",
  email: "sinan@example.com",
  phone: "0555 123 45 67",
  preferredContact: "WhatsApp",
  message: "Bilgisayarım açılmıyor.",
};

test("creates an email draft addressed to the configured contact email", () => {
  const draft = createEmailDraftHref("destek@example.com", request);
  assert.ok(draft.startsWith("mailto:destek@example.com?"));
  assert.match(decodeURIComponent(draft), /Dolu Bilişim destek talebi/);
  assert.match(decodeURIComponent(draft), /Bilgisayarım açılmıyor/);
  assert.match(decodeURIComponent(draft), /Tercih edilen iletişim: WhatsApp/);
});

test("keeps the recipient empty instead of inventing an address", () => {
  const draft = createEmailDraftHref("", request);
  assert.ok(draft.startsWith("mailto:?"));
});

test("encodes visitor-provided content into the body, not mail headers", () => {
  const draft = createEmailDraftHref("destek@example.com", { ...request, name: "Test\nBcc: bad@example.com" });
  assert.ok(draft.includes("%0A"));
  assert.equal(draft.includes("&Bcc="), false);
});
