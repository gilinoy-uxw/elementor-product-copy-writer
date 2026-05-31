#!/usr/bin/env node
/**
 * build-compiled.js
 * Compiles prompts/write.txt + data/*.json into prompts/compiled-write.txt
 * for use by the Figma plugin (which cannot load external files at runtime).
 *
 * Usage:    node build-compiled.js
 * Auto-run: .git/hooks/pre-commit (see README)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (...parts) => path.join(__dirname, ...parts);

// ─── Load source files ────────────────────────────────────────────────────────

const write      = fs.readFileSync(resolve('prompts/write.txt'), 'utf8');
const glossary   = JSON.parse(fs.readFileSync(resolve('data/glossary.json'), 'utf8'));
const guidelines = JSON.parse(fs.readFileSync(resolve('data/writing-guidelines.json'), 'utf8'));
const surfaces   = JSON.parse(fs.readFileSync(resolve('data/surface-areas.json'), 'utf8'));

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatGlossary(data) {
  return data.map(entry => {
    const lines = [`- "${entry.term}"`];
    if (entry.avoid?.length)           lines.push(`  ✗ Avoid: ${entry.avoid.join(', ')}`);
    if (entry.definition)              lines.push(`  Definition: ${entry.definition}`);
    const notes = entry.usage?.notes;
    if (notes?.length)                 lines.push(`  Note: ${notes.join(' ')}`);
    const ex = entry.usage?.examples;
    if (ex?.correct)                   lines.push(`  ✓ e.g. "${ex.correct}"`);
    return lines.join('\n');
  }).join('\n');
}

function formatGuidelines(data) {
  // Group rules by category for readability
  const categories = {};
  for (const rule of data.rules) {
    if (!categories[rule.category]) categories[rule.category] = [];
    categories[rule.category].push(rule);
  }

  return Object.entries(categories).map(([category, rules]) => {
    const heading = `### ${category.replace(/_/g, ' ')}`;
    const ruleLines = rules.map(rule => {
      const lines = [`- ${rule.rule}`];
      if (rule.rationale)        lines.push(`   Why: ${rule.rationale}`);
      if (rule.example?.good)    lines.push(`   ✓ ${rule.example.good}`);
      if (rule.example?.bad)     lines.push(`   ✗ ${rule.example.bad}`);
      // naming rules have a name_map instead of example
      if (rule.name_map) {
        const mappings = Object.entries(rule.name_map)
          .map(([old, current]) => `"${old}" → "${current}"`)
          .join(', ');
        lines.push(`   Renamed: ${mappings}`);
      }
      return lines.join('\n');
    }).join('\n');

    return `${heading}\n${ruleLines}`;
  }).join('\n\n');
}

function formatSurfaces(data) {
  return data.surface_areas.map(s => {
    const lines = [`### ${s.name} [tone: ${s.tone}]`];
    for (const rule of s.rules) lines.push(`  - ${rule}`);
    if (s.examples?.correct) lines.push(`  ✓ ${s.examples.correct}`);
    if (s.examples?.avoid)   lines.push(`  ✗ ${s.examples.avoid}`);
    return lines.join('\n');
  }).join('\n\n');
}

// ─── Inject into write.txt via section markers ────────────────────────────────

const SECTIONS = {
  GLOSSARY:   formatGlossary(glossary),
  GUIDELINES: formatGuidelines(guidelines),
  SURFACES:   formatSurfaces(surfaces),
};

// Build the compiled body by appending each data section after the DATA SOURCES block
let compiled = write;

// Replace the DATA SOURCES section with the full inline content
const dataSourcesPattern = /(## DATA SOURCES[\s\S]*?)(---)/;
const inlinedDataSources = `## DATA SOURCES

The following content is compiled inline from the source data files.
To update, edit the relevant file in \`data/\` and run \`node build-compiled.js\`.

---

## ELEMENTOR PRODUCT GLOSSARY

${SECTIONS.GLOSSARY}

---

## VOICE & TONE RULES

${SECTIONS.GUIDELINES}

---

## SURFACE-AREA TONE STANDARDS

${SECTIONS.SURFACES}

---`;

compiled = compiled.replace(dataSourcesPattern, inlinedDataSources + '\n\n$2');

// ─── Write output ─────────────────────────────────────────────────────────────

const header = `<!-- COMPILED — do not edit directly.
     Source: prompts/write.txt + data/*.json
     Rebuild: node build-compiled.js
     Last compiled: ${new Date().toISOString().split('T')[0]} -->

`;

const outputPath = resolve('prompts/compiled-write.txt');
fs.writeFileSync(outputPath, header + compiled, 'utf8');

console.log(`✓ compiled-write.txt rebuilt (${(header + compiled).length} chars)`);
