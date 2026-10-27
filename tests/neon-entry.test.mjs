import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("page entry glow is decorative and cannot block interaction", () => {
  assert.match(layout, /className="neon-entry-glow" aria-hidden="true"/);
  assert.match(styles, /\.neon-entry-glow\s*\{[^}]*position:\s*fixed;[^}]*pointer-events:\s*none;/s);
});

test("neon perimeter cycles slowly and respects reduced-motion settings", () => {
  assert.match(styles, /\.neon-entry-glow::before\s*\{[^}]*animation:\s*neon-entry-spin\s+12s[^;]*infinite/s);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.neon-entry-glow::before\s*\{[^}]*animation:\s*none/s);
});
