# ADR-002 – User-Friendly Naming in Documentation

**Date:** 2025-01-10
**Prototype:** 02-PROTOTYPE
**Status:** Accepted

---

## Context
OOUX documentation (dot maps, IA maps, user flows, screen lists) needs to communicate effectively with both technical developers and non-technical stakeholders (designers, product managers, users). Component names like "PortionPicker" and "ActionSheet" are clear to developers but may confuse non-technical readers.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Technical naming | Precise for developers, consistent with code | Confusing for non-technical stakeholders, harder to get feedback |
| User-friendly naming | Accessible to all stakeholders, easier feedback gathering | May be less precise, potential disconnect with actual code |
| Mixed approach | Technical in code comments, user-friendly in UX docs | Inconsistent documentation, maintenance overhead |

## Decision
Use user-friendly naming throughout all UX documentation (dot maps, IA maps, user flows, screen lists) while maintaining technical naming in code. Examples: "Choose Portion Size" instead of "PortionPicker", "Add Food Options" instead of "ActionSheet".

## UX Trade-offs
Slight potential for confusion when mapping documentation concepts to code implementation, but this is outweighed by improved stakeholder communication and feedback quality.

## User Impact
No direct user impact - improves internal communication and feedback quality from non-technical stakeholders.

## Reversibility
- [x] Easy to change - Can standardize on technical naming if needed

## Consequences
- Enables better feedback from designers, product managers, and user research participants
- Requires developers to mentally map between documentation names and code names
- Improves cross-functional collaboration during prototype development</content>
<parameter name="filePath">prototypes/02-PROTOTYPE/docs/decisions/adr-002-user-friendly-naming.md