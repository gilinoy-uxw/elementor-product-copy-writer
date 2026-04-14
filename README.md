# 🖊️ Elementor Product Copy Writer Skill

An AI-powered product copy writer built for [Elementor](https://elementor.com).
This skill generates on-brand copy for any Elementor UI surface — grounded in the official brand glossary and voice & tone guidelines, with a built-in reviewer pass on every output.

Compatible with **Claude Desktop**, **Cursor**, **Codex (CLI/IDE)**, and **Claude Code**.

---

## ✨ What It Does

The Elementor Copy Writer helps writers, designers, and product teams produce copy from scratch or rewrite existing drafts — always aligned to Elementor's terminology and voice standards.

It:
- Accepts a brief, UI surface, existing draft, or screenshot as input
- Identifies copy type, surface, pillar, and audience
- Generates three distinct on-brand options
- Recommends the best pick with clear rationale
- Automatically reviews the recommended option against the glossary and writing rules
- Returns structured JSON ready for integration or handoff

---

## 🧩 Folder Structure

```
elementor-product-copy-writer/
├── SKILL.md              # Metadata and instructions for Claude
├── prompts/
│   └── write.txt         # Main generation + review prompt
└── README.md             # You're here ✅

# Shared data (from the reviewer skill — no duplication needed):
elementor-copy-reviewer/
└── data/
    ├── glossary.json
    └── writing-guidelines.json
```

---

## 🧠 How It Works

1. The skill loads the shared glossary and writing guidelines.
2. When a user provides a brief, surface, draft, or screenshot:
   - Identifies copy type, pillar, and audience
   - Generates three distinct on-brand options
   - Recommends the best one with rationale
   - Runs the reviewer on the recommended pick
3. Returns structured JSON:

```json
{
  "copy_type": "Error message",
  "surface": "Plugin installation failure",
  "options": [
    { "id": "A", "copy": "The plugin couldn't be installed. Check your connection and try again.", "notes": "Instructive, action-oriented" },
    { "id": "B", "copy": "Installation failed. Verify your connection, then try again.", "notes": "Direct, minimal" },
    { "id": "C", "copy": "Something went wrong during installation. Check your connection and retry.", "notes": "Reassuring, slightly warmer" }
  ],
  "recommended": "A",
  "rationale": "Option A names the issue clearly, uses active voice, and ends with a concrete next step — aligned with tone-03 (reassuring) and style-01 (active voice).",
  "review": {
    "issues": [],
    "improved_text": "The plugin couldn't be installed. Check your connection and try again."
  }
}
```

---

## 🚀 Getting Started

### 💻 Use in Claude Desktop

1. Zip the folder
2. Upload via **Settings → Skills → Upload skill**

### 🧠 Use in Cursor

1. Open **Settings → Rules, Skills, Subagents**
2. Click **New Skill** and paste the SKILL.md content
3. Add the shared `/data` folder reference

### ⚙️ Use in Codex

```bash
~/.codex/skills/elementor-product-copy-writer/
```

---

## 💬 Example Prompts

```
Write copy for an empty state when a user has no sites yet.
```

```
Rewrite this error message for Elementor style: "Error: Could not connect to server."
```

```
Generate tooltip copy explaining what Test mode does in Angie.
```

---

## 🛠️ Customization

- **Glossary updates** → edit `elementor-copy-reviewer/data/glossary.json`
- **Voice & tone updates** → edit `elementor-copy-reviewer/data/writing-guidelines.json`
- **Prompt logic** → edit `prompts/write.txt`

---

## 🪪 License

Creative Commons Attribution-NonCommercial 4.0 International
© Elementor Ltd., 2024

---

## 👩‍💻 Contributors

**Elementor Content Design Team**
Built with care for creators everywhere.
