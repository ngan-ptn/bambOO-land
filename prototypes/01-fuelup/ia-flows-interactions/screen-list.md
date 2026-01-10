# Screen List: Multi-User Support

## Derivation Methodology

Screens derived from user flow moments using these rules:
- **Entry point** → Screen if requires input
- **Decision point** → Modal if binary choice, Screen if complex
- **Action** → Screen if multiple inputs, inline if single tap
- **Outcome** → Toast/feedback, not full screen

---

## Screen Identification from Flows

| Flow Moment | Type | Screen? | Rationale |
|-------------|------|---------|-----------|
| J1: Create Profile | Input | ✅ S01 | Name + avatar input |
| J1: Grant Consent | Decision | ✅ S02 | Toggle with explanation |
| J2: Meal Entry | Input | ✅ S03 | Existing screen, modified |
| J2: Confirm Share | Decision | ✅ M01 | Binary confirm, modal |
| J3: Profile Selector | Decision | ✅ M02 | Quick switch, dropdown |
| J4: Household View | View | ✅ S04 | Aggregate dashboard |
| Avatar indicator | View | ✅ S05 | Header component |

---

## Consolidated Screen List

### New Screens

| ID | Screen Name | Purpose | Jobs | Priority |
|----|-------------|---------|------|----------|
| S01 | Profile Setup | Create name + avatar for profile | J1 | P1 |
| S02 | Consent Settings | Toggle "allow partner to log" | J1 | P1 |
| S04 | Household Dashboard | Aggregate progress view | J4 | P2 |

### Modified Screens

| ID | Screen Name | Modification | Jobs | Priority |
|----|-------------|--------------|------|----------|
| S03 | Meal Entry | Add "Also log for [Partner]" checkbox | J2 | P1 |
| S05 | Header | Add profile avatar indicator | J3 | P1 |

### Modals

| ID | Modal Name | Trigger | Purpose |
|----|------------|---------|---------|
| M01 | Confirm Shared Log | Check "log for both" | Confirm before dual-logging |
| M02 | Profile Selector | Tap avatar | Quick profile switch |

---

## Screen-to-Job Mapping

| Screen | J1 Setup | J2 Shared Meal | J3 Switch | J4 Household |
|--------|:--------:|:--------------:|:---------:|:------------:|
| S01: Profile Setup | ✅ | | | |
| S02: Consent Settings | ✅ | | | |
| S03: Meal Entry (mod) | | ✅ | | |
| S04: Household Dashboard | | | | ✅ |
| S05: Header Avatar | | | ✅ | |
| M01: Confirm Shared | | ✅ | | |
| M02: Profile Selector | | | ✅ | |

---

## Screen Details

### S01: Profile Setup

```
┌─────────────────────────────────────┐
│ ← Back          Profile Setup       │
├─────────────────────────────────────┤
│                                     │
│            [  👤  ]                 │
│         Tap to choose avatar        │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Name: _____________________ │    │
│  └─────────────────────────────┘    │
│                                     │
│  Avatars:                           │
│  [😀] [😎] [🥰] [👨] [👩] [🧑]      │
│                                     │
│       [ Create Profile ]            │
│                                     │
└─────────────────────────────────────┘
```

**Inputs:** Name (text), Avatar (selection)
**Actions:** Create Profile, Back
**Validation:** Name required, max 20 chars

---

### S02: Consent Settings

```
┌─────────────────────────────────────┐
│ ← Back       Shared Logging         │
├─────────────────────────────────────┤
│                                     │
│  Allow [Partner] to log meals       │
│  for you?                           │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ [○] OFF (default)           │    │
│  └─────────────────────────────┘    │
│                                     │
│  What this means:                   │
│  • Partner can add meals to your    │
│    log when you eat together        │
│  • You can review and delete any    │
│    meal they add                    │
│  • Turn off anytime in Settings     │
│                                     │
│  ────────────────────────────────   │
│                                     │
│  ⓘ Your meal data stays private.   │
│  Partner cannot see your history.   │
│                                     │
└─────────────────────────────────────┘
```

**Inputs:** Toggle (on/off)
**Default:** OFF (per C1)
**Ethics:** C1 satisfied, C4 mentioned

---

### S03: Meal Entry (Modified)

```
┌─────────────────────────────────────┐
│ ← Back          Log Meal            │
├─────────────────────────────────────┤
│                                     │
│  🔍 Search food...                  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Phở bò                      │    │
│  │ 450 kcal (M)                │    │
│  │                             │    │
│  │ Portion: [S] [M●] [L]       │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ☐ Also log for [Partner]    │ ← NEW
│  │   (Partner consented)       │    │
│  └─────────────────────────────┘    │
│                                     │
│       [    Log Meal    ]            │
│                                     │
└─────────────────────────────────────┘
```

**New Element:** Checkbox "Also log for [Partner]"
**Condition:** Only shows if Consent.enabled = true
**Action:** If checked, triggers M01 confirmation

---

### S04: Household Dashboard

```
┌─────────────────────────────────────┐
│  [Individual]   [Household ●]       │
├─────────────────────────────────────┤
│                                     │
│       🏠 Our Household              │
│                                     │
│  Weekly Veggie Goal                 │
│  ┌─────────────────────────────┐    │
│  │  18 / 20 servings           │    │
│  │  ████████████████░░░░       │    │
│  │  Almost there!              │    │
│  └─────────────────────────────┘    │
│                                     │
│  This Week's Meals Together         │
│  ┌─────────────────────────────┐    │
│  │  Mon: Phở bò (shared)       │    │
│  │  Tue: Cơm tấm (shared)      │    │
│  │  Wed: Bánh mì (shared)      │    │
│  └─────────────────────────────┘    │
│                                     │
│  ⓘ Shows household totals only.    │
│  No individual breakdown.           │
│                                     │
└─────────────────────────────────────┘
```

**Data:** Aggregate only (C2 compliant)
**Ethics:** C2 — no individual breakdown shown

---

### S05: Header Avatar (Component)

```
┌─────────────────────────────────────┐
│  [👤 Linh ▼]            🏠   ⚙️    │
└─────────────────────────────────────┘
     ↑
  Always visible, shows active profile
  Tap to open M02 Profile Selector
```

**Purpose:** Clarity — always know who's active
**Interaction:** Tap opens M02

---

### M01: Confirm Shared Log (Modal)

```
┌─────────────────────────────────────┐
│                                     │
│      Log for both of you?           │
│                                     │
│  This will add "Phở bò" to:         │
│                                     │
│  ✓ Your log (Linh)                  │
│  ✓ Partner's log (Minh)             │
│                                     │
│  ──────────────────────────────     │
│                                     │
│  [Cancel]        [Log for Both]     │
│                                     │
└─────────────────────────────────────┘
```

**Trigger:** Check "Also log for [Partner]" checkbox
**Actions:** Cancel (close modal), Log for Both (proceed)

---

### M02: Profile Selector (Dropdown)

```
┌─────────────────────────────────────┐
│  👤 Linh           ← Current        │
├─────────────────────────────────────┤
│  👩 Minh                            │
│  ➕ Add Profile                     │
└─────────────────────────────────────┘
```

**Trigger:** Tap avatar in header
**Actions:** Switch profile, Add new profile

---

## Screen Frequency Analysis

| Screen | Frequency | Criticality |
|--------|-----------|-------------|
| S03: Meal Entry | Daily (high) | ⭐ Core flow |
| S05: Header Avatar | Always visible | ⭐ Clarity |
| M02: Profile Selector | Daily (medium) | ⭐ Clarity |
| M01: Confirm Shared | Daily (low-medium) | Safety |
| S04: Household Dashboard | Weekly | Motivation |
| S01: Profile Setup | Once | Onboarding |
| S02: Consent Settings | Rarely | Settings |

---

## Primary Paths (Happy Paths)

### Path 1: First-time Setup
```
Launch → S01 (Profile A) → S01 (Profile B) → S02 (Consent) → Dashboard
```

### Path 2: Log Shared Meal
```
Dashboard → S03 (Meal Entry) → Check box → M01 (Confirm) → Toast
```

### Path 3: Switch Profile
```
Any screen → S05 (Avatar tap) → M02 (Select) → Dashboard refreshes
```

---

## Key UX Patterns

1. **Progressive disclosure** — Checkbox only appears if consent granted
2. **Confirmation for sharing** — M01 prevents accidental partner logging
3. **Persistent context** — S05 avatar always shows active profile
4. **Opt-in household** — S04 is tab, not forced on users
5. **Privacy messaging** — S02 explicitly states partner can't see history
