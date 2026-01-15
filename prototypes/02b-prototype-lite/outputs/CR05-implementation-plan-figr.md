
# Multi-User Support — Implementation Plan

## Overview
Family/couple mode allowing multiple profiles on one device with shared visibility and individual tracking.

---

## Screens & Components

| Component | Type | Priority |
|-----------|------|----------|
| Profile Switcher | Header + Bottom Sheet | 1st |
| Household Dashboard | New tab (4th in nav) | 1st |
| Meal Attribution | Quick Add modification | 2nd |
| Profile Management | Settings section | 2nd |

---

## 1. Profile Switcher

**Location:** Header area on Dashboard (replaces static greeting)

**Interaction:**
- Tap avatar → Bottom sheet slides up
- Shows all household members as cards
- Each card: avatar, name, today's kcal, progress bar
- Tap card → Switch to that profile, sheet closes
- "＋ Add member" at bottom

**Visual:**
```
┌─────────────────────────┐
│ ── drag handle ──       │
│                         │
│ ┌─────────────────────┐ │
│ │ 🟢 Minh      ✓      │ │
│ │ 1,240 kcal · 62%    │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🟣 Lan              │ │
│ │ 890 kcal · 45%      │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🟡 Bé Na            │ │
│ │ 650 kcal · 54%      │ │
│ └─────────────────────┘ │
│                         │
│ [＋ Add member]         │
└─────────────────────────┘
```

---

## 2. Household Dashboard

**Location:** New 4th tab in bottom nav (icon: Users)

**Layout — Ring Grid:**
- Header: "Household" + date
- Row of mini progress rings (one per member)
- Each ring: percentage, avatar below, tap to view details
- Below rings: "Shared Meals Today" section listing meals tagged as shared

**Visual:**
```
┌─────────────────────────┐
│ Household        Today  │
├─────────────────────────┤
│   ⭕    ⭕    ⭕        │
│   62%   45%   54%       │
│  Minh   Lan   Na        │
├─────────────────────────┤
│ Shared Meals Today      │
│ 🍜 Phở bò (3 people)    │
│ 🍚 Cơm tấm (2 people)   │
│ 🥗 Gỏi cuốn (3 people)  │
└─────────────────────────┘
```

---

## 3. Meal Attribution (Quick Add Flow)

**Modification:** Add step after portion selection, before confirm

**Flow:**
1. Tap food tile → Portion picker (existing)
2. Select S/M/L → **NEW: "Who's eating?" appears**
3. Avatar chips for each household member (current user pre-selected)
4. If 1 person selected → "Add to Today" (existing)
5. If 2+ people selected → Show split options:
   - "Split equally" — divide calories by # of people
   - "Full portion each" — log full amount for each person

**Visual:**
```
┌─────────────────────────┐
│ Who's eating?           │
│                         │
│ [🟢 Minh ✓] [🟣 Lan] [🟡 Na] │
│                         │
│ ─── If multiple ───     │
│ ○ Split equally (160 ea)│
│ ● Full portion each     │
│                         │
│ [ Add to Today ]        │
└─────────────────────────┘
```

---

## 4. Profile Management (Settings)

**Location:** New "Household" section in Settings, above "Data Management"

**Features:**
- List of household members (max 10 per spec)
- Each row: avatar, name, daily goal, edit button
- Tap row → Edit profile sheet (name, avatar color, goals)
- "＋ Add member" button
- Swipe to delete (with confirmation)

**Visual:**
```
┌─────────────────────────┐
│ 👥 Household            │
├─────────────────────────┤
│ 🟢 Minh     2000 kcal → │
│ 🟣 Lan      1800 kcal → │
│ 🟡 Bé Na    1200 kcal → │
├─────────────────────────┤
│ [＋ Add member]         │
└─────────────────────────┘
```

---

## Navigation Changes

**Bottom nav updates:**
- Tab 1: Today (Dashboard) — unchanged
- Tab 2: Log (Food Log) — unchanged  
- Tab 3: **Household** — NEW
- Tab 4: Settings — unchanged
- FAB: Quick Add — unchanged (floats above)

---

## Data Model Additions

```typescript
interface HouseholdMember {
  id: string
  name: string
  avatarColor: string  // hex color for ring/avatar
  goals: { kcal: number, protein: number, carbs: number, fat: number }
  isActive: boolean    // currently selected profile
}

interface MealLog {
  // existing fields...
  eaters: string[]     // array of member IDs who ate this
  splitType: 'full' | 'equal'  // how calories are attributed
}
```

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Profile switcher | Bottom sheet | Shows progress while switching — accountability |
| Household view | Ring grid | Matches personal dashboard visual language |
| Meal split | User chooses | Flexibility for "shared pot" vs "individual plates" |
| Max members | 10 | Per original spec capacity limits |

---

## Execution Order

1. Add household state + sample members to app
2. Build Profile Switcher (header + sheet)
3. Build Household Dashboard tab
4. Modify Quick Add with "Who's eating?" step
5. Add Household section to Settings
