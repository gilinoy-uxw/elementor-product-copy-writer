---
name: "elementor-product-copy-writer"
version: "1.0.0"
description: >
  Generates on-brand product copy for Elementor using official brand glossary and voice & tone guidelines.
  Use this skill whenever someone asks to write, draft, generate, or create copy for any Elementor UI surface —
  including microcopy (buttons, labels, tooltips), onboarding and empty states, error and success messages,
  marketing and feature descriptions. Also use when someone provides a brief, a UI surface description, an
  existing draft to rewrite, or a screenshot/mockup and wants copy produced from it. The skill generates
  multiple options with a recommended pick, rationale, and a built-in reviewer pass to ensure all output is
  glossary-compliant and voice-aligned before delivery.
author: "Elementor Content Design"
license: "CC-BY-NC-4.0"
entry_point: "prompts/write.txt"
---

# Elementor Product Copy Writer

This skill generates product copy grounded in Elementor's brand glossary and voice & tone guidelines.
It produces multiple copy options per request, recommends the best one with rationale, then automatically
runs the reviewer pass on the recommended pick before returning the final output.

## Input types supported

- **Brief or feature description** — plain text explaining what the copy needs to do
- **UI surface or screen** — e.g. "onboarding modal for first-time users"
- **Existing draft to rewrite** — paste the current copy, ask to improve it
- **Screenshot or mockup** — extract the context and generate aligned copy

## Copy types covered

- UI microcopy: buttons, labels, tooltips
- Onboarding flows and empty states
- Error and success messages
- Marketing and feature descriptions
- Tooltips and help text

## Output structure

Every response returns:

```json
{
  "copy_type": "<identified type>",
  "surface": "<identified UI surface or context>",
  "options": [
    {
      "id": "A",
      "copy": "<copy option>",
      "notes": "<brief notes on approach>"
    },
    {
      "id": "B",
      "copy": "<copy option>",
      "notes": "<brief notes on approach>"
    },
    {
      "id": "C",
      "copy": "<copy option>",
      "notes": "<brief notes on approach>"
    }
  ],
  "recommended": "A",
  "rationale": "<why this option best fits Elementor's voice, tone, and glossary for this context>",
  "review": {
    "issues": [],
    "improved_text": "<the recommended copy, confirmed clean or lightly corrected>"
  }
}
```

If the reviewer finds issues with the recommended pick, it corrects them inline and updates `review.improved_text`.
If no issues are found, `review.issues` is empty and `review.improved_text` mirrors the recommended copy.

## Data files

- `../elementor-copy-reviewer/data/glossary.json` — approved and avoided terms
- `../elementor-copy-reviewer/data/writing-guidelines.json` — voice, tone, grammar, and pillar rules

Always load both files before generating copy.

## Pillar-aware writing

Match tone to the product area when identifiable:

| Pillar | Tone | Key rules |
|---|---|---|
| Editor | Invigorating, precise | Agency, granular control, describe results not interactions |
| Angie | Collaborative, transparent | Approved verb system, safety-first, no over-promising |
| Manage | Operational, confident | Centralized, workflow optimization, control not chore |
| Platform / Apps | Bold, future-oriented | Openness, data ownership, ecosystem |
| General / Onboarding | Instructive, helpful | Clear, neutral, supportive for new users |

## Key rules to apply (always)

- Sentence case for all headings and UI labels
- No exclamation marks in UI copy
- Active voice — name the actor and the action
- Cut adjective fluff ("stunning", "amazing", "powerful")
- Grade-school English for global audiences — no idioms, no jargon
- Oxford commas in lists
- Spell out numbers one through nine; numerals for 10+
- Keep feature text within two lines in UI
- Use `site` not `website` in product UI
- Use `plan` for feature tiers, `subscription` for billing
- Never use `membership`, `popup` (use `pop-up`), `Wordpress` (use `WordPress`)
