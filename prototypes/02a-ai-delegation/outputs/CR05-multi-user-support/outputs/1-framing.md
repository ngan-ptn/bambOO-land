# CR05: Multi-User Support (Family/Couple Mode) - FRAMING

**Status:** COMPLETE
**Time:** 30-45 minutes (merged Steps 1+2+3)

---

## Original Request

> Couples and families want to share one subscription but track individually. Can we support multiple profiles?

---

## Problem Framings (3)

### A: Shared Logging (Recommended)

**Problem:** Couples who eat together must log the same meal twice - once per person - which doubles the effort and causes one partner to stop tracking.

**Root Cause:** The app assumes single-user usage. When two people eat the same meal, each must independently search, select, and log.

**Solution Direction:** "Log for both" feature that applies one meal to multiple profiles with portion adjustments.

### B: Household Management

**Problem:** Families want one subscription with separate profiles, but there's no way to manage multiple users under one account.

**Root Cause:** Account system is 1:1 (one account = one user). No concept of household or shared subscription.

**Solution Direction:** Household account with profile switcher, shared subscription, individual data.

### C: Social Accountability

**Problem:** People tracking alone lack motivation. Couples/families want to see each other's progress for mutual encouragement.

**Root Cause:** Tracking is solitary - no visibility into partner's progress, no shared goals or celebrations.

**Solution Direction:** Shared dashboard showing household members' progress, achievements, streaks.

---

## Selected Framing: A (Shared Logging)

**Rationale:** Speed is the core UX axis. Shared Logging directly reduces effort for the most common couple use case (eating together). Household Management (B) is infrastructure, not user value. Social features (C) are Phase 2.

---

## Hypothesis

**IF** we enable logging a meal for both partners with one action
**THEN** couples will maintain tracking consistency better than individuals
**FOR** couples who eat most meals together and want to track calories
**BECAUSE** removing the "log it twice" friction keeps both partners engaged

---

## Key Assumptions

| ID | Assumption | Risk | Validation Method |
|----|------------|------|-------------------|
| A-01 | Couples eat together frequently (>50% of meals) | Medium | Survey target users |
| A-02 | One partner typically does the logging | High | User interviews |
| A-03 | Both partners want to track (not just one) | High | Survey couples |
| A-04 | Same-device usage is acceptable for v1 | Medium | Usage pattern analysis |
| A-05 | Portion differences are predictable (he eats more) | Low | Common pattern |
| A-06 | "Log for both" saves enough time to matter | Medium | Compare time-to-log |

---

## Success Metrics

| Metric | Target | Fail Threshold |
|--------|--------|----------------|
| Couple retention (D30 both active) | >50% | <30% |
| "Log for both" usage rate | >40% of shared meals | <20% |
| Time saved per shared meal | >50% reduction | <25% reduction |
| Second user activation rate | >70% | <50% |
| NPS for couple users | >40 | <20 |

---

## Decision

[x] **A: Shared Logging** - "Log for both" for couples eating together
[ ] B: Household Management - Profile switcher, shared subscription
[ ] C: Social Accountability - Shared progress dashboard

**Notes:** A delivers immediate value for primary use case. B is required infrastructure but not the UX focus. C is engagement feature for Phase 2.
