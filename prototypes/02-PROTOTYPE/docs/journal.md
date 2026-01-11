# Dev Journal: 02-PROTOTYPE (Calo Tracker)

---

## 2025-01-10

### What I Worked On
- Rebuilt prototype from CR05-testv2-structure calo-tracker codebase
- Generated OOUX documentation (dot map, IA map, user flows, screen list)
- Updated all docs to use user-friendly naming for non-technical stakeholders
- Created 4 cloned prototypes for feature implementation comparison:
  - 02a-ai-delegation
  - 02b-prototype-lite
  - 02c-prototype-gated
  - 02d-prototypER
- Set up documentation structure following bambOO-land templates

### Thinking / Debates
- **Naming convention:** Debated between technical component names (PortionPicker, ActionSheet) vs user-friendly names (Choose Portion Size, Add Food Options). Chose user-friendly for all UX documentation to ensure non-technical stakeholders can review.
- **Prototype cloning approach:** Considered git branches vs folder clones for comparing 4 implementation approaches. Chose folder clones because:
  - Can run all 5 prototypes simultaneously on different ports
  - Easier visual side-by-side comparison
  - No git complexity during rapid iteration

### Decisions Made Today
- Decision: Use folder cloning (not git branches) for prototype variants
- Confidence level: High - benefits for visual comparison outweigh code duplication cost

- Decision: User-friendly naming in all OOUX docs
- Confidence level: High - improves stakeholder communication

### Open Bets
- S/M/L portion sizing is "good enough" for casual trackers
- Single-screen dashboard won't overwhelm users
- Vietnamese food database of ~50 items covers 80% of use cases

### Questions / Uncertainties
- Which of the 4 approaches (ai-delegation, prototype-lite, prototype-gated, prototypER) will be most efficient for implementing new features?
- Should meal combos support partial logging (some items, not all)?
- Is the current onboarding flow too long (4 steps)?

### Tomorrow
- Define the new feature to implement across all 4 approach variants
- Begin implementation comparison experiment
- Set up metrics for comparing implementation approaches

---
