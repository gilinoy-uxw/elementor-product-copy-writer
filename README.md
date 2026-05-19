# 🪶 Elementor UX Writer Skill

An AI-powered UX copy generator built for [Elementor](https://elementor.com).  
This skill writes product copy from scratch, grounded in Elementor's **brand glossary**, **voice & tone guidelines**, and **surface-area standards**. It gathers context, generates multiple copy options, and iterates on feedback — without losing brand alignment.

The companion to the [Elementor Copy Reviewer](https://github.com/gilinoy-uxw/elementor-product-copy-reviewer). Reviewer checks. Writer creates.

Compatible with **Claude Desktop**, **Cursor**, **Codex (CLI/IDE)**, and the **Elementor UX Writer Figma plugin**.

---

## ✨ What It Does

The Elementor UX Writer helps writers, designers, and product teams generate on-brand copy for any UI surface.

It:

- Audits context before writing — asks for missing info when needed
- Writes three distinct options per surface: Safe, Brand-Forward, and Concise
- Applies the real Elementor glossary (flags and substitutes banned terms)
- Calibrates tone per surface type and audience
- Accepts feedback and iterates without losing context

---

## 🧩 Folder Structure

```
elementor-ux-writer/
├── SKILL.md                     # Metadata for Claude and Cursor
├── prompts/
│   ├── write.txt                # Main writing prompt (modular, references data files)
│   └── compiled-write.txt       # Flattened single-prompt for Figma plugin use
├── data/
│   ├── glossary.json            # Approved/banned terms and usage notes
│   ├── writing-guidelines.json  # Voice, tone, grammar, and style rules
│   └── surface-areas.json       # Tone expectations per UI surface type
└── README.md                    # You're here ✅
```

---

## 🧠 How It Works

1. The skill loads the glossary, writing guidelines, and surface-area standards as reference.
2. When a user provides a description, screenshot, or PRD:
   - It checks for missing context (surface type, audience, constraints)
   - Asks targeted questions if anything critical is missing
   - Writes three options per surface element
3. When feedback is provided:
   - It anchors to the strongest option
   - Produces a refined round with the same structure
   - Notes what changed and why

### Output example

**Empty state: no templates yet**

**Option 1 — Safe**
> Heading: Your templates are waiting to be built
> Body: Save any page as a template and reuse it across your site.
> CTA: Create your first template

**Option 2 — Brand-Forward**
> Heading: Build once, reuse everywhere
> Body: Turn any design into a template and pull it into any page — no rebuilding from scratch.
> CTA: Create a template

**Option 3 — Concise**
> Heading: No templates yet
> CTA: Create your first template

**Rationale**
- Options 1 and 2 reframe the empty state as an invitation and emphasize the reuse benefit, which is the core value of templates.
- Option 3 is tighter for constrained layouts where the body copy would be truncated.
- No glossary flags — "template" and "site" are both approved terms.

---

## 🚀 Getting Started

### 💻 In Claude Desktop

1. Zip the folder
2. Upload via **Settings → Skills → Upload skill**

Then prompt:

```
Write copy for an empty state when a user has no published templates yet.
Target audience: first-time users. CTA area only, 40 characters max.
```

Or:

```
[attach screenshot] Write copy for this screen.
```

### 🧠 In Cursor

1. In Cursor, open **Settings → Rules, Skills, Subagents**
2. Click **New Skill** and paste:
   ```
   Elementor UX Writer skill:
   Write product copy from scratch for any Elementor UI surface. Takes text descriptions, screenshots, or PRDs, asks for missing context, and returns three on-brand options (Safe, Brand-Forward, Concise) per surface element. Applies Elementor's glossary (data/glossary.json), writing guidelines (data/writing-guidelines.json), and surface-area tone standards (data/surface-areas.json).
   ```
3. Add the `/data` folder with all three JSON files.
4. Save — Cursor will create the skill automatically.

### 🎨 In the Figma Plugin

The plugin handles context packaging automatically. It sends `compiled-write.txt` directly to the Claude API, with your context appended. Outputs appear as three labeled copy options per surface, each with a copy-to-clipboard action.

---

## 💬 Example Prompts

**From description:**
```
Write copy for the confirmation modal when a user deletes a site.
The deletion is permanent. Primary audience: agency owners managing client sites.
```

**From screenshot:**
```
[attach wireframe] Write copy for the onboarding step where a user names their site.
This is step 2 of 5. The user just picked a template.
```

**From PRD:**
```
[paste PRD section] Write copy for the Angie empty state when no requests have been made yet.
Character limit: 80 chars for body, 30 for CTA.
```

**Iteration:**
```
Option 2 feels right but the CTA is too long. Can you tighten all three?
```

---

## 🛠️ Customization

- **Update `data/glossary.json`** to add new approved terms or update existing ones.
- **Update `data/writing-guidelines.json`** to add or revise voice, tone, or grammar rules.
- **Update `data/surface-areas.json`** to add tone standards for new surface types.
- **Edit `prompts/write.txt`** to change the writing logic or output format.
- **Rebuild `prompts/compiled-write.txt`** after updating any of the above, to keep the Figma plugin in sync.

---

## 🔗 Related

- [Elementor Copy Reviewer](https://github.com/gilinoy-uxw/elementor-product-copy-reviewer) — the companion skill for reviewing existing copy

---

## 🪪 License

Creative Commons Attribution-NonCommercial 4.0 International  
© Elementor Ltd., 2024

---

## 👩‍💻 Contributors

**Elementor Content Design Team**  
Built with care for creators everywhere.
