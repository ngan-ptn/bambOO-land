# CR05: Multi-User Support (Family/Couple Mode) - SELECT

**Status:** COMPLETE
**Time:** 30 minutes (Step 6)

---

## Analyzing Top Approaches

From IDEATION: **A (Log for Both Toggle)** + **D (Profile Switcher)** as combined solution

---

## Tradeoff Analysis

### A + D: Log for Both + Profile Switcher

**Primary Benefit:** One-action shared meal logging on same device, with profile infrastructure for individual tracking.

**Users Who Benefit:**
- Couples eating together frequently (primary target)
- Household members sharing one device
- One person who "does the tracking" for the household
- Time-constrained users who would otherwise skip logging

**Users Who May Suffer:**
- Couples wanting separate devices (forced to share)
- Privacy-conscious partners (other sees their data)
- Families with very different meals (toggle less useful)
- Partners with complex dietary needs (S/M/L too simple)

**Risk Scenario:** Partner who doesn't hold the phone feels excluded/controlled. Or: "Log for both" is ignored because toggle is easy to miss.

**If Wrong, We Still Learn:** Whether same-device is acceptable, how often couples actually eat together, what percentage use the toggle.

---

### B: Meal Sync (Comparison)

**Primary Benefit:** True cross-device experience - each person has autonomy while staying synced.

**Users Who Benefit:**
- Couples with separate phones (most common)
- Partners who want control over their own log
- Privacy-conscious users (confirm before logging)

**Users Who May Suffer:**
- Users in notification-heavy environments (missed notifications)
- Partners with different logging cadence (async confusion)
- Users without reliable internet (sync fails)

**Risk Scenario:** Notifications are annoying, partner ignores them, meal sync breaks down. Or: One person resents being "controlled" by other's logging.

**If Wrong, We Still Learn:** Notification engagement rates, cross-device demand, sync reliability requirements.

---

## Comparison Summary

|         | A+D: Log for Both + Profiles | B: Meal Sync |
|---------|------------------------------|--------------|
| Benefit | One-tap shared logging, simple | Cross-device, autonomous |
| Risk | Medium (same-device constraint) | High (notification fatigue) |
| Effort | Medium | High |
| Winners | Same-device couples, shared tracking | Separate-device couples |
| Losers | Privacy-focused, separate-device | Notification-averse |

---

## AI Recommendation

**Recommend: A + D (Log for Both + Profile Switcher)**

**Rationale:**
- Simplest path to value for primary use case
- Same-device is acceptable constraint for v1
- Profile Switcher has standalone value even if "Log for Both" fails
- Meal Sync (B) can be added in v2 if demand exists

**Same-Device Justification:**
- Many couples share phones for household tasks already
- Vietnamese household patterns often have shared device usage
- Removes sync complexity, works offline
- If users demand cross-device, we have signal for v2

---

## Decision

[x] **A + D** - Log for Both toggle + Profile Switcher
[ ] B only - Meal Sync across devices
[ ] A + B - Both approaches (too complex for v1)
[ ] Return to IDEATION

**Rationale:** A + D delivers 80% of couple value with manageable complexity. Same-device constraint is acceptable for v1 launch.

**Risk Mitigation:**
- Make "Log for Both" toggle prominent, not hidden
- Default toggle OFF (opt-in, not forced)
- Allow partner to have their own favorites
- Include "Partner's portion" quick picker (S/M/L relative)
- Track same-device vs cross-device usage to inform v2
