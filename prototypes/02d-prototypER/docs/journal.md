# Dev Journal: 02d-PrototypER

---

## 2025-01-11

### What I Worked On
- Set up docs folder structure for 02d-prototypER
- Created overview.md based on prototypER (component-first) approach
- Documented design token strategy (colors, typography, spacing, borders, shadows, transitions)
- Identified component hierarchy (primitives, base, composites, screens)
- Cloned from 02-PROTOTYPE base implementation

### Thinking / Debates
**Token Overhead:** Defining complete design system (30-60 min) feels like front-loaded work before implementing real features. Question: Is this time "wasted" on prototypes, or does it accelerate later work?

**Component Granularity:** How atomic should components be?
- `Button` with variants (primary, secondary, destructive, sizes) - Good
- `PrimaryButton`, `SecondaryButton` - Too granular?
- Heuristic: If component has 3+ instances, extract it. If 1-2 uses, keep inline.

**Tailwind vs CSS Variables:** Should we use Tailwind config (faster build, hot reload) or CSS custom properties (more flexible, runtime theming)?
- Approach: Tailwind config for prototype (speed), CSS variables if scaling to real product
- Trade-off: Tailwind needs rebuild for color changes; CSS variables don't but add complexity

**Reuse Reality:** Component library sounds great, but do real implementations need "bespoke" components anyway?
- Risk: Components become too generic → too many props → "wrapper hell"
- Example: FoodTile needs specific layout, maybe Button variant doesn't fit → custom wrapper
- Mitigation: Use components with sensible defaults, but allow overrides

### Decisions Made Today
- Decision: Use Tailwind config for design tokens (not CSS variables)
  - Confidence level: High - faster dev, simpler for prototype
  - Note: CSS variables better for production (runtime theming), but overkill here

- Decision: Build component library as needed (not pre-build complete library)
  - Confidence level: High - avoids bloat, keeps components purposeful
  - Heuristic: Build when second component instance appears

- Decision: 3-level component hierarchy (primitives, base/composites, screens)
  - Confidence level: High - clear separation of concerns
  - Note: Screens are not "components" - they're assemblies

### Open Bets
- Design system approach will produce consistent UI but may be slower than AI delegation for simple features
- Component reuse will speed up new screens once library is established
- Token-first approach makes design changes trivial (update one value, change propagates everywhere)

### Questions / Uncertainties
- How to measure "assembly speed" - is -50% vs scratch realistic?
- If components are over-abstracted, do we add features by adding more props (complexity moves to component API vs screen)?
- Does prototypER approach feel like "design system work" not "prototype work" - is that a problem?

### Tomorrow
- Define specific feature to implement for comparison across all 4 variants
- Begin component library setup (design tokens in Tailwind config)
- Track time spent on tokens/components vs screen assembly to validate workflow

---

## Template for Future Entries

### What I Worked On
Concrete actions taken.

### Thinking / Debates
Reasoning, internal conflict, alternative paths considered.

### Decisions Made Today
- Decision:
- Confidence level: High / Medium / Low

### Open Bets
Things intentionally left unresolved.

### Questions / Uncertainties
What still feels unclear.

### Tomorrow
Planned next steps.
