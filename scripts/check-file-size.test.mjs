import { test } from "node:test";
import assert from "node:assert/strict";
import { closeSync, mkdtempSync, openSync, rmSync, truncateSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { MAX_BYTES, findOversized } from "./check-file-size.mjs";

const withDir = (fn) => {
  const dir = mkdtempSync(join(tmpdir(), "cek-ukuran-"));
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
};

const withSize = (dir, name, size) => {
  const file = join(dir, name);
  closeSync(openSync(file, "w"));
  truncateSync(file, size);
  return file;
};

test("berkas lebih kecil dari 25 MB diterima", () => {
  withDir((dir) => {
    const file = withSize(dir, "kecil.pdf", 1024);
    assert.deepEqual(findOversized([file]), []);
  });
});

test("berkas tepat 25 MB diterima", () => {
  withDir((dir) => {
    const file = withSize(dir, "pas.pdf", MAX_BYTES);
    assert.deepEqual(findOversized([file]), []);
  });
});

test("berkas 25 MB + 1 byte ditolak", () => {
  withDir((dir) => {
    const file = withSize(dir, "besar.pdf", MAX_BYTES + 1);
    assert.deepEqual(findOversized([file]), [{ file, size: MAX_BYTES + 1 }]);
  });
});

test("hanya berkas melebihi batas yang dilaporkan", () => {
  withDir((dir) => {
    const ok = join(dir, "ok.pdf");
    writeFileSync(ok, "ok");
    const besar = withSize(dir, "besar.rar", MAX_BYTES + 1);
    assert.deepEqual(findOversized([ok, besar]), [{ file: besar, size: MAX_BYTES + 1 }]);
  });
});
