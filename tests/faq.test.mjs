import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { faqItems } from "../lib/faq.mjs";

const homepage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("FAQ explains the request, response time, channels and service scope", () => {
  const allText = faqItems.map(({ question, answer }) => `${question} ${answer}`).join(" ");
  for (const phrase of ["e-posta taslağı", "30 dakika", "WhatsApp", "SharePoint", "açık rızası", "danışmanlık"]) {
    assert.ok(allText.includes(phrase), `FAQ is missing ${phrase}`);
  }
  assert.match(homepage, /faqItems\.map/);
  assert.match(homepage, /<details/);
  assert.match(homepage, /<summary/);
});
