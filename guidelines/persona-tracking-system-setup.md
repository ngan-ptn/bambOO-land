# Guideline: Setting Up Persona Tracking System

A reusable methodology for creating longitudinal persona-based automated testing with accumulated state tracking.

---

## Overview

### What This System Does

- **Tracks personas over time** - Each persona maintains state between test sessions
- **Accumulates observations** - Facts, patterns, and friction points build up
- **Simulates returning users** - localStorage persists between sessions
- **Generates reports** - Journey reports per persona, feature reports, analytics

### What This System Does NOT Do

- Replace real user testing
- Measure actual emotions or cognitive load
- Provide valid SUS scores
- Simulate genuine discovery behavior

**All findings are hypotheses to validate with real users.**

---

## Prerequisites

- Node.js 18+
- Dev Browser installed at `~/.claude/skills/dev-browser`
- HTML prototype (local or hosted)
- Defined personas with goals, frustrations, and behaviors

---

## Step 1: Create Folder Structure

```bash
# From your project root
mkdir -p personas/{profiles,sessions,screenshots,findings/by-feature,findings/by-persona,analytics,lib}
```

**Result:**
```
personas/
├── profiles/           # Persona JSON files
├── sessions/           # Test session records
├── screenshots/        # Auto-captured screenshots
├── findings/
│   ├── by-feature/     # Reports grouped by feature
│   └── by-persona/     # Journey reports per persona
├── analytics/          # Aggregated metrics
└── lib/                # Core libraries
```

---

## Step 2: Create Type Definitions

Create `personas/lib/types.ts`:

```typescript
// Type definitions for persona tracking system

export interface PersonaProfile {
  id: string;
  name: string;
  type: "primary" | "secondary" | "tertiary";
  profile: {
    age: string;
    role: string;
    experience: string;
    goals: string[];
    frustrations: string[];
    techComfort: "low" | "medium" | "high";
    expectedBehaviors: string[];
  };
  state: {
    firstSeen: string;
    totalSessions: number;
    lastSession: string;
    appFamiliarity: "new" | "returning" | "power-user";
    featuresUsed: string[];
    featuresNotDiscovered: string[];
    localStorage: Record<string, any>;
  };
  accumulatedObservations: {
    facts: Observation[];
    patterns: string[];
    frictionPoints: FrictionPoint[];
    hypotheses: string[];
  };
  sessions: string[];
}

export interface Observation {
  date: string;
  feature: string;
  observation: string;
}

export interface FrictionPoint {
  date: string;
  issue: string;
  severity: "low" | "medium" | "high";
  feature: string;
  resolved: boolean;
}

export interface TaskResult {
  name: string;
  duration: number;
  success: boolean;
  facts: string[];
  heuristics: string[];
  screenshots: string[];
}

export interface SessionResult {
  sessionId: string;
  persona: string;
  personaName: string;
  date: string;
  feature: string;
  tasks: TaskResult[];
  screenshots: string[];
  newFrictionPoints: FrictionPoint[];
  summary: {
    totalTasks: number;
    successfulTasks: number;
    totalDuration: number;
  };
}

export interface TaskDefinition {
  name: string;
  description: string;
  run: (page: any, persona: PersonaProfile) => Promise<{
    facts: string[];
    heuristics: string[];
    frictionPoints?: Omit<FrictionPoint, "date">[];
  }>;
}

export interface AnalyticsSummary {
  generatedAt: string;
  personas: Record<string, {
    sessions: number;
    familiarity: string;
    factCount: number;
    frictionCount: number;
    unresolvedFriction: number;
  }>;
  features: Record<string, {
    testCount: number;
    personas: string[];
    frictionPoints: number;
  }>;
  unresolvedFriction: Array<FrictionPoint & { persona: string }>;
  recentSessions: Array<{
    sessionId: string;
    persona: string;
    feature: string;
    date: string;
  }>;
}
```

---

## Step 3: Create Session Runner

Create `personas/lib/session-runner.ts`:

```typescript
/**
 * Session Runner - Executes persona simulations with state persistence
 */

import { connect } from "@/client.js";
import * as fs from "node:fs";
import * as path from "node:path";
import type {
  PersonaProfile,
  SessionResult,
  TaskDefinition,
  TaskResult,
  FrictionPoint
} from "./types.js";

// ============================================================
// CONFIGURE THESE FOR YOUR PROJECT
// ============================================================
const PERSONAS_DIR = "/path/to/your/project/personas";  // UPDATE THIS
const APP_URL = "http://localhost:3000";                 // UPDATE THIS
const DEV_BROWSER_URL = "http://localhost:9222";
// ============================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function loadPersona(personaId: string): PersonaProfile {
  const profilePath = path.join(PERSONAS_DIR, "profiles", `${personaId}.json`);
  return JSON.parse(fs.readFileSync(profilePath, "utf-8"));
}

function savePersona(persona: PersonaProfile): void {
  const profilePath = path.join(PERSONAS_DIR, "profiles", `${persona.id}.json`);
  fs.writeFileSync(profilePath, JSON.stringify(persona, null, 2));
}

function saveSession(session: SessionResult): void {
  const sessionPath = path.join(PERSONAS_DIR, "sessions", `${session.sessionId}.json`);
  fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2));
}

export async function runSession(
  personaId: string,
  feature: string,
  tasks: TaskDefinition[],
  options: { clearState?: boolean } = {}
): Promise<SessionResult> {

  const persona = loadPersona(personaId);
  const sessionId = `${getDateString()}-${personaId}-${feature}`;
  const dateStr = new Date().toISOString();

  console.log(`\n${"=".repeat(60)}`);
  console.log(`PERSONA SESSION: ${persona.name}`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Feature: ${feature}`);
  console.log(`Familiarity: ${persona.state.appFamiliarity} (${persona.state.totalSessions} prior sessions)`);
  console.log(`${"=".repeat(60)}\n`);

  const sessionResult: SessionResult = {
    sessionId,
    persona: personaId,
    personaName: persona.name,
    date: dateStr,
    feature,
    tasks: [],
    screenshots: [],
    newFrictionPoints: [],
    summary: { totalTasks: tasks.length, successfulTasks: 0, totalDuration: 0 }
  };

  const client = await connect(DEV_BROWSER_URL);
  const page = await client.page(`${personaId}-session`, {
    viewport: { width: 390, height: 844 }
  });

  await page.goto(APP_URL);

  // Handle state
  if (options.clearState || persona.state.appFamiliarity === "new") {
    await page.evaluate(() => localStorage.clear());
    console.log(`[State] Fresh start`);
  } else {
    await page.evaluate((savedState: any) => {
      // UPDATE: Change key to match your app's localStorage key
      localStorage.setItem("app_state", JSON.stringify(savedState));
    }, persona.state.localStorage);
    console.log(`[State] Restored from previous session`);
  }

  await page.reload();
  await sleep(2000);

  // Run tasks
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(`\n--- Task ${i + 1}/${tasks.length}: ${task.name} ---`);

    const startTime = Date.now();
    const taskResult: TaskResult = {
      name: task.name,
      duration: 0,
      success: false,
      facts: [],
      heuristics: [],
      screenshots: []
    };

    // Screenshot before
    const beforeScreenshot = path.join(
      PERSONAS_DIR, "screenshots",
      `${sessionId}-${i + 1}-${task.name.replace(/\s+/g, "-")}-before.png`
    );
    await page.screenshot({ path: beforeScreenshot, fullPage: true });
    taskResult.screenshots.push(beforeScreenshot);
    sessionResult.screenshots.push(beforeScreenshot);

    try {
      const result = await task.run(page, persona);
      taskResult.duration = Date.now() - startTime;
      taskResult.success = true;
      taskResult.facts = result.facts || [];
      taskResult.heuristics = result.heuristics || [];

      if (result.frictionPoints) {
        for (const fp of result.frictionPoints) {
          sessionResult.newFrictionPoints.push({ ...fp, date: getDateString() });
        }
      }

      console.log(`[OK] Duration: ${taskResult.duration}ms`);
    } catch (error) {
      taskResult.duration = Date.now() - startTime;
      taskResult.facts.push(`Error: ${error}`);
      console.log(`[FAIL] ${error}`);
    }

    // Screenshot after
    const afterScreenshot = path.join(
      PERSONAS_DIR, "screenshots",
      `${sessionId}-${i + 1}-${task.name.replace(/\s+/g, "-")}-after.png`
    );
    await page.screenshot({ path: afterScreenshot, fullPage: true });
    taskResult.screenshots.push(afterScreenshot);
    sessionResult.screenshots.push(afterScreenshot);

    sessionResult.tasks.push(taskResult);
    sessionResult.summary.totalDuration += taskResult.duration;
    if (taskResult.success) sessionResult.summary.successfulTasks++;
  }

  // Capture final state
  const finalState = await page.evaluate(() => {
    // UPDATE: Change key to match your app's localStorage key
    const data = localStorage.getItem("app_state");
    return data ? JSON.parse(data) : {};
  });

  await client.disconnect();

  // Update persona
  persona.state.totalSessions += 1;
  persona.state.lastSession = dateStr;
  persona.state.localStorage = finalState;
  persona.state.appFamiliarity = persona.state.totalSessions >= 5 ? "power-user" : "returning";

  if (!persona.state.featuresUsed.includes(feature)) {
    persona.state.featuresUsed.push(feature);
  }
  persona.sessions.push(sessionId);

  // Accumulate observations
  for (const task of sessionResult.tasks) {
    for (const fact of task.facts) {
      persona.accumulatedObservations.facts.push({
        date: getDateString(),
        feature,
        observation: fact
      });
    }
  }

  for (const fp of sessionResult.newFrictionPoints) {
    const exists = persona.accumulatedObservations.frictionPoints.some(
      existing => existing.issue === fp.issue && existing.feature === fp.feature
    );
    if (!exists) {
      persona.accumulatedObservations.frictionPoints.push(fp);
    }
  }

  savePersona(persona);
  saveSession(sessionResult);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`SESSION COMPLETE: ${sessionId}`);
  console.log(`Tasks: ${sessionResult.summary.successfulTasks}/${sessionResult.summary.totalTasks}`);
  console.log(`${"=".repeat(60)}\n`);

  return sessionResult;
}

export async function runForAllPersonas(
  feature: string,
  tasks: TaskDefinition[],
  personaIds: string[],
  options: { clearState?: boolean } = {}
): Promise<SessionResult[]> {
  const results: SessionResult[] = [];
  for (const personaId of personaIds) {
    const result = await runSession(personaId, feature, tasks, options);
    results.push(result);
  }
  return results;
}

export type { PersonaProfile, SessionResult, TaskDefinition, TaskResult };
```

---

## Step 4: Create Report Generator

Create `personas/lib/reports.ts`:

```typescript
/**
 * Report Generation - Creates markdown reports from accumulated data
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { PersonaProfile, SessionResult, AnalyticsSummary } from "./types.js";

// UPDATE THIS FOR YOUR PROJECT
const PERSONAS_DIR = "/path/to/your/project/personas";

function loadAllPersonas(): PersonaProfile[] {
  const profilesDir = path.join(PERSONAS_DIR, "profiles");
  const files = fs.readdirSync(profilesDir).filter(f => f.endsWith(".json"));
  return files.map(f =>
    JSON.parse(fs.readFileSync(path.join(profilesDir, f), "utf-8"))
  );
}

function loadSession(sessionId: string): SessionResult | null {
  const sessionPath = path.join(PERSONAS_DIR, "sessions", `${sessionId}.json`);
  if (!fs.existsSync(sessionPath)) return null;
  return JSON.parse(fs.readFileSync(sessionPath, "utf-8"));
}

function loadAllSessions(): SessionResult[] {
  const sessionsDir = path.join(PERSONAS_DIR, "sessions");
  if (!fs.existsSync(sessionsDir)) return [];
  const files = fs.readdirSync(sessionsDir).filter(f => f.endsWith(".json"));
  return files.map(f =>
    JSON.parse(fs.readFileSync(path.join(sessionsDir, f), "utf-8"))
  );
}

export function generatePersonaJourney(personaId: string): string {
  const personas = loadAllPersonas();
  const persona = personas.find(p => p.id === personaId);
  if (!persona) throw new Error(`Persona not found: ${personaId}`);

  let report = `# ${persona.name} - User Journey Report\n\n`;
  report += `> **Type:** ${persona.type} | **Sessions:** ${persona.state.totalSessions} | **Familiarity:** ${persona.state.appFamiliarity}\n\n`;

  // Profile
  report += `## Profile\n\n`;
  report += `| Attribute | Value |\n|-----------|-------|\n`;
  report += `| Age | ${persona.profile.age} |\n`;
  report += `| Role | ${persona.profile.role} |\n`;
  report += `| Experience | ${persona.profile.experience} |\n`;
  report += `| Tech Comfort | ${persona.profile.techComfort} |\n\n`;

  report += `### Goals\n`;
  persona.profile.goals.forEach(g => { report += `- ${g}\n`; });

  report += `\n### Frustrations\n`;
  persona.profile.frustrations.forEach(f => { report += `- ${f}\n`; });

  // Sessions
  report += `\n## Session Timeline\n\n`;
  for (const sessionId of persona.sessions) {
    const session = loadSession(sessionId);
    if (!session) continue;

    report += `### ${session.date.split("T")[0]} - ${session.feature}\n\n`;
    report += `| Task | Status | Duration |\n|------|--------|----------|\n`;
    for (const task of session.tasks) {
      report += `| ${task.name} | ${task.success ? "PASS" : "FAIL"} | ${task.duration}ms |\n`;
    }
    report += "\n";
  }

  // Friction points
  const unresolved = persona.accumulatedObservations.frictionPoints.filter(fp => !fp.resolved);
  report += `## Unresolved Friction Points (${unresolved.length})\n\n`;
  if (unresolved.length > 0) {
    report += `| Severity | Feature | Issue | Since |\n|----------|---------|-------|-------|\n`;
    unresolved.forEach(fp => {
      report += `| ${fp.severity.toUpperCase()} | ${fp.feature} | ${fp.issue} | ${fp.date} |\n`;
    });
  }

  // Hypotheses
  report += `\n## Hypotheses to Validate\n\n`;
  persona.accumulatedObservations.hypotheses.forEach(h => {
    report += `- [ ] ${h}\n`;
  });

  const outputPath = path.join(PERSONAS_DIR, "findings", "by-persona", `${personaId}-journey.md`);
  fs.writeFileSync(outputPath, report);
  console.log(`Generated: ${outputPath}`);
  return report;
}

export function generateFeatureReport(feature: string): string {
  const sessions = loadAllSessions().filter(s => s.feature === feature);
  if (sessions.length === 0) return "";

  let report = `# Feature Report: ${feature}\n\n`;
  report += `| Persona | Sessions | Success Rate | Friction Points |\n`;
  report += `|---------|----------|--------------|------------------|\n`;

  const personaIds = [...new Set(sessions.map(s => s.persona))];
  for (const personaId of personaIds) {
    const ps = sessions.filter(s => s.persona === personaId);
    const total = ps.reduce((a, s) => a + s.summary.totalTasks, 0);
    const success = ps.reduce((a, s) => a + s.summary.successfulTasks, 0);
    const friction = ps.reduce((a, s) => a + s.newFrictionPoints.length, 0);
    report += `| ${ps[0]?.personaName} | ${ps.length} | ${((success/total)*100).toFixed(0)}% | ${friction} |\n`;
  }

  const outputPath = path.join(PERSONAS_DIR, "findings", "by-feature", `${feature}.md`);
  fs.writeFileSync(outputPath, report);
  console.log(`Generated: ${outputPath}`);
  return report;
}

export function generateAnalytics(): AnalyticsSummary {
  const personas = loadAllPersonas();
  const sessions = loadAllSessions();

  const summary: AnalyticsSummary = {
    generatedAt: new Date().toISOString(),
    personas: {},
    features: {},
    unresolvedFriction: [],
    recentSessions: []
  };

  for (const persona of personas) {
    const unresolved = persona.accumulatedObservations.frictionPoints.filter(fp => !fp.resolved);
    summary.personas[persona.id] = {
      sessions: persona.state.totalSessions,
      familiarity: persona.state.appFamiliarity,
      factCount: persona.accumulatedObservations.facts.length,
      frictionCount: persona.accumulatedObservations.frictionPoints.length,
      unresolvedFriction: unresolved.length
    };
    for (const fp of unresolved) {
      summary.unresolvedFriction.push({ ...fp, persona: persona.id });
    }
  }

  const featureNames = [...new Set(sessions.map(s => s.feature))];
  for (const feature of featureNames) {
    const fs = sessions.filter(s => s.feature === feature);
    summary.features[feature] = {
      testCount: fs.length,
      personas: [...new Set(fs.map(s => s.persona))],
      frictionPoints: fs.reduce((a, s) => a + s.newFrictionPoints.length, 0)
    };
  }

  const outputPath = path.join(PERSONAS_DIR, "analytics", "summary.json");
  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  console.log(`\nUnresolved Friction: ${summary.unresolvedFriction.length}`);
  summary.unresolvedFriction.forEach(fp => {
    console.log(`  [${fp.severity.toUpperCase()}] ${fp.persona}: ${fp.issue}`);
  });

  return summary;
}

export function generateAllReports(): void {
  const personas = loadAllPersonas();
  const sessions = loadAllSessions();

  for (const persona of personas) {
    generatePersonaJourney(persona.id);
  }

  const features = [...new Set(sessions.map(s => s.feature))];
  for (const feature of features) {
    generateFeatureReport(feature);
  }

  generateAnalytics();
  console.log("\nAll reports generated!");
}

export function resolveFrictionPoint(personaId: string, issueSubstring: string): boolean {
  const profilePath = path.join(PERSONAS_DIR, "profiles", `${personaId}.json`);
  const persona: PersonaProfile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

  let resolved = false;
  for (const fp of persona.accumulatedObservations.frictionPoints) {
    if (fp.issue.includes(issueSubstring) && !fp.resolved) {
      fp.resolved = true;
      resolved = true;
      console.log(`Resolved: "${fp.issue}"`);
    }
  }

  if (resolved) fs.writeFileSync(profilePath, JSON.stringify(persona, null, 2));
  return resolved;
}
```

---

## Step 5: Create CLI Tool

Create `personas/lib/cli.ts`:

```typescript
#!/usr/bin/env npx tsx
/**
 * Persona CLI
 *
 * Usage: npx tsx personas/lib/cli.ts <command> [args]
 */

import {
  generateAllReports,
  generatePersonaJourney,
  generateFeatureReport,
  generateAnalytics,
  resolveFrictionPoint
} from "./reports.js";

import * as fs from "node:fs";
import * as path from "node:path";

// UPDATE THIS FOR YOUR PROJECT
const PERSONAS_DIR = "/path/to/your/project/personas";

function showStatus() {
  const profilesDir = path.join(PERSONAS_DIR, "profiles");
  const sessionsDir = path.join(PERSONAS_DIR, "sessions");

  const profiles = fs.readdirSync(profilesDir).filter(f => f.endsWith(".json"));
  const sessions = fs.existsSync(sessionsDir)
    ? fs.readdirSync(sessionsDir).filter(f => f.endsWith(".json"))
    : [];

  console.log("\n=== PERSONA TRACKING STATUS ===\n");

  let unresolvedTotal = 0;

  for (const file of profiles) {
    const persona = JSON.parse(fs.readFileSync(path.join(profilesDir, file), "utf-8"));
    const unresolved = persona.accumulatedObservations.frictionPoints.filter((fp: any) => !fp.resolved);
    unresolvedTotal += unresolved.length;

    console.log(`${persona.name} (${persona.type})`);
    console.log(`  Sessions: ${persona.state.totalSessions}`);
    console.log(`  Familiarity: ${persona.state.appFamiliarity}`);
    console.log(`  Unresolved Friction: ${unresolved.length}`);
    console.log();
  }

  console.log(`--- Summary ---`);
  console.log(`Personas: ${profiles.length} | Sessions: ${sessions.length} | Unresolved: ${unresolvedTotal}`);
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "status": showStatus(); break;
  case "reports": generateAllReports(); break;
  case "journey": generatePersonaJourney(args[1]); break;
  case "feature": generateFeatureReport(args[1]); break;
  case "analytics": generateAnalytics(); break;
  case "resolve": resolveFrictionPoint(args[1], args[2]); break;
  default:
    console.log(`
Persona CLI - Commands:
  status              Show overview
  reports             Generate all reports
  journey <persona>   Generate persona journey
  feature <name>      Generate feature report
  analytics           Generate analytics
  resolve <persona> <issue>  Mark friction resolved
    `);
}
```

---

## Step 6: Create Persona Profiles

Create one JSON file per persona in `personas/profiles/`.

**Template: `personas/profiles/persona-id.json`**

```json
{
  "id": "persona-id",
  "name": "Persona Name",
  "type": "primary",
  "profile": {
    "age": "25-35",
    "role": "Job title or life stage",
    "experience": "Experience with similar products",
    "goals": [
      "Primary goal",
      "Secondary goal"
    ],
    "frustrations": [
      "Pain point 1",
      "Pain point 2"
    ],
    "techComfort": "high",
    "expectedBehaviors": [
      "Behavior pattern 1",
      "Behavior pattern 2"
    ]
  },
  "state": {
    "firstSeen": "",
    "totalSessions": 0,
    "lastSession": "",
    "appFamiliarity": "new",
    "featuresUsed": [],
    "featuresNotDiscovered": [],
    "localStorage": {}
  },
  "accumulatedObservations": {
    "facts": [],
    "patterns": [],
    "frictionPoints": [],
    "hypotheses": [
      "Initial hypothesis about this persona"
    ]
  },
  "sessions": []
}
```

**Recommended: 3 personas**

| Type | Focus | Example |
|------|-------|---------|
| Primary | Main target user | Efficiency-focused professional |
| Secondary | Learning user | First-time user, needs guidance |
| Tertiary | Power user | Expert who wants advanced features |

---

## Step 7: Create Test Template

Create `personas/test-template.ts`:

```typescript
/**
 * Template: Test New Feature
 *
 * Usage:
 *   1. Copy: cp personas/test-template.ts personas/test-<feature>.ts
 *   2. Update FEATURE_NAME and tasks
 *   3. Run: npx tsx personas/test-<feature>.ts
 */

import { runSession, runForAllPersonas } from "./lib/session-runner.js";
import type { TaskDefinition, PersonaProfile } from "./lib/session-runner.js";

// ============================================================
// CONFIGURE YOUR TEST
// ============================================================

const FEATURE_NAME = "new-feature";  // Change this!

// List your persona IDs
const PERSONA_IDS = ["persona-1", "persona-2", "persona-3"];

const tasks: TaskDefinition[] = [
  {
    name: "task-name",
    description: "What this task tests",
    run: async (page, persona: PersonaProfile) => {
      const facts: string[] = [];
      const heuristics: string[] = [];

      // Your test logic here
      // Example:
      const elementExists = await page.evaluate(() => {
        return !!document.getElementById("some-element");
      });
      facts.push(`Element exists: ${elementExists ? "YES" : "NO"}`);

      return {
        facts,
        heuristics,
        frictionPoints: []  // Add any new friction points found
      };
    }
  }
];

// ============================================================
// RUN
// ============================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const personaArg = args.find(a => a.startsWith("--persona="));
  const clearState = args.includes("--clear");

  if (personaArg) {
    const personaId = personaArg.split("=")[1];
    await runSession(personaId, FEATURE_NAME, tasks, { clearState });
  } else {
    await runForAllPersonas(FEATURE_NAME, tasks, PERSONA_IDS, { clearState });
  }

  console.log("\nRun: npx tsx personas/lib/cli.ts reports");
}

main().catch(console.error);
```

---

## Step 8: Update Paths

Before using, update these paths in the library files:

| File | Variable | Update To |
|------|----------|-----------|
| `lib/session-runner.ts` | `PERSONAS_DIR` | `/full/path/to/project/personas` |
| `lib/session-runner.ts` | `APP_URL` | Your prototype URL |
| `lib/reports.ts` | `PERSONAS_DIR` | `/full/path/to/project/personas` |
| `lib/cli.ts` | `PERSONAS_DIR` | `/full/path/to/project/personas` |

Also update the localStorage key in `session-runner.ts` to match your app.

---

## Usage

### Running Tests

```bash
# 1. Start your prototype
npm run dev

# 2. Start Dev Browser
cd ~/.claude/skills/dev-browser/skills/dev-browser
npm run start-server

# 3. Run test (from dev-browser directory)
npx tsx /path/to/project/personas/test-<feature>.ts

# Options:
#   --persona=persona-id   Run for single persona
#   --clear                Reset to new user state
```

### Managing Results

```bash
# Check status
npx tsx personas/lib/cli.ts status

# Generate reports
npx tsx personas/lib/cli.ts reports

# Mark friction resolved (after fixing)
npx tsx personas/lib/cli.ts resolve persona-id "search bar"
```

---

## Best Practices

### DO

- Run tests after implementing each new feature
- Mark friction points as resolved when fixed
- Add patterns when you notice repeated behaviors
- Keep hypotheses list updated for real user validation
- Generate reports regularly to track progress

### DON'T

- Treat simulation results as real user data
- Skip the "hypotheses to validate" step
- Forget to update localStorage key for your app
- Mix up script execution time with real user time

---

## Checklist: New Project Setup

- [ ] Create folder structure
- [ ] Copy type definitions (`types.ts`)
- [ ] Copy session runner (`session-runner.ts`) and update paths
- [ ] Copy report generator (`reports.ts`) and update paths
- [ ] Copy CLI tool (`cli.ts`) and update paths
- [ ] Create persona profile JSONs (3 recommended)
- [ ] Copy test template (`test-template.ts`)
- [ ] Update localStorage key in session-runner.ts
- [ ] Verify with `npx tsx personas/lib/cli.ts status`

---

## Quick Reference

```bash
# Folder structure
mkdir -p personas/{profiles,sessions,screenshots,findings/by-feature,findings/by-persona,analytics,lib}

# Run test
cd ~/.claude/skills/dev-browser/skills/dev-browser
npx tsx /path/to/personas/test-feature.ts

# CLI commands
npx tsx personas/lib/cli.ts status
npx tsx personas/lib/cli.ts reports
npx tsx personas/lib/cli.ts resolve <persona> <issue>
```

---

*Guideline for Persona Tracking System Setup*
*Version 1.0*
