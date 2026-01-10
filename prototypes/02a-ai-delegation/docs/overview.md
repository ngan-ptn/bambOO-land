# Prototype Documentation – 02a-ai-delegation

**Domain:** Nutrition / Calorie Tracking
**Angle / Bet:** AI-assisted feature implementation via delegation workflow
**Status:** Active
**Owner:** Ngan Pham
**Last updated:** 2025-01-10

---

## 1. Prototype Overview (Entry Point)

### Purpose
Test whether complex features (AI food scanning, multi-user support) can be effectively implemented through an AI delegation workflow, where feature requirements are delegated to AI agents for implementation with minimal human intervention.

### Target User / JTBD
Vietnamese users who want to track daily calorie intake with minimal friction:
- **Primary JTBD**: "When I eat a meal, I want to log it in under 5 seconds, so I can maintain accurate records without disrupting my day."
- **Secondary JTBD**: "When I'm cooking for my partner, I want to log meals for both of us at once, so we can both track our nutrition."

### Core Hypotheses
- H1: If we use AI delegation for feature implementation, then development velocity increases because AI can handle boilerplate and edge cases autonomously.
- H2: If we add "Log for Both" functionality, then couples/households will find the app more valuable because it reduces duplicate effort.
- H3: If we add AI food scanning, then users can log meals even faster because they don't need to search for foods.

### Signals to Watch
- Positive: Features work correctly on first implementation, minimal bugs from AI-generated code
- Negative: AI-generated code requires significant manual fixes, edge cases missed
- Neutral / ambiguous: Development time comparable to manual implementation

### Non-goals
- Production-ready AI food recognition (using simulated detection)
- Real camera integration (using capture simulation)
- Multi-device sync (single device only)
- User authentication beyond demo (mock auth)

### What Success Looks Like
- CR03 (AI Food Scan) and CR05 (Multi-User Support) fully functional
- Partner logging works reliably ("Log for Both" toggle)
- Code quality comparable to manually-written code
- Maintainable component structure

---

## 2. Features Implemented

### Core Features (Base)
- Quick Add: 2-tap meal logging
- Dashboard: Calorie ring + macro progress bars
- 50+ Vietnamese foods database
- SQLite persistence via sql.js WASM

### CR03: AI Food Scan
- Camera capture simulation
- Multi-food detection with confidence badges
- Checkbox selection for detected items
- Individual portion editing before confirm

### CR05: Multi-User Support
- Partner profile creation
- Profile switcher in header
- "Log for Both" toggle in portion picker
- Separate food logs per user
- Partner-specific calorie goals

---

## 3. Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Database | sql.js (SQLite WASM) |
| State | React Context + useReducer |
| Routing | React Router v6 |

---

## 4. Key Files

| Area | Key Files |
|------|-----------|
| App Shell | `src/App.tsx`, `src/lib/appNav.ts` |
| Quick Add | `src/components/QuickAdd/QuickAddPage.tsx`, `PortionPicker.tsx` |
| Scan Flow | `src/components/Scan/ScanCameraPage.tsx`, `ScanResultsPage.tsx` |
| Partner | `src/components/Partner/ProfileSwitcher.tsx`, `src/hooks/usePartner.ts` |
| Database | `src/db/`, `src/hooks/useDatabaseStorage.ts` |

---

## 5. Cross-Prototype Comparison Hooks

### Key Questions This Prototype Helps Answer
- Can AI delegation produce production-quality code for complex features?
- What level of specification is needed for successful AI implementation?
- How does AI delegation compare to other approaches (prototype-lite, prototype-gated)?

### Strengths
- Rapid feature implementation
- Consistent code patterns across features
- Good handling of edge cases when properly specified

### Weaknesses
- Requires clear upfront specification
- Debugging AI-generated code can be challenging
- May miss context that human developers would intuit

### Best Context to Use This Approach
- Well-defined features with clear acceptance criteria
- Features that follow established patterns in the codebase
- When development velocity is prioritized
