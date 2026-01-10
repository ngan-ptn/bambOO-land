# CR03: AI-Powered Food Scan - IDEATION

**Status:** COMPLETE
**Time:** 45-60 minutes (merged Steps 4+5)

---

## Context

**Selected Framing:** Convenience-First (reduce logging effort for complex meals)
**Hypothesis:** Camera-based food recognition makes logging complex meals effortless

---

## Evaluation Criteria

| # | Criterion | Weight | Description |
|---|-----------|--------|-------------|
| 1 | Recognition Accuracy | 5 | How well it identifies Vietnamese food |
| 2 | Speed to Log | 4 | Time from camera open to logged |
| 3 | User Trust | 4 | Do users accept AI estimates? |
| 4 | Implementation Complexity | 3 | Dev time, ML infrastructure needed |
| 5 | Graceful Degradation | 3 | What happens when recognition fails? |

---

## Solution Approaches (4)

### A: Real-Time Camera Recognition (Recommended)

**Core Concept:** Point camera at food, see overlay labels with food names and calories in real-time. Tap to confirm and log.

**How It Works:**
- User opens camera view
- AI identifies food items in frame (bounding boxes + labels)
- Shows estimated calories per item
- User taps to accept or adjusts before logging
- Logs all items at once

**Cross-Domain Inspiration:**
- Domain: AR/Retail
- Example: Google Lens shopping
- Pattern: Real-time visual recognition with immediate actionable results

**Trade-offs:**
| Pros | Cons |
|------|------|
| Instant feedback | High compute/battery |
| No separate "processing" step | Complex implementation |
| Feels magical | Frame rate issues on old phones |
| Can adjust before capture | Privacy: always-on camera |

**Best For:** Tech-savvy users who want seamless experience

---

### B: Capture-Then-Process

**Core Concept:** Take photo, wait 2-3 seconds for processing, review results, confirm to log.

**How It Works:**
- User takes single photo
- "Analyzing..." loading state (2-3s)
- Shows detected foods with calories
- User confirms or edits
- Logs meal

**Trade-offs:**
| Pros | Cons |
|------|------|
| Simpler implementation | Waiting feels slow |
| Works on all devices | Can't preview before capture |
| Clear processing mental model | Must retake if bad photo |
| Lower battery usage | Less magical feel |

**Best For:** Most users, pragmatic implementation

---

### C: Multi-Photo Composite

**Core Concept:** Take multiple photos (plate from different angles), AI combines for better accuracy.

**How It Works:**
- User takes 2-3 photos (prompted)
- AI combines views for 3D understanding
- More accurate portion estimation
- Shows combined result

**Trade-offs:**
| Pros | Cons |
|------|------|
| Better accuracy | Slower (multiple photos) |
| Better portion estimation | Friction: "take another" |
| Handles complex plates | Users won't do it |
| Research-grade accuracy | Overkill for calorie tracking |

**Best For:** Accuracy-focused users willing to spend extra time

---

### D: Barcode + Photo Hybrid

**Core Concept:** Scan barcode for packaged food, fall back to photo recognition for prepared food.

**How It Works:**
- Default: barcode scanner
- If no barcode detected, switch to photo recognition
- Barcode = exact nutrition from database
- Photo = AI estimation

**Cross-Domain Inspiration:**
- Domain: Grocery/Shopping
- Example: Amazon app scan feature
- Pattern: Use best available data source automatically

**Trade-offs:**
| Pros | Cons |
|------|------|
| Exact data for packaged food | Barcodes rare in VN food |
| Familiar barcode UX | Two different UIs |
| Good for snacks/drinks | Confusing when to use which |
| Falls back gracefully | More implementation work |

**Best For:** Users who eat mix of packaged and prepared food

---

## Comparison Matrix

| Approach | Accuracy | Speed | User Trust | Complexity | Degradation | Total |
|----------|----------|-------|------------|------------|-------------|-------|
| A: Real-Time | 4 | 5 | 5 | 2 | 3 | **72/95** |
| B: Capture-Then | 4 | 4 | 4 | 4 | 4 | **76/95** |
| C: Multi-Photo | 5 | 2 | 4 | 2 | 3 | **60/95** |
| D: Barcode+Photo | 4 | 3 | 4 | 2 | 4 | **64/95** |

---

## AI Recommendation

**Recommend: B (Capture-Then-Process)**

**Rationale:**
- Highest total score due to implementation feasibility
- Real-Time (A) is more impressive but high complexity, battery drain
- Capture-Then-Process is industry standard (MyFitnessPal, Lose It!)
- Clear mental model: take photo → see results → confirm
- Can upgrade to real-time in v2 if needed

---

## Decision

[ ] A: Real-Time Camera Recognition
[x] **B: Capture-Then-Process** - Take photo, analyze, confirm
[ ] C: Multi-Photo Composite
[ ] D: Barcode + Photo Hybrid

**Notes:** B is pragmatic for v1. Real-time (A) is future enhancement. Barcode can be added as separate feature later.
