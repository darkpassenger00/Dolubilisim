import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const component = await readFile(new URL("../app/mobile-nav.tsx", import.meta.url), "utf8");
const homepage = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("mobile navigation exposes the main sections with an accessible toggle", () => {
  assert.match(component, /aria-expanded=\{isOpen\}/);
  assert.match(component, /aria-controls="mobile-navigation"/);
  assert.match(component, /onKeyDown/);
  assert.match(component, /onClick=\{\(\) => setIsOpen\(false\)\}/);
  assert.match(component, /addEventListener\("pointerdown"/);
  assert.match(component, /wrapperRef\.current\?\.contains\(event\.target as Node\)/);
  for (const section of ["#cozumler", "#bireysel", "#kurumsal", "#hizmetler", "#rehberler", "#sss", "#iletisim"]) {
    assert.ok(component.includes(section), `mobile navigation is missing ${section}`);
  }
  assert.match(homepage, /<MobileNav/);
  assert.match(styles, /\.mobile-nav/);
});
