import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("mobile service discovery and request form use readable text sizes", () => {
  assert.match(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.service-card p\s*\{[^}]*font-size:\s*14px/s);
  assert.match(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.form-grid label\s*\{[^}]*font-size:\s*13px/s);
  assert.match(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.form-grid input,[\s\S]*?\.form-grid textarea\s*\{[^}]*font-size:\s*16px/s);
  assert.match(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.form-privacy\s*\{[^}]*font-size:\s*12px/s);
});

test("homepage phone and WhatsApp links stay readable and fit narrow screens", () => {
  assert.match(styles, /\.support-links-hero \.support-link\{[^}]*min-width:0[^}]*flex:1 1 180px/);
  assert.match(styles, /\.support-links-hero \.support-link-value\{font-size:14px\}/);
  assert.match(styles, /\.support-links-hero \.support-link-detail\{font-size:12px\}/);
  assert.match(styles, /@media\(max-width:760px\)[\s\S]*?\.support-links-hero \.support-link\{[^}]*flex:1 1 140px/);
});
