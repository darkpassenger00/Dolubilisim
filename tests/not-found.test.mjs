import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [page, styles] = await Promise.all([
  readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
]);

test("custom 404 page offers accessible routes back into the site", () => {
  assert.match(page, /title: "Sayfa bulunamadı \| Dolu Bilişim"/);
  assert.match(page, /<main id="main-content" className="not-found-page">/);
  assert.match(page, /<h1 id="not-found-title">/);
  assert.match(page, /aria-labelledby="not-found-title"/);
  assert.match(page, /href="\/"[^>]*>Ana sayfaya dön/);
  assert.match(page, /href="\/#hizmetler"/);
  assert.match(page, /href="\/#iletisim"/);
  assert.match(styles, /\.not-found-page\s*\{/);
  assert.match(styles, /@media\(max-width:760px\)\{\.not-found-content/);
});
