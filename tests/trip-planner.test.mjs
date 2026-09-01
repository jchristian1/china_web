import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

const data = await vite.ssrLoadModule("/lib/trip-data.ts");

test("offers at least five real hotel choices in every destination", () => {
  for (const city of data.cities) {
    const options = data.hotels.filter((hotel) => hotel.city === city.id);
    assert.ok(options.length >= 5, `${city.name} only has ${options.length} hotels`);
    assert.equal(new Set(options.map((hotel) => hotel.id)).size, options.length);
  }
});

test("all selectable records have secure sources and local images", async () => {
  const records = [...data.hotels, ...data.attractions];
  for (const record of records) {
    assert.match(record.bookingUrl, /^https:\/\//, `${record.id} booking URL`);
    assert.match(record.sourceUrl, /^https:\/\//, `${record.id} source URL`);
    assert.ok(record.image.startsWith("/"), `${record.id} image must be local`);
    await access(path.join(root, "public", record.image));
  }
});

test("packages only reference valid shared-data selections", () => {
  const hotelIds = new Set(data.hotels.map((hotel) => hotel.id));
  const attractionIds = new Set(data.attractions.map((item) => item.id));
  const localIds = new Set(data.localPlans.map((item) => item.id));
  const optionIds = new Set(data.transportSegments.flatMap((segment) => segment.options.map((option) => option.id)));

  for (const preset of data.packages) {
    Object.values(preset.hotelIds).forEach((id) => assert.ok(hotelIds.has(id), `${preset.id}: ${id}`));
    Object.values(preset.transportIds).forEach((id) => assert.ok(optionIds.has(id), `${preset.id}: ${id}`));
    Object.values(preset.localIds).forEach((id) => assert.ok(localIds.has(id), `${preset.id}: ${id}`));
    preset.attractionIds.forEach((id) => assert.ok(attractionIds.has(id), `${preset.id}: ${id}`));
  }
});

test("static export contains the Spanish planner and no server is required", async () => {
  const html = await readFile(path.join(root, "dist/client/index.html"), "utf8");
  assert.match(html, /lang="es"/);
  assert.match(html, /China 2026/);
  assert.match(html, /Plan familiar interactivo/);
  assert.match(html, /assets\/page-/);
});
