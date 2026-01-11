# Retrospective: 02a-AI-Delegation

**Phase:** Build
**Date:** 2025-01-10

---

## What Worked Well

### AI Delegation for CR03 (AI Food Scan)
- Delegation produced working multi-food detection UI quickly
- Confidence badges and checkboxes implemented correctly from specification
- Edit individual portions before confirm flow worked as designed
- `scanSim.ts` simulation provided predictable demo experience
- Overall: AI delegation handled multi-item UI complexity without iteration

### AI Delegation for CR05 (Multi-User Support)
- Partner management hook (`usePartner.ts`) correctly abstracted partner logic
- Add Partner Page captured all required fields (name, calorie goal)
- Profile Switcher (header dropdown) intuitive and functional
- "Log for Both" toggle integration with PortionPicker worked smoothly
- Database updates (`addFoodForUser`) correctly handled multi-user logging
- Overall: AI delegation delivered complete multi-user feature with minimal human intervention

### Bug Detection and Fixes
- Partner logging bug identified quickly through journaling
- Root cause analysis accurate: `isLoadingPartner` not checked by consumers
- Fix applied correctly: Added `isLoadingPartner && partner` guard to toggle visibility
- Profile navigation fix applied correctly: Added `onGoToSettings` prop to ProfileSwitcher

### ADR Documentation
- 3 ADRs written immediately after decisions made:
  - ADR-001: Partner as separate User record
  - ADR-002: Async partner loading guard
  - ADR-003: Simulated AI food scan
- Clear rationale captured for each decision
- Trade-offs documented (pros/cons, reversibility)

### OOUX Documentation Updates
- CR05 features fully integrated into OOUX artifacts:
  - 1-ooux-dot-map.md: Partner Link object added, relationships updated
  - 2-ia-map.md: Add Partner route/screen, Profile Switcher added
  - 3-user-flows.md: J12-J15 flows added (Add Partner, Log for Both, Switch Profile, View Partner)
  - 4-screen-list.md: S17 (Add Partner), M08 (Profile Switcher) added
- Comprehensive updates across all 4 OOUX documents

---

## What Didn't Work

### Async Loading Race Condition
- **Issue:** `usePartner` hook loads partner data asynchronously, but `PortionPicker` showed "Log for Both" toggle immediately
- **Impact:** Toggle visible when `partner` is `null` → silent failure when user enables it
- **Root cause:** Missing `isLoadingPartner` guard - toggle shown before data loaded
- **Fix required:** ADR-002 documented this, but issue should have been caught during implementation
- **Learning:** Async hooks need explicit loading state guards for all consumers

### Profile Navigation Regression
- **Issue:** ProfileSwitcher replaced profile button but removed `/profile` navigation
- **Impact:** Users lost access to settings/profile management
- **Root cause:** Component replacement without preserving all functionality
- **Fix:** Added `onGoToSettings` prop to restore navigation
- **Learning:** Component refactors must verify all preserved behaviors

### Missing Partner Error Handling
- **Issue:** `addFoodForUser` failures had no user-visible feedback (fixed later)
- **Original behavior:** Silent failure when partner log failed
- **Fix:** Added error toast notification
- **Learning:** Database operations need error propagation + user feedback
- **Question:** Why not included in initial implementation? AI delegation missed this edge case

---

## Key Learnings

### AI Delegation Workflow Strengths
- **Fast iteration:** Features implemented quickly with minimal human guidance
- **Handles complex UI:** Multi-food detection UI (CR03) and partner toggle UI (CR05) both correct on first attempt
- **Follows patterns:** AI understood existing codebase patterns from 02-PROTOTYPE
- **Code quality comparable:** Generated code similar quality to manual implementation

### AI Delegation Workflow Weaknesses
- **Misses edge cases:** Async loading guards, error handling not included initially
- **Requires clear specification:** Ambiguous requirements (e.g., "handle errors") produce gaps
- **Debugging challenge:** AI-generated code harder to debug (not familiar with author's thinking)
- **Human intervention:** Still required to fix bugs discovered after implementation

### Specification Clarity Critical
- **CR03 spec:** "Multi-food detection with confidence badges" → AI implemented correctly
- **CR05 spec:** "Partner profiles, profile switcher, log for both" → AI implemented correctly
- **Bug fixes:** Required because specs didn't mention "async loading guards" or "error handling"
- **Learning:** Acceptance criteria must include non-happy paths (loading, errors, edge cases)

### ADR Value for AI Delegation
- **ADR-002 (async loading guard):** Critical for understanding bug fix rationale
- **ADR-003 (simulated AI):** Clear decision on simulation vs real ML
- **Learning:** ADRs help reconstruct AI's "why" when bugs surface later

### OOUX as Implementation Guide
- OOUX artifacts provided clear spec for implementation
- 3-user-flows.md (J13) accurately guided "Log for Both" toggle placement
- 4-screen-list.md (M08) defined Profile Switcher as dropdown
- **Learning:** Well-written OOUX is essential spec for AI delegation to work

---

## Invalidated Assumptions

### Assumption: "AI Will Handle Edge Cases Automatically"
- **What we believed:** Comprehensive feature spec includes all necessary error handling
- **What actually happened:** AI missed async loading guards and error propagation
- **Correction:** Explicit acceptance criteria checklist: loading states, error paths, edge cases

### Assumption: "Simulated AI Is Acceptable for Prototype"
- **What we believed:** Demo simulation enough to test UI flow
- **What actually happened:** Scan page works, but unclear if real AI would be better/worse
- **Correction:** ADR-003 documented this decision, but unclear if this is correct bet for hypothesis validation
- **Question:** Are we validating "AI delegation workflow" or "AI food recognition capability"? Both require different validation

### Assumption: "Partner Link in LocalStorage Is Sufficient"
- **What we believed:** Partner relationship stored locally is fine for same-device use case
- **What actually happened:** Works, but unclear if this is real-world pattern
- **Open question:** Do couples actually share phones? If not, partner link approach is wrong
- **Correction:** Need to validate "same-device" assumption with real couples

---

## Signals We Misread or Ignored

### Over-Weighted: "Feature Completeness"
- Both CR03 and CR05 fully implemented
- **Interpretation:** AI delegation produced production-ready code
- **But:** 2 bugs required fixes (async loading, error handling)
- **Reality:** "First implementation correct" ≠ "production-ready" - bugs discovered after review

### Ignored: "Partner Removal Flow"
- CR05 spec included "add partner" but not "remove partner"
- **Interpretation:** Nice-to-have for prototype
- **But:** Users may want to test removal, unclear what happens to their logs
- **Missed signal:** Incomplete CRUD operations (Create ✅, Read ✅, Update ✅, Delete ❌)

### Ignored: "Cross-Device vs Same-Device"
- ADR-001 documents partner link in localStorage (same-device assumption)
- **But:** No validation whether this is realistic for Vietnamese couples
- **Missed signal:** Could be major assumption invalidation if couples use separate phones

---

## Bias Check

- [ ] **Novelty bias?** Unclear - excitement about AI delegation may over-state capabilities
- [ ] **Over-optimizing edge cases?** No - AI delegation focused on happy path, which caused bugs
- [x] **Recency bias?** Yes - just completed CR03/CR05, focusing on immediate wins (features work) vs long-term concerns (same-device assumption, partner removal)
- [ ] **Personal preference bias?** Unclear - preference for localStorage vs database may reflect personal experience

---

## Would Do Differently

### Acceptance Criteria Checklist
- **Change:** Create explicit checklist for feature specs including non-happy paths
- **Checklist items:**
  - [ ] Happy path (normal user flow)
  - [ ] Loading states (async operations)
  - [ ] Error states (operation failures)
  - [ ] Edge cases (null data, race conditions)
  - [ ] Rollback paths (what if user cancels?)
- **Why:** Prevents AI delegation from only implementing obvious paths

### Bug Discovery Process
- **Change:** Run integration testing before declaring feature complete
- **Testing approach:**
  - Mock partner loading delay → verify toggle doesn't show prematurely
  - Mock database failure → verify error toast appears
  - Test profile switcher → verify settings navigation preserved
- **Why:** Bugs (async loading, error handling) discovered through journaling, not testing

### Partner CRUD Completeness
- **Change:** Implement partner removal before declaring CR05 complete
- **UI to add:**
  - "Remove Partner" option in Profile or Add Partner screen
  - Confirmation dialog: "Remove [Partner]? Their logs will be preserved"
  - Success toast + redirect to partner creation
- **Why:** Incomplete CRUD prevents full hypothesis testing

### Assumption Validation
- **Change:** Document and validate "same-device" assumption before proceeding
- **Validation approach:**
  - Survey 5-10 Vietnamese couples about phone sharing habits
  - If <30% share phones, pivot to cross-device partner link
- **Why:** Major architectural decision (localStorage vs server) depends on this

---

## Prototype Status

### Purpose Achievement
| Goal | Status | Evidence |
|-------|--------|----------|
| Test AI delegation workflow | ✅ Complete | CR03 and CR05 implemented with minimal guidance |
| Validate AI delegation speed | ✅ Complete | Both features implemented quickly |
| Document AI delegation learnings | ✅ Complete | ADRs, journal, retrospective captured |

### Feature Implementation Results
| Feature | Status | Bugs Found | Quality (1-5) |
|---------|--------|-------------|---------------|
| CR03: AI Food Scan | ✅ Complete | 0 | 4 (good) |
| CR05: Multi-User Support | ✅ Complete | 2 | 3 (good after fixes) |

### AI Delegation Metrics
| Metric | Result | Notes |
|--------|--------|-------|
| Time to CR03 (scan) | ~2 hours | Includes spec + implementation |
| Time to CR05 (multi-user) | ~3 hours | Includes spec + implementation + fixes |
| Bugs found post-implementation | 2 | Async loading guard, error handling |
| Human intervention required | Medium | 2 bug fixes, but AI produced working code |

---

## Cross-Prototype Insights

### What 02a-Informs for 02b, 02c, 02d
- **AI delegation is viable** for complex features (multi-user, multi-item UI)
- **Specification clarity** is the critical success factor - vague specs produce buggy code
- **ADR discipline** essential for understanding AI decisions
- **OOUX artifacts** are perfect delegation input - well-structured specs produce good results

### What 02a-Reveals About AI Delegation Approach
- **Strengths:**
  - Fast implementation speed (hours vs days for manual)
  - Good at following existing patterns
  - Handles complex UI logic correctly
- **Weaknesses:**
  - Misses edge cases (async loading, error handling)
  - Harder to debug (not familiar with code author's mental model)
  - Still requires human intervention for fixes
- **Best for:** Features with clear, well-defined requirements and existing code patterns to follow
- **Worst for:** Ambiguous specs or novel patterns with no code reference

### Comparison Experiment Implications
- **02a (AI delegation)** is one of 4 approaches to test
- **Metrics to collect for comparison:**
  - Implementation speed (AI delegation vs prototype-lite vs gated vs prototypER)
  - Bug count (how many post-implementation fixes?)
  - Code quality (maintainability, type safety)
  - Human intervention required (how many manual fixes?)
- **Goal:** Fill `docs/comparisons/implementation-approaches.md` with real data

---

## Recommendations for Future Prototypes

### If Using AI Delegation
- Write explicit acceptance criteria with loading/error/edge case checklist
- Test non-happy paths before declaring complete
- Document ADRs immediately after AI decisions (reconstruct rationale while fresh)
- Use OOUX artifacts as primary delegation input (they're excellent specs)

### If Not Using AI Delegation
- Manual implementation may catch edge cases during development (vs discovering them post-AI)
- Slower implementation speed but potentially fewer bugs
- Manual implementation produces more familiar code for debugging

### Cross-Prototype Comparison
- Implement same feature (CR03 or CR05) across all 4 variants (02a, 02b, 02c, 02d)
- Measure: time, bugs, quality, human intervention
- Compare AI delegation against other approaches (prototype-lite, prototype-gated, prototypER)
- Goal: Determine which approach is best for which feature types
