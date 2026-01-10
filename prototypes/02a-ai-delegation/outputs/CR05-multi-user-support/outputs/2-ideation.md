# CR05: Multi-User Support (Family/Couple Mode) - IDEATION

**Status:** COMPLETE
**Time:** 45-60 minutes (merged Steps 4+5)

---

## Context

**Selected Framing:** Shared Logging ("Log for both" for couples)
**Hypothesis:** One-action meal logging for both partners increases couple retention

---

## Evaluation Criteria

| # | Criterion | Weight | Description |
|---|-----------|--------|-------------|
| 1 | Time Savings | 5 | How much effort is reduced? |
| 2 | Accuracy | 4 | Does it capture correct portions per person? |
| 3 | Flexibility | 4 | Handles variations (different portions, one skips)? |
| 4 | Implementation Effort | 3 | Dev complexity |
| 5 | Onboarding Simplicity | 3 | How easy to set up? |

---

## Solution Approaches (4)

### A: "Log for Both" Toggle (Recommended)

**Core Concept:** When logging a meal, toggle to also log for partner. Adjust their portion if different.

**How It Works:**
- User logs meal normally (favorites, search, scan)
- Before confirming, sees "Also log for [Partner]?" toggle
- Toggle ON: shows partner's portion (default: same)
- Adjust partner's portion if needed (S/M/L)
- One tap logs for both

**Cross-Domain Inspiration:**
- Domain: E-commerce
- Example: "Also send to [saved address]?" checkout option
- Pattern: Opt-in extension of primary action

**Trade-offs:**
| Pros | Cons |
|------|------|
| Minimal UI change | Requires partner profile setup |
| Non-intrusive (toggle) | Only works same-device |
| Preserves individual flow | Partner can't customize meal |
| Quick for shared meals | Portion difference is limited |

**Best For:** Couples who eat together on same device

---

### B: Meal Sync (Real-Time)

**Core Concept:** When one person logs, notification asks partner (on their device) to confirm/adjust.

**How It Works:**
- User A logs "Phở bò, M"
- User B gets notification: "A logged Phở bò. Log for you too?"
- User B taps: "Yes, same" or "Yes, but L" or "No"
- Both logs recorded

**Cross-Domain Inspiration:**
- Domain: Fintech
- Example: Splitwise expense sharing
- Pattern: One-action triggers multi-user sync

**Trade-offs:**
| Pros | Cons |
|------|------|
| Works across devices | Requires push notifications |
| Partner has full control | More implementation complexity |
| No same-device constraint | Delays partner's log (async) |
| Feels collaborative | Partner may ignore notification |

**Best For:** Couples with separate devices who want autonomy

---

### C: Shared Meal Templates

**Core Concept:** Create templates for meals you eat together. One tap logs for both with preset portions.

**How It Works:**
- Setup: Create "Breakfast together" template with items + portions per person
- Usage: Tap template → logs for both instantly
- Can edit template over time

**Trade-offs:**
| Pros | Cons |
|------|------|
| One-tap for regular meals | Setup effort required |
| Handles portion differences | Doesn't work for varied meals |
| Very fast for habits | Template management overhead |
| Predictable calories | Rigid, not spontaneous |

**Best For:** Couples with predictable shared meals (same breakfast daily)

---

### D: Profile Switcher (Manual)

**Core Concept:** Quick switch between profiles on same device. Log as each person separately but fast.

**How It Works:**
- Avatar in header shows current user
- Tap to switch profiles (2-tap)
- Log meal for User A
- Switch to User B, log same meal
- History is per-profile

**Trade-offs:**
| Pros | Cons |
|------|------|
| Simple implementation | Still logs twice (just faster) |
| Clear separation | No "log for both" efficiency |
| Works for any household | Doesn't address core pain |
| No sync complexity | Manual and tedious |

**Best For:** Households where members rarely eat together

---

## Comparison Matrix

| Approach | Time Savings | Accuracy | Flexibility | Effort | Onboarding | Total |
|----------|--------------|----------|-------------|--------|------------|-------|
| A: Log for Both Toggle | 5 | 4 | 4 | 4 | 5 | **84/95** |
| B: Meal Sync | 4 | 5 | 5 | 2 | 3 | **71/95** |
| C: Shared Templates | 5 | 4 | 2 | 3 | 3 | **65/95** |
| D: Profile Switcher | 2 | 5 | 5 | 5 | 4 | **75/95** |

---

## AI Recommendation

**Recommend: A (Log for Both Toggle)** with D (Profile Switcher) as infrastructure

**Rationale:**
- "Log for Both" directly addresses the pain point (logging twice)
- Profile Switcher (D) is needed anyway for household accounts
- Meal Sync (B) is best but too complex for v1
- Templates (C) too rigid for varied Vietnamese meals

**Implementation Path:**
1. Build Profile Switcher (D) as foundation
2. Add "Log for Both" toggle (A) on top
3. Consider Meal Sync (B) for v2 if cross-device demand emerges

---

## Decision

[x] **A: Log for Both Toggle** - Primary feature, with D as foundation
[ ] B: Meal Sync (Real-Time)
[ ] C: Shared Meal Templates
[ ] D: Profile Switcher only

**Notes:** Build D first (profiles), then add A (log for both) as the user-facing feature. A + D together deliver the couple experience.
