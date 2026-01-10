/**
 * Session Runner - Executes persona simulations with state persistence
 *
 * Usage:
 *   import { runSession } from "./personas/lib/session-runner.js";
 *   await runSession("linh-nguyen", "new-feature", tasks);
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

const TESTING_DIR = "/Users/nganpham/bambOO-land/testing";
const PERSONAS_DIR = `${TESTING_DIR}/personas`;
const SCREENSHOTS_DIR = `${TESTING_DIR}/screenshots`;
const APP_URL = "http://localhost:3000";
const DEV_BROWSER_URL = "http://localhost:9222";

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

  // Load persona profile
  const persona = loadPersona(personaId);
  const sessionId = `${getDateString()}-${personaId}-${feature}`;
  const dateStr = new Date().toISOString();

  console.log(`\n${"=".repeat(60)}`);
  console.log(`PERSONA SESSION: ${persona.name}`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Feature: ${feature}`);
  console.log(`Familiarity: ${persona.state.appFamiliarity} (${persona.state.totalSessions} prior sessions)`);
  console.log(`Tech Comfort: ${persona.profile.techComfort}`);
  console.log(`Key Goals: ${persona.profile.goals.slice(0, 2).join(", ")}`);
  console.log(`${"=".repeat(60)}\n`);

  // Initialize session result
  const sessionResult: SessionResult = {
    sessionId,
    persona: personaId,
    personaName: persona.name,
    date: dateStr,
    feature,
    tasks: [],
    screenshots: [],
    newFrictionPoints: [],
    summary: {
      totalTasks: tasks.length,
      successfulTasks: 0,
      totalDuration: 0
    }
  };

  // Connect to browser
  const client = await connect(DEV_BROWSER_URL);
  const page = await client.page(`${personaId}-session`, {
    viewport: { width: 390, height: 844 }
  });

  await page.goto(APP_URL);

  // Handle state based on persona familiarity
  if (options.clearState || persona.state.appFamiliarity === "new") {
    await page.evaluate(() => localStorage.clear());
    console.log(`[State] Fresh start (new user or cleared)`);
  } else {
    // Restore persona's localStorage state (simulates returning user)
    await page.evaluate((savedState: any) => {
      localStorage.setItem("fuelup_streak_state", JSON.stringify(savedState));
    }, persona.state.localStorage);
    console.log(`[State] Restored from previous session`);
  }

  await page.reload();
  await sleep(2000);

  // Run each task
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(`\n--- Task ${i + 1}/${tasks.length}: ${task.name} ---`);
    console.log(`Description: ${task.description}`);

    const startTime = Date.now();
    const taskResult: TaskResult = {
      name: task.name,
      duration: 0,
      success: false,
      facts: [],
      heuristics: [],
      screenshots: []
    };

    // Screenshot before task
    const beforeScreenshot = path.join(
      SCREENSHOTS_DIR,
      `${sessionId}-${i + 1}-${task.name.replace(/\s+/g, "-")}-before.png`
    );
    await page.screenshot({ path: beforeScreenshot, fullPage: true });
    taskResult.screenshots.push(beforeScreenshot);
    sessionResult.screenshots.push(beforeScreenshot);

    try {
      // Run the task
      const result = await task.run(page, persona);

      taskResult.duration = Date.now() - startTime;
      taskResult.success = true;
      taskResult.facts = result.facts || [];
      taskResult.heuristics = result.heuristics || [];

      // Handle any new friction points
      if (result.frictionPoints) {
        for (const fp of result.frictionPoints) {
          const frictionPoint: FrictionPoint = {
            ...fp,
            date: getDateString()
          };
          sessionResult.newFrictionPoints.push(frictionPoint);
        }
      }

      console.log(`[OK] Duration: ${taskResult.duration}ms`);
      taskResult.facts.forEach(f => console.log(`  [Fact] ${f}`));
      taskResult.heuristics.forEach(h => console.log(`  [Heuristic] ${h}`));

    } catch (error) {
      taskResult.duration = Date.now() - startTime;
      taskResult.success = false;
      taskResult.facts.push(`Error: ${error}`);
      console.log(`[FAIL] ${error}`);
    }

    // Screenshot after task
    const afterScreenshot = path.join(
      SCREENSHOTS_DIR,
      `${sessionId}-${i + 1}-${task.name.replace(/\s+/g, "-")}-after.png`
    );
    await page.screenshot({ path: afterScreenshot, fullPage: true });
    taskResult.screenshots.push(afterScreenshot);
    sessionResult.screenshots.push(afterScreenshot);

    sessionResult.tasks.push(taskResult);
    sessionResult.summary.totalDuration += taskResult.duration;
    if (taskResult.success) sessionResult.summary.successfulTasks++;
  }

  // Capture final localStorage state
  const finalState = await page.evaluate(() => {
    const data = localStorage.getItem("fuelup_streak_state");
    return data ? JSON.parse(data) : {};
  });

  await client.disconnect();

  // Update persona profile
  persona.state.totalSessions += 1;
  persona.state.lastSession = dateStr;
  persona.state.localStorage = finalState;

  // Update familiarity based on session count
  if (persona.state.totalSessions >= 5) {
    persona.state.appFamiliarity = "power-user";
  } else if (persona.state.totalSessions >= 1) {
    persona.state.appFamiliarity = "returning";
  }

  // Add feature to used features if not already there
  if (!persona.state.featuresUsed.includes(feature)) {
    persona.state.featuresUsed.push(feature);
  }

  // Add session to history
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

  // Add new friction points to persona
  for (const fp of sessionResult.newFrictionPoints) {
    // Check if similar friction point already exists
    const exists = persona.accumulatedObservations.frictionPoints.some(
      existing => existing.issue === fp.issue && existing.feature === fp.feature
    );
    if (!exists) {
      persona.accumulatedObservations.frictionPoints.push(fp);
    }
  }

  // Save updated persona
  savePersona(persona);

  // Save session record
  saveSession(sessionResult);

  // Print summary
  console.log(`\n${"=".repeat(60)}`);
  console.log(`SESSION COMPLETE: ${sessionId}`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Tasks: ${sessionResult.summary.successfulTasks}/${sessionResult.summary.totalTasks} passed`);
  console.log(`Total Duration: ${sessionResult.summary.totalDuration}ms`);
  console.log(`Screenshots: ${sessionResult.screenshots.length}`);
  console.log(`New Friction Points: ${sessionResult.newFrictionPoints.length}`);
  console.log(`${persona.name} Total Sessions: ${persona.state.totalSessions}`);
  console.log(`${"=".repeat(60)}\n`);

  return sessionResult;
}

// Helper to run same tasks for all personas
export async function runForAllPersonas(
  feature: string,
  tasks: TaskDefinition[],
  options: { clearState?: boolean } = {}
): Promise<SessionResult[]> {
  const personaIds = ["linh-nguyen", "minh-tran", "khoa-pham"];
  const results: SessionResult[] = [];

  for (const personaId of personaIds) {
    const result = await runSession(personaId, feature, tasks, options);
    results.push(result);
  }

  return results;
}

// Export types for use in test files
export type { PersonaProfile, SessionResult, TaskDefinition, TaskResult };
