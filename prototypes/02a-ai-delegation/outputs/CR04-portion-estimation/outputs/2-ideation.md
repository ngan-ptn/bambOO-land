# CR04: Improve Portion Estimation UX - IDEATION

**Status:** COMPLETE
**Time:** 45-60 minutes (merged Steps 4+5)

---

## Context

**Selected Framing:** Trust-Building (transparency + easy adjustment)
**Hypothesis:** Confidence indicators + easy adjustment increases user trust in AI estimates

---

## Evaluation Criteria

| # | Criterion | Weight | Description |
|---|-----------|--------|-------------|
| 1 | Trust Impact | 5 | Does it increase user confidence? |
| 2 | Adjustment Speed | 4 | How quickly can users correct? |
| 3 | Learning Curve | 4 | Is it intuitive? |
| 4 | Implementation Effort | 3 | Dev complexity |
| 5 | Visual Clarity | 3 | Is the UI clear? |

---

## Solution Approaches (4)

### A: Confidence Badge + Quick Adjust (Recommended)

**Core Concept:** Show confidence level (High/Medium/Low) next to AI estimate. Tap to quickly adjust with preset options.

**How It Works:**
- AI result shows: "Cơm rang - Medium portion" + confidence badge
- Badge color: Green (high), Yellow (medium), Red (low)
- Tap portion → shows S/M/L + "Custom" option
- Custom opens gram/calorie input
- Single tap to accept estimate

**Cross-Domain Inspiration:**
- Domain: Weather Apps
- Example: "70% chance of rain" confidence display
- Pattern: Quantified uncertainty helps users calibrate expectations

**Trade-offs:**
| Pros | Cons |
|------|------|
| Clear confidence signal | Users may ignore low confidence |
| Quick adjustment path | Extra cognitive load (badge) |
| Maintains S/M/L simplicity | Custom entry adds complexity |
| Transparent AI | May highlight AI weaknesses |

**Best For:** Users who want transparency without complexity

---

### B: Visual Portion Comparison

**Core Concept:** Show reference images of S/M/L portions for the specific food. User picks which matches their plate.

**How It Works:**
- AI detects "Phở"
- Shows 3 reference photos: small bowl, medium bowl, large bowl
- User taps the one that matches their serving
- Logged with that portion's calories

**Cross-Domain Inspiration:**
- Domain: Medical/Health
- Example: Bristol Stool Chart (visual comparison scales)
- Pattern: Visual references are more accurate than verbal descriptions

**Trade-offs:**
| Pros | Cons |
|------|------|
| Visual matching is intuitive | Need photos for every food |
| Reduces estimation error | Large asset library required |
| Educational (learn portions) | Not all foods photograph well |
| No numbers needed | Culture-specific portions |

**Best For:** Visual learners, users bad at estimating

---

### C: Slider Adjustment

**Core Concept:** Continuous slider from 0.5x to 2x the base portion. Shows calories updating in real-time.

**How It Works:**
- AI shows base estimate: "Bánh mì - 350 kcal"
- Slider below: 0.5x ←|→ 2x
- Drag slider, calories update: 175 kcal ↔ 700 kcal
- Tap to confirm

**Trade-offs:**
| Pros | Cons |
|------|------|
| Fine-grained control | Can be fiddly on mobile |
| Real-time feedback | Precision may be false accuracy |
| Familiar UI pattern | Takes more time than tap |
| No discrete options | Accessibility concerns |

**Best For:** Users who want precise control

---

### D: Guided Correction Flow

**Core Concept:** If user marks estimate as wrong, guided questions narrow down the correct answer.

**How It Works:**
- User taps "Not quite right"
- System asks: "Was your portion larger or smaller?"
- User taps "Larger"
- System: "Was it about 1.5x or 2x?"
- Final: "Got it! Updated to 525 kcal"

**Trade-offs:**
| Pros | Cons |
|------|------|
| Low cognitive load | Multiple taps/steps |
| Conversational feel | Slower than direct edit |
| Helps uncertain users | Annoying for confident users |
| Good error correction | Feels patronizing |

**Best For:** Users who don't know how much to adjust

---

## Comparison Matrix

| Approach | Trust | Speed | Learning | Effort | Clarity | Total |
|----------|-------|-------|----------|--------|---------|-------|
| A: Confidence Badge | 5 | 4 | 5 | 4 | 4 | **84/95** |
| B: Visual Comparison | 4 | 3 | 5 | 2 | 5 | **70/95** |
| C: Slider | 3 | 3 | 3 | 4 | 3 | **60/95** |
| D: Guided Flow | 4 | 2 | 4 | 3 | 4 | **64/95** |

---

## AI Recommendation

**Recommend: A (Confidence Badge + Quick Adjust)**

**Rationale:**
- Highest score: balances trust, speed, and simplicity
- Confidence badge addresses trust without major UI change
- Quick adjust (S/M/L + Custom) covers 95% of use cases
- Visual comparison (B) is great but asset-heavy for v1
- Slider (C) is too fiddly for mobile calorie tracking

---

## Decision

[x] **A: Confidence Badge + Quick Adjust** - Badge + S/M/L + Custom option
[ ] B: Visual Portion Comparison
[ ] C: Slider Adjustment
[ ] D: Guided Correction Flow

**Notes:** A is simplest path to trust improvement. Consider B (visual references) for Phase 2 when we have food image library.
