import { statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const MAX_BYTES = 25 * 1024 * 1024;

export const findOversized = (files) =>
  files
    .map((file) => ({ file, size: statSync(file).size }))
    .filter(({ size }) => size > MAX_BYTES);

const format = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
  const oversized = findOversized(files);

  if (oversized.length > 0) {
    console.error(`Ukuran berkas maksimal ${format(MAX_BYTES)}. Berkas berikut melebihi batas:`);
    for (const { file, size } of oversized) console.error(`- ${file} (${format(size)})`);
    process.exit(1);
  }

  console.log(`${files.length} berkas diperiksa, semua tidak melebihi ${format(MAX_BYTES)}.`);
}
