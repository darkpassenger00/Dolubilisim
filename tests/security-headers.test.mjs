import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");

test("site config applies baseline security headers to every route", () => {
  assert.match(config, /async headers\s*\(/);
  assert.match(config, /source:\s*["']\/:path\*["']/);
  assert.match(config, /X-Content-Type-Options["'],\s*value:\s*["']nosniff["']/);
  assert.match(config, /X-Frame-Options["'],\s*value:\s*["']DENY["']/);
  assert.match(config, /Referrer-Policy["'],\s*value:\s*["']strict-origin-when-cross-origin["']/);
  assert.match(config, /Permissions-Policy["'],\s*value:\s*["']camera=\(\), microphone=\(\), geolocation=\(\)["']/);
});
