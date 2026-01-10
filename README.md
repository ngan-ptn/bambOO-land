# bambOO-land

A monorepo for exploring different approaches to nutrition/health tracking through iterative prototyping.

## Overview

This repository contains 5 prototypes, each exploring a different angle on helping people track nutrition and maintain healthy habits. The prototypes share testing infrastructure and personas, enabling comparative analysis across approaches.

## Prototypes

| # | Name | Angle | Status |
|---|------|-------|--------|
| 01 | [FuelUp](prototypes/01-fuelup/) | Partner accountability + shared streaks | Active |
| 02 | TBD | TBD | Planned |
| 03 | TBD | TBD | Planned |
| 04 | TBD | TBD | Planned |
| 05 | TBD | TBD | Planned |

## Quick Start

```bash
# Run a prototype
cd prototypes/01-fuelup
npm install
npm run dev

# Run persona tests
cd ~/.claude/skills/dev-browser/skills/dev-browser
npx tsx /Users/nganpham/bambOO-land/testing/personas/test-template.ts

# Generate reports
npx tsx /Users/nganpham/bambOO-land/testing/personas/lib/cli.ts reports
```

## Repository Structure

```
bambOO-land/
├── prototypes/                 # Individual prototype apps
│   └── 01-fuelup/             # Partner streaks approach
│       ├── src/
│       ├── docs/              # Prototype-specific docs
│       │   ├── decisions/     # ADRs
│       │   └── journal.md     # Dev journal
│       └── package.json
│
├── docs/                       # Cross-cutting documentation
│   ├── templates/             # Documentation templates
│   │   ├── prototype-overview.md
│   │   ├── adr.md
│   │   ├── dev-journal.md
│   │   ├── retrospective.md
│   │   ├── comparison.md
│   │   └── quality-gate.md
│   ├── decisions/             # Cross-prototype ADRs
│   ├── retrospectives/        # Post-prototype reflections
│   └── comparisons/           # Cross-prototype analysis
│
├── testing/                    # Shared testing infrastructure
│   ├── personas/              # Persona-based testing
│   │   ├── profiles/          # Persona definitions
│   │   ├── sessions/          # Test session records
│   │   ├── findings/          # Generated reports
│   │   ├── analytics/         # Aggregated metrics
│   │   └── lib/               # Test runner code
│   └── screenshots/           # Captured screenshots
│
└── guidelines/                 # Shared methodology docs
```

## Documentation Workflow

### For Each Prototype

1. **Start**: Copy `docs/templates/prototype-overview.md` to prototype's `docs/overview.md`
2. **During Build**: Maintain `docs/journal.md` with daily thinking/decisions
3. **Key Decisions**: Create ADRs in `docs/decisions/`
4. **After Phase**: Write retrospective using template
5. **Quality Check**: Complete quality gate checklist

### Cross-Prototype

- After testing 2+ prototypes, write comparison docs in `docs/comparisons/`
- Document cross-cutting decisions in `docs/decisions/`

## Testing

All prototypes are tested with the same 3 personas:

| Persona | Type | Focus |
|---------|------|-------|
| Linh Nguyen | Primary | Efficiency, <30s logging |
| Minh Tran | Secondary | First-time user, needs guidance |
| Khoa Pham | Tertiary | Precision, wants macros |

See [testing/personas/SETUP-unmoderated-TESTING.md](testing/personas/SETUP-unmoderated-TESTING.md) for detailed instructions.

## Templates

| Template | Purpose |
|----------|---------|
| [prototype-overview.md](docs/templates/prototype-overview.md) | Entry point for each prototype |
| [adr.md](docs/templates/adr.md) | Architecture/design decisions |
| [dev-journal.md](docs/templates/dev-journal.md) | Daily thinking log |
| [retrospective.md](docs/templates/retrospective.md) | Post-phase reflection |
| [comparison.md](docs/templates/comparison.md) | Cross-prototype analysis |
| [quality-gate.md](docs/templates/quality-gate.md) | Pre-release checklist |

## Guidelines

- [Unmoderated Testing with Dev Browser](guidelines/unmoderated-testing-with-dev-browser.md)
- [Persona Tracking System Setup](guidelines/persona-tracking-system-setup.md)
