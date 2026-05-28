#!/usr/bin/env node
/**
 * compile.js
 * Generates prompts/compiled-write.txt by taking prompts/write.txt
 * and replacing the DATA SOURCES section with the full inlined glossary
 * from data/glossary.json.
 *
 * Run from the skill root:
 *   node compile.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const WRITE_TXT = path.join(ROOT, "prompts", "write.txt");
const GLOSSARY_JSON = path.join(ROOT, "data", "glossary.json");
const OUTPUT = path.join(ROOT, "prompts", "compiled-write.txt");

// ── 1. Load source files ───────────────────────────────────────────────────

const writePrompt = fs.readFileSync(WRITE_TXT, "utf8");
const glossary = JSON.parse(fs.readFileSync(GLOSSARY_JSON, "utf8"));

// ── 2. Build the inlined glossary block ───────────────────────────────────

function buildGlossaryBlock(terms) {
  const lines = ["## ELEMENTOR PRODUCT GLOSSARY", ""];

  for (const entry of terms) {
    const approved = entry.approved?.length
      ? `"${entry.approved.join(" / ")}"`
      : `"${entry.term}"`;

    lines.push(`- ${approved}`);

    if (entry.avoid?.length) {
      lines.push(`  ✗ Avoid: ${entry.avoid.map((a) => `"${a}"`).join(", ")}`);
    }

    if (entry.definition) {
      lines.push(`  Definition: ${entry.definition}`);
    }

    const notes = entry.usage?.notes;
    if (notes?.length) {
      // Surface the most important note only (first non-banned note, or first note)
      const note = notes.find((n) => !n.startsWith("BANNED")) || notes[0];
      lines.push(`  Note: ${note}`);
    }

    const correct = entry.usage?.examples?.correct;
    if (correct) {
      const example = Array.isArray(correct) ? correct[0] : correct;
      lines.push(`  ✓ e.g. "${example}"`);
    }
  }

  lines.push(
    "",
    '**Glossary rule:** If the user\'s brief or any provided copy contains a banned term, flag it and use the approved term in all output. Never reproduce banned terms in suggestions.'
  );

  return lines.join("\n");
}

// ── 3. Replace the DATA SOURCES section in write.txt ──────────────────────
// Everything between the DATA SOURCES header and the next --- divider
// is replaced with the inlined glossary block.

const DATA_SOURCES_RE =
  /## DATA SOURCES\n[\s\S]*?(?=\n---\n)/;

const glossaryBlock = buildGlossaryBlock(glossary);

if (!DATA_SOURCES_RE.test(writePrompt)) {
  console.error(
    "ERROR: Could not find '## DATA SOURCES' section in write.txt.\n" +
      "Make sure write.txt contains a '## DATA SOURCES' section followed by a '---' divider."
  );
  process.exit(1);
}

const compiled = writePrompt.replace(DATA_SOURCES_RE, glossaryBlock);

// ── 4. Write output ────────────────────────────────────────────────────────

fs.writeFileSync(OUTPUT, compiled, "utf8");
console.log(`✓ compiled-write.txt updated (${compiled.length} chars)`);
console.log(`  ${glossary.length} glossary terms inlined from glossary.json`);
