# Design: ai-lead (Prototype 02)

**Date:** 2026-01-10
**Status:** Approved
**Based on:** PRD251210-product-spec-summary.md + prototypER design concept

---

## Overview

ai-lead is a fresh implementation of the Calo Tracker calorie tracking app, built with the prototypER visual design system. It provides fast, low-friction calorie logging for Vietnamese street food.

### Core Features
- Quick Add: Log meals in <10 seconds (2 taps)
- Dashboard: Daily calorie & macro progress at a glance
- Local SQLite persistence (sql.js WASM)

### Design Direction
Clean, systematic, approachable — neutral foundation with minimal accent colors. No guilt-inducing red for calories.

---

## Visual Design System

### Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Background | `#FFFFFF` | Main canvas |
| Surface | `#F8F9FA` | Cards, sections |
| Border | `#E5E7EB` | Subtle dividers |
| Text Primary | `#1A1A1A` | Headlines, numbers |
| Text Secondary | `#6B7280` | Labels, captions |
| Accent | `#2563EB` | Primary actions, progress |
| Accent Muted | `#DBEAFE` | Backgrounds for accent elements |
| Success | `#10B981` | Confirmations only |

### Typography
- Font: Inter (system sans-serif fallback)
- Headlines: 24-32px, semibold
- Body: 16px, regular
- Captions: 14px, secondary color
- Numbers (calories): 48-56px, bold

### Spacing
- Screen padding: 20px
- Card padding: 16px
- Section gaps: 24px
- Border radius: 12px (cards), 8px (buttons), full (pills)

### Motion
- Transitions: 150-200ms ease-out
- No bouncy/playful animations

---

## Component Architecture

### Pages
- `/` — Dashboard (default)
- `/add` — Quick Add

### Dashboard Components
| Component | Purpose |
|-----------|---------|
| `CalorieRing` | Circular progress showing daily kcal |
| `MacroBar` | Horizontal bar for protein/carbs/fat |
| `DailySummary` | Container: ring + 3 macro bars |
| `MealCard` | Single logged meal |
| `MealList` | Scrollable list of today's meals |
| `EmptyState` | Prompt when no meals logged |

### Quick Add Components
| Component | Purpose |
|-----------|---------|
| `SearchBar` | Text input with search icon |
| `CategoryTabs` | Horizontal scrollable category pills |
| `FoodTile` | Square tile with icon, name, kcal |
| `FoodGrid` | Responsive grid of FoodTiles |
| `PortionSheet` | Bottom sheet with S/M/L buttons |
| `RecentSection` | Recent items horizontal scroll |

### Shared Components
| Component | Purpose |
|-----------|---------|
| `Toast` | Confirmation with undo (auto-hide 3s) |
| `BottomNav` | 2-tab navigation |
| `Header` | Page title |

---

## Data Flow

### State Strategy
- No global state library
- React hooks + Context for DB connection
- Local component state for UI

### Custom Hooks
| Hook | Returns |
|------|---------|
| `useDatabase()` | `{ db, isLoading, error }` |
| `useTodayLogs()` | `{ logs, totals, addLog, deleteLog }` |
| `useFoods(category?)` | `{ foods, search(query) }` |
| `useRecentFoods()` | `{ recent }` |
| `useToast()` | `{ show(msg, undo?), dismiss }` |

### Core Flows
1. **Log meal:** Tap tile → Select portion → SQLite INSERT → Toast → UI refresh
2. **Delete meal:** Swipe/tap delete → SQLite DELETE → Toast with undo
3. **Undo:** Toast stores last action → Reverse operation on tap

---

## File Structure

```
prototypes/02-ai-lead/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── quick-add/
│   │   └── shared/
│   ├── db/
│   │   ├── connection.ts
│   │   ├── init.ts
│   │   ├── schema.sql
│   │   └── repositories/
│   ├── hooks/
│   ├── pages/
│   ├── data/
│   │   └── foods.json
│   └── types/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Build Plan

### Phase 1: Scaffold & Foundation
1. Create Vite + React + TypeScript project
2. Configure Tailwind with design tokens
3. Set up folder structure
4. Copy foods.json (50+ Vietnamese foods)
5. Set up SQLite layer (sql.js WASM)

### Phase 2: Shared Components
1. Build BottomNav
2. Build Toast with undo
3. Build Header
4. Set up routing

### Phase 3: Quick Add Feature
1. FoodTile + FoodGrid
2. CategoryTabs
3. SearchBar
4. PortionSheet
5. RecentSection
6. Wire up hooks and log flow

### Phase 4: Dashboard Feature
1. CalorieRing (SVG)
2. MacroBar
3. DailySummary
4. MealCard + MealList
5. EmptyState
6. Wire up useTodayLogs

### Phase 5: Polish
1. Transitions/animations
2. Full flow testing
3. Mobile responsiveness
4. README

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18+ | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Styling |
| sql.js | SQLite in browser (WASM) |
| React Router | Navigation |

---

## References
- PRD: `/Users/nganpham/Documents/calo-tracker/docs/requirements/PRD251210-product-spec-summary.md`
- Design concept: `/Users/nganpham/CALOR-TRACKER/prototypER/prototypER/docs/design-concept.md`
