/**
 * Template: Test New Feature with Persona Tracking
 *
 * Copy this file and modify for each new feature test.
 *
 * Usage:
 *   1. Copy this file: cp personas/test-template.ts personas/test-<feature>.ts
 *   2. Update FEATURE_NAME and tasks
 *   3. Run: cd ~/.claude/skills/dev-browser/skills/dev-browser && npx tsx /path/to/test-<feature>.ts
 *   4. Generate reports: npx tsx personas/lib/cli.ts reports
 */

import { runSession, runForAllPersonas } from "./lib/session-runner.js";
import type { TaskDefinition, PersonaProfile } from "./lib/session-runner.js";

// ============================================================
// CONFIGURE YOUR TEST HERE
// ============================================================

const FEATURE_NAME = "new-feature";  // Change this!

const tasks: TaskDefinition[] = [
  {
    name: "task-1-name",
    description: "Description of what this task tests",
    run: async (page, persona: PersonaProfile) => {
      const facts: string[] = [];
      const heuristics: string[] = [];

      // Example: Navigate to feature
      await page.evaluate(() => {
        const btn = document.querySelector('[onclick="someFunction()"]');
        if (btn) (btn as HTMLElement).click();
      });
      await sleep(500);

      // Example: Check if element exists
      const elementExists = await page.evaluate(() => {
        return !!document.getElementById("some-element");
      });
      facts.push(`Element exists: ${elementExists ? "YES" : "NO"}`);

      // Example: Persona-specific observation
      if (persona.profile.techComfort === "low") {
        heuristics.push("Low-tech user might struggle with this feature");
      }

      // Example: Check for heuristic violation
      const hasHelpText = await page.evaluate(() => {
        return document.body.textContent?.includes("help") || false;
      });
      if (!hasHelpText) {
        heuristics.push("No help text - violates 'help and documentation' heuristic");
      }

      return {
        facts,
        heuristics,
        // Optional: Report new friction points
        frictionPoints: elementExists ? [] : [
          {
            issue: "Missing expected element",
            severity: "high" as const,
            feature: FEATURE_NAME,
            resolved: false
          }
        ]
      };
    }
  },

  {
    name: "task-2-name",
    description: "Another task description",
    run: async (page, persona: PersonaProfile) => {
      // Your test logic here
      return {
        facts: ["Task 2 completed"],
        heuristics: []
      };
    }
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================
// RUN OPTIONS
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const personaArg = args.find(a => a.startsWith("--persona="));
  const clearState = args.includes("--clear");

  if (personaArg) {
    // Run for single persona
    const personaId = personaArg.split("=")[1];
    await runSession(personaId, FEATURE_NAME, tasks, { clearState });
  } else {
    // Run for all personas
    console.log("Running for all personas...\n");
    await runForAllPersonas(FEATURE_NAME, tasks, { clearState });
  }

  console.log("\nTo generate reports, run:");
  console.log("  npx tsx personas/lib/cli.ts reports");
}

main().catch(console.error);

// ============================================================
// COMMON PATTERNS (copy as needed)
// ============================================================

/*
// Click a button
await page.evaluate(() => {
  document.querySelector('button.my-class')?.click();
});

// Fill an input
await page.evaluate(() => {
  const input = document.querySelector('input#my-input') as HTMLInputElement;
  if (input) input.value = "test value";
});

// Check visibility
const isVisible = await page.evaluate(() => {
  const el = document.getElementById('my-element');
  return el && !el.classList.contains('hidden');
});

// Get text content
const text = await page.evaluate(() => {
  return document.getElementById('my-element')?.textContent || "";
});

// Wait for element
await page.waitForSelector('#my-element', { timeout: 5000 });

// Persona-specific behavior
if (persona.type === "primary") {
  // Efficiency-focused user behavior
} else if (persona.type === "secondary") {
  // First-time user behavior
} else {
  // Power user behavior
}

// Check persona's friction history
const hasSeenIssue = persona.accumulatedObservations.frictionPoints
  .some(fp => fp.feature === FEATURE_NAME);
*/
