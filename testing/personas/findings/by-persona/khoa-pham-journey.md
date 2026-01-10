# Khoa Pham - User Journey Report

> **Type:** tertiary | **Sessions:** 1 | **Familiarity:** returning

## Profile

| Attribute | Value |
|-----------|-------|
| Age | 33+ |
| Role | Fitness enthusiast |
| Experience | Uses tracking apps regularly (MyFitnessPal, etc.) |
| Tech Comfort | high |

### Goals
- Precise macro tracking (P/C/F)
- Accurate calorie counts
- Data-driven nutrition decisions

### Frustrations
- Inaccurate food databases
- No custom portion input
- Missing macro breakdowns
- Can't verify AI accuracy

## Session Timeline

### 2026-01-09 - initial-test

| Task | Status | Duration |
|------|--------|----------|
| view-dashboard | PASS | 93ms |
| log-meal-manually | PASS | 2551ms |
| ai-scan | PASS | 4276ms |
| send-nudge | PASS | 1581ms |
| partnership-settings | PASS | 1700ms |

## Observed Patterns

- Immediately seeks detailed nutritional data
- Selects larger portions (bulking/fitness focus)
- Critically evaluates AI accuracy
- Looks for features that don't exist yet

## Friction Points

### Unresolved (7)

| Severity | Feature | Issue | Since |
|----------|---------|-------|-------|
| HIGH | dashboard | No macro breakdown (P/C/F) on dashboard | 2026-01-09 |
| HIGH | meal-logging | No search bar to find specific foods | 2026-01-09 |
| HIGH | meal-logging | Cannot input custom portion size (grams) | 2026-01-09 |
| HIGH | ai-scan | Cannot edit AI scan result before logging | 2026-01-09 |
| MEDIUM | meal-logging | No barcode scanner for packaged foods | 2026-01-09 |
| MEDIUM | meal-logging | Limited food database (only 5 items) | 2026-01-09 |
| LOW | partner-settings | No detailed partner statistics or progress charts | 2026-01-09 |

## Hypotheses to Validate

- [ ] Would likely use a different app for serious tracking
- [ ] Might use FuelUp only for accountability, not precision
- [ ] Would request macro display as first feature
- [ ] Partnership feature is interesting but not enough alone

## Observation Log

- **2026-01-09** [initial-test]: Task 1 (View Dashboard): Completed in 93ms - immediately noticed missing macros
- **2026-01-09** [initial-test]: Task 2 (Log Meal): Completed in 2551ms - no search function found
- **2026-01-09** [initial-test]: Task 3 (AI Scan): Completed in 4276ms - cannot edit result
- **2026-01-09** [initial-test]: Task 4 (Send Nudge): Partner already logged
- **2026-01-09** [initial-test]: Task 5 (Settings): Completed in 1700ms - looked for detailed stats
