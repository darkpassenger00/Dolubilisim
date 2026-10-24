import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [layout, icon] = await Promise.all([
  readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/icon.svg", import.meta.url), "utf8"),
]);

test("metadata serves the Dolu Bilişim branded SVG tab icon", () => {
  assert.match(layout, /icons:\s*\{\s*icon:\s*"\/icon\.svg"/);
  assert.match(icon, /<svg[^>]+viewBox="0 0 48 48"/);
  assert.match(icon, /linearGradient id="spark"/);
  assert.match(icon, /<use href="#mark" fill="url\(#spark\)"/);
});
