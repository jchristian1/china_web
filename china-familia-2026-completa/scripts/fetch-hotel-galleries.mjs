import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { promisify } from "node:util";
import { hotels } from "../lib/trip-data.ts";

const exec = promisify(execFile);
const pending = hotels.filter((hotel) => (hotel.images?.length ?? 0) < 2 && /trip\.com|booking\.com/.test(hotel.photoSource));

async function curl(url) {
  const { stdout } = await exec("curl", ["-L", "--fail", "--silent", "--show-error", url], { maxBuffer: 20_000_000, timeout: 30_000 });
  return stdout;
}

async function processHotel(hotel) {
  try {
    const html = await curl(hotel.photoSource);
    const patterns = hotel.photoSource.includes("trip.com")
      ? [/https:\/\/ak-d\.tripcdn\.com\/images\/[^"' <&]+/g, /https:\/\/[^"' <&]+tripcdn[^"' <&]+\.(?:jpg|jpeg|webp)/g]
      : [/https:\/\/cf\.bstatic\.com\/xdata\/images\/hotel\/[^"' <&]+/g];
    const urls = Array.from(new Set(patterns.flatMap((pattern) => html.match(pattern) ?? []))).filter((url) => !/logo|icon|avatar/i.test(url)).slice(0, 8);
    const targets = [`public/hotels/${hotel.id}-2.jpg`, `public/hotels/${hotel.id}-3.jpg`];
    let saved = 0;
    for (const [index, target] of targets.entries()) {
      if (existsSync(target)) { saved += 1; continue; }
      const url = urls[index + 1] ?? urls[index];
      if (!url) continue;
      await exec("curl", ["-L", "--fail", "--silent", "--show-error", url, "-o", target], { timeout: 30_000 });
      saved += 1;
    }
    return saved === 2 ? hotel.id : null;
  } catch { return null; }
}

const results = [];
for (let index = 0; index < pending.length; index += 8) {
  results.push(...await Promise.all(pending.slice(index, index + 8).map(processHotel)));
}
console.log(results.filter(Boolean).join("\n"));
