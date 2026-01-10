# ADR-001 – Partner as Separate User Profile

**Date:** 2025-01-10
**Prototype:** 02a-ai-delegation
**Status:** Accepted

---

## Context
CR05 requires multi-user support for household meal logging. Need to decide how to model the "partner" entity - as a sub-profile of the primary user, or as a full separate user record.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| A. Sub-profile (embedded in primary user) | Simpler data model, no separate auth | Can't have own goals, logs tied to primary |
| B. Separate User record | Own goals, own logs, can switch context | More complex, need to manage relationship |

## Decision
**Option B: Partner is a separate User record with own profile, goals, and food logs.**

The partner is created via `createUser()` with no email (local profile) and linked to the primary user via a `PartnerLink` stored in localStorage.

## UX Trade-offs
- Gain: Partner has independent calorie goals (may differ from primary)
- Gain: Can view app "as partner" with full context switch
- Lose: Slightly more complex onboarding (need to set partner's goals)

## User Impact
- Couples benefit: Each person has personalized targets
- May confuse single users who accidentally add partner
- Clear UI indication of "viewing as" state mitigates confusion

## Reversibility
- [x] Easy to change
- [ ] Costly to reverse
- [ ] Hard to reverse

Could refactor to sub-profile model, but would lose partner-specific goals.

## Consequences
- Enables: Partner can have own daily calorie/macro targets
- Enables: Profile switcher can show two distinct profiles
- Enables: Future expansion to 3+ household members
- Requires: Careful state management for "which user am I viewing as"
