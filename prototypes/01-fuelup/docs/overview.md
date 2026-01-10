# Prototype Documentation – 01 FuelUp

**Domain:** Nutrition / Health Tracking
**Angle / Bet:** Partner accountability through shared streaks
**Status:** Active
**Owner:** Ngan
**Last updated:** 2026-01-10

---

## 1. Prototype Overview (Entry Point)

### Purpose
Test whether **social accountability** (via a partner/duo system) increases adherence to nutrition tracking compared to solo tracking apps.

Most nutrition tracking apps fail because logging feels like a chore done in isolation. FuelUp explores whether making it a shared activity with someone you care about changes the equation.

### Target User / JTBD
**Primary JTBD:** Help me maintain healthy eating habits by making food logging quick and social, so I don't abandon tracking after a week.

**Target User Profile:**
- Young professionals (25-35) in relationships or close friendships
- Have tried tracking apps before but stopped due to friction
- Want accountability without judgment
- Prefer speed over precision in logging

### Core Hypotheses
- **H1:** If both partners must log to maintain a shared streak, then logging adherence will increase because neither wants to be the one who breaks the streak.
- **H2:** If meal logging takes <30 seconds, then users will log consistently because it fits into their existing habits.
- **H3:** If partners can see each other's logging status (not details), then gentle social pressure will encourage daily logging.
- **H4:** If we provide a "nudge" mechanism, then partners will use it to remind each other without confrontation.

### Signals to Watch
**Positive:**
- Both partners log on the same day (streak maintained)
- Logging completion time <30 seconds
- Users return after missing a day (recovery behavior)
- Nudge feature gets used but not excessively

**Negative:**
- One partner logs consistently, other abandons
- Streak breaking causes relationship friction
- Users feel surveilled or judged
- Logging time exceeds 1 minute

**Neutral / ambiguous:**
- High nudge frequency (could be engagement or annoyance)
- Users switch to "solo mode" (could mean feature failure or legitimate need)

### Non-goals
- **Not a comprehensive nutrition tracker** - We're not competing with MyFitnessPal on features
- **Not a meal planning app** - No recipes or grocery lists
- **Not for clinical use** - No precise macro tracking or medical integration
- **Not for large groups** - Optimized for 2-person partnerships only

### What Success Looks Like
**Qualitative:**
- Users describe logging as "something we do together" not "a chore"
- Partners mention the streak in casual conversation
- Users recover from missed days instead of abandoning

**Quantitative (hypothetical for real testing):**
- 7-day retention >60% (vs ~20% industry average for solo trackers)
- Average logging time <30 seconds
- Streak recovery rate >40% (users who miss a day and return)

---

## 5. Cross-Prototype Comparison Hooks

### Key Questions This Prototype Helps Answer
- Does social accountability improve tracking adherence?
- Is "partner pressure" motivating or stressful?
- Can extreme simplicity (5 foods, 3 portions) work for nutrition tracking?
- Does the "shared streak" concept resonate emotionally?

### Strengths
- **Motivation through relationship** - Leverages existing emotional bonds
- **Extreme simplicity** - Very fast to log, low cognitive load
- **Built-in accountability** - Don't need external reminders
- **Positive framing** - "Keep the streak" vs "don't fail"

### Weaknesses
- **Dependency on partner** - If one person quits, both lose value
- **Limited precision** - Power users (like Khoa persona) frustrated by lack of macros
- **Onboarding gap** - New users don't understand "shared streak" concept
- **Single relationship type** - Assumes romantic partner, may not fit friends/family

### Best Context to Use This Approach
- Couples trying to eat healthier together
- Accountability partners with existing trust
- Users who prioritize consistency over precision
- People who've failed with solo tracking apps

---

## Current Findings (from Persona Testing)

### Friction Points Identified: 13

| Severity | Count | Key Issues |
|----------|-------|------------|
| High | 5 | No macro breakdown, no food search, can't edit AI scan, no onboarding for streak concept |
| Medium | 7 | No portion guidance, limited food database, unexplained nudge mechanism |
| Low | 1 | No partner statistics |

### By Persona Type
- **Linh (Primary - Efficiency):** 1 friction point - meets speed goals
- **Minh (Secondary - First-time):** 5 friction points - needs more guidance
- **Khoa (Tertiary - Precision):** 7 friction points - wants features we explicitly excluded

### Interpretation
The friction distribution validates our non-goals: power users wanting precision (Khoa) are not our target. However, the onboarding gaps for new users (Minh) need addressing.
