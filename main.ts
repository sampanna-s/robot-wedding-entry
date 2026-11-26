import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const vow =
  "I vow to love you through every firmware update and factory reset; if you reboot forgetting me, I'll marry you again.";

// Mirror the gate: UTF-8 text, 1-160 characters, single line, not only white space.
function assertValidVow(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 160 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidVow(vow);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, vow, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
