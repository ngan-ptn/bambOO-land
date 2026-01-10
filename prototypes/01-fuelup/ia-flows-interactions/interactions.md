# Step 9: UX Interactions — Decision Card

```
┌─────────────────────────────────────────────────────────────────────────┐
│ CR-ID: CR05-MULTI-USER         Step: 9-UX Interactions                  │
│ Status: 🟡 PENDING             Date: 2026-01-07                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 📋 SUMMARY                                                              │
│ Interactions derived from: 4 Jobs + 4 Capabilities                      │
│ Derivation: Job → User Action → System Response → Screen (output)       │
├─────────────────────────────────────────────────────────────────────────┤
│ 🔄 INTERACTION OVERVIEW                                                 │
│ ┌──────────────────────────┬──────────────┬─────────────┐               │
│ │ Job → Capability         │ User Actions │ Sys Responses│              │
│ ├──────────────────────────┼──────────────┼─────────────┤               │
│ │ J1: Setup household      │ 4            │ 5           │               │
│ │ J2: Log shared meal      │ 3            │ 4           │               │
│ │ J3: Switch profile       │ 2            │ 3           │               │
│ │ J4: View household       │ 2            │ 3           │               │
│ └──────────────────────────┴──────────────┴─────────────┘               │
│                                                                         │
│ 📦 DERIVED SCREENS: ~8 components needed                                │
├─────────────────────────────────────────────────────────────────────────┤
│ 👉 AI RECOMMENDATION: Accept interactions                               │
│                                                                         │
│ Rationale:                                                              │
│ • All interactions map directly to Jobs (easy to validate)              │
│ • <14s timing for J2 (well under 30s constraint)                        │
│ • Consent flow satisfies C1 ethics (default OFF, explicit grant)        │
│ • Screens derived from needs, not assumed                               │
├─────────────────────────────────────────────────────────────────────────┤
│ ✅ DECISION                                                             │
│ [ ] Accept interactions  [ ] Simplify  [ ] Add error paths              │
│ Notes: _______________________________________________                  │
│ Decided by: ________________  Date: ______________                      │
├─────────────────────────────────────────────────────────────────────────┤
│ 🔗 Full details: step-9-interactions-full.md                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Derivation Chain

```
Step 7 Jobs           Step 8 Scope           Step 9 Interactions        OUTPUT
───────────────────────────────────────────────────────────────────────────────
J1: Setup household → C1: Let couples      → User Action +            → Screens
    (what user        create profiles        System Response            (where it
     wants)           (what system allows)   (how it works)              happens)
```

**Key principle:** We define WHAT happens and HOW, then derive WHERE (screens) from that.

---

## J1: Setup Household

### Source

| Job (Step 7) | Capability (Step 8) | Constraint |
|--------------|---------------------|------------|
| Let couples set up profiles | Let user create up to 2 profiles | 2 max |
| | Let user set name + avatar | Name required, emoji only |
| | Let user set consent | Default OFF (C1 ethics) |

### Interaction: User Action → System Response

| # | User Action | System Response | Constraint Applied |
|---|-------------|-----------------|-------------------|
| 1 | User indicates "track with partner" | System shows profile creation | Entry point needed |
| 2 | User enters name | System validates (required, ≤20 chars) | Name required |
| 3 | User picks avatar | System accepts emoji selection | Emoji only |
| 4 | User creates profile | System saves profile, asks about partner | 2 max |
| 5 | User toggles consent | System saves preference (default OFF) | C1: default OFF |

### Derived Screen Needs

From the interactions above, we need UI for:
- [ ] Entry point to choose "track with partner" vs "solo"
- [ ] Profile creation (name input + emoji picker)
- [ ] Consent toggle
- [ ] Partner profile creation (same as above, optional)

### Edge Cases

| Scenario | User Action | System Response |
|----------|-------------|-----------------|
| Empty name | User submits without name | System blocks, shows "Name required" |
| Long name | User types >20 chars | System truncates, shows counter |
| No emoji | User skips emoji | System assigns default |
| Cancel | User exits mid-setup | System preserves profile 1 (if created) |

---

## J2: Log Shared Meal ⭐ Primary Flow

### Source

| Job (Step 7) | Capability (Step 8) | Constraint |
|--------------|---------------------|------------|
| Let user log one meal for both partners | Let user check "log for both" during meal entry | With confirmation |
| | Let system create meal in both profiles | <30s total time |
| | Let system mark meal as "logged by [name]" | Attribution |

### Interaction: User Action → System Response

| # | User Action | System Response | Constraint Applied |
|---|-------------|-----------------|-------------------|
| 1 | User initiates meal entry | System shows food search (existing flow) | <30s budget starts |
| 2 | User selects food + portion | System shows portion selector (existing) | S/M/L existing |
| 3 | User checks "log for both" | System shows confirmation | Requires consent granted |
| 4 | User confirms | System creates meal in both profiles | Mark as "logged by [name]" |
| 5 | — | System shows success feedback | Toast: "Logged for both ✓" |

### Consent Gate (Conditional)

| Consent State | System Response at Step 3 |
|---------------|---------------------------|
| Partner granted consent | Show "log for both" option |
| Partner NOT granted | Hide option entirely (user sees nothing) |
| No partner profile | Hide option entirely |

### Timing Budget

| User Action | Target | Notes |
|-------------|--------|-------|
| Initiate meal entry | <1s | — |
| Search + select food | <5s | Existing flow |
| Select portion | <3s | S/M/L existing |
| Check "log for both" | <2s | New: single tap |
| Confirm | <3s | New: tap to confirm |
| **Total** | **<14s** | Well under 30s |

### Derived Screen Needs

From the interactions above, we need to modify:
- [ ] Meal entry: Add "log for both" checkbox (conditional on consent)
- [ ] Confirmation: Modal or inline confirm before dual-log
- [ ] Success: Toast showing "Logged for both"

### Edge Cases

| Scenario | User Action | System Response |
|----------|-------------|-----------------|
| Consent revoked | User on meal entry | System hides checkbox on next render |
| Partner deleted | User checks "log for both" | System hides option |
| Double-tap | User taps confirm twice | System disables button after first tap |

---

## J3: Switch Profile

### Source

| Job (Step 7) | Capability (Step 8) | Constraint |
|--------------|---------------------|------------|
| Let user switch active profile quickly | Let user switch via single tap | Always know active profile |
| | Let system persist selection | Across app restarts |

### Interaction: User Action → System Response

| # | User Action | System Response | Constraint Applied |
|---|-------------|-----------------|-------------------|
| 1 | User taps profile indicator | System shows profile selector | Indicator always visible |
| 2 | User selects profile | System switches active profile | Refresh all data |
| 3 | — | System persists selection | Remember across restarts |

### Derived Screen Needs

From the interactions above, we need:
- [ ] Profile indicator: Always visible on all screens
- [ ] Profile selector: Dropdown/menu to choose profile
- [ ] Data refresh: All views update when profile changes

### Edge Cases

| Scenario | User Action | System Response |
|----------|-------------|-----------------|
| Only 1 profile | User taps indicator | System shows "Add Profile" option |
| Max reached (2) | User in selector | System hides "Add Profile" |
| Mid-entry switch | User switches during meal entry | System warns "Discard entry?" |

---

## J4: View Household Progress

### Source

| Job (Step 7) | Capability (Step 8) | Constraint |
|--------------|---------------------|------------|
| Let user see combined progress | Let user view household goal | 1 goal, no breakdown |
| | Let user see shared meals | List only, no individual attribution |

### Interaction: User Action → System Response

| # | User Action | System Response | Constraint Applied |
|---|-------------|-----------------|-------------------|
| 1 | User navigates to household view | System shows aggregate progress | No individual breakdown (C2) |
| 2 | User views goal | System shows combined total only | "18/20 servings" |
| 3 | User views shared meals | System shows list of shared meals | No "who ate what" |

### Derived Screen Needs

From the interactions above, we need:
- [ ] Household view: Accessible from main navigation
- [ ] Goal display: Progress bar with aggregate only
- [ ] Shared meals list: Meals logged together this period

### Edge Cases

| Scenario | User Action | System Response |
|----------|-------------|-----------------|
| No goal set | User opens household view | System shows "Set goal" prompt |
| No shared meals | User views shared meals | System shows "No shared meals yet" |
| Goal exceeded | User views goal | System shows "Exceeded by X" |
| Solo user | User looks for household | System hides household view entirely |

---

## Summary: Interactions by Job

| Job | User Actions | System Responses | Screens Needed |
|-----|--------------|------------------|----------------|
| J1: Setup | 4 | 5 | Entry point, Profile creation, Consent |
| J2: Shared Meal | 3 | 4 | Modified meal entry, Confirmation, Toast |
| J3: Switch | 2 | 3 | Profile indicator (header), Selector |
| J4: Household | 2 | 3 | Household view, Goal display, Meal list |
| **Total** | **11** | **15** | ~8 UI components |

---

## ⛔ DECISION GATE (Required)

**This step requires your approval before proceeding to Gate 2/3 or Step 10.**

To confirm your decision, tell me:
```
"Step 9 decision: [your choice]"
```

**Examples:**
- "Step 9 decision: Accept interactions"
- "Step 9 decision: Simplify J1 setup flow"
- "Step 9 decision: Add error path for [scenario]"

**AI Recommendation:** Accept interactions

**I will NOT proceed until you confirm your decision.**
