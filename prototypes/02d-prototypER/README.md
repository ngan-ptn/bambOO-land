# ai-lead — Calorie Tracker

A fast, low-friction calorie tracking app for Vietnamese street food. Built with the prototypER design system (clean, minimal, neutral palette).

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`

## Features

- **Quick Add**: Log meals in 2 taps (tap food → select portion)
- **Dashboard**: Daily calorie ring + macro progress bars
- **50+ Vietnamese Foods**: Phở, bánh mì, cơm tấm, trà sữa, and more
- **Local Storage**: SQLite database persisted in browser

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
│   ├── dashboard/    # CalorieRing, MacroBar, MealCard, etc.
│   ├── quick-add/    # FoodTile, FoodGrid, PortionSheet, etc.
│   └── shared/       # BottomNav, Toast, Header
├── db/               # SQLite connection, schema, repositories
├── hooks/            # useDatabase, useTodayLogs, useFoods, etc.
├── pages/            # DashboardPage, QuickAddPage
├── data/             # foods.json (50+ items)
└── types/            # TypeScript interfaces
```

## Data

- `foods.json`: 50+ Vietnamese street foods with S/M/L portions
- Categories: noodles, rice, bánh mì, snacks, drinks, desserts, clean eating
- Each food has: kcal, protein, carbs, fat per portion size

## Credits

Part of the [bambOO-land](../../README.md) nutrition tracking experiments monorepo.
