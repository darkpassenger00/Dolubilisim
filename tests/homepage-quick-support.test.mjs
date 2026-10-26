import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { supportPromise } from "../lib/site-content.mjs";

const homepage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("homepage makes 24/7 support and a fast email-draft request visible in the hero", () => {
  assert.match(homepage, /Bireysel ve kurumsal destek[\s\S]*?7\/24/);
  assert.match(homepage, /href="#iletisim"[^>]*>[\s\S]*?Hızlı destek talebi aç/);
  assert.match(homepage, /Talebiniz e-posta taslağı olarak açılır; göndermeyi siz onaylarsınız/);
  assert.equal(supportPromise.availability, "24/7");
  assert.equal(supportPromise.requestFlow, "email-draft");
});

test("homepage offers direct shortcuts to the main service groups", () => {
  assert.match(homepage, /aria-label="Hizmet alanlarına hızlı erişim"/);
  for (const label of ["Kişisel teknoloji", "E-posta ve bulut", "Web ve sosyal medya", "Güvenlik danışmanlığı"]) {
    assert.ok(homepage.includes(label), `missing homepage shortcut for ${label}`);
  }
  assert.match(homepage, /className="service-shortcut-grid"/);
  assert.match(styles, /\.service-shortcut-grid\{[^}]*grid-template-columns:repeat\(4/);
  assert.match(styles, /@media\(max-width:760px\)[\s\S]*?\.service-shortcut-grid\{[^}]*grid-template-columns:repeat\(2/);
});
