# Prototype Documentation – 02b-Prototype-Lite

**Domain:** Nutrition / Calorie Tracking
**Angle / Bet:** Feature implementation via condensed 5-step design workflow
**Status:** Planned (Not Started)
**Owner:** Ngan Pham
**Last updated:** 2025-01-11

---

## 1. Prototype Overview (Entry Point)

### Purpose
Test whether a **condensed design workflow** (merged from full 11-step OOUX process to 5 key steps) can produce high-quality implementation with reduced documentation overhead while maintaining clarity and alignment with user needs.

The prototype-lite approach asks: "What's the minimum documentation needed to start implementation and stay aligned?" rather than "What's the complete documentation before we begin?"

### Target User / JTBD
**Primary:** Vietnamese users who want to track daily calorie intake with minimal friction.

**Jobs-to-be-Done:**
- When I eat a meal, I want to log it in under 3 taps, so I maintain accurate records without disrupting my day
- When I eat common Vietnamese foods, I want pre-configured nutrition data, so I don't have to research calories
- When I eat the same meals regularly, I want to save them as favorites/combos, so logging is even faster

### Core Hypotheses
- H1: If we condense OOUX to 5 steps (Framing → Ideation → Select → Design → User Flows), we can start implementation 50-70% faster while maintaining quality.
- H2: If we focus documentation on "what we're building and why" (not comprehensive artifacts), we can iterate faster while preserving alignment.
- H3: If prototype-lite produces comparable quality to full OOUX, then documentation overhead is unnecessary for prototyping.
- H4: If 5 steps are insufficient, we'll discover gaps mid-implementation (not in documentation) - this is acceptable trade-off for velocity.

### Signals to Watch
- **Positive:**
  - Feature implementation starts within minutes of concept
  - Minimal course corrections needed
  - Code quality comparable to full OOUX approach
  - Developers feel clarity is "just enough"
- **Negative:**
  - Frequent mid-stream pivots (indicates insufficient up-front thinking)
  - Significant rework due to misunderstood requirements
  - Developers feel "lost" or uncertain during implementation
- **Neutral / ambiguous:**
  - Implementation speed comparable to AI delegation (both fast) - is it documentation or human efficiency?
  - Some features need iterative refinement (normal for any approach)

### Non-goals
- **Not about design quality:** Prototype-lite may produce good or bad design - this experiment tests process, not output
- **Not about AI vs Manual comparison:** Focus is on documentation efficiency, not who writes code
- **Not about final product quality:** This is a prototype - bugs and rough edges are acceptable
- **Not comprehensive:** Deliberately omits some artifacts (detailed wireframes, exhaustive edge case analysis)

### What Success Looks Like
- Implementation speed: Feature implemented in 30-50% less time than full OOUX
- Quality parity: Comparable bug count, code quality to full OOUX approach
- Developer satisfaction: 70%+ of developers feel documentation is "sufficient but not bloated"
- Rework rate: <20% of total effort spent on revisions due to unclear specs

---

## 2. Prototype-Lite Workflow

### The 5-Step Condensed Process

| Step | Output | Approx Time | When to Use |
|-------|--------|---------------|--------------|
| 1. Framing | Problem definition, target user, success metrics | 15-30 min | All features (especially complex/ambiguous) |
| 2. Ideation | 3-5 solution options with trade-offs | 30-60 min | All features (especially novel problems) |
| 3. Select | Chosen approach with rationale | 15-30 min | When multiple viable options (Step 2 output) |
| 4. Design | Core screens/components, user flows | 30-90 min | Most features (UI-heavy) step |
| 5. User Flows | J1-JN flows with step counts, decisions | 20-40 min | Most features (completes picture) |

### What Full OOUX Omits (That Prototype-Lite Keeps)

| Full OOUX Artifact | Prototype-Lite Status | Rationale for Omission |
|---------------------|---------------------|----------------------|
| 1. OOUX Dot Map | Optional | Needed for complex object models, can be skipped for simple features |
| 2. IA Map | Optional | Useful for navigation structure, but can be inferred from user flows |
| 3. Screen List | Optional | Can be inferred from user flows + design |
| 4. Detailed ADRs | Skip for small decisions | Only ADR for major/different choices |
| 5. Edge Case Analysis | Skip for happy path | Handle as discovered, not pre-anticipated |
| 6. Wireframes | Skip for obvious UI | Design screens/components directly |
| 7. Success Metrics | Optional | Use default metrics unless unique to feature |

### When to Use Prototype-Lite

**Use Prototype-Lite when:**
- Feature scope is small-to-medium (not system-wide overhaul)
- Requirements are relatively clear (minimal ambiguity)
- Team has strong shared understanding of product context
- Speed is higher priority than comprehensive documentation
- Feature is iteration on existing well-understood patterns

**Avoid Prototype-Lite when:**
- Introducing entirely new object model (need OOUX Dot Map)
- Complex navigation/IA changes (need IA Map)
- Breaking design system or patterns (need comprehensive ADR)
- New to domain/team (need more up-front alignment)

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

Features to be implemented using prototype-lite workflow (to compare against 02a AI delegation, 02c gated, 02d prototypER):

| Feature | Complexity | Planned for Comparison |
|---------|-------------|------------------------|
| Partner profile switching (CR05) | Medium | How does prototype-lite handle multi-user data model? |
| "Log for Both" toggle | Medium | Can prototype-lite specify enough for complex UI interactions? |
| Enhanced food search | Simple | Does 5-step process capture requirements accurately? |

---

## 5. Cross-Prototype Comparison Hooks

### Key Questions This Prototype Helps Answer
- Is 5-step OOUX (prototype-lite) sufficient for implementing complex features?
- How does implementation speed compare to AI delegation (02a)?
- How much rework is needed when documentation is minimal?
- Does prototype-lite produce comparable code quality to full OOUX?
- When is documentation "just enough" vs "insufficient"?

### Strengths
- **Fast to start:** 5 steps take 1-2 hours vs 4-6 hours for full OOUX
- **Minimal overhead:** Don't produce artifacts you won't read (detailed wireframes, exhaustive lists)
- **Focus on essentials:** Forces prioritization of critical thinking
- **Flexible:** Can add steps back if feature is complex (custom workflow)

### Weaknesses
- **Risk of gaps:** Skipping dot map/IA map may miss data model or navigation issues
- **Mid-stream discovery:** Complex edge cases emerge during implementation (not anticipated)
- **Alignment risk:** Less comprehensive documentation may lead to divergent interpretations
- **Iteration penalty:** Gaps discovered mid-stream cost more to fix than prevent upfront

### Best Context to Use This Approach
- Small-to-medium feature iterations on existing codebase
- Features that follow established patterns (no design system breaks)
- Teams with strong shared product understanding
- When speed > comprehensive documentation
- Proof-of-concept / validation prototypes

---

## 6. Related Documentation

Documentation structure will mirror 02-PROTOTYPE:
- `docs/journal.md` - Development journal with 5-step workflow tracking
- `docs/decisions/` - ADRs for significant choices
- `docs/retrospective.md` - Phase-end reflection
- Base OOUX artifacts (if needed for feature): outputs/ooux-ia-flows/

---

## 7. Implementation Notes

### Clone Status
- Cloned from: `02-PROTOTYPE`
- Folder: `prototypes/02b-prototype-lite/`
- Status: Ready for feature implementation

### Dev Port
- Will run on: `http://localhost:5174` (next available after 5173)

### Testing Approach
- Same feature will be implemented across all 4 variants (02a, 02b, 02c, 02d)
- Comparison metrics: implementation time, bug count, code quality, rework effort
