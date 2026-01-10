# CR04: Improve Portion Estimation UX - FRAMING

**Status:** COMPLETE
**Time:** 30-45 minutes (merged Steps 1+2+3)

---

## Original Request

> User research shows 40% don't trust the AI portions. They want to adjust but it's too hard.

---

## Problem Framings (3)

### A: Trust-Building (Recommended)

**Problem:** Users see AI portion estimates but have no way to understand or validate them, leading to distrust and feature abandonment.

**Root Cause:** The AI is a "black box" - users can't see why a portion was estimated as M vs L, so they don't trust the output.

**Solution Direction:** Add transparency (confidence indicators, comparison references) and easy adjustment controls.

### B: Control-First

**Problem:** Users know their portion is different from the AI estimate but the adjustment controls are hidden or clunky.

**Root Cause:** Current S/M/L selection is too rigid - users need finer control or custom portions.

**Solution Direction:** Intuitive adjustment UI - sliders, +/- buttons, custom gram entry.

### C: Learning-First

**Problem:** The AI makes the same mistakes repeatedly because it doesn't learn from user corrections.

**Root Cause:** User edits aren't fed back into the model, so accuracy doesn't improve over time.

**Solution Direction:** Capture user corrections as training data, personalize estimates per user.

---

## Selected Framing: A (Trust-Building) with elements of B

**Rationale:** Trust is the root issue - without trust, users won't use the feature at all. Better controls (B) enable trust by giving users agency. Learning (C) is backend improvement, not UX.

---

## Hypothesis

**IF** we add confidence indicators and easy portion adjustment
**THEN** users will trust AI estimates more and edit less frequently
**FOR** users who currently distrust and avoid the AI scan feature
**BECAUSE** transparency and control reduce perceived risk of wrong data

---

## Key Assumptions

| ID | Assumption | Risk | Validation Method |
|----|------------|------|-------------------|
| A-01 | Showing confidence increases trust | Medium | A/B test with/without confidence |
| A-02 | Users want to adjust, not just reject | Medium | Track edit vs abandon rate |
| A-03 | Simple adjustments (S/M/L) are sufficient | Medium | Track custom portion usage |
| A-04 | Visual portion references help calibration | Medium | Test with comparison images |
| A-05 | Users will learn to trust after 3-5 accurate scans | Low | Track trust over time |
| A-06 | Adjustment friction is the barrier, not AI accuracy | High | Survey users who abandon |

---

## Success Metrics

| Metric | Target | Fail Threshold |
|--------|--------|----------------|
| User trust rating (survey) | >7/10 | <5/10 |
| Edit rate after AI estimate | <30% | >50% |
| Scan feature retention (D30) | >60% | <40% |
| Time to adjust portion | <5s | >15s |
| Abandonment rate at portion step | <10% | >25% |

---

## Decision

[x] **A: Trust-Building** - Transparency + easy adjustment
[ ] B: Control-First - Focus on adjustment UI
[ ] C: Learning-First - ML feedback loop

**Notes:** Trust-building addresses root cause. Control improvements are tactical component of trust strategy.
