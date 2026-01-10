# CR05: Multi-User Support (Family/Couple Mode) - DESIGN

**Status:** COMPLETE
**Time:** 60-90 minutes (merged Steps 7+8+9)

---

## Context

**Selected Approach:** A + D - Log for Both Toggle + Profile Switcher
**Hypothesis:** One-action shared meal logging increases couple retention

---

## User Flows (Jobs-to-be-Done)

| Job | Statement | Key Actions |
|-----|-----------|-------------|
| J1 | When I set up the app, I want to add my partner so that we can both track | Create household, add partner profile |
| J2 | When I log a shared meal, I want to log for both of us so that neither has to repeat | Toggle "Log for partner", adjust their portion |
| J3 | When I eat alone, I want to log just for myself so that partner's data isn't affected | Keep toggle OFF, log normally |
| J4 | When partner needs to log independently, I want to switch profiles so that they can use their favorites | Tap avatar, switch to partner |
| J5 | When I want to see partner's progress, I want to view their dashboard so that we can motivate each other | Switch profiles, view their history |

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         SETUP FLOW                              │
│                                                                 │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐                │
│  │ Settings │────→│ Add      │────→│ Partner  │                │
│  │          │     │ Partner  │     │ Created  │                │
│  └──────────┘     └──────────┘     └──────────┘                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      LOGGING FLOW                               │
│                                                                 │
│  ┌──────────┐     ┌──────────────────────────────────────────┐  │
│  │ Quick Add│────→│ Portion Picker                           │  │
│  │ (normal) │     │ ┌────────────────────────────────────┐   │  │
│  └──────────┘     │ │ Phở bò                              │   │  │
│                   │ │ [S] [M] [L]                         │   │  │
│                   │ │                                     │   │  │
│                   │ │ ☐ Also log for [Partner Name]      │   │  │
│                   │ │    Their portion: [S] [M] [L]       │   │  │
│                   │ └────────────────────────────────────┘   │  │
│                   │              [Log Meal]                   │  │
│                   └──────────────────────────────────────────┘  │
│                                     │                           │
│                    ┌────────────────┴────────────────┐          │
│                    ↓                                 ↓          │
│             (Toggle OFF)                      (Toggle ON)       │
│                    │                                 │          │
│                    ↓                                 ↓          │
│             ┌──────────┐                      ┌──────────┐      │
│             │ Logged   │                      │ Logged   │      │
│             │ for you  │                      │ for both │      │
│             └──────────┘                      └──────────┘      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    PROFILE SWITCH FLOW                          │
│                                                                 │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐                │
│  │ Header   │────→│ Profile  │────→│ Partner's│                │
│  │ [Avatar] │     │ Picker   │     │ Dashboard│                │
│  └──────────┘     └──────────┘     └──────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Scope Boundaries

### IN SCOPE (v1)

- [J1] Add partner profile (name, calorie goal)
- [J1] Household setup (max 2 profiles for v1)
- [J2] "Also log for [Partner]" toggle in portion picker
- [J2] Partner portion selection (S/M/L)
- [J3] Toggle OFF by default (opt-in shared logging)
- [J4] Profile switcher (avatar in header)
- [J4] Per-profile favorites
- [J5] View partner's daily log (read-only when switched)
- Same-device only (no sync)

### OUT OF SCOPE (deferred)

- Cross-device sync (Meal Sync) - Phase 2
- Push notifications - Phase 2
- More than 2 profiles - Phase 2 (family expansion)
- Shared favorites list - Phase 2
- Partner goals comparison - Phase 2
- Shared meal templates - Phase 2
- Partner invite via link/code - Phase 2 (currently same-device setup only)

---

## Success Metrics

| Type | Metric | Target | Fail |
|------|--------|--------|------|
| Primary | Couple D30 retention (both active) | >50% | <30% |
| Primary | "Log for Both" usage | >40% of eligible meals | <20% |
| Leading | Partner profile creation rate | >60% of couples | <40% |
| Leading | Profile switch frequency | <3x/day avg | >10x/day (friction) |
| Guardrail | Partner abandonment | <30% | >50% |

---

## UX Interactions

### Job J1: Add Partner Profile

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Goes to Settings | Shows "Add Partner" option | After account created |
| 2 | Taps "Add Partner" | Opens partner setup form | - |
| 3 | Enters partner's name | Validates non-empty | - |
| 4 | Sets partner's calorie goal | Slider 1200-3500 | Default 2000 |
| 5 | Taps "Add" | Creates partner profile, returns to settings | Success toast |

### Job J2: Log for Both

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Selects food (favorites/search/scan) | Opens portion picker | - |
| 2 | Selects own portion (S/M/L) | Updates calories | Normal flow |
| 3 | Sees "Also log for [Partner]" toggle | Toggle is OFF by default | Below portion pills |
| 4 | Toggles ON | Shows partner portion options (S/M/L) | Defaults to same as user |
| 5 | Adjusts partner's portion (if different) | Updates partner calories | Optional |
| 6 | Taps "Log Meal" | Logs for both, shows "Logged for you + [Partner]" | Single toast |

### Job J3: Log for Self Only

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Selects food, portion | Toggle remains OFF | No extra action |
| 2 | Taps "Log Meal" | Logs for self only | Normal behavior |

### Job J4: Switch to Partner Profile

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Taps avatar in header | Shows profile dropdown | - |
| 2 | Taps partner's name | Switches to partner's profile | UI updates to their theme/name |
| 3 | Sees partner's dashboard | Their calories, history, favorites | Read-only initially |
| 4 | (Optional) Logs for partner | Uses partner's favorites | - |

### Job J5: View Partner's Progress

| # | User Action | System Response | Notes |
|---|-------------|-----------------|-------|
| 1 | Switches to partner profile | Shows their dashboard | - |
| 2 | Views their daily total | Sees calories consumed/remaining | - |
| 3 | Scrolls history | Sees their logged meals | - |

### Conditional Logic

- IF no partner profile → hide "Also log for" toggle
- IF partner profile exists → show toggle in portion picker
- IF logged for both → toast shows both names
- IF switched to partner → header avatar changes, name label
- IF partner has no favorites → show suggestions (same as new user)

---

## Derived Screens

| ID | Screen Name | From Jobs | Purpose |
|----|-------------|-----------|---------|
| S01 | Add Partner | J1 | Create partner profile |
| S02 | Portion Picker (Enhanced) | J2, J3 | Now with "Log for Partner" toggle |
| S03 | Profile Switcher | J4 | Dropdown to switch profiles |
| S04 | Partner Dashboard | J5 | View partner's data (switched view) |

### Screen Flow

```
[Settings] ──→ [S01 Add Partner] ──→ [Partner Created]
                                          │
                                          ↓
                                   [S03 Profile Switcher now shows 2 profiles]
                                          │
                                          ↓
[Quick Add] ──→ [S02 Portion Picker with toggle] ──→ [Logged for both]
                                          │
                                          ↓
[Header Avatar] ──→ [S03 Profile Switcher] ──→ [S04 Partner Dashboard]
```

---

## Edge Cases

| Scenario | User Action | System Response |
|----------|-------------|-----------------|
| No partner profile | Opens portion picker | No toggle shown, normal flow |
| Partner deleted | Logs with toggle | Toggle disappears after deletion |
| Partner goal not set | Setup partner | Require goal before save |
| Same name as user | Enters user's name | Allow (use avatar to distinguish) |
| Log for partner when switched | Toggle shown? | No - when viewing as partner, log for them directly |
| Both eat, different foods | Each logs separately | Normal individual logging |
| Undo logged-for-both | Taps undo | Undoes both logs |
| Partner profile has no data | Switches to view | Show empty state with "Start tracking" |

---

## Design Complete

**Verdict:** Design is complete. Profile infrastructure + "Log for Both" toggle delivers couple value with manageable scope.

**Ready for:**
- Implementation spec (Step 10)
- Database schema for multi-profile support
- UI components (profile switcher, enhanced portion picker)

**Future Considerations:**
- Cross-device sync (v2 if demand)
- Family expansion (>2 profiles)
- Shared goals and challenges
