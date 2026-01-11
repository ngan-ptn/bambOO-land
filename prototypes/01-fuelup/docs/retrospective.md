# Retrospective: 01 FuelUp

**Phase:** Test
**Date:** 2025-01-10

---

## What Worked Well

### Shared Streak Concept
- The "don't break our streak" framing was emotionally resonant - social accountability felt motivating rather than judgmental
- 2-tap logging for favorites achieved speed goal for primary persona (Linh)
- Progress visualization (streak days + partner status) provided immediate feedback

### Simplicity
- 5-food database reduced decision fatigue for casual users
- Dual profile switcher was intuitive (tap avatar, select partner)
- Nudge mechanism design was unobtrusive but visible

### Persona Testing Framework
- Running 3 personas (Linh, Minh, Khoa) revealed clear friction distribution
- Automated screenshots captured detailed UI flow documentation
- Friction categorization (High/Medium/Low) helped prioritize issues

### Infrastructure
- LocalStorage persistence worked reliably for demo
- Monorepo structure enabled easy comparison with other prototypes

---

## What Didn't Work

### Onboarding Gap
- **Major friction point:** No introduction to "shared streak" concept - users dropped into app without understanding core mechanic
- Minh (first-time persona) struggled with understanding why partner status mattered
- No explanation of what happens when streak breaks (recovery vs failure)

### Macro Tracking Absence
- **Major friction point (Khoa persona):** Khoa abandoned testing because no protein/carbs/fat data
- 7 of 13 friction points from Khoa related to precision tracking
- Our non-goal (not a comprehensive tracker) alienated power users

### Limited Food Search
- Scrolling through 5 foods tedious when looking for specific items
- No Vietnamese search despite Vietnamese UI labels
- Foods organized by category but category not visible on main screen

### Portion Sizing Ambiguity
- No guidance on what S/M/L means (grams? visual?)
- Users guessed, but different users guessed differently
- No reference to real-world portions (e.g., "M = standard bowl size")

### Scan Feature Disconnect
- AI scanner UI existed but wasn't integrated with logging flow
- Users expected "scan → edit → log" but scan was isolated demo
- Created false expectation of feature availability

### Nudge Mechanism Clarity
- Nudge notification appeared but unclear what "remind partner" means
- No preview of message before sending
- Partner receiving end not simulated (no reciprocal flow)

---

## Key Learnings

### Social Accountability Trade-offs
- Shared motivation works for couples with existing emotional bonds
- **However:** Same-device constraint may not reflect real-world use (couples often have separate phones)
- Streak recovery is crucial - users who miss a day need clear path back, not "start over"

### Precision vs Speed Tension
- S/M/L portions enabled fast logging (<30s for Linh)
- **But:** Power users (Khoa) need macro data to make informed decisions
- **Insight:** Speed-focused features don't preclude precision - both can coexist with layering

### Persona-Based Testing Value
- Primary persona (efficiency) validated core hypothesis - fast logging works
- Secondary persona (first-time) revealed onboarding gaps
- Tertiary persona (precision) illuminated what we intentionally excluded
- **Takeaway:** All 3 personas needed to see full picture

### Documentation Gaps Impact Development
- ADRs not documented for 01-fuelup (decisions made but not captured)
- Journal captured thoughts but retrospectives would have captured systematic learnings earlier
- **Lesson:** Write retrospective immediately after each phase, not batch later

---

## Invalidated Assumptions

### Assumption: "Simplicity Wins Over Precision"
- **What we believed:** Casual users won't care about macros, S/M/L is sufficient
- **What actually happened:** Khoa (precision persona) abandoned app entirely due to lack of macro data
- **Correction:** Provide baseline precision (macros visible) even if speed is primary goal

### Assumption: "Shared Streak Concept Is Self-Explanatory"
- **What we believed:** Partners will understand "don't break our streak" without tutorial
- **What actually happened:** Minh (first-time) clicked through UI without understanding social mechanic
- **Correction:** Onboarding must explain: (1) what is shared streak, (2) why it matters, (3) what happens if broken

### Assumption: "5 Foods Covers Most Use Cases"
- **What we believed:** Small database reduces decision fatigue without sacrificing utility
- **What actually happened:** Users wanted more foods (search bar usage indicated desire for variety)
- **Correction:** Balance simplicity with discoverability - show categories, enable search from home

### Assumption: "AI Scanner Demo Is Harmless"
- **What we believed:** Simulated scanner shows future capability without cost
- **What actually happened:** Users expected functional feature, confusion when it didn't integrate with logging
- **Correction:** Either make scanner functional or remove entirely from UI

---

## Signals We Misread or Ignored

### Over-weighted: "No Friction from Linh"
- Linh (efficiency persona) had only 1 friction point
- **Interpretation:** Prototype is highly optimized for our target user
- **Misread:** This masked the 12 other friction points from Minh and Khoa
- **Reality:** Primary persona validated speed, but secondary/tertiary revealed critical gaps

### Ignored: "Search Bar Usage Pattern"
- Minh repeatedly clicked search bar but returned to food tiles
- **Interpretation:** User exploring UI
- **Missed signal:** Search is expected interaction pattern - not having it working creates cognitive dissonance

### Discounted: "Khoa's Abandonment"
- Khoa stopped mid-testing
- **Interpretation:** Power users aren't our target, acceptable loss
- **Missed signal:** Even power users might use app for casual tracking if basic data visible

---

## Bias Check

- [x] **Novelty bias?** Yes - Initial excitement about "shared streak" concept may have over-weighted its appeal without validating against real couples
- [x] **Over-optimizing edge cases?** No - we prioritized simplicity over power user needs (intentional non-goal)
- [x] **Recency bias?** Possibly - Testing completed Jan 9-10, retrospective written Jan 11, fresh insights may feel more critical than they are
- [ ] **Personal preference bias?** Unclear - Need external validation on whether social accountability is actual preference vs novelty

---

## Would Do Differently

### Retrospective Practice
- **Change:** Write retrospective immediately after persona testing, not 1 day later
- **Why:** Fresh details captured, less reconstruction bias
- **Action:** Create retrospective template checklist to complete before moving to next prototype

### Onboarding Flow
- **Change:** Add 3-step onboarding explaining shared streak
  1. "What is shared streak?" (both people must log daily)
  2. "Why does it work?" (accountability to your partner)
  3. "What if we miss a day?" (streak recovery mechanism)
- **Why:** Minh's 5 friction points included "no onboarding for streak concept"
- **Action:** Build onboarding wizard with visual explanation before entering main app

### Macro Visibility
- **Change:** Show macro breakdown (protein/carbs/fat) on progress ring and food tiles
- **Why:** Khoa abandoned due to lack of precision - macros are baseline expectation even for casual trackers
- **Action:** Add macro data to `FOOD_DB` structure and display in Dashboard and PortionPicker

### Food Search
- **Change:** Make search functional with Vietnamese + English matching
- **Why:** Users expected search, empty results created confusion
- **Action:** Implement `useFoodSearch` hook with filter logic, expose search bar on Home

### Portion Guidance
- **Change:** Add "(~200g)" reference text to portion sizes
- **Why:** Users guessed what S/M/L meant - explicit reference reduces cognitive load
- **Action:** Update portion labels: "Small (~150g)", "Medium (~200g)", "Large (~300g)"

### Scanner Integration or Removal
- **Change:** Either (A) make scanner functional with flow to PortionPicker, or (B) remove scanner from UI
- **Why:** Isolated scanner created false expectations
- **Action:** Decision point - if scanner value > implementation cost, integrate; otherwise remove

### Documentation Discipline
- **Change:** Create ADRs for 01-fuelup decisions
- **Why:** "Why S/M/L?" and "Why 5 foods?" decisions not captured
- **Action:** Add ADR-001-simplified-food-db.md, ADR-002-local-storage-only.md

---

## Prototype Status

### Hypotheses Results
| Hypothesis | Result | Evidence |
|------------|--------|----------|
| H1: Shared streak increases adherence | **Inconclusive** | Linh logged consistently (positive), but no real-world longitudinal data |
| H2: <30s logging is achievable | **Validated** | Linh logged in 2-3 taps, ~3 seconds |
| H3: Partner status visibility motivates | **Partially validated** | UI shows partner status, but no evidence this changed behavior |
| H4: Nudges are used appropriately | **Unclear** | Nudge UI exists but unclear if users understood purpose |

### Success Metrics
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| 7-day retention | >60% | N/A (not measured) | - |
| Average logging time | <30s | ~3s (Linh) | ✅ |
| Streak recovery rate | >40% | N/A (not measured) | - |

---

## Cross-Prototype Insights

### What 01-fuelup Informs for 02-PROTOTYPE
- **Keep:** Fast logging flow (2-tap favorites)
- **Improve:** Add macro visibility (Khoa's feedback)
- **Improve:** Functional food search
- **Add:** Onboarding explaining core concept

### What 01-fuelup Informs for AI Delegation (02a) Testing
- **Question:** Can AI delegation handle onboarding flow effectively?
- **Question:** Will AI prioritize macros or default to calories-only?
- **Question:** How does AI approach "simulated feature" dilemma (scanner)?

### What 01-fuelup Reveals About Target Users
- Primary persona (Linh) validates speed-over-precision approach
- **But:** Secondary/tertiary personas have unmet needs
- **Insight:** Product may need user-tailored modes (simple vs full-featured)
