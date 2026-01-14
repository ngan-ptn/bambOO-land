# Gate 4b: Ethics & Inclusive UX Review

```
┌─────────────────────────────────────────────────────────────┐
│ CR-ID: CR05                  Gate: 4b-Ethics & Inclusive UX │
│ Status: 🟡 PENDING           Date: 2025-01-14               │
├─────────────────────────────────────────────────────────────┤
│ 📋 SUMMARY                                                  │
│ Ethics review for: Multi-User Support (Couple Mode)         │
│ Feature: "Log for Both" + Profile switching                 │
├─────────────────────────────────────────────────────────────┤
│ 🧠 ETHICS & INCLUSION AUDIT                                 │
│ ┌─────────────────────────────────┬────────┬──────────────┐ │
│ │ Category                        │ Score  │ Notes        │ │
│ ├─────────────────────────────────┼────────┼──────────────┤ │
│ │ Cognitive load                  │ 🟢     │ Progressive  │ │
│ │ Dark pattern check              │ 🟢     │ No patterns  │ │
│ │ Accessibility (a11y)            │ 🟡     │ See flags    │ │
│ │ Inclusion (language, culture)   │ 🟡     │ See flags    │ │
│ │ Data privacy                    │ 🟢     │ Consent-based│ │
│ │ User wellbeing                  │ 🟡     │ See flags    │ │
│ └─────────────────────────────────┴────────┴──────────────┘ │
│                                                             │
│ 🚨 FLAGS:                                                   │
│ • Partner autonomy in shared device scenario                │
│ • Diet monitoring power dynamics                            │
│ • Active profile indicator visibility                       │
├─────────────────────────────────────────────────────────────┤
│ 👉 AI RECOMMENDATION: PASS WITH NOTES because core design   │
│    respects consent and autonomy, but 3 areas need review   │
├─────────────────────────────────────────────────────────────┤
│ ✅ GATE DECISION                                            │
│ [ ] PASS - no ethical concerns                              │
│ [?] PASS WITH NOTES - minor concerns documented             │
│ [ ] FAIL - requires design changes                          │
│ Notes: _______________________________________________      │
│ Decided by: ________________  Date: ______________          │
├─────────────────────────────────────────────────────────────┤
│ 🔗 Full details: See sections below                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Cognitive & Emotional Load

### Can a first-time user understand within 10 seconds? ✅ YES

**Evidence:**
- "Log for Both" toggle has clear label with partner's name
- Profile Dropdown shows both profiles with calorie goals
- Notification explicitly says "Added for you + [Partner]"

### Information/Decision Overload? 🟢 LOW RISK

| Screen | Load Assessment |
|--------|-----------------|
| Add Partner page | 4 fields only (name, avatar, goal, consent) - appropriate |
| Choose Portion | Toggle is optional, hidden partner section only shows when ON |
| Profile Dropdown | Max 4 items (2 profiles, add partner, settings) - manageable |

**Progressive disclosure used well:**
- Partner portion selector only appears when toggle is ON
- "Log for Both" toggle only shows if partner exists AND consent enabled
- Settings/consent management is future scope (not in MVP)

### Defaults favor wellbeing? 🟢 YES

- Consent toggle defaults to **ON** during setup, but...
- User must **actively add** a partner first
- No auto-enrollment or hidden partner linking
- Partner can revoke consent anytime (future G4 flow)

---

## 2. Manipulation & Dark Patterns

### Opt-out visibility? ✅ EQUAL

| Action | Opt-in | Opt-out |
|--------|--------|---------|
| Log for Both | Toggle ON (visible) | Toggle OFF (same visibility) |
| Add Partner | Explicit button tap | Back button, no penalty |
| Partner consent | Toggle during setup | Can revoke in settings (future) |

### FOMO/Guilt/Urgency? ✅ NONE DETECTED

| Screen | Copy | Assessment |
|--------|------|------------|
| Add Partner | "Partner can change this anytime" | Reassuring, not pressuring |
| Choose Portion | "Also log for [Name]" | Neutral, descriptive |
| Notification | "Added for you + [Name]" | Factual, not rewarding |

### Hidden options or penalties? ✅ NONE

- No gamification around shared logging
- No streaks broken if partner doesn't log
- No comparison/competition between partners

**Dark pattern check: PASSED**

---

## 3. Inclusion & Fairness

### Excluded user groups?

⚠️ **FLAG 1: Partner with limited device access**

| Scenario | Issue | Impact |
|----------|-------|--------|
| Partner doesn't have phone access | Primary user controls partner's data | Partner may feel monitored, not supported |

**Mitigation in design:**
- Consent toggle exists
- Partner can revoke (future G4)
- Data stays separate (can't see partner's weight, only calories)

⚠️ **FLAG 2: Power dynamics in relationships**

| Scenario | Issue | Impact |
|----------|-------|--------|
| Controlling partner | Could use "Log for Both" to monitor | Diet monitoring as control mechanism |

**Design limitations:**
- No alerts if partner "doesn't log enough"
- No comparison dashboards
- No shared goals (each has own)

### Can stressed/tired user complete core task? ✅ YES

| Task | Steps | Cognitive demand |
|------|-------|------------------|
| Log for self only | 3 taps (food → portion → confirm) | Same as before |
| Log for both | 5 taps (food → portion → toggle → partner portion → confirm) | 2 extra steps |

**Key insight:** "Log for Both" is **additive**, not required. A stressed user can ignore it completely.

### Forgotten user identified:

**"The partner who didn't ask for this"**

A partner who was added by their spouse but doesn't actively want to track calories. They now have a profile with their name and a calorie goal they didn't set.

**Questions to address:**
- Does partner get notified when added?
- Can partner delete their own profile?
- What happens to partner's data if primary user deletes account?

---

## 4. Intentional Trade-offs

### What was NOT built to protect wellbeing?

| Not built | Why |
|-----------|-----|
| Partner comparison dashboard | Avoids competition/shame |
| Shared calorie goals | Respects individual needs |
| Partner logging alerts | Prevents surveillance feeling |
| Auto-sync between devices | Keeps it simple, one device |
| Public sharing of partner's data | Privacy protection |

### Where does product sacrifice wellbeing for engagement?

| Potential issue | Current design | Assessment |
|-----------------|----------------|------------|
| Double logs = double engagement | Each person's log is separate | 🟢 Logs serve user, not metrics |
| "Log for Both" drives usage | Optional feature | 🟢 Not pushed or rewarded |

### If users overuse/misuse?

| Misuse scenario | Is it bug or feature? |
|-----------------|----------------------|
| Logging everything for partner without asking | BUG - Consent exists for this reason |
| Obsessively checking partner's progress | BUG - No comparison features to enable this |
| Using as diet control tool | BUG - Limited visibility into partner's data |

---

## 📋 Top Risks Summary

| # | Risk | Screen/Flow | Issue | Who's affected |
|---|------|-------------|-------|----------------|
| 1 | Partner autonomy | Add Partner | Partner added without real consent | Partner |
| 2 | Power dynamics | Switch Profile (G3) | Can monitor partner's eating | Partner in controlling relationship |
| 3 | Active profile confusion | Home | Might log for wrong person | Both users |

---

## ✅ What Works Well

| # | Positive | Evidence |
|---|----------|----------|
| 1 | Consent-first design | Toggle during setup, revocable |
| 2 | No dark patterns | Equal opt-in/opt-out, no FOMO |
| 3 | Additive complexity | Core logging unchanged, "Log for Both" is optional |
| 4 | Data isolation | Separate favorites, history, goals per profile |

---

## 🔄 Concrete Changes (Prioritized)

| Priority | Change | Rationale |
|----------|--------|-----------|
| **P1** | Add clear "Viewing as [Name]" header state | Prevents logging for wrong person |
| **P1** | Partner notification on first log for them | Ensures partner knows logging started |
| **P2** | Partner self-removal option | Autonomy - partner can opt out |
| **P2** | Different color/style for partner view | Visual differentiation reduces errors |
| **P3** | "This is for [Name]" confirmation before dual log | Extra safeguard for high-stakes action |

---

## ❓ One Hard Question

**Before shipping, the team must answer:**

> "If a partner is being monitored against their will through this feature, how would they know and what could they do about it?"

Current answer: Partner would see logs they didn't create, can revoke consent (future G4).

Is this enough? Does consent toggle actually protect the partner, or does it just make the primary user feel better?

---

## 🚦 Gate Result

**AI RECOMMENDATION: 🟡 PASS WITH NOTES**

**Conditions for PASS:**
1. P1 changes implemented (viewing indicator, partner notification)
2. Team documents answer to "hard question"
3. G4 (consent revocation) planned for v1.1

**Why not FAIL:**
- No dark patterns detected
- Consent mechanism exists
- Core task unchanged for solo users
- Design intentionally limits surveillance potential

**Why not full PASS:**
- Partner autonomy concerns need addressing
- Active profile indicator not yet visually distinct
- "Forgotten user" (unwilling partner) needs escape hatch

---

## ⛔ DECISION GATE

**Awaiting human decision.**

Options:
- `"Gate 4b decision: PASS"` - Proceed with no changes
- `"Gate 4b decision: PASS WITH NOTES"` - Proceed with documented concerns
- `"Gate 4b decision: FAIL"` - Requires design changes before proceeding

**Recommended response:** "Gate 4b decision: PASS WITH NOTES on partner autonomy"
