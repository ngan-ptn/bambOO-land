# Prototype Documentation – 02c-Prototype-Gated

**Domain:** Nutrition / Calorie Tracking
**Angle / Bet:** Feature implementation via full workflow with mandatory gates/checkpoints requiring human approval
**Status:** Planned (Not Started)
**Owner:** Ngan Pham
**Last updated:** 2025-01-11

---

## 1. Prototype Overview (Entry Point)

### Purpose
Test whether a **full OOUX workflow with mandatory gates** produces higher quality output than condensed (prototype-lite) or delegated (AI delegation) approaches by forcing human review at key checkpoints.

The gated approach asks: "What's the minimum gate frequency that prevents major rework without excessive overhead?"

### Target User / JTBD
**Primary:** Vietnamese users who want to track daily calorie intake with minimal friction.

**Jobs-to-be-Done:**
- When I eat a meal, I want to log it in under 3 taps, so I maintain accurate records without disrupting my day
- When I eat common Vietnamese foods, I want pre-configured nutrition data, so I don't have to research calories
- When I eat the same meals regularly, I want to save them as favorites/combos, so logging is even faster

### Core Hypotheses
- H1: If we mandate human review at critical checkpoints (gates), we'll catch major issues early and prevent extensive rework.
- H2: If we require completion of upstream steps (ideation, selection, design) before building, we'll ensure implementation is aligned with user needs.
- H3: If gates are well-defined with clear acceptance criteria, the overhead of human review will be minimal (5-10 minutes per gate).
- H4: If gated approach produces fewer bugs than prototype-lite or AI delegation, the added overhead is justified.

### Signals to Watch
- **Positive:**
  - Few bugs discovered in testing (gates caught issues during implementation)
  - Minimal rework after feature complete
  - Human reviewer feels gates are "just enough" (not excessive)
- **Negative:**
  - Gates feel like bureaucracy (reviewer: "this is obvious, why do we need to review?")
  - Gates cause significant delays (implementation blocked for hours waiting on review)
  - Mid-stream pivots despite gates (gates didn't prevent issues)
- **Neutral / ambiguous:**
  - Gate frequency feels "about right" but some steps seem redundant
  - Clear alignment achieved despite occasional friction

### Non-goals
- **Not about gate frequency optimization:** Focus is on quality, not reducing gates to minimum
- **Not about replacing judgment:** Gates require human review, not automated checks
- **Not about faster development:** This approach accepts slower velocity if quality is better
- **Not about comprehensive testing:** Gates are checkpoints, not exhaustive QA processes

### What Success Looks Like
- **Bug reduction:** 50%+ fewer post-implementation bugs vs prototype-lite/AI delegation
- **Rework reduction:** <20% of total effort spent on fixes/rework
- **Gate efficiency:** Average gate review time <15 minutes
- **Human satisfaction:** 70%+ of reviewers feel gates are valuable (not bureaucratic)
- **Quality parity:** Code quality comparable or better than full OOUX approach

---

## 2. Gated Workflow Process

### The 11-Step Full OOUX Process (Gated Approach)

| Step | Output | Gate | Approx Time | When to Gate |
|-------|--------|-------|---------------|----------------|
| 1. Framing | Problem definition, target user, success metrics | GATE 1: Framing approved? | 15-30 min | Always |
| 2. Ideation | 3-5 solution options with trade-offs | GATE 2: Options cover space? | 30-60 min | Always |
| 3. Selection | Chosen approach with rationale | GATE 3: Selection justified? | 15-30 min | Always |
| 4. Dot Map | Objects, attributes, relationships | Optional gate: Data model sound? | 30-60 min | For complex data models |
| 5. IA Map | Routes, navigation, object locations | Optional gate: IA makes sense? | 30-60 min | For new features |
| 6. User Flows | J1-JN flows with step counts | Optional gate: Flows cover JTBD? | 30-90 min | For major features |
| 7. Screen List | Consolidated screen inventory | Optional gate: Screens complete? | 20-40 min | For UI-heavy features |
| 8. Wireframes | Visual layout drafts | GATE 4: Wireframes match flows? | 60-120 min | For all features |
| 9. Visual Design | Polished UI components | GATE 5: Design aligned with system? | 60-180 min | For all features |
| 10. Implementation | Working code | GATE 6: Implementation matches spec? | Variable | Always |
| 11. Test | User testing / QA | GATE 7: Tests passing? | 30-60 min | For all features |

### Gate Acceptance Criteria

Each gate requires:
- **Clear criteria:** What must be true to pass gate?
- **Quick review:** Target <15 minutes per gate
- **Actionable feedback:** "Fix X and Y" (not vague "make it better")
- **Documented decision:** ADR created if gate changes direction

### Mandatory vs Optional Gates

| Gate Type | When Mandatory | When Optional |
|------------|----------------|---------------|
| Framing approval | Always | Never |
| Ideation coverage | Always | Never |
| Selection justification | Always | Never |
| Dot Map | Complex object models | Simple data can skip |
| IA Map | New features/routes | IA inferred from flows can skip |
| User Flows | Major features | Minor features can skip |
| Screen List | All features | Trivial features can skip |
| Wireframes | All features | No visual changes can skip |
| Visual Design | All features | No visual changes can skip |
| Implementation match | Always | Never |
| Tests passing | All features | No code changes can skip |

---

## 3. Technical Stack

Same as 02-PROTOTYPE base implementation:
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Database:** sql.js (SQLite WASM) - browser-only persistence
- **Routing:** react-router-dom v6
- **UI Components:** Radix UI (dialogs, sheets)

---

## 4. Base Features (from 02-PROTOTYPE)

Features that exist in the cloned base:
- Auth flow (simulated)
- Onboarding (name/goal/calories)
- Dashboard with progress ring
- Quick Add with food tiles
- S/M/L Portion picker
- Favorites and meal combos
- Search functionality
- Timeline (meal history)
- Manual entry
- Profile/Goals editing

---

## 5. Planned Features for Implementation Testing

Features to be implemented using gated workflow (to compare against 02a AI delegation, 02b prototype-lite, 02d prototypER):

| Feature | Complexity | Planned for Comparison |
|---------|-------------|------------------------|
| Partner profile switching (CR05) | Medium | How does gating affect multi-user data model implementation? |
| "Log for Both" toggle | Medium | Can gates prevent UI interaction bugs (async loading, errors)? |
| Enhanced food search | Simple | Does gating add overhead disproportionate to feature complexity? |

---

## 6. Cross-Prototype Comparison Hooks

### Key Questions This Prototype Helps Answer
- Do mandatory gates catch enough issues to justify overhead?
- Is there an optimal gate frequency (too many = bureaucracy, too few = wasted)?
- Does gating improve code quality vs prototype-lite or AI delegation?
- Which gates provide most value vs which are overhead?
- Does gating slow velocity significantly compared to other approaches?

### Strengths
- **Early issue detection:** Gates catch problems before they cascade
- **Alignment enforcement:** Upstream steps must be complete before building
- **Reduced rework:** Fewer post-implementation fixes
- **High quality expectation:** "Gated" signals thoroughness
- **Clear decision points:** ADRs created at each gate

### Weaknesses
- **Velocity overhead:** Waiting for human review delays progress
- **Potential bureaucracy:** Gates may feel ceremonial if criteria are weak
- **Risk of analysis paralysis:** Too many gates → over-thinking, not action
- **Reviewer dependency:** Implementation blocked until gate reviewer is available

### Best Context to Use This Approach
- Complex features with high failure cost (security, multi-user, data model changes)
- New-to-domain team (learning curve benefits from guidance)
- Features where bugs have significant impact (critical paths)
- When quality is higher priority than speed

---

## 7. Related Documentation

Documentation structure will mirror 02-PROTOTYPE:
- `docs/journal.md` - Development journal with gate tracking
- `docs/decisions/` - ADRs for gate decisions (especially if gates change direction)
- `docs/retrospective.md` - Phase-end reflection
- Base OOUX artifacts (if needed for feature): outputs/ooux-ia-flows/

---

## 8. Implementation Notes

### Clone Status
- Cloned from: `02-PROTOTYPE`
- Folder: `prototypes/02c-prototype-gated/`
- Status: Ready for feature implementation

### Dev Port
- Will run on: `http://localhost:5175` (next available after 5174)

### Testing Approach
- Same feature will be implemented across all 4 variants (02a, 02b, 02c, 02d)
- Comparison metrics: implementation time, gate count, gate wait time, bugs found, rework effort

---

## 9. Gate Tracking Metrics

Metrics to collect during gated implementation:

| Metric | Target | How to Measure |
|---------|--------|-----------------|
| Gate count | 5-9 (for medium feature) | Count mandatory + optional gates used |
| Gate review time | <15 min avg | Track time from "ready for review" to "gate passed" |
| Gate failure rate | <30% | Percentage of gates that require changes |
| Implementation time | +20-40% vs AI delegation | Total from start to finish |
| Post-implementation bugs | 50% fewer than prototype-lite | Bugs found after all gates passed |
| Rework effort | <20% of total time | Time spent on fixes after implementation |

---

## 10. Gate Decision Template

Use this format when documenting gate decisions (create ADRs for significant gate decisions):

### Gate [N] - [Step Name]

**Decision:** [Pass / Conditional Pass / Fail with Changes]

**Reviewer:** [Name]

**Criteria Met:**
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

**Feedback Given:**
- [Fixes needed] ...
- [Approvals] ...

**Time Spent:** [X] minutes

**Action:**
- Continue to next step
- Return to previous step
- Iterate on current step

**If Changes Required:** Create ADR-[###] documenting rationale
