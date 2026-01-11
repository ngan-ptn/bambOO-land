# Prototype Documentation – 02d-PrototypER

**Domain:** Nutrition / Calorie Tracking
**Angle / Bet:** Structured prototyping with design system constraints (design tokens → components → screens → integration)
**Status:** Planned (Not Started)
**Owner:** Ngan Pham
**Last updated:** 2025-01-11

---

## 1. Prototype Overview (Entry Point)

### Purpose
Test whether a **design-system-first, component-library approach** produces high-quality, maintainable UI faster than implementation-first methods.

The prototypER approach asks: "What if we build like a design system team - define tokens first, build reusable components, then assemble screens?"

### Target User / JTBD
**Primary:** Vietnamese users who want to track daily calorie intake with minimal friction.

**Jobs-to-be-Done:**
- When I eat a meal, I want to log it in under 3 taps, so I maintain accurate records without disrupting my day
- When I eat common Vietnamese foods, I want pre-configured nutrition data, so I don't have to research calories
- When I eat the same meals regularly, I want to save them as favorites/combos, so logging is even faster

### Core Hypotheses
- H1: If we define design tokens first (colors, spacing, typography), then screens will be visually consistent without iteration.
- H2: If we build reusable components (Button, Input, Card) before implementing screens, we'll avoid code duplication.
- H3: If we assemble screens from components, implementation will be faster than building bespoke UI per screen.
- H4: If prototypER produces consistent design language, it will be easier to scale (add screens, features) than ad-hoc approaches.

### Signals to Watch
- **Positive:**
  - Screens match design tokens precisely (no manual adjustments)
  - Component reuse high (5+ instances of core components)
  - New screens assemble quickly (like building with Legos)
  - Design changes propagate via token updates (no per-screen hunting)
- **Negative:**
  - Components are over-abstracted (harder to customize)
  - Design tokens are over-engineered (too many variants)
  - Component library feels bloated (too many unused components)
  - Assembling screens takes longer than building directly
- **Neutral / ambiguous:**
  - Initial token definition takes time (is this front-loaded work paying off?)
  - Some screens need bespoke components despite library

### Non-goals
- **Not about design system:** This is about workflow, not building a production-ready design system
- **Not about pixel perfection:** Prototype-quality UI acceptable, not Figma-grade polish
- **Not about every component:** Only build components as needed for screens (don't pre-build library)
- **Not faster than delegation:** May be slower than AI delegation for simple features - testing quality vs speed

### What Success Looks Like
- **Visual consistency:** 90%+ of UI follows design tokens (minimal manual overrides)
- **Component reuse:** Average component used 3+ times across screens
- **Assembly speed:** New screen implemented in <50% time of building from scratch
- **Maintainability:** Design change (e.g., color) requires token update only (not per-screen changes)
- **Developer satisfaction:** 70%+ feel "prototypER workflow" helps, not hinders

---

## 2. PrototypER Workflow

### Component-First Development Process

| Phase | Output | Approx Time | Activities |
|--------|--------|---------------|-------------|
| 1. Design Tokens | Token definitions | 30-60 min | Define colors, typography, spacing, shadows, borders, transitions |
| 2. Component Library | Reusable components | 60-180 min | Build Button, Input, Card, BottomSheet, etc. as needed |
| 3. Screen Assembly | Implemented screens | Variable | Assemble screens from components (connect logic, routing) |
| 4. Integration | Working feature | Variable | Connect screens, test end-to-end flows |

### Design Token Structure

```
tokens/
├── colors/        # Primary, secondary, semantic colors
├── typography/     # Font sizes, weights, line heights
├── spacing/        # Margin, padding, gaps (4px, 8px, 12px, etc.)
├── borders/        # Radii, widths, colors
├── shadows/        # Elevation levels
└── transitions/    # Duration, easing functions
```

### Component Hierarchy

```
components/
├── primitives/     # Radix UI primitives (Dialog, Popover, etc.)
├── base/          # Design-system components (Button, Input, Card)
├── composites/     # Domain components (FoodTile, PortionPicker, ProgressRing)
└── screens/        # Page components (DashboardPage, QuickAddPage, etc.)
```

---

## 3. Technical Stack

Same as 02-PROTOTYPE base implementation:
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (consumes design tokens via CSS variables)
- **Database:** sql.js (SQLite WASM) - browser-only persistence
- **Routing:** react-router-dom v6
- **UI Primitives:** Radix UI (headless components)

---

## 4. Design Token Approach

### Token Definition Strategy

| Token Type | Definition Method | Examples |
|-------------|-------------------|-----------|
| Colors | Tailwind colors extended in config | primary: #2563EB, success: #4CAF50, error: #F44336 |
| Spacing | 4px scale (4, 8, 12, 16, 24, 32) | Use in Tailwind `space-3`, `space-4`, etc. |
| Typography | Scale (sm, base, lg, xl, 2xl, 3xl) | Font sizes: 14, 16, 18, 20, 24, 30, 36px |
| Borders | Radius scale (sm: 4, md: 8, lg: 12) | `rounded-sm`, `rounded-md`, `rounded-lg` |
| Shadows | Elevation levels (sm, md, lg) | Drop shadows for cards, dialogs |
| Transitions | Duration (fast: 150ms, normal: 200ms) | `transition-fast`, `transition-normal` |

### Token Consumption

```tsx
// Example component consuming tokens
<Button
  variant="primary"        // color token
  size="md"               // spacing/typography token
  radius="lg"             // border token
  shadow="md"              // shadow token
>
  Click me
</Button>
```

---

## 5. Base Features (from 02-PROTOTYPE)

Features that exist in the cloned base:
- Auth flow (simulated)
- Onboarding (name/goal/calories)
- Dashboard with progress ring
- Quick Add with food tiles
- S/M/L Portion picker
- Favorites and meal combos
- Search functionality
- Timeline (meal history)
- Manual entry
- Profile/Goals editing

---

## 6. Planned Features for Implementation Testing

Features to be implemented using prototypER workflow (to compare against 02a AI delegation, 02b prototype-lite, 02c gated):

| Feature | Complexity | Planned for Comparison |
|---------|-------------|------------------------|
| Partner profile switching (CR05) | Medium | How does component library approach handle multi-user data model? |
| "Log for Both" toggle | Medium | Does token system make complex UI easier? |
| Enhanced food search | Simple | Can reusable search components be built from tokens? |

---

## 7. Cross-Prototype Comparison Hooks

### Key Questions This Prototype Helps Answer
- Does design-system-first approach improve visual consistency vs other methods?
- Does component reuse significantly speed up new screen implementation?
- Is the upfront token definition time worth it? Or does it delay getting to real work?
- Are components reusable enough to avoid "bespoke" builds, or do most screens need custom work anyway?
- Does design token system make design changes (e.g., rebrand) trivial or just different bureaucracy?

### Strengths
- **Visual consistency:** Design tokens enforce uniform appearance across all screens
- **Rapid iteration:** New screens assemble quickly from existing components
- **Easy updates:** Design changes propagate via token updates (not per-screen hunting)
- **Maintainability:** Single source of truth for design values
- **Scalability:** As product grows, component library grows with it

### Weaknesses
- **Front-loaded overhead:** Defining tokens/building components before screens feels slow initially
- **Over-abstraction risk:** Components become too generic, requiring more props than necessary
- **Component bloat:** Library grows with components only used once or twice
- **Rigidity:** Components may not fit all use cases, leading to "wrapper hell"
- **Designer dependency:** Requires design system expertise (or good taste) to define tokens well

### Best Context to Use This Approach
- Design system exists with clear tokens
- Building many similar screens (patterns benefit from reuse)
- Team has design system experience
- Brand/design consistency is high priority
- Long-term product (not prototype) - investment in components pays off over time

---

## 8. Related Documentation

Documentation structure will mirror 02-PROTOTYPE:
- `docs/journal.md` - Development journal with component library tracking
- `docs/decisions/` - ADRs for component/token decisions
- `docs/retrospective.md` - Phase-end reflection
- Base OOUX artifacts (if needed for feature): `outputs/ooux-ia-flows/`

---

## 9. Implementation Notes

### Clone Status
- Cloned from: `02-PROTOTYPE`
- Folder: `prototypes/02d-prototypER/`
- Status: Ready for feature implementation

### Dev Port
- Will run on: `http://localhost:5176` (next available after 5175)

### Token vs Tailwind
- Question: Should we use CSS custom properties for tokens (more flexible) or Tailwind config (faster compile)?
- **Approach:** Tailwind config for prototype (faster), CSS variables if scaling to product

### Component Granularity
- Question: How atomic should components be?
  - `Button` (with variants) - Good
  - `PrimaryButton`, `SecondaryButton` - Too granular?
  - `FoodTile` (domain component) - Good
- **Heuristic:** If component has 3+ instances, extract it. If 1-2 uses, keep inline.

---

## 10. Comparison Metrics

Metrics to collect during prototypER implementation:

| Metric | Target | How to Measure |
|---------|--------|-----------------|
| Token definition time | 30-60 min | Time from start to complete tokens/ |
| Component build time | 60-180 min | Time from tokens to first component working |
| Screen assembly time | -50% vs scratch | Time from start of screen to working implementation |
| Component reuse rate | 3+ avg | (instances of component) / (number of components) |
| Token adherence | 90%+ | % of UI using tokens (no manual color/spacing overrides) |
| Design change time | <15 min | Time to change primary color (update token only) |
