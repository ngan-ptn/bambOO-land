# Retrospective: 02-PROTOTYPE (Base Calo Tracker)

**Phase:** Build
**Date:** 2025-01-10

---

## What Worked Well

### Reference Implementation Structure
- Clean separation of concerns: components/ db/ hooks/ pages/ data/ types/
- OOUX-first approach produced comprehensive documentation before implementation
- TypeScript + React 18 stack provided type safety and modern patterns
- sql.js WASM enabled reliable browser-based persistence

### Folder Cloning for Variants
- Copying entire folder structure to 02a/02b/02c/02d enabled parallel development
- All variants run simultaneously on different ports (5173, 5174, 5175, 5176)
- Easy visual side-by-side comparison of implementation approaches
- No git branch complexity during rapid iteration

### Documentation-First Workflow
- OOUX artifacts (dot map, IA map, user flows, screen list) provided clear implementation specs
- User-friendly naming in OOUX docs improved stakeholder communication
- Template-driven documentation ensured consistency across prototypes

### Vietnamese Food Database
- 50+ foods with S/M/L portions covered 80%+ of common Vietnamese street food
- Foods organized by category (noodles, rice, bánh mì, snacks, drinks, desserts, clean eating)
- Dual naming (Vietnamese + English) improved discoverability

### Feature Completeness
- All core features implemented before variant experiments:
  - Auth flow (simulated)
  - Onboarding (4-step wizard)
  - Dashboard with progress ring
  - Quick Add with food tiles
  - Portion picker (S/M/L)
  - Favorites and meal combos
  - Search functionality
  - Timeline (meal history)
  - Manual entry
  - Profile/Goals editing

---

## What Didn't Work

### ADRs Not Documented
- Decision-making process not captured for 02-PROTOTYPE
- Questions: Why S/M/L portions? Why 50 foods? Why sql.js over alternatives?
- **Impact:** Harder to understand rationale when variants diverged

### Onboarding Length
- 4-step wizard (welcome → name → goal → calories) may be too long
- No early exit option (users want to explore app before setting up)
- Testing not done to validate onboarding completion rate

### Scan Feature Isolation
- Scan page exists but not integrated with logging flow
- Simulated detection (not real AI) creates false expectation
- Clear disconnect between "Add Options" sheet and scan button

### Meal Combo Complexity
- Combo creation and editing UI is multi-step
- Users must navigate to separate screen to manage combos
- No "quick combo" creation from today's logged foods

### Search Context Loss
- Search is separate screen, not inline on Home
- User must: tap search bar → type → select → back to add flow
- Expected pattern: search bar shows results on current screen (not separate page)

---

## Key Learnings

### Folder Cloning vs Git Branches
- **Learned:** Folder clones are superior for rapid prototyping comparison
- **Benefits:**
  - Can run all variants simultaneously
  - No merge conflicts when comparing approaches
  - Easy to delete/restart variant if experiment fails
- **Cost:** Code duplication (acceptable for experiment duration)

### OOUX-First Development
- **Learned:** Writing OOUX documentation first forces thinking before coding
- **Benefits:**
  - Reduces mid-stream pivots (everything is thought through)
  - Provides artifact for stakeholder review
  - Makes implementation specification clearer
- **Trade-off:** Slower initial velocity, faster overall with fewer reworks

### Reference Implementation Value
- **Learned:** Having a "correct" base implementation is critical for comparison
- **Insights:**
  - Variants can be measured against baseline
  - Bugs in variants visible immediately when side-by-side
  - Design patterns from base inform variant implementations

### TypeScript in Prototypes
- **Learned:** TypeScript overhead pays off even in rapid prototyping
- **Benefits:**
  - Auto-completion speeds up coding
  - Type errors catch bugs early
  - Props documentation improves component clarity
- **Trade-off:** Slower initial setup, but net positive

### Radix UI for React
- **Learned:** Headless UI components reduce styling time significantly
- **Pattern:** Use Radix primitives + Tailwind for styling
- **Benefit:** Focus on logic, not CSS implementation details

---

## Invalidated Assumptions

### Assumption: "4-Step Onboarding Is Acceptable"
- **What we believed:** Users will complete 4-step wizard before seeing main app
- **What actually happened:** No testing done to validate onboarding completion
- **Correction:** Need onboarding abandonment metrics - how many users drop at each step?

### Assumption: "50 Foods Sufficient for Demo"
- **What we believed:** Small database reduces decision fatigue
- **What actually happened:** 01-fuelup feedback (Minh persona) wanted more foods, search expected
- **Correction:** Balance simplicity with extensibility - structure supports easy food addition

### Assumption: "Scan UI Placeholder Is Harmless"
- **What we believed:** Showing scan page (even non-functional) demonstrates future capability
- **What actually happened:** 01-fuelup testing showed users expected functional feature
- **Correction:** Either integrate scan fully or remove from UI - avoid "teaser" features

---

## Signals We Misread or Ignored

### Over-Weighted: "Component Structure Quality"
- Clean separation of concerns (components/ db/ hooks/) felt like a win
- **But:** No measurement of how this actually impacted development speed
- **Reality:** Good structure may have added overhead in rapid prototyping

### Ignored: "Search UX Pattern"
- Search as separate page was default design decision
- **But:** Industry standard is inline search with results (Google, e-commerce)
- **Missed signal:** No user testing on search pattern - assumed separate page is fine

---

## Bias Check

- [ ] **Novelty bias?** Unclear - excited about OOUX methodology, may have over-valued documentation benefits
- [ ] **Over-optimizing edge cases?** No - prioritized happy path for fast logging
- [x] **Recency bias?** Yes - just completed build, focusing on recent wins (cloning, OOUX) vs long-term needs (onboarding validation, search UX)
- [ ] **Personal preference bias?** Unclear - preference for TypeScript may not reflect all developer preferences

---

## Would Do Differently

### Documentation Practice
- **Change:** Create ADRs for 02-PROTOTYPE decisions
- **Decisions to capture:**
  - Why S/M/L portions instead of grams?
  - Why 50 foods vs 200?
  - Why sql.js over IndexedDB/LocalStorage?
  - Why Radix UI over other libraries?
- **Why:** Makes rationale explicit, aids comparison learning

### Onboarding Validation
- **Change:** Run mock user testing on onboarding flow before declaring complete
- **Metrics to capture:**
  - Drop-off rate at each step
  - Average time to complete
  - First-time user confusion points
- **Why:** 4-step onboarding is major friction point - must validate completion

### Scan Feature Strategy
- **Change:** Either (A) fully implement simulated scan with flow to PortionPicker, or (B) remove scan from UI entirely
- **Why:** Partial implementation creates false expectations
- **Action:** Decide on scan feature before variant experiments - treat as either core feature or removed

### Search UX Improvement
- **Change:** Make search inline on Home screen with results dropdown
- **Why:** Separate page adds navigation overhead, not inline with user's current task (logging)
- **Pattern:** Radix UI Popover + Combobox for dropdown search

### Meal Combo Quick-Create
- **Change:** Add "Save today as combo" button on Timeline
- **Why:** Enables quick combo creation from actual logged meals, not manual construction
- **Action:** Add combo creation modal that pre-fills from today's logs

---

## Prototype Status

### Purpose Achievement
| Goal | Status | Evidence |
|-------|--------|----------|
| Create reference implementation | ✅ Complete | All core features built, OOUX documented |
| Enable 4-variant comparison | ✅ Complete | Folder clones created, all variants run simultaneously |
| Establish design patterns | ✅ Complete | Component structure, styling patterns established |

### Hypotheses Validation
| Hypothesis | Result | Evidence |
|------------|--------|----------|
| H1: S/M/L portions enable fast logging | **Validated** | 2-3 tap logging flow |
| H2: Vietnamese food database enables fast discovery | **Partially validated** | 50 foods good, but search UX needs work |
| H3: Progress ring drives engagement | **Unvalidated** | No user testing on dashboard effectiveness |

### Technical Debt
| Area | Debt | Priority |
|-------|--------|----------|
| Onboarding | No validation of completion rate | Medium |
| Scan | Partial implementation, unclear feature status | High |
| Search | Separate page UX vs industry standard | Medium |
| Combos | No quick-create from logged meals | Low |

---

## Cross-Prototype Insights

### What 02-PROTOTYPE Provides to Variants
- **Reference implementation:** Known-working baseline for comparison
- **Component patterns:** Radix UI + Tailwind styling approach
- **Data model:** SQLite schema + repository pattern
- **Routing structure:** react-router-dom v6 + appNav reducer pattern
- **OOUX documentation:** Full spec for implementation guidance

### What 02-PROTOTYPE Needs from Variants
- **Implementation comparison data:** Which approach produced best results?
- **Code quality assessment:** AI delegation vs manual vs gated approaches
- **Speed metrics:** Time-to-feature for each approach
- **Quality metrics:** Bugs found, iteration count, human intervention

### Comparison Experiment Setup
- **Next:** Define feature to implement across all 4 variants
- **Feature candidates:**
  - Partner profile switching (from CR05 multi-user)
  - "Log for Both" toggle functionality
  - Macro visualization improvements
  - Search UX enhancement
- **Goal:** Fill in `docs/comparisons/implementation-approaches.md` results

---

## Recommendations for 02a, 02b, 02c, 02d

### Must Do (From Base)
- Use Radix UI primitives for all interactive components
- Follow component/ folder structure (Dashboard/, QuickAdd/, shared/)
- Implement appNav reducer pattern for screen state management
- Use sql.js repository pattern for database operations
- Follow OOUX specifications from outputs/ooux-ia-flows/

### Should Do (Learnings from Base)
- Add ADR documentation for design decisions
- Validate onboarding flow with mock testing
- Make search inline (not separate page)
- Decide: fully implement features or remove UI placeholders

### Don't Do (Base Mistakes to Avoid)
- Don't leave partial features without clear status (e.g., scan as demo)
- Don't assume 4-step onboarding is fine without testing
- Don't skip documentation of architectural decisions
