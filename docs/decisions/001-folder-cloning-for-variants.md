# ADR-001 – Use Folder Cloning for Prototype Variants

**Date:** 2025-01-10
**Prototype:** Cross-cutting (02-PROTOTYPE variants)
**Status:** Accepted

---

## Context

We need to implement the same feature using 4 different approaches (ai-delegation, prototype-lite, prototype-gated, prototypER) to compare their effectiveness. This requires running the same base prototype (02-PROTOTYPE) with different implementations side-by-side.

**Constraints:**
- Need to run all 5 versions simultaneously for visual comparison
- Need to easily switch between variants during development
- Need to preserve git history for the base prototype
- Limited time for setup complexity

---

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **A. Git Branches** | Native git, easy to diff/merge, no code duplication | Can only work on one branch at a time, can't run side-by-side, context switching overhead |
| **B. Git Worktrees** | Multiple branches as separate folders, git-tracked, can run simultaneously | More complex setup, requires git knowledge, each worktree shares git state |
| **C. Folder Cloning** | Simple setup, fully isolated, run all simultaneously, easy visual comparison | Code duplication, base changes don't propagate, more disk space |

---

## Decision

**Chose Option C: Folder Cloning**

Created 4 cloned folders from 02-PROTOTYPE:
```
prototypes/
├── 02-PROTOTYPE/           # Base (reference, untouched)
├── 02a-ai-delegation/
├── 02b-prototype-lite/
├── 02c-prototype-gated/
└── 02d-prototypER/
```

**Rationale:**
1. **Simultaneous execution** - Can run all 5 on different ports (5173-5177) for instant visual comparison
2. **Full isolation** - Each variant is completely independent, no risk of cross-contamination
3. **Simplicity** - No git complexity during rapid iteration phase
4. **Base preservation** - 02-PROTOTYPE stays untouched as reference

---

## UX Trade-offs

| Gained | Sacrificed |
|--------|------------|
| Instant visual comparison across variants | Git history for variants (only base has history) |
| Zero context-switching cost | Automatic propagation of base fixes |
| Simple mental model (5 folders = 5 apps) | Disk space efficiency |

---

## User Impact

**Benefits:**
- Developers can compare implementations side-by-side in browser
- No git knowledge required for variant work
- Clear separation reduces confusion

**Drawbacks:**
- If base prototype needs a bugfix, must manually apply to all 4 variants
- Larger repo size (~5x prototype code)

---

## Reversibility

- [x] Easy to change
- [ ] Costly to reverse
- [ ] Hard to reverse

Can delete variant folders and switch to git branches/worktrees at any time. No permanent consequences.

---

## Consequences

**Enables:**
- Running comparison experiments with minimal setup
- Visual A/B/C/D testing in browser
- Independent iteration on each approach

**Prevents:**
- Easy git-based diffing between variants
- Automatic propagation of base changes
- Using git bisect across variants

**Mitigations:**
- Document any base fixes that need manual propagation
- Use diff tools for cross-folder comparison when needed
- Consider consolidating after experiment concludes
