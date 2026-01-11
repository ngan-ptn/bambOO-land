# ADR-003 – S/M/L Portion Sizing

**Date:** 2025-01-10
**Prototype:** 02-PROTOTYPE
**Status:** Accepted

---

## Context
Users need to specify portion sizes when logging food. Vietnamese street food portions vary significantly, but requiring precise gram measurements creates friction. Need a balance between accuracy and usability for casual calorie tracking.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Gram weights | Most accurate, works for all foods | High friction, requires measuring, mental calculation burden |
| S/M/L qualitative | Fast estimation, familiar concept | Less precise, may not work for all food types |
| Pre-defined portions | Consistent, no user input required | Limited flexibility, may not match actual consumption |
| Visual portion guide | Intuitive, educational | Complex UI, still requires estimation |

## Decision
Implement S/M/L (Small/Medium/Large) qualitative portion sizing as the primary input method. Each food has pre-calculated nutrition data for S/M/L portions based on typical Vietnamese street food serving sizes.

## UX Trade-offs
Sacrifice precision for speed - users get approximate calorie tracking but can log meals quickly. This prioritizes habit formation over exact nutritional accuracy.

## User Impact
Benefits casual users who want fast logging without measurement burden. May frustrate precision-focused users (serious athletes, medical conditions) who need exact gram measurements. Vietnamese users benefit from culturally appropriate portion definitions.

## Reversibility
- [x] Easy to change - Can add gram input as secondary option or replace entirely

## Consequences
- Enables "2-tap logging" core value proposition
- Simplifies food database (no complex portion calculations)
- May require user education about what S/M/L means for different foods
- Limits precision for users who need exact tracking</content>
<parameter name="filePath">prototypes/02-PROTOTYPE/docs/decisions/adr-003-sml-portions.md