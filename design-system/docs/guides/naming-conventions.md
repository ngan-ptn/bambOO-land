# Naming Conventions

Single source of truth for artifact naming and file organization.

## Core Principle

One repo = one product. No product prefix needed.

## File Naming Pattern

```
[ARTIFACT-CODE][YYMMDD]-[slug](-[increment]).md
```

### Components

| Component | Required | Format | Example |
|-----------|----------|--------|---------|
| Artifact code | Yes | 2-4 uppercase letters | `COMP` |
| Date | Yes | YYMMDD | `250609` |
| Slug | Yes | 2-4 words, kebab-case, max 30 chars | `freshbooks-pricing` |
| Increment | No | `-2`, `-3`, etc. (only if collision) | `-2` |

### Examples

```
COMP250609-market-leaders.md
JTBD250609-onboarding-flow.md
PERS250609-smb-owner.md
RSYN250609-user-interviews.md
COMP250609-freshbooks-pricing-2.md   # second competitive analysis same day
```

## Artifact Codes

| Code | Artifact | Description |
|------|----------|-------------|
| `COMP` | Competitive Analysis | Market and competitor research |
| `DATA` | Sample Data | Mock or test data sets |
| `DES` | Design System | Design system documentation, UX/UI guidelines |
| `DLOG` | Decision Log | Design decisions and rationale |
| `FEAT` | Feature List | Feature specifications from scope |
| `FLOW` | User Flow | Task flows and interaction sequences |
| `IA` | Information Architecture | Site maps and content structure |
| `INTV` | User Interview | Interview notes and transcripts |
| `JMAP` | User Journey Map | End-to-end user experience maps |
| `JTBD` | JTBD | Jobs to be done statements |
| `PERS` | User Persona | User persona definitions |
| `PLAN` | Implementation Plan | Implementation plans, build plans, migration plans with detailed specifications |
| `PRD` | Product Requirement Document | Product requirements and specifications |
| `RMAP` | Roadmap | Roadmap planning |
| `RPT` | Report | Implementation reports, refactoring reports |
| `RSYN` | Research Synthesis | Synthesized research findings |
| `SCOP` | Scope Definition | Feature scope and requirements |
| `TASK` | Task List | Feature task breakdowns and acceptance criteria |
| `TEST` | Testing Plan | Test strategies and coverage plans |

## Slug Rules

1. **Concise** - 2-4 words that describe the content
2. **Kebab-case** - Lowercase, hyphens between words
3. **No dates** - Date is already in the filename
4. **Descriptive** - Should answer "what is this about?"

### Good Slugs

- `freshbooks-pricing`
- `onboarding-pain-points`
- `smb-owner-profile`
- `beta-user-feedback`

### Bad Slugs

- `analysis` (too vague)
- `competitive-analysis-december` (redundant with code and date)
- `this-is-a-very-long-slug-that-goes-on-forever` (too long)

## Same-Day Collisions

When creating multiple artifacts of the same type on the same day:

- First: `COMP250609-freshbooks-pricing.md`
- Second: `COMP250609-xero-features-2.md`
- Third: `COMP250609-wave-onboarding-3.md`

Increment appends at the end, before the extension.

## File Paths

All artifacts save to `artifacts/`

## Templates

Templates are in `.claude/templates/` with YAML frontmatter:

```yaml
---
template: [artifact-type]
version: 1
---
```

## Quick Reference

```
Pattern:  [CODE][YYMMDD]-[slug](-[increment]).md

Codes:    COMP  DATA  DES  DLOG  FEAT  FLOW  IA  INTV  JMAP  JTBD  PERS  PLAN  PRD  RMAP  RPT  RSYN  SCOP  TASK  TEST

Example:  JTBD250609-checkout-friction.md
```
