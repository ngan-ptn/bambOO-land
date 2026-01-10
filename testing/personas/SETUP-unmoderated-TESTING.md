# Unmoderated Testing Setup

Quick reference for running persona simulations on prototypes.

---

## Current State

| Item | Status |
|------|--------|
| Personas | 3 configured (Linh, Minh, Khoa) |
| Sessions | 1 per persona (initial-test) |
| Unresolved Friction | 13 points tracked |
| Dev Browser | ~/.claude/skills/dev-browser |

---

## Quick Start

### 1. Start Servers

```bash
# Terminal 1: Prototype (from prototype directory)
cd /Users/nganpham/nutrition-experiments/prototypes/01-fuelup
npm run dev
# Runs on http://localhost:3000

# Terminal 2: Dev Browser
cd ~/.claude/skills/dev-browser/skills/dev-browser
npm run start-server
# Runs on http://localhost:9222
```

### 2. Run Tests

**Option A: Run all personas**
```bash
cd ~/.claude/skills/dev-browser/skills/dev-browser
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/test-template.ts
```

**Option B: Run single persona**
```bash
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/test-template.ts --persona=linh-nguyen
```

**Option C: Fresh state (new user)**
```bash
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/test-template.ts --clear
```

### 3. View Results

```bash
# Quick status
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts status

# Generate reports
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts reports

# View reports
cat /Users/nganpham/nutrition-experiments/testing/personas/findings/by-persona/linh-nguyen-journey.md
```

---

## Testing a New Feature

```bash
# 1. Copy template
cp testing/personas/test-template.ts testing/personas/test-<feature-name>.ts

# 2. Edit the file:
#    - Update FEATURE_NAME = "feature-name"
#    - Define tasks array with test logic

# 3. Run
cd ~/.claude/skills/dev-browser/skills/dev-browser
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/test-<feature-name>.ts

# 4. Generate reports
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts reports
```

---

## CLI Commands

```bash
# All commands run from dev-browser directory:
cd ~/.claude/skills/dev-browser/skills/dev-browser

# Status overview
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts status

# Generate all reports
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts reports

# Single persona journey
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts journey linh-nguyen

# Feature report
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts feature ai-scan

# Mark friction resolved
npx tsx /Users/nganpham/nutrition-experiments/testing/personas/lib/cli.ts resolve khoa-pham "search bar"
```

---

## Personas

| ID | Name | Type | Focus |
|----|------|------|-------|
| `linh-nguyen` | Linh Nguyen | Primary | Efficiency (<30s logging) |
| `minh-tran` | Minh Tran | Secondary | First-time user, needs guidance |
| `khoa-pham` | Khoa Pham | Tertiary | Precision, wants macros |

---

## File Locations

```
nutrition-experiments/
├── prototypes/
│   └── 01-fuelup/              # FuelUp prototype
├── testing/
│   ├── personas/
│   │   ├── profiles/           # Persona JSON files
│   │   ├── sessions/           # Test session records
│   │   ├── findings/
│   │   │   ├── by-persona/     # Journey reports
│   │   │   └── by-feature/     # Feature reports
│   │   ├── analytics/
│   │   │   └── summary.json    # Aggregated metrics
│   │   ├── lib/                # Core libraries
│   │   └── test-template.ts    # Copy for new tests
│   └── screenshots/            # Auto-captured screenshots
└── guidelines/
    ├── unmoderated-testing-with-dev-browser.md
    └── persona-tracking-system-setup.md
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Dev Browser not connecting | Check `curl http://localhost:9222/` returns JSON |
| Prototype not loading | Verify `npm run dev` is running on port 3000 |
| Scripts fail with import error | Run from `~/.claude/skills/dev-browser/skills/dev-browser` |
| Stale persona state | Use `--clear` flag to reset |

---

## After Testing

Findings are **hypotheses**. Validate with real users:

1. Review `testing/personas/analytics/summary.json` for friction points
2. Prioritize high-severity issues
3. Fix issues, then run `resolve` command
4. Re-test to verify fixes
5. Use real testing tools (Maze, UserTesting) for validation

---

*Persona Testing - Quick Reference*
