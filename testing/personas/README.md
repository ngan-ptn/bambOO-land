# Persona Tracking System

Accumulated persona simulation for longitudinal UX testing.

## Quick Start

```bash
# 1. Start servers
npm run dev &
cd ~/.claude/skills/dev-browser/skills/dev-browser && npm run start-server &

# 2. Run a test
cd ~/.claude/skills/dev-browser/skills/dev-browser
npx tsx /Users/nganpham/fuelup-app/personas/test-template.ts

# 3. Generate reports
npx tsx /Users/nganpham/fuelup-app/personas/lib/cli.ts reports

# 4. View status
npx tsx /Users/nganpham/fuelup-app/personas/lib/cli.ts status
```

## Directory Structure

```
personas/
├── profiles/           # Persona definitions + accumulated state
│   ├── linh-nguyen.json
│   ├── minh-tran.json
│   └── khoa-pham.json
├── sessions/           # Individual test session records
├── screenshots/        # Auto-captured screenshots
├── findings/
│   ├── by-feature/     # Reports grouped by feature
│   └── by-persona/     # Journey reports per persona
├── analytics/          # Aggregated metrics
├── lib/                # Core libraries
│   ├── types.ts        # TypeScript definitions
│   ├── session-runner.ts   # Main test runner
│   ├── reports.ts      # Report generators
│   └── cli.ts          # Command line tools
├── test-template.ts    # Copy this for new tests
└── README.md
```

## Personas

| ID | Name | Type | Key Trait |
|----|------|------|-----------|
| linh-nguyen | Linh Nguyen | Primary | Efficiency-focused, <30s logging |
| minh-tran | Minh Tran | Secondary | First-time tracker, needs guidance |
| khoa-pham | Khoa Pham | Tertiary | Precision-focused, wants macros |

## CLI Commands

```bash
# Show status overview
npx tsx personas/lib/cli.ts status

# Generate all reports
npx tsx personas/lib/cli.ts reports

# Generate single persona journey
npx tsx personas/lib/cli.ts journey linh-nguyen

# Generate feature report
npx tsx personas/lib/cli.ts feature ai-scan

# Generate analytics summary
npx tsx personas/lib/cli.ts analytics

# Mark friction point as resolved
npx tsx personas/lib/cli.ts resolve khoa-pham "search bar"
```

## Testing a New Feature

1. **Copy the template:**
   ```bash
   cp personas/test-template.ts personas/test-my-feature.ts
   ```

2. **Edit the test file:**
   - Update `FEATURE_NAME`
   - Define tasks with `name`, `description`, and `run` function
   - Each task returns `{ facts, heuristics, frictionPoints? }`

3. **Run the test:**
   ```bash
   # All personas
   npx tsx personas/test-my-feature.ts

   # Single persona
   npx tsx personas/test-my-feature.ts --persona=linh-nguyen

   # Clear state (simulate new user)
   npx tsx personas/test-my-feature.ts --clear
   ```

4. **Generate reports:**
   ```bash
   npx tsx personas/lib/cli.ts reports
   ```

## Key Concepts

### State Persistence
- Each persona maintains localStorage state between sessions
- Simulates returning users with history
- Use `--clear` flag to reset to new user state

### Accumulated Observations
- **Facts**: Verified technical observations
- **Patterns**: Behavioral patterns identified over time
- **Friction Points**: Issues encountered (tracked as resolved/unresolved)
- **Hypotheses**: Speculations requiring real user validation

### Familiarity Levels
- `new`: First session, no prior context
- `returning`: 1-4 sessions, building familiarity
- `power-user`: 5+ sessions, knows the app well

## Important Limitations

This system performs **automated flow verification**, NOT real usability testing.

**Can verify:**
- UI elements exist and function
- Navigation paths work
- Technical task completion

**Cannot measure:**
- Real user emotions or confusion
- Actual cognitive load
- Time real users take
- Genuine discovery behavior

All findings should be treated as **hypotheses to validate** with real users.

## File Locations

- **Profiles**: `personas/profiles/<persona-id>.json`
- **Sessions**: `personas/sessions/<date>-<persona>-<feature>.json`
- **Screenshots**: `personas/screenshots/<session-id>-<task>.png`
- **Reports**: `personas/findings/by-persona/` and `personas/findings/by-feature/`
- **Analytics**: `personas/analytics/summary.json`
