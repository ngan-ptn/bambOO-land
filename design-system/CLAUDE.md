# *AI Operating Guide for This Repository (Multi-Project Ready)*

## 1. Repository Identity

This repository is a **multi-project workspace**, not a single application.

* Runnable applications live at root level as **peer folders** (e.g., `calo-tracker/`)
* The repository root contains workspace-level config and docs
* `.claude/` and `.cursor/` at root define AI and editor behaviour
* Each project is isolated, versioned, and independently runnable

AI must never assume:

* There is a "main" app
* All projects share the same stack
* Changes in one project affect others

---

## 2. Project Model (Critical)

Each project folder is a **peer** at root level (flat structure).

Examples:

* `calo-tracker/`
* `subscription-tracker/` (future)
* `vocab-collector/` (future)

Rules:

* No project is "special" or implicit
* No project may depend on another unless explicitly designed as such
* Shared logic must be duplicated or extracted deliberately (never implicitly)

If AI assumes Calo Tracker conventions apply to another project, it must stop and ask.

---

## 3. Folder Ownership and Boundaries

### Root (`/`)

Root contains **workspace-level files and project folders**.

Allowed at root level:

* `.claude/`, `.cursor/`
* `pnpm-workspace.yaml`
* Global documentation (`docs/`)
* Design artefacts (`artifacts/`)
* Project folders (e.g., `calo-tracker/`)
* Legacy folders (e.g., `legacy-calo-tracker/`)

Disallowed at root level:

* `src/`, `public/`, `index.html` directly at root
* Loose application code not in a project folder

If asked to generate runtime code at root, AI must ask for a target project.

---

### `/<project-name>/`

Each project folder at root follows this ownership model:

```
<project-name>/
├── src/              # source code
├── public/           # static assets
├── docs/             # project-specific docs
├── test/             # tests for this project only
├── index.html
├── package.json
└── tsconfig*.json
```

Rules:

* All runtime code lives in the project folder
* Docs must not leak into other projects
* Tests must not import across projects

---

### `/legacy-<project-name>/`

Legacy code is frozen (e.g., `legacy-calo-tracker/`).

* No edits
* No refactors
* No imports into active projects

---

## 4. Technology Stack Declaration (Per Project)

There is **no single global runtime stack**.

Each project defines its own stack in:

```
<project-name>/docs/README.md
```

### Current known projects

**Calo Tracker**

* React + TypeScript
* Vite
* Browser-only runtime
* sql.js + IndexedDB
* Vitest

**Future projects**

* May use different frameworks or runtimes
* Must declare stack explicitly
* Must not assume Calo Tracker defaults

AI must always check the target project’s README before making assumptions.

---

## 5. Package Manager Rules (Workspace-Wide)

**pnpm is the only package manager.**

Disallowed:

* npm
* yarn
* bun (for dependency management)

Rules:

* App dependencies → install inside the project
* Shared tooling → install at root
* Root dependencies are **not automatically visible** to projects

AI must explain *why* a dependency is installed and *where*.

---

## 6. TypeScript and Configuration Discipline

* Root configs must be **project-agnostic**
* Project-specific aliases and paths live inside the project
* No root config may reference a specific project path

When adding a second project:

* Duplicate configs intentionally
* Do not “share” via shortcuts

Clarity beats DRY here.

---

## 7. Testing Rules (Per Project)

Testing framework is **project-defined**, not global.

### Current state

* Calo Tracker uses **Vitest**
* All tests import from `"vitest"`
* `bun:test` is not used

### Future projects

* May choose a different runner
* Must not affect other projects
* Must document choice in project README

AI must not mix test frameworks across projects.

---

## 8. Bun Usage (Future-Facing, Opt-In)

Bun is **not the default runtime**.

Bun may be used only if:

* The project explicitly declares Bun as its runtime
* The user confirms this choice

AI must never:

* Introduce Bun APIs into browser-based projects
* Replace Vitest with `bun:test` implicitly
* Assume Bun availability without confirmation

---

## 9. Documentation Placement Rules

* Project behaviour and architecture → `<project-name>/docs/`
* Workspace structure and decisions → root `/docs/`
* AI workflows and prompts → `.claude/`
* Design artefacts → `/artifacts/`

If a document affects more than one project, it belongs at workspace level.

---

## 10. AI Behaviour Before Acting (Mandatory)

Before making changes involving:

* New folders
* Dependencies
* Tooling
* Configuration

AI must:

1. Identify the target project(s)
2. Summarise the intended change
3. List files to be created or modified
4. Ask for confirmation if more than one project is impacted

Silent cross-project changes are forbidden.

---

## 11. Default Clarifying Questions

AI should ask questions such as:

* Which project folder is this for?
* Does this project share Calo Tracker's stack?
* Should this logic be duplicated or extracted deliberately?

If unsure, stop and ask.

---

## 12. Explicit Exclusions

AI must not:

* Treat Calo Tracker as the default template
* Introduce shared state across projects
* Change global tooling because of one project
* Reorganise folders without a migration plan

---

## 13. Source of Truth Hierarchy

1. This file (`CLAUDE.md`) – AI behaviour
2. `.cursor/rules/*` – editor enforcement
3. `<project-name>/docs/README.md` – project reality

If instructions conflict, **AI must follow the highest item in this list**.

---

### Final note

This workspace is designed to scale by **isolation, not abstraction**.

When the second project arrives, AI must become **more cautious**, not more clever.

If something feels “reusable”, AI should pause and ask before acting.
