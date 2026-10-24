import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

test("site metadata provides Turkish social previews on the planned domain", () => {
  assert.match(layout, /metadataBase:\s*new URL\("https:\/\/dolubilisim\.com"\)/);
  assert.match(layout, /openGraph:\s*\{[\s\S]*?locale:\s*"tr_TR"[\s\S]*?siteName:\s*"Dolu Bilişim"[\s\S]*?type:\s*"website"/);
  assert.match(layout, /twitter:\s*\{[\s\S]*?card:\s*"summary"[\s\S]*?title:[\s\S]*?description:/);
});
