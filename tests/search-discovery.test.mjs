import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");

test("sitemap exposes the Turkish homepage on the planned canonical domain", () => {
  assert.match(sitemap, /MetadataRoute\.Sitemap/);
  assert.match(sitemap, /https:\/\/dolubilisim\.com/);
  assert.match(sitemap, /url:\s*siteUrl/);
});

test("robots allows public search crawling and links the sitemap", () => {
  assert.match(robots, /MetadataRoute\.Robots/);
  assert.match(robots, /allow:\s*"\/"/);
  assert.match(robots, /const siteUrl = "https:\/\/dolubilisim\.com"/);
  assert.match(robots, /sitemap:\s*`\$\{siteUrl\}\/sitemap\.xml`/);
});
