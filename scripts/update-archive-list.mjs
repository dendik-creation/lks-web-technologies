import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const README = "README.md";
const START = "<!-- daftar-arsip:start -->";
const END = "<!-- daftar-arsip:end -->";
const JENJANG = ["kabupaten", "provinsi", "nasional", "wordskills"];

const readme = readFileSync(README, "utf8");
const start = readme.indexOf(START);
const end = readme.indexOf(END);

if (start === -1 || end === -1 || end < start) {
  throw new Error(`Penanda ${START} dan ${END} tidak ditemukan di ${README}`);
}

const dirs = (path) =>
  readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

const label = (name) =>
  name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const years = dirs(".")
  .filter((name) => /^\d{4}$/.test(name))
  .sort((a, b) => a.localeCompare(b))
  .map((year) => ({
    year,
    jenjang: JENJANG.filter((name) => dirs(year).includes(name))
      .map((jenjang) => ({ jenjang, lokasi: dirs(join(year, jenjang)).sort() }))
      .filter(({ lokasi }) => lokasi.length > 0),
  }))
  .filter(({ jenjang }) => jenjang.length > 0);

const rows = years.flatMap(({ year, jenjang }) => {
  const total = jenjang.reduce((sum, item) => sum + item.lokasi.length, 0);
  let firstRow = true;

  return jenjang.flatMap(({ jenjang: name, lokasi }) =>
    lokasi.map((place, index) => {
      const cells = [];

      if (firstRow) {
        const rowspan = total > 1 ? ` rowspan="${total}"` : "";
        cells.push(`      <td align="center"${rowspan}>${escape(year)}</td>`);
        firstRow = false;
      }

      if (index === 0) {
        const rowspan = lokasi.length > 1 ? ` rowspan="${lokasi.length}"` : "";
        cells.push(`      <td${rowspan}>${escape(label(name))}</td>`);
      }

      const href = `${year}/${name}/${place}/`;
      cells.push(`      <td><a href="${escape(href)}">${escape(label(place))}</a></td>`);

      return `    <tr>\n${cells.join("\n")}\n    </tr>`;
    }),
  );
});

const table = [
  START,
  "<table>",
  "  <thead>",
  "    <tr>",
  "      <th>Tahun</th>",
  "      <th>Jenjang</th>",
  "      <th>Lokasi</th>",
  "    </tr>",
  "  </thead>",
  "  <tbody>",
  ...rows,
  "  </tbody>",
  "</table>",
  END,
].join("\n");

const updated = readme.slice(0, start) + table + readme.slice(end + END.length);

if (updated !== readme) {
  writeFileSync(README, updated);
  console.log("Daftar arsip diperbarui.");
} else {
  console.log("Daftar arsip tidak berubah.");
}
