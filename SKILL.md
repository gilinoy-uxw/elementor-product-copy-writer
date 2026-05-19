---
name: "Elementor UX Writer"
version: "1.0.0"
description: >
  Writes on-brand product copy from scratch for Elementor UI surfaces. Use this skill whenever
  someone needs to generate, create, or draft UX copy, microcopy, button labels, error messages,
  empty states, tooltips, onboarding flows, CTAs, or any user-facing text for Elementor products.
  Triggers on phrases like: "write copy for", "draft this screen", "help me write", "create copy for",
  "what should this say", "suggest copy", "give me options for". Also triggers when a PRD, screenshot,
  wireframe, or feature description is shared and copy is the expected output. Always use this skill
  over generic writing when Elementor product context is present.
author: "Elementor Content Design"
license: "CC-BY-NC-4.0"
entry_point: "prompts/write.txt"
---

# Elementor UX Writer

A skill for generating on-brand, human-centered product copy for Elementor from scratch.
Takes any combination of context — text description, screenshot, PRD, wireframe — and produces
multiple copy options per surface, grounded in Elementor's actual brand guidelines and UX writing principles.
Supports feedback and iteration without losing context.

## What it does

| Capability | Description |
|---|---|
| **Context audit** | Identifies missing information and asks for it before writing |
| **Copy generation** | Produces 3 options per surface: Safe, Brand-Forward, and Concise |
| **Brand alignment** | Applies the real Elementor glossary, voice, tone, and surface-area rules |
| **Image/screenshot input** | Extracts UI context from uploaded designs or wireframes |
| **PRD input** | Reads feature specs and maps them to copy needs |
| **Iteration** | Accepts structured or casual feedback and refines without starting over |

## Surface areas

Applies correct tone standards per context type — identical surface coverage to the Copy Reviewer:
- Error messages, empty states, onboarding, success states
- CTAs, tooltips, destructive actions, navigation labels
- Angie (AI) responses, upgrade/pricing copy, settings

## Input types

- Text description of a screen, component, or flow
- Screenshot or wireframe (uploaded image)
- PRD or feature spec (pasted text or document)
- A mix of any of the above

## Output format

For each surface or element:

1. **Safe** — Clear, functional, directly on-brand
2. **Brand-Forward** — Leans into Elementor's voice and personality
3. **Concise** — Tightest version for constrained layouts
4. **Rationale** — Why these choices work, grounded in user goal and surface type

## Data files

| File | Purpose |
|---|---|
| `data/glossary.json` | Approved and banned Elementor product terms with usage notes |
| `data/writing-guidelines.json` | Voice, tone, grammar, and style rules with examples |
| `data/surface-areas.json` | Tone expectations and rules per UI surface type |
| `prompts/write.txt` | Main writing prompt |
| `prompts/compiled-write.txt` | Flattened single-prompt version for Figma plugin use |

## Figma plugin notes

Designed to power a Figma plugin in the same pattern as the Copy Reviewer plugin.
The plugin should:
- Provide a context input panel (text + optional image/PRD)
- Auto-detect selected Figma frame and surface type where possible
- Present the 3-option output with copy-to-clipboard per option
- Include an inline feedback field for iteration without leaving the plugin

## Scope

- **Single string** — one label, CTA, tooltip
- **Component** — all strings in one UI component
- **Screen** — full copy across one screen or modal
- **Flow** — end-to-end copy across multiple screens, with cross-screen consistency
