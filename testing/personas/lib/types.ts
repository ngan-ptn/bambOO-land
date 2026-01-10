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
