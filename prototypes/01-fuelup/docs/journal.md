# Dev Journal: FuelUp

---

## 2026-01-10

### What I Worked On
- Set up monorepo structure (bambOO-land) for 5 nutrition prototypes
- Moved FuelUp from standalone repo to `prototypes/01-fuelup/`
- Created documentation templates (overview, ADR, journal, retrospective, comparison, quality-gate)
- Wrote prototype overview with hypotheses and signals
- Configured shared persona testing infrastructure

### Thinking / Debates
**Monorepo vs separate repos:** Chose monorepo because these 5 prototypes explore the same problem space (nutrition tracking) from different angles. Shared personas enable cross-prototype comparison - same "users" testing different approaches reveals which angle works best.

**Documentation depth:** Debated how much structure to impose. Settled on templates that are comprehensive but optional sections. The goal is capturing thinking, not checkbox compliance.

### Decisions Made Today
- Decision: Use monorepo with shared testing infrastructure
- Confidence level: High

- Decision: Personas test all prototypes (not prototype-specific personas)
- Confidence level: High

- Decision: FuelUp's non-goals explicitly exclude precision tracking
- Confidence level: Medium (might alienate power users, but sharpens focus)

### Open Bets
- Will "shared streak" concept resonate without onboarding? Current prototype throws users in cold.
- Is 5-food database enough to test the core hypothesis, or does it create false friction?

### Questions / Uncertainties
- How to handle the 13 friction points from persona testing? Fix all before next prototype, or accept some as intentional constraints?
- Should prototype #2 explore the opposite angle (solo + precision) to contrast with FuelUp's social + simplicity?

### Tomorrow
- Review friction points and decide which to fix vs accept
- Consider what angle prototype #2 should explore
- Start dev journal habit - write before closing each session

---

## 2026-01-09

### What I Worked On
- Ran persona simulations with Dev Browser
- Tested 3 personas (Linh, Minh, Khoa) across 5 tasks each
- Captured 31 screenshots documenting UI flows
- Generated findings report with 13 friction points

### Thinking / Debates
**AI simulation validity:** Had important realization - AI personas can verify technical flows and apply heuristics, but cannot simulate real emotions, confusion, or discovery behavior. All "findings" are hypotheses to validate with real users.

Documented this limitation in `knowledge/ai-persona-simulation-limitations.md`. This changes how I interpret results: facts (element exists) vs speculation (user would feel confused).

### Decisions Made Today
- Decision: Separate findings into Facts / Heuristics / Speculation categories
- Confidence level: High

- Decision: Create longitudinal persona tracking (accumulated state across sessions)
- Confidence level: Medium (might be over-engineering, but enables richer simulation)

### Open Bets
- Persona tracking system might be overkill for prototypes. Betting it pays off when comparing across 5 prototypes.

### Questions / Uncertainties
- How to weight friction points by persona type? Khoa (power user) has 7 friction points, but he's explicitly not our target user.
- Should friction from non-target personas inform design, or be documented and ignored?

### Tomorrow
- Set up documentation structure
- Write prototype overview
- Decide on friction point prioritization

---

*Earlier entries not captured - journal started 2026-01-09*
