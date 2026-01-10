# CR04: Improve Portion Estimation UX - DESIGN

**Status:** COMPLETE
**Time:** 60-90 minutes (merged Steps 7+8+9)

---

## Context

**Selected Approach:** A - Confidence Badge + Quick Adjust
**Hypothesis:** Transparency (confidence) + easy adjustment increases trust in AI estimates

---

## User Flows (Jobs-to-be-Done)

| Job | Statement | Key Actions |
|-----|-----------|-------------|
| J1 | When AI estimates my portion, I want to see confidence so that I know whether to trust it | View confidence badge, decide to accept or adjust |
| J2 | When the AI estimate is close, I want to accept quickly so that I can move on | Tap "Looks good!" button |
| J3 | When the AI estimate is wrong, I want to adjust easily so that my data is accurate | Tap adjust, select S/M/L or enter custom |
| J4 | When I need precise control, I want to enter exact values so that my tracking is accurate | Tap "Custom", enter grams or calories |

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCAN RESULT SCREEN                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  📸 [Food Photo]                                          │  │
│  │                                                           │  │
│  │  🍜 Phở bò                                                │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ AI Estimate: Medium portion     [🟢 High confidence] │  │  │
│  │  │ 450 kcal                                             │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │            [ ✓ Looks good! ]                        │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              [ Adjust portion ]                      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

                              │
              ┌───────────────┴───────────────┐
              ↓                               ↓
       (Looks good!)                  (Adjust portion)
              │                               │
              ↓                               ↓
        ┌──────────┐                  ┌──────────────────┐
        │  Logged  │                  │  Portion Picker  │
        │  Toast   │                  │  ┌───┐┌───┐┌───┐ │
        └──────────┘                  │  │ S ││ M ││ L │ │
                                      │  └───┘└───┘└───┘ │
                                      │   [ Custom... ]  │
                                      └────────┬─────────┘
                                               │
                              ┌────────────────┴────────────────┐
                              ↓                                 ↓
                       (S/M/L selected)                  (Custom tapped)
                              │                                 │
                              ↓                                 ↓
                        ┌──────────┐                    ┌──────────────┐
                        │  Logged  │                    │ Custom Entry │
                        │  Toast   │                    │ [___ grams]  │
                        └──────────┘                    │ or [___ kcal]│
                                                        └──────┬───────┘
                                                               ↓
                                                        ┌──────────┐
                                                        │  Logged  │
                                                        │  Toast   │
                                                        └──────────┘
```

---

## Scope Boundaries

### IN SCOPE (v1)

- [J1] Confidence badge (High/Medium) on AI estimates
- [J2] "Looks good!" quick accept button (prominent)
- [J3] "Adjust portion" → S/M/L picker
- [J4] Custom entry option (grams OR calories)
- Confidence-based UI adaptation:
  - High (>80%): Green badge, "Looks good!" default
  - Medium (60-80%): Yellow badge, equal prominence for accept/adjust
  - Low (<60%): No badge, direct to adjustment
- Updated portion picker with confidence context

### OUT OF SCOPE (deferred)

- Visual portion comparison photos - Phase 2
- Slider adjustment - rejected
- Guided correction flow - rejected
- Per-user portion learning - Phase 2
- Confidence explanation ("Why this estimate?") - Phase 2
- Feedback collection ("Was this accurate?") - Phase 2

---

## Success Metrics

| Type | Metric | Target | Fail |
|------|--------|--------|------|
| Primary | User trust rating | >7/10 | <5/10 |
| Primary | Edit rate for High confidence | <20% | >40% |
| Leading | "Looks good!" tap rate | >60% | <40% |
| Leading | Custom entry usage | <10% | >25% |
| Guardrail | Scan abandonment | <10% | >20% |

---

## UX Interactions

### Job J1: View Confidence and Decide

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Scans food (CR03 flow) | Shows result with confidence badge | Badge color indicates level |
| 2 | Sees "High confidence" | Green badge, large "Looks good!" button | Optimized for accept |
| 3 | Sees "Medium confidence" | Yellow badge, equal buttons | Neutral presentation |
| 4 | (Low confidence) | No badge, shows adjustment options directly | Skip "accept" path |

### Job J2: Quick Accept (High Confidence)

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Sees high confidence result | "Looks good!" button prominent | Primary CTA |
| 2 | Taps "Looks good!" | Logs meal, shows toast | Single tap to done |

### Job J3: Adjust with S/M/L

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Taps "Adjust portion" | Opens portion picker bottom sheet | S/M/L pills |
| 2 | Sees current selection highlighted | M is highlighted (if AI said Medium) | Visual context |
| 3 | Taps different size | Updates calorie display | Real-time update |
| 4 | Taps "Log" | Logs with new portion, shows toast | - |

### Job J4: Custom Entry

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | In portion picker, taps "Custom" | Shows input fields | Grams AND calories |
| 2 | Enters grams | Auto-calculates calories | If food has per-gram data |
| 3 | OR enters calories directly | Accepts custom value | Override mode |
| 4 | Taps "Save" | Logs with custom values | - |

### Conditional Logic

- IF confidence > 80% → show green badge, "Looks good!" as primary
- IF confidence 60-80% → show yellow badge, buttons equal size
- IF confidence < 60% → skip confidence display, show adjustment options
- IF user adjusts from AI estimate → log adjustment for analytics
- IF custom value differs >50% from AI → prompt "Are you sure?" (optional)

---

## Derived Screens

| ID | Screen Name | From Jobs | Purpose |
|----|-------------|-----------|---------|
| S01 | Scan Result (Enhanced) | J1, J2 | Show AI result with confidence + accept/adjust |
| S02 | Portion Picker (Enhanced) | J3 | S/M/L with current selection highlighted |
| S03 | Custom Entry Modal | J4 | Grams/calories input |

### Screen Flow

```
[CR03 Scan] ──→ [S01 Scan Result] ──→ "Looks good!" ──→ [Logged]
                      │
                      ↓
               "Adjust portion"
                      │
                      ↓
               [S02 Portion Picker]
                      │
              ┌───────┴───────┐
              ↓               ↓
          [S/M/L]        [Custom]
              │               │
              ↓               ↓
          [Logged]    [S03 Custom Entry]
                              │
                              ↓
                          [Logged]
```

---

## Edge Cases

| Scenario | User Action | System Response |
|----------|-------------|-----------------|
| Very low confidence (<40%) | Scans ambiguous food | Skip to portion picker directly, no confidence shown |
| User always adjusts | Consistently edits AI | Track pattern, consider personalization (Phase 2) |
| Custom entry = 0 calories | Enters 0 | Allow (water, diet drinks) |
| Custom entry very high (>2000) | Enters 3000 kcal | Warning: "This seems high. Continue?" |
| Network error during scan | Taps adjust | Local S/M/L options still work |
| Food not in S/M/L DB | Rare food scanned | Show AI estimate only, custom entry for adjustment |

---

## Design Complete

**Verdict:** Design is complete. Confidence badges and streamlined adjustment flow address trust issues.

**Ready for:**
- Implementation spec (Step 10)
- Integration with CR03 scan results
- Analytics setup for confidence-to-edit tracking
