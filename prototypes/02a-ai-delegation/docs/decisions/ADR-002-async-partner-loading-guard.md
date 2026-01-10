# ADR-002 – Async Partner Loading Guard

**Date:** 2025-01-10
**Prototype:** 02a-ai-delegation
**Status:** Accepted

---

## Context
The `usePartner` hook loads partner data asynchronously from localStorage and database. The "Log for Both" toggle in PortionPicker was appearing before partner data was loaded, causing silent failures when users enabled the toggle.

Bug: Toggle visible → User enables it → Submits → `partner` is `null` → `addFoodForUser` silently skipped.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| A. Show toggle immediately, handle null in handler | Simple, no loading state | Silent failures, confusing UX |
| B. Hide toggle until partner loaded | Prevents race condition | Toggle may "pop in" after load |
| C. Disable toggle while loading | Shows intent, prevents action | Extra visual state to manage |

## Decision
**Option B: Only show partner toggle when `!isLoadingPartner && partner` is valid.**

```typescript
partnerName={hasPartner && !isLoadingPartner ? (partner?.displayName || 'Partner') : null}
```

When `partnerName` is `null`, PortionPicker hides the toggle entirely.

## UX Trade-offs
- Gain: No silent failures, toggle always works when visible
- Lose: Brief moment where toggle isn't visible on app load
- Acceptable: Partner load is fast (<100ms), delay imperceptible

## User Impact
- Users won't encounter confusing "I enabled it but nothing happened" scenario
- Toggle appearance is predictable and reliable
- Error toast added as fallback if partner log fails for other reasons

## Reversibility
- [x] Easy to change
- [ ] Costly to reverse
- [ ] Hard to reverse

Could switch to Option C (disabled state) if UX feedback prefers it.

## Consequences
- Prevents: Race condition bugs with async partner loading
- Enables: Reliable partner logging when toggle is used
- Requires: Consumers of `usePartner` must check `isLoadingPartner`
