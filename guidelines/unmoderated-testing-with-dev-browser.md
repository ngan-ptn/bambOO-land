# Guideline: Automated Flow Verification with Dev Browser

A methodology for prototype validation using Dev Browser with accumulated persona tracking.

---

## Important: What This Is and Isn't

### This IS
- **Automated UI flow verification** - Confirm features work technically
- **Heuristic evaluation** - Apply UX patterns to identify issues
- **Screenshot documentation** - Visual walkthrough for stakeholders
- **Hypothesis generation** - Create questions for real user testing
- **Longitudinal tracking** - Accumulate observations over time

### This is NOT
- Real usability testing
- Valid measurement of user emotions
- Actual cognitive load assessment
- Genuine discovery behavior simulation

> **All findings are hypotheses to validate with real users.**

---

## Overview

This guideline covers:
1. Setting up Dev Browser for prototype testing
2. Creating structured test plans
3. Running automated persona simulations with state tracking
4. Accumulating findings over time
5. Generating reports

**When to use:**
- Validating prototypes before real user testing
- Identifying obvious UX issues via heuristics
- Documenting UI flows for stakeholders
- Tracking friction points across features

**Related guidelines:**
- `persona-tracking-system-setup.md` - Detailed setup for longitudinal tracking

---

## Prerequisites

### Required
- [ ] HTML prototype (local or hosted)
- [ ] Node.js 18+
- [ ] Dev Browser installed
- [ ] Persona profiles defined

### Recommended
- [ ] Persona tracking system set up (see related guideline)
- [ ] Test plan with defined tasks
- [ ] Success criteria per task

---

## Phase 1: Environment Setup

### 1.1 Start Prototype Server

```bash
# Vite/React/Vue
npm run dev

# Or simple HTTP server
python3 -m http.server 8000
```

### 1.2 Install Dev Browser

```bash
# Clone
git clone https://github.com/SawyerHood/dev-browser.git ~/.claude/skills/dev-browser

# Install dependencies (important: in skills/dev-browser subdirectory)
cd ~/.claude/skills/dev-browser/skills/dev-browser
npm install
```

### 1.3 Start Dev Browser Server

```bash
cd ~/.claude/skills/dev-browser/skills/dev-browser
npm run start-server
```

Verify it's running:
```bash
curl http://localhost:9222/
# Should return: {"wsEndpoint":"ws://..."}
```

### 1.4 Set Up Persona Tracking (Recommended)

For longitudinal testing with accumulated state:

```bash
# Create folder structure
mkdir -p personas/{profiles,sessions,screenshots,findings/by-feature,findings/by-persona,analytics,lib}

# See: guidelines/persona-tracking-system-setup.md for full setup
```

---

## Phase 2: Define Personas

### 2.1 Persona Profile Structure

Create JSON profiles in `personas/profiles/`:

```json
{
  "id": "persona-id",
  "name": "Persona Name",
  "type": "primary",
  "profile": {
    "age": "25-35",
    "role": "Job/life stage",
    "experience": "Experience with similar products",
    "goals": ["Goal 1", "Goal 2"],
    "frustrations": ["Pain point 1", "Pain point 2"],
    "techComfort": "high",
    "expectedBehaviors": ["Behavior 1", "Behavior 2"]
  },
  "state": {
    "firstSeen": "",
    "totalSessions": 0,
    "lastSession": "",
    "appFamiliarity": "new",
    "featuresUsed": [],
    "localStorage": {}
  },
  "accumulatedObservations": {
    "facts": [],
    "patterns": [],
    "frictionPoints": [],
    "hypotheses": []
  },
  "sessions": []
}
```

### 2.2 Recommended Persona Types

| Type | Focus | Purpose |
|------|-------|---------|
| **Primary** | Main target user | Core flow validation |
| **Secondary** | Learning user | Onboarding/guidance issues |
| **Tertiary** | Power user | Missing advanced features |

---

## Phase 3: Create Test Plan

### 3.1 Test Plan Structure

```markdown
# [Product] Test Plan

## Test Goals
1. Verify UI flows function correctly
2. Identify heuristic violations
3. Generate hypotheses for real user testing

## Tasks to Test
[List of tasks with expected flows]

## Personas
[List personas with key differentiators]
```

### 3.2 Task Definition

Each task should specify:

```markdown
### TASK: [Name]

**Starting point:** [View/screen]
**Action:** [What to do]
**Expected outcome:** [What should happen]

**Heuristics to check:**
- [ ] Visibility of system status
- [ ] User control and freedom
- [ ] Error prevention
- [ ] Recognition over recall
- [ ] Flexibility and efficiency
```

### 3.3 What to Measure

| Category | Valid to Measure | NOT Valid to Measure |
|----------|------------------|----------------------|
| **Technical** | Element exists, navigation works | User satisfaction |
| **Heuristic** | Pattern violations | Cognitive load |
| **Timing** | Script execution speed | Real user task time |
| **State** | localStorage changes | User mental model |

---

## Phase 4: Run Simulations

### 4.1 With Persona Tracking System (Recommended)

```typescript
// personas/test-feature.ts
import { runSession, runForAllPersonas } from "./lib/session-runner.js";
import type { TaskDefinition } from "./lib/session-runner.js";

const FEATURE = "new-feature";
const PERSONAS = ["persona-1", "persona-2", "persona-3"];

const tasks: TaskDefinition[] = [
  {
    name: "task-name",
    description: "What this tests",
    run: async (page, persona) => {
      // Test logic
      const exists = await page.evaluate(() =>
        !!document.getElementById("element")
      );

      return {
        facts: [`Element exists: ${exists}`],
        heuristics: exists ? [] : ["Missing expected element"],
        frictionPoints: []
      };
    }
  }
];

// Run for all personas (accumulates state)
await runForAllPersonas(FEATURE, tasks, PERSONAS);
```

Run:
```bash
cd ~/.claude/skills/dev-browser/skills/dev-browser
npx tsx /path/to/personas/test-feature.ts
```

### 4.2 Without Persona Tracking (One-off)

```typescript
import { connect } from "@/client.js";

const client = await connect("http://localhost:9222");
const page = await client.page("test", {
  viewport: { width: 390, height: 844 }
});

await page.goto("http://localhost:3000");

// Screenshot
await page.screenshot({ path: "screenshot.png", fullPage: true });

// Interact
await page.evaluate(() => {
  document.querySelector("button")?.click();
});

// Verify
const result = await page.evaluate(() =>
  document.getElementById("result")?.textContent
);

console.log("Result:", result);
await client.disconnect();
```

### 4.3 Common Patterns

```typescript
// Click element
await page.evaluate(() => {
  document.querySelector('[onclick="myFunction()"]')?.click();
});

// Wait for UI
await new Promise(r => setTimeout(r, 500));

// Check visibility
const visible = await page.evaluate(() => {
  const el = document.getElementById("element");
  return el && !el.classList.contains("hidden");
});

// Get text
const text = await page.evaluate(() =>
  document.getElementById("element")?.textContent
);

// Restore state (returning user)
await page.evaluate((state) => {
  localStorage.setItem("app_state", JSON.stringify(state));
}, savedState);
```

---

## Phase 5: Document Findings

### 5.1 With Persona Tracking

Generate reports automatically:

```bash
npx tsx personas/lib/cli.ts reports
```

Outputs:
- `personas/findings/by-persona/*.md` - Journey per persona
- `personas/findings/by-feature/*.md` - Results per feature
- `personas/analytics/summary.json` - Aggregated metrics

### 5.2 Findings Categories

Always separate:

| Category | Example | Action |
|----------|---------|--------|
| **Facts** | "Button exists" | Technical fix |
| **Heuristics** | "No search bar" | Prioritize for design |
| **Hypotheses** | "Users might be confused" | Validate with real users |

### 5.3 Report Template

```markdown
# Feature: [Name] - Test Findings

## Facts (Verified)
- [Technical observations from DOM inspection]

## Heuristic Issues
| Issue | Heuristic Violated | Severity |
|-------|-------------------|----------|
| [Issue] | [Which heuristic] | High/Med/Low |

## Hypotheses (Require Validation)
- [ ] [Question to test with real users]

## Screenshots
- [screenshot.png] - Shows X but NOT user's perception of X
```

---

## Phase 6: Iterate

### 6.1 After Fixing Issues

```bash
# Mark friction point as resolved
npx tsx personas/lib/cli.ts resolve persona-id "issue substring"

# Re-run tests
npx tsx personas/test-feature.ts

# Regenerate reports
npx tsx personas/lib/cli.ts reports
```

### 6.2 Testing New Features

```bash
# Copy template
cp personas/test-template.ts personas/test-new-feature.ts

# Edit: Update FEATURE and tasks

# Run
npx tsx personas/test-new-feature.ts
```

### 6.3 Check Status

```bash
npx tsx personas/lib/cli.ts status
```

---

## Deliverables Checklist

### One-Time Setup
- [ ] Dev Browser installed and running
- [ ] Persona tracking system set up
- [ ] Persona profiles created (3 recommended)
- [ ] Test plan documented

### Per Feature
- [ ] Test script created
- [ ] Simulation run for all personas
- [ ] Screenshots captured
- [ ] Reports generated
- [ ] Hypotheses documented for real user testing

### Ongoing
- [ ] Friction points tracked (resolved/unresolved)
- [ ] Patterns identified
- [ ] Analytics reviewed

---

## Quick Reference

```bash
# Start servers
npm run dev &
cd ~/.claude/skills/dev-browser/skills/dev-browser && npm run start-server &

# Run test
npx tsx /path/to/personas/test-feature.ts

# Generate reports
npx tsx /path/to/personas/lib/cli.ts reports

# Check status
npx tsx /path/to/personas/lib/cli.ts status

# Mark resolved
npx tsx /path/to/personas/lib/cli.ts resolve persona-id "issue"
```

---

## What to Do After Automated Testing

Automated testing generates **hypotheses**. Validate with real users:

| Hypothesis Type | Validation Method |
|-----------------|-------------------|
| "Users might not find X" | Guerrilla testing (5 people, 15 min) |
| "X might be confusing" | Think-aloud protocol |
| "Users might prefer Y" | A/B testing or preference test |
| "X takes too long" | Timed task study |

**Tools for real user testing:**
- Maze (unmoderated, quantitative)
- UserTesting (moderated + unmoderated)
- Lookback (moderated, think-aloud)
- Hotjar (session recordings in production)

---

*Guideline version 2.0*
*Updated to integrate with Persona Tracking System*
