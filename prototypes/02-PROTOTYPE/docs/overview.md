# Prototype Documentation – 02-PROTOTYPE (Calo Tracker)

**Domain:** Nutrition / Calorie Tracking
**Angle / Bet:** Quick Vietnamese food logging with S/M/L portions + meal combos
**Status:** Active
**Owner:** Ngan Pham
**Last updated:** 2025-01-10

---

## 1. Prototype Overview (Entry Point)

### Purpose
Base prototype for the Calo Tracker app - a Vietnamese-focused calorie tracking application. This serves as the reference implementation that will be cloned for comparing different feature implementation approaches (ai-delegation, prototype-lite, prototype-gated, prototypER).

### Target User / JTBD
**Primary:** Vietnamese users who want to track daily calorie intake with minimal friction.

**Jobs-to-be-Done:**
- When I eat a meal, I want to log it in under 3 taps, so I maintain accurate records without disrupting my day
- When I eat common Vietnamese foods, I want pre-configured nutrition data, so I don't have to research calories
- When I eat the same meals regularly, I want to save them as favorites/combos, so logging is even faster

### Core Hypotheses
- H1: If we provide S/M/L portion sizes instead of gram weights, users will log more consistently because estimation is faster than measurement
- H2: If we pre-load Vietnamese food data with local names, users will find foods faster than generic international databases
- H3: If we show progress ring prominently on home, users will stay motivated to track throughout the day

### Signals to Watch
- **Positive:** Users complete logging in <5 seconds, high daily return rate, favorites list grows
- **Negative:** Users abandon mid-log, search for foods not in database, skip portion selection
- **Neutral/ambiguous:** Users only log 1-2 meals per day

### Non-goals
- Barcode scanning accuracy (simulated in prototype)
- Real authentication/backend (using local SQLite)
- Multi-language support (Vietnamese-first)
- Social features

### What Success Looks Like
- 90% of common Vietnamese foods findable in <2 taps
- Average log time under 5 seconds for repeat foods
- Users can complete full day tracking in under 2 minutes total

---

## 2. Technical Overview

### Stack
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + DLS-workflow design system
- **Design System:** Inter typography, neutral color palette, systematic spacing
- **Database:** sql.js (SQLite WASM) - browser-only persistence
- **Routing:** react-router-dom v6
- **UI Components:** Radix UI (dialogs, sheets)

### Key Features
| Feature | Status | Notes |
|---------|--------|-------|
| Auth flow (login/register) | Complete | Local only, no real auth |
| Onboarding (name/goal/calories) | Complete | 4-step wizard |
| Dashboard with progress ring | Complete | Real-time calorie tracking |
| Quick Add (food tiles) | Complete | ~50 Vietnamese foods |
| S/M/L Portion picker | Complete | Bottom sheet UI |
| Favorites | Complete | Quick-log saved foods |
| Meal Combos (templates) | Complete | Log multiple items at once |
| Search | Complete | Vietnamese + English names |
| Timeline (meal history) | Complete | Today/Week tabs |
| Manual entry | Complete | Custom foods |
| Scan (camera) | Partial | Simulated, not real scanning |
| Profile/Goals editing | Complete | Full CRUD |

### Data Model
See `outputs/ooux-ia-flows/1-ooux-dot-map.md` for full OOUX documentation.

**Primary Objects:** User, Food Log, Built-in Food, Custom Food
**Secondary Objects:** Favorite, Meal Combo, Combo Item
**Derived Objects:** Daily Summary

---

## 3. Information Architecture

See `outputs/ooux-ia-flows/2-ia-map.md` for full IA documentation.

### Main Screens
| Screen | Route | Purpose |
|--------|-------|---------|
| Sign In | /login | Authentication |
| Getting Started | /onboarding/* | 4-step setup wizard |
| Home | /dashboard | Main screen (progress + quick add) |
| Profile | /profile | Settings and goals |
| Enter Manually | /manual | Custom food entry |

### Key User Flows
See `outputs/ooux-ia-flows/3-user-flows.md` for detailed flows.

- **J1: Quick Log** - 5 steps, ~3 seconds
- **J2: Favorite Log** - 4 steps, ~2 seconds
- **J3: Combo Log** - 6 steps, ~4 seconds
- **J7: View Progress** - 1 step, instant (visible on Home)

---

## 4. Running the Prototype

```bash
cd prototypes/02-PROTOTYPE
npm install
npm run dev
# Opens at http://localhost:5173 (or next available port)
```

### Test Credentials
Any email/password works (local auth simulation)

---

## 5. Cross-Prototype Comparison Hooks

### Key Questions This Prototype Helps Answer
- Can S/M/L portion sizing work for Vietnamese food?
- Is a single-screen dashboard sufficient for daily tracking?
- Do meal combos reduce logging friction?

### Strengths
- Very fast logging for repeat meals (favorites, combos)
- Familiar Vietnamese food names
- Progress visibility drives engagement
- Works offline (SQLite WASM)

### Weaknesses
- S/M/L may be too imprecise for serious trackers
- Limited food database (~50 items)
- No sync across devices
- Scan feature is simulated

### Best Context to Use This Approach
- Users who eat similar meals daily
- Casual trackers who want speed over precision
- Vietnamese-speaking users
- Offline-first requirements

---

## 6. Related Documentation

- [OOUX Dot Map](outputs/ooux-ia-flows/1-ooux-dot-map.md) - Objects, attributes, relationships
- [IA Map](outputs/ooux-ia-flows/2-ia-map.md) - Information architecture
- [User Flows](outputs/ooux-ia-flows/3-user-flows.md) - Jobs-to-be-done
- [Screen List](outputs/ooux-ia-flows/4-screen-list.md) - Consolidated screens
