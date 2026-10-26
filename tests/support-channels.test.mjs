import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getSupportChannels } from "../lib/support-channels.mjs";

const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const exampleEnv = await readFile(new URL("../.env.example", import.meta.url), "utf8");

test("support links stay hidden until the owner configures verified contact numbers", () => {
  assert.deepEqual(getSupportChannels({}), []);
  assert.match(home, /<SupportLinks variant="hero"\s*\/>/);
  assert.match(exampleEnv, /NEXT_PUBLIC_SUPPORT_PHONE=/);
  assert.match(exampleEnv, /NEXT_PUBLIC_WHATSAPP_NUMBER=/);
});

test("configured phone and WhatsApp links use validated numbers", () => {
  const links = getSupportChannels({ phone: "+90 (532) 123-45-67", whatsapp: "+90 532 123 45 67" });
  assert.equal(links.find((link) => link.kind === "phone")?.href, "tel:+905321234567");
  assert.equal(links.find((link) => link.kind === "whatsapp")?.href, "https://wa.me/905321234567");
  assert.deepEqual(getSupportChannels({ phone: "javascript:alert(1)", whatsapp: "abc" }), []);
});
