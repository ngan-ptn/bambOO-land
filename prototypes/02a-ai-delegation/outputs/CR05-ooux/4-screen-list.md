# Screen List - CR05 Multi-User Support

## Screens from Flow Moments

| Flow Moment | Job | Type | Needs Screen? | Rationale |
|-------------|-----|------|---------------|-----------|
| Tap avatar | J1, J3 | Action | No | Opens dropdown |
| Profile Switcher dropdown | J1, J3 | Choose | Yes (Component) | Select profile or add partner |
| Add Partner page | J1 | Input | Yes | Name + goals form |
| Enter partner name | J1 | Input | Part of Add Partner | Single field |
| Set partner goal | J1 | Input | Part of Add Partner | Single field |
| Consent toggle | J1 | Decision | Part of Add Partner | Simple toggle |
| Partner added confirmation | J1 | Feedback | No | Toast notification |
| Choose Portion (enhanced) | J2 | Choose | Yes (Enhanced) | S/M/L + Log for Both toggle |
| "Log for Both" toggle | J2 | Decision | Part of Choose Portion | Simple toggle |
| Partner portion selector | J2 | Choose | Part of Choose Portion | S/M/L for partner |
| Dual log confirmation | J2 | Feedback | No | Toast notification |
| Switch to partner view | J3 | Action | No | Dashboard reloads |
| Dashboard (partner view) | J3 | View | Yes (Modified) | Same screen, different data |
| Manage consent | J4 | Input | Future | Settings section |

---

## Consolidated Screen List

### New Screens (CR05)

| ID | Screen | Type | Purpose | Jobs Supported |
|----|--------|------|---------|----------------|
| **S01** | Add Partner | Full page | Create partner profile with name, avatar, calorie goal, consent | J1 |

### Enhanced Components (CR05)

| ID | Component | Type | Enhancement | Jobs Supported |
|----|-----------|------|-------------|----------------|
| **C01** | Profile Switcher | Dropdown | NEW: Profile selection, add partner option | J1, J3 |
| **C02** | Choose Portion | Pop-up | ENHANCED: Added "Log for Both" toggle + partner portion | J2 |
| **C03** | Notification | Toast | ENHANCED: Shows "for you + [Partner]" message | J2 |

### Modified Screens (CR05)

| ID | Screen | Modification | Impact |
|----|--------|--------------|--------|
| **M01** | Home | Header shows Profile Switcher instead of simple avatar | All flows affected |
| **M02** | Home | All data sections now profile-specific | J3 affects what's shown |
| **M03** | Profile Page | Shows active profile info | J3 affects what's shown |

---

## Screen Details

### S01: Add Partner Page

**Route:** `/add-partner`
**Type:** Full page
**Jobs:** J1 (Add Partner)

```
┌─────────────────────────────────────────────┐
│ ← Back                      Add Partner      │
├─────────────────────────────────────────────┤
│                                             │
│         [Large Avatar Emoji Picker]          │
│              👩 / 👨 / 🧑                     │
│                                             │
├─────────────────────────────────────────────┤
│ Partner's Name                               │
│ ┌─────────────────────────────────────────┐ │
│ │ [                                      ]│ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Daily Calorie Goal                          │
│ ┌─────────────────────────────────────────┐ │
│ │ [          1,500          ] kcal       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
├─────────────────────────────────────────────┤
│ Partner Logging                              │
│                                             │
│ ☑ Allow me to log meals for [Partner]       │
│   Partner can change this anytime           │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        [ Add Partner Button ]                │
│                                             │
└─────────────────────────────────────────────┘
```

**Fields:**
- Avatar emoji picker (required)
- Partner name (required, text)
- Daily calorie goal (required, number, default 1,500)
- Consent toggle (default ON, can be changed)

**Actions:**
- Back: Return to Home
- Add Partner: Create profile, return to Home

---

### C01: Profile Switcher (New Component)

**Type:** Dropdown
**Trigger:** Tap avatar in header
**Jobs:** J1, J3

```
┌─────────────────────────────────────────────┐
│ Switch Profile                               │
├─────────────────────────────────────────────┤
│ ●  👤 My Profile                             │
│      1,800 kcal goal                        │
├─────────────────────────────────────────────┤
│    👩 [Partner Name]                         │
│      1,500 kcal goal                        │
├─────────────────────────────────────────────┤
│ ➕ Add Partner                               │
├─────────────────────────────────────────────┤
│ ⚙️ Settings                                  │
└─────────────────────────────────────────────┘
```

**States:**
- No partner: Only shows "My Profile" + "Add Partner"
- Has partner: Shows both profiles + indicator for active
- Active profile: Marked with ● indicator

**Actions:**
- Tap profile: Switch to that profile's view
- Tap Add Partner: Navigate to Add Partner page
- Tap Settings: Navigate to Profile/Settings

---

### C02: Choose Portion (Enhanced)

**Type:** Pop-up / Bottom sheet
**Trigger:** Tap any food item
**Jobs:** J2

```
┌─────────────────────────────────────────────┐
│ Choose Portion Size                          │
│                                   [ × ]      │
├─────────────────────────────────────────────┤
│ 🍜 Phở bò                                    │
│    Vietnamese beef noodle soup              │
├─────────────────────────────────────────────┤
│ Your portion:                               │
│                                             │
│   ┌─────┐   ┌─────┐   ┌─────┐              │
│   │  S  │   │  M  │   │  L  │              │
│   │320  │   │480  │   │640  │              │
│   │kcal │   │kcal │   │kcal │              │
│   └─────┘   └─────┘   └─────┘              │
│                                             │
├─────────────────────────────────────────────┤
│ ☐ Also log for [Partner Name]               │  ← NEW
│                                             │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│ (Shown when toggle ON)                      │
│                                             │
│ [Partner]'s portion:                        │  ← NEW
│                                             │
│   ┌─────┐   ┌─────┐   ┌─────┐              │
│   │  S  │   │  M  │   │  L  │              │
│   │320  │   │480  │   │640  │              │
│   │kcal │   │kcal │   │kcal │              │
│   └─────┘   └─────┘   └─────┘              │
│                                             │
├─────────────────────────────────────────────┤
│         [ Confirm (960 kcal total) ]         │  ← Shows combined
└─────────────────────────────────────────────┘
```

**Conditional Display:**
- Toggle only shows if partner exists AND consent enabled
- Partner portion only shows if toggle is ON
- Confirm button shows combined kcal when logging for both

**Actions:**
- Select portion (self): Required
- Toggle "Log for Both": Optional
- Select portion (partner): Required if toggle ON
- Confirm: Create 1 or 2 food logs
- Close: Cancel without logging

---

### C03: Notification (Enhanced)

**Type:** Toast
**Trigger:** After food logged
**Jobs:** J2

**Variants:**

1. **Self only:**
```
┌─────────────────────────────────────────────┐
│ ✓ Added Phở bò (M)               [Undo]     │
└─────────────────────────────────────────────┘
```

2. **Log for Both:**
```
┌─────────────────────────────────────────────┐
│ ✓ Added for you + [Partner]      [Undo]     │
│   Phở bò (M) + (S)                          │
└─────────────────────────────────────────────┘
```

3. **Partial failure:**
```
┌─────────────────────────────────────────────┐
│ ⚠ Added for you (partner failed) [Undo]     │
│   Phở bò (M)                                │
└─────────────────────────────────────────────┘
```

---

## Screen Flow Diagram

```mermaid
flowchart TB
    subgraph HOME_AREA["Home Area"]
        HOME["Home Dashboard"]
        SWITCHER["Profile Switcher"]
    end

    subgraph PARTNER_AREA["Partner Management"]
        ADD["S01: Add Partner"]
    end

    subgraph LOGGING_AREA["Food Logging"]
        PORTION["C02: Choose Portion"]
        TOAST["C03: Notification"]
    end

    HOME -->|"tap avatar"| SWITCHER
    SWITCHER -->|"Add Partner"| ADD
    SWITCHER -->|"tap profile"| HOME
    ADD -->|"complete"| HOME

    HOME -->|"tap food"| PORTION
    PORTION -->|"confirm"| TOAST
    TOAST --> HOME

    style ADD fill:#d4edda,stroke:#28a745,stroke-width:2px
    style SWITCHER fill:#fff3e0,stroke:#ffc107,stroke-width:2px
    style PORTION fill:#fff3e0,stroke:#ffc107,stroke-width:2px
```

---

## Implementation Priority

| Priority | Item | Type | Reason |
|----------|------|------|--------|
| 1 | S01: Add Partner | New page | Required to enable all CR05 features |
| 2 | C01: Profile Switcher | New component | Core navigation for multi-user |
| 3 | C02: Choose Portion | Enhancement | Primary feature - "Log for Both" |
| 4 | M01-M03: Home modifications | Modification | Profile-specific data display |
| 5 | C03: Notification | Enhancement | User feedback for dual logging |

---

## Screen-to-Object Mapping

| Screen/Component | Objects Used |
|------------------|--------------|
| S01: Add Partner | Profile, Partner Link, Consent |
| C01: Profile Switcher | Profile, Partner Link |
| C02: Choose Portion | Food Log, Shared Meal |
| C03: Notification | Food Log |
| M01: Home (header) | Profile |
| M02: Home (data) | Food Log, Daily Summary |

---

## Accessibility Considerations

| Screen | Consideration |
|--------|---------------|
| Profile Switcher | Clear active profile indicator (not color-only) |
| Choose Portion | Toggle clearly labeled with partner name |
| Notification | Message readable without relying on color |
| Add Partner | Form fields properly labeled |

---

## Summary

| Category | Count | Items |
|----------|-------|-------|
| New Screens | 1 | Add Partner |
| New Components | 1 | Profile Switcher |
| Enhanced Components | 2 | Choose Portion, Notification |
| Modified Screens | 3 | Home (×3 aspects) |
| **Total Changes** | **7** | |
