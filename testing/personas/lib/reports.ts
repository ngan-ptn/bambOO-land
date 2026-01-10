/**
 * Report Generation - Creates markdown reports from accumulated data
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { PersonaProfile, SessionResult, AnalyticsSummary } from "./types.js";

const PERSONAS_DIR = "/Users/nganpham/nutrition-experiments/testing/personas";

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

// Generate journey report for a single persona
export function generatePersonaJourney(personaId: string): string {
  const personas = loadAllPersonas();
  const persona = personas.find(p => p.id === personaId);
  if (!persona) throw new Error(`Persona not found: ${personaId}`);

  let report = `# ${persona.name} - User Journey Report\n\n`;
  report += `> **Type:** ${persona.type} | **Sessions:** ${persona.state.totalSessions} | **Familiarity:** ${persona.state.appFamiliarity}\n\n`;

  // Profile summary
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

  // Session timeline
  report += `\n## Session Timeline\n\n`;

  for (const sessionId of persona.sessions) {
    const session = loadSession(sessionId);
    if (!session) {
      report += `### ${sessionId}\n*Session data not found*\n\n`;
      continue;
    }

    report += `### ${session.date.split("T")[0]} - ${session.feature}\n\n`;
    report += `| Task | Status | Duration |\n|------|--------|----------|\n`;

    for (const task of session.tasks) {
      const status = task.success ? "PASS" : "FAIL";
      report += `| ${task.name} | ${status} | ${task.duration}ms |\n`;
    }

    if (session.newFrictionPoints.length > 0) {
      report += `\n**Friction Points Found:**\n`;
      session.newFrictionPoints.forEach(fp => {
        report += `- [${fp.severity}] ${fp.issue}\n`;
      });
    }
    report += "\n";
  }

  // Accumulated patterns
  report += `## Observed Patterns\n\n`;
  if (persona.accumulatedObservations.patterns.length > 0) {
    persona.accumulatedObservations.patterns.forEach(p => {
      report += `- ${p}\n`;
    });
  } else {
    report += `*No patterns identified yet*\n`;
  }

  // Friction points summary
  const unresolved = persona.accumulatedObservations.frictionPoints.filter(fp => !fp.resolved);
  const resolved = persona.accumulatedObservations.frictionPoints.filter(fp => fp.resolved);

  report += `\n## Friction Points\n\n`;
  report += `### Unresolved (${unresolved.length})\n\n`;

  if (unresolved.length > 0) {
    report += `| Severity | Feature | Issue | Since |\n|----------|---------|-------|-------|\n`;
    unresolved.forEach(fp => {
      report += `| ${fp.severity.toUpperCase()} | ${fp.feature} | ${fp.issue} | ${fp.date} |\n`;
    });
  } else {
    report += `*No unresolved friction points*\n`;
  }

  if (resolved.length > 0) {
    report += `\n### Resolved (${resolved.length})\n\n`;
    resolved.forEach(fp => {
      report += `- ~~${fp.issue}~~ (${fp.feature})\n`;
    });
  }

  // Hypotheses
  report += `\n## Hypotheses to Validate\n\n`;
  persona.accumulatedObservations.hypotheses.forEach(h => {
    report += `- [ ] ${h}\n`;
  });

  // Facts timeline
  report += `\n## Observation Log\n\n`;
  const recentFacts = persona.accumulatedObservations.facts.slice(-20);
  recentFacts.forEach(f => {
    report += `- **${f.date}** [${f.feature}]: ${f.observation}\n`;
  });

  const outputPath = path.join(PERSONAS_DIR, "findings", "by-persona", `${personaId}-journey.md`);
  fs.writeFileSync(outputPath, report);
  console.log(`Generated: ${outputPath}`);

  return report;
}

// Generate report for a specific feature across all personas
export function generateFeatureReport(feature: string): string {
  const sessions = loadAllSessions().filter(s => s.feature === feature);

  if (sessions.length === 0) {
    console.log(`No sessions found for feature: ${feature}`);
    return "";
  }

  let report = `# Feature Report: ${feature}\n\n`;
  report += `> **Total Sessions:** ${sessions.length} | **Date Range:** ${sessions[0]?.date.split("T")[0]} - ${sessions[sessions.length - 1]?.date.split("T")[0]}\n\n`;

  // Summary table
  report += `## Results by Persona\n\n`;
  report += `| Persona | Sessions | Success Rate | Avg Duration | Friction Points |\n`;
  report += `|---------|----------|--------------|--------------|------------------|\n`;

  const personaIds = [...new Set(sessions.map(s => s.persona))];

  for (const personaId of personaIds) {
    const personaSessions = sessions.filter(s => s.persona === personaId);
    const totalTasks = personaSessions.reduce((a, s) => a + s.summary.totalTasks, 0);
    const successfulTasks = personaSessions.reduce((a, s) => a + s.summary.successfulTasks, 0);
    const successRate = totalTasks > 0 ? ((successfulTasks / totalTasks) * 100).toFixed(0) : "N/A";
    const avgDuration = personaSessions.reduce((a, s) => a + s.summary.totalDuration, 0) / personaSessions.length;
    const frictionCount = personaSessions.reduce((a, s) => a + s.newFrictionPoints.length, 0);

    report += `| ${personaSessions[0]?.personaName || personaId} | ${personaSessions.length} | ${successRate}% | ${avgDuration.toFixed(0)}ms | ${frictionCount} |\n`;
  }

  // All friction points for this feature
  const allFriction = sessions.flatMap(s =>
    s.newFrictionPoints.map(fp => ({ ...fp, persona: s.personaName }))
  );

  if (allFriction.length > 0) {
    report += `\n## Friction Points Found\n\n`;
    report += `| Severity | Persona | Issue |\n|----------|---------|-------|\n`;
    allFriction.forEach(fp => {
      report += `| ${fp.severity.toUpperCase()} | ${fp.persona} | ${fp.issue} |\n`;
    });
  }

  // Session details
  report += `\n## Session Details\n\n`;
  for (const session of sessions) {
    report += `### ${session.personaName} - ${session.date.split("T")[0]}\n\n`;
    for (const task of session.tasks) {
      const status = task.success ? "PASS" : "FAIL";
      report += `- **${task.name}**: ${status} (${task.duration}ms)\n`;
      task.facts.forEach(f => { report += `  - ${f}\n`; });
    }
    report += "\n";
  }

  const outputPath = path.join(PERSONAS_DIR, "findings", "by-feature", `${feature}.md`);
  fs.writeFileSync(outputPath, report);
  console.log(`Generated: ${outputPath}`);

  return report;
}

// Generate analytics summary
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

  // Per-persona stats
  for (const persona of personas) {
    const unresolved = persona.accumulatedObservations.frictionPoints.filter(fp => !fp.resolved);

    summary.personas[persona.id] = {
      sessions: persona.state.totalSessions,
      familiarity: persona.state.appFamiliarity,
      factCount: persona.accumulatedObservations.facts.length,
      frictionCount: persona.accumulatedObservations.frictionPoints.length,
      unresolvedFriction: unresolved.length
    };

    // Collect all unresolved friction
    for (const fp of unresolved) {
      summary.unresolvedFriction.push({ ...fp, persona: persona.id });
    }
  }

  // Per-feature stats
  const featureNames = [...new Set(sessions.map(s => s.feature))];
  for (const feature of featureNames) {
    const featureSessions = sessions.filter(s => s.feature === feature);
    const featureFriction = featureSessions.reduce((a, s) => a + s.newFrictionPoints.length, 0);

    summary.features[feature] = {
      testCount: featureSessions.length,
      personas: [...new Set(featureSessions.map(s => s.persona))],
      frictionPoints: featureFriction
    };
  }

  // Recent sessions
  summary.recentSessions = sessions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
    .map(s => ({
      sessionId: s.sessionId,
      persona: s.persona,
      feature: s.feature,
      date: s.date.split("T")[0]
    }));

  // Save analytics
  const outputPath = path.join(PERSONAS_DIR, "analytics", "summary.json");
  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
  console.log(`Generated: ${outputPath}`);

  // Print summary to console
  console.log(`\n${"=".repeat(60)}`);
  console.log("ANALYTICS SUMMARY");
  console.log(`${"=".repeat(60)}`);
  console.log(`Total Personas: ${Object.keys(summary.personas).length}`);
  console.log(`Total Features Tested: ${Object.keys(summary.features).length}`);
  console.log(`Total Unresolved Friction: ${summary.unresolvedFriction.length}`);

  if (summary.unresolvedFriction.length > 0) {
    console.log(`\nUnresolved Friction Points:`);
    for (const fp of summary.unresolvedFriction) {
      console.log(`  [${fp.severity.toUpperCase()}] ${fp.persona}: ${fp.issue}`);
    }
  }

  console.log(`${"=".repeat(60)}\n`);

  return summary;
}

// Generate all reports
export function generateAllReports(): void {
  console.log("Generating all reports...\n");

  const personas = loadAllPersonas();
  const sessions = loadAllSessions();

  // Generate persona journeys
  for (const persona of personas) {
    generatePersonaJourney(persona.id);
  }

  // Generate feature reports
  const features = [...new Set(sessions.map(s => s.feature))];
  for (const feature of features) {
    generateFeatureReport(feature);
  }

  // Generate analytics
  generateAnalytics();

  console.log("\nAll reports generated!");
}

// Mark friction point as resolved
export function resolveFrictionPoint(
  personaId: string,
  issueSubstring: string
): boolean {
  const profilePath = path.join(PERSONAS_DIR, "profiles", `${personaId}.json`);
  const persona: PersonaProfile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

  let resolved = false;
  for (const fp of persona.accumulatedObservations.frictionPoints) {
    if (fp.issue.includes(issueSubstring) && !fp.resolved) {
      fp.resolved = true;
      resolved = true;
      console.log(`Resolved: "${fp.issue}" for ${persona.name}`);
    }
  }

  if (resolved) {
    fs.writeFileSync(profilePath, JSON.stringify(persona, null, 2));
  } else {
    console.log(`No matching unresolved friction point found for: "${issueSubstring}"`);
  }

  return resolved;
}

// Add pattern to persona
export function addPattern(personaId: string, pattern: string): void {
  const profilePath = path.join(PERSONAS_DIR, "profiles", `${personaId}.json`);
  const persona: PersonaProfile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

  if (!persona.accumulatedObservations.patterns.includes(pattern)) {
    persona.accumulatedObservations.patterns.push(pattern);
    fs.writeFileSync(profilePath, JSON.stringify(persona, null, 2));
    console.log(`Added pattern to ${persona.name}: "${pattern}"`);
  }
}

// Add hypothesis to persona
export function addHypothesis(personaId: string, hypothesis: string): void {
  const profilePath = path.join(PERSONAS_DIR, "profiles", `${personaId}.json`);
  const persona: PersonaProfile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

  if (!persona.accumulatedObservations.hypotheses.includes(hypothesis)) {
    persona.accumulatedObservations.hypotheses.push(hypothesis);
    fs.writeFileSync(profilePath, JSON.stringify(persona, null, 2));
    console.log(`Added hypothesis to ${persona.name}: "${hypothesis}"`);
  }
}
