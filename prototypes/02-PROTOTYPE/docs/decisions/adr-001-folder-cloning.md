# ADR-001 – Folder Cloning for Prototype Variants

**Date:** 2025-01-10
**Prototype:** 02-PROTOTYPE
**Status:** Accepted

---

## Context
Need to create 4 separate prototype implementations (ai-delegation, prototype-lite, prototype-gated, prototypER) for comparing different feature implementation approaches. Each variant needs to be independently runnable and comparable while maintaining shared testing infrastructure and documentation.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Git branches | Clean version control, easy merging | Cannot run multiple variants simultaneously, complex git workflows during rapid iteration |
| Folder clones | Can run all variants on different ports, simple visual comparison, no git complexity | Code duplication, potential drift between variants |
| Separate repos | Complete isolation, clean separation | Lose shared tooling, harder to maintain consistency, more complex testing setup |

## Decision
Use folder cloning approach. Each prototype variant exists as a separate directory under `prototypes/` with its own complete codebase, allowing simultaneous execution and easy visual comparison.

## UX Trade-offs
No direct UX impact - this is an implementation decision for development workflow comparison.

## User Impact
No user impact - this affects development efficiency and testing setup, not end-user experience.

## Reversibility
- [x] Easy to change - Can migrate to git branches later if needed

## Consequences
- Enables running all 5 prototypes simultaneously on different ports for side-by-side comparison
- Simplifies visual testing and iteration during development
- Requires manual synchronization if shared code needs updates across variants
- Increases repository size due to code duplication</content>
<parameter name="filePath">prototypes/02-PROTOTYPE/docs/decisions/adr-001-folder-cloning.md