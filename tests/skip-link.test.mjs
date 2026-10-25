import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [layout, homepage, service, guide, styles] = await Promise.all([
  readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/hizmetler/[slug]/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/rehber/[slug]/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
]);

test("skip link appears on keyboard focus and targets main content on every page type", () => {
  assert.match(layout, /className="skip-link" href="#main-content">Ana içeriğe geç/);
  for (const page of [homepage, service, guide]) {
    assert.match(page, /<main id="main-content"/);
  }
  assert.match(styles, /\.skip-link\s*\{[^}]*transform:\s*translateY\(/s);
  assert.match(styles, /\.skip-link:focus\s*\{[^}]*transform:\s*translateY\(0\)/s);
});
