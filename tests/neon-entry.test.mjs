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

test("neon border leaves the bottom edge open", () => {
  const border = styles.match(/\.neon-entry-glow::before\s*\{([^}]+)\}/s)?.[1];
  assert.ok(border, "neon border rule must exist");
  const padding = border.match(/(?:^|;)padding:\s*([^;]+)/)?.[1].trim().split(/\s+/);
  assert.ok(padding && padding.length >= 3, "bottom padding must be explicit");
  assert.match(padding[2], /^0(?:px)?$/, "bottom border must have zero thickness");
});
