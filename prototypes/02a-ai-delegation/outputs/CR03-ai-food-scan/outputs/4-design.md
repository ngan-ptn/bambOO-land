# CR03: AI-Powered Food Scan - DESIGN

**Status:** COMPLETE
**Time:** 60-90 minutes (merged Steps 7+8+9)

---

## Context

**Selected Approach:** B - Capture-Then-Process
**Hypothesis:** Photo-based food recognition reduces logging effort for complex meals

---

## User Flows (Jobs-to-be-Done)

| Job | Statement | Key Actions |
|-----|-----------|-------------|
| J1 | When I have a meal in front of me, I want to scan it so that I can log without typing | Open camera, take photo, review, confirm |
| J2 | When AI gets it wrong, I want to correct it so that my data is accurate | Edit food name, adjust calories, save |
| J3 | When AI can't identify food, I want to fall back to manual so that I can still log | See low confidence, tap "Enter manually" |
| J4 | When scanning multiple items, I want to select which to log so that I only track what I'll eat | Review detected items, toggle on/off |

### Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Quick Add  │────→│   Camera    │────→│  Capture    │
│   (Scan)    │     │   Preview   │     │   Photo     │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ↓
                                        ┌─────────────┐
                                        │  Analyzing  │
                                        │  (2-3 sec)  │
                                        └──────┬──────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    ↓                          ↓                          ↓
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │  High Conf  │           │  Low Conf   │           │   Failed    │
             │  Results    │           │  Results    │           │  (No food)  │
             └──────┬──────┘           └──────┬──────┘           └──────┬──────┘
                    │                         │                         │
                    ↓                         ↓                         ↓
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │   Review    │           │  "Not sure" │           │  Manual     │
             │   & Log     │           │   + Edit    │           │  Entry      │
             └──────┬──────┘           └──────┬──────┘           └─────────────┘
                    │                         │
                    └─────────────────────────┘
                                │
                                ↓
                         ┌─────────────┐
                         │  Logged!    │
                         │  (Toast)    │
                         └─────────────┘
```

---

## Scope Boundaries

### IN SCOPE (v1)

- [J1] Camera capture screen (single photo)
- [J1] Processing/analyzing loading state
- [J1] Results screen with detected foods + calories
- [J2] Edit individual item (name, calories)
- [J2] Remove item from results
- [J3] "Can't identify" → manual entry fallback
- [J4] Toggle items on/off before logging
- Confidence indicator (high/medium/low)
- "Log All" button to confirm
- Vietnamese food recognition model

### OUT OF SCOPE (deferred)

- Real-time camera overlay - Phase 2
- Barcode scanning - separate feature
- Multi-photo capture - Phase 2
- Portion size adjustment (S/M/L for scan) - Phase 2
- Meal history learning - Phase 2
- Nutritional breakdown (protein, carbs) - Phase 2
- Share meal photo - Phase 3
- Meal rating/feedback - Phase 2

---

## Success Metrics

| Type | Metric | Target | Fail |
|------|--------|--------|------|
| Primary | Recognition accuracy (top-1) | >80% | <60% |
| Primary | Scan-to-log completion rate | >70% | <50% |
| Leading | Time to log (scan path) | <20s | >45s |
| Leading | Edit rate after scan | <30% | >50% |
| Guardrail | Scan abandonment rate | <20% | >40% |

---

## UX Interactions

### Job J1: Scan and Log

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Taps camera icon | Opens camera view | Permission prompt if first time |
| 2 | Frames food in viewfinder | Shows capture button | Guide overlay optional |
| 3 | Taps capture button | Takes photo, shows "Analyzing..." | 2-3 second animation |
| 4 | Waits | Shows results screen | Detected items with calories |
| 5 | Reviews items | All items toggled ON by default | Can toggle off |
| 6 | Taps "Log Meal" | Logs selected items, shows toast | Returns to Quick Add |

### Job J2: Correct AI Mistake

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | On results, taps item | Opens edit view | Inline or modal |
| 2 | Changes food name | Updates calories if in DB | Auto-lookup |
| 3 | Adjusts calories manually | Accepts custom value | Optional |
| 4 | Taps Save | Updates item in results | - |
| 5 | Continues to log | Uses corrected values | - |

### Job J3: Fall Back to Manual

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Sees "Can't identify" or low confidence | Shows "Enter manually" button | Prominent CTA |
| 2 | Taps "Enter manually" | Opens manual entry modal | Pre-filled if partial match |
| 3 | Enters name + calories | - | Same as CR02 manual |
| 4 | Taps Save | Adds to results | Can continue with scan results |

### Job J4: Select Items to Log

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | On results, sees multiple items | Each has checkbox/toggle | All ON by default |
| 2 | Taps item to deselect | Toggles off, dimmed | Won't be logged |
| 3 | Taps "Log Meal" | Only logs selected items | Total calories updates |

### Conditional Logic

- IF camera permission denied → show explanation + settings link
- IF recognition confidence < 60% → show yellow "Not sure" badge
- IF recognition confidence < 40% → auto-suggest manual entry
- IF no food detected → "No food detected. Try again or enter manually?"
- IF multiple items detected → show count "3 items detected"

---

## Derived Screens

| ID | Screen Name | From Jobs | Purpose |
|----|-------------|-----------|---------|
| S01 | Camera Capture | J1 | Take photo of food |
| S02 | Analyzing (Loading) | J1 | Processing state |
| S03 | Scan Results | J1, J2, J4 | Review detected items |
| S04 | Edit Item | J2 | Correct single item |
| S05 | Manual Fallback | J3 | Enter food manually |

### Screen Flow

```
[Quick Add] ──→ [S01 Camera] ──→ [S02 Analyzing] ──→ [S03 Results]
                     │                                    │
                     │                              ┌─────┴─────┐
                     │                              ↓           ↓
                     │                        [S04 Edit]  [S05 Manual]
                     │                              │           │
                     │                              └─────┬─────┘
                     │                                    ↓
                     └───────────────────────────→ [Log + Toast]
```

---

## Edge Cases

| Scenario | User Action | System Response |
|----------|-------------|-----------------|
| Camera permission denied | Opens scan | Show explanation, link to settings |
| Poor lighting | Takes dark photo | "Photo too dark. Try better lighting?" |
| Multiple same items | Scans plate with 3 dumplings | Show "Há cảo x3" with total calories |
| Partially eaten food | Scans half-eaten meal | Recognize what's visible, user adjusts |
| Non-food in frame | Scans table with phone | "No food detected" |
| Network error | Takes photo | Process locally if possible, or "Try again" |
| Very long processing | Waits >5s | Show "Taking longer than usual..." |

---

## Design Complete

**Verdict:** Design is complete. Clear flow from camera to logged meal with fallbacks for AI failures.

**Ready for:**
- Implementation spec (Step 10)
- ML model training requirements
- API integration for food recognition service
