#!/usr/bin/env npx tsx
/**
 * Persona CLI - Command line tools for persona management
 *
 * Usage:
 *   npx tsx personas/lib/cli.ts <command> [args]
 *
 * Commands:
 *   reports              Generate all reports
 *   journey <persona>    Generate journey for specific persona
 *   feature <name>       Generate feature report
 *   analytics            Generate analytics summary
 *   resolve <persona> <issue>  Mark friction point as resolved
 *   status               Show quick status overview
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

const PERSONAS_DIR = "/Users/nganpham/nutrition-experiments/testing/personas";

function showStatus() {
  const profilesDir = path.join(PERSONAS_DIR, "profiles");
  const sessionsDir = path.join(PERSONAS_DIR, "sessions");

  const profiles = fs.readdirSync(profilesDir).filter(f => f.endsWith(".json"));
  const sessions = fs.existsSync(sessionsDir)
    ? fs.readdirSync(sessionsDir).filter(f => f.endsWith(".json"))
    : [];

  console.log("\n=== PERSONA TRACKING STATUS ===\n");

  let totalFriction = 0;
  let unresolvedFriction = 0;

  for (const file of profiles) {
    const persona = JSON.parse(fs.readFileSync(path.join(profilesDir, file), "utf-8"));
    const unresolved = persona.accumulatedObservations.frictionPoints.filter((fp: any) => !fp.resolved);

    console.log(`${persona.name} (${persona.type})`);
    console.log(`  Sessions: ${persona.state.totalSessions}`);
    console.log(`  Familiarity: ${persona.state.appFamiliarity}`);
    console.log(`  Friction Points: ${unresolved.length} unresolved / ${persona.accumulatedObservations.frictionPoints.length} total`);
    console.log(`  Features Used: ${persona.state.featuresUsed.join(", ") || "none"}`);
    console.log();

    totalFriction += persona.accumulatedObservations.frictionPoints.length;
    unresolvedFriction += unresolved.length;
  }

  console.log(`--- Summary ---`);
  console.log(`Total Personas: ${profiles.length}`);
  console.log(`Total Sessions: ${sessions.length}`);
  console.log(`Unresolved Friction: ${unresolvedFriction}/${totalFriction}`);
  console.log();
}

function showHelp() {
  console.log(`
Persona CLI - Command line tools for persona management

Usage:
  npx tsx personas/lib/cli.ts <command> [args]

Commands:
  status               Show quick status overview
  reports              Generate all reports
  journey <persona>    Generate journey for specific persona
  feature <name>       Generate feature report
  analytics            Generate analytics summary
  resolve <persona> <issue>  Mark friction point as resolved

Personas:
  linh-nguyen          Primary - Young professional
  minh-tran            Secondary - Student, first-time tracker
  khoa-pham            Tertiary - Fitness enthusiast

Examples:
  npx tsx personas/lib/cli.ts status
  npx tsx personas/lib/cli.ts journey linh-nguyen
  npx tsx personas/lib/cli.ts feature ai-scan
  npx tsx personas/lib/cli.ts resolve khoa-pham "search bar"
`);
}

// Main
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "status":
    showStatus();
    break;

  case "reports":
    generateAllReports();
    break;

  case "journey":
    if (!args[1]) {
      console.error("Error: Persona ID required");
      console.log("Usage: npx tsx personas/lib/cli.ts journey <persona-id>");
      process.exit(1);
    }
    generatePersonaJourney(args[1]);
    break;

  case "feature":
    if (!args[1]) {
      console.error("Error: Feature name required");
      console.log("Usage: npx tsx personas/lib/cli.ts feature <feature-name>");
      process.exit(1);
    }
    generateFeatureReport(args[1]);
    break;

  case "analytics":
    generateAnalytics();
    break;

  case "resolve":
    if (!args[1] || !args[2]) {
      console.error("Error: Persona ID and issue substring required");
      console.log("Usage: npx tsx personas/lib/cli.ts resolve <persona-id> <issue-substring>");
      process.exit(1);
    }
    resolveFrictionPoint(args[1], args[2]);
    break;

  case "help":
  case "--help":
  case "-h":
    showHelp();
    break;

  default:
    if (command) {
      console.error(`Unknown command: ${command}`);
    }
    showHelp();
    break;
}
