# 02a-ai-delegation — Calorie Tracker

A fast, low-friction calorie tracking app for Vietnamese street food with AI-assisted food scanning and multi-user support. Built via AI delegation workflow.

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`

## Features

### Core
- **Quick Add**: Log meals in 2 taps (tap food → select portion)
- **Dashboard**: Daily calorie ring + macro progress bars
- **50+ Vietnamese Foods**: Phở, bánh mì, cơm tấm, trà sữa, and more
- **SQLite Persistence**: Browser-based database via sql.js WASM

### CR03: AI Food Scan
- Camera capture with simulated AI detection
- Multi-food detection with confidence badges
- Checkboxes to select/deselect detected items
- Edit individual portions before confirming

### CR05: Multi-User Support
- **Partner Profiles**: Add a partner with their own calorie goals
- **Profile Switcher**: Header dropdown to switch between profiles
- **Log for Both**: Toggle to log meals for you and partner simultaneously
- Separate food logs per user

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- sql.js (SQLite WASM)
- date-fns

## Design System

Uses prototypER visual language:
- Neutral foundation (#FFFFFF, #F8F9FA)
- Single accent color (#2563EB blue)
- Clean typography (Inter)
- 12px border radius
- 150-200ms transitions

## Project Structure

```
src/
├── components/
│   ├── Dashboard/     # CalorieRing, MacroBar, ActionSheet
│   ├── QuickAdd/      # FoodTileGrid, FavoritesGrid, PortionPicker, Timeline
│   ├── Scan/          # ScanCameraPage, ScanResultsPage
│   ├── Partner/       # AddPartnerPage, ProfileSwitcher
│   ├── ManualEntry/   # ManualEntryPage, ManualEntryModal
│   └── common/        # Toast, shared UI components
├── db/                # SQLite schema, repositories, types
├── hooks/             # useDatabaseStorage, usePartner, useFoodSearch
├── lib/               # appNav reducer, scanSim, utils
├── auth/              # AuthContext, auth flows
├── contexts/          # DatabaseContext
├── data/              # foods.json (50+ Vietnamese foods)
└── types/             # TypeScript interfaces
```

## Data

- `foods.json`: 50+ Vietnamese street foods with S/M/L portions
- Categories: noodles, rice, bánh mì, snacks, drinks, desserts, clean eating
- Each food has: kcal, protein, carbs, fat per portion size

## Documentation

UX artifacts generated via OOUX methodology in `outputs/ooux-ia-flows/`:

| Document | Purpose |
|----------|---------|
| `1-ooux-dot-map.md` | Objects, attributes, relationships |
| `2-ia-map.md` | Information architecture & routes |
| `3-user-flows.md` | Jobs-to-be-done & flow diagrams |
| `4-screen-list.md` | Consolidated screen list |

Feature design docs in `outputs/CR*/`:
- CR03-ai-food-scan
- CR04-portion-estimation
- CR05-multi-user-support

## Credits

Part of the [bambOO-land](../../README.md) nutrition tracking experiments monorepo.
