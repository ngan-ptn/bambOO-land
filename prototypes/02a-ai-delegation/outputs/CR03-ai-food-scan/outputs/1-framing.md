# CR03: AI-Powered Food Scan - FRAMING

**Status:** COMPLETE
**Time:** 30-45 minutes (merged Steps 1+2+3)

---

## Original Request

> Typing is tedious. Can we let users just take a photo of their food and auto-detect calories?

---

## Problem Framings (3)

### A: Convenience-First (Recommended)

**Problem:** Users skip logging when they're busy because typing/searching takes too long, especially for complex meals with multiple items.

**Root Cause:** Manual logging requires identifying each food item, searching, and selecting portions - cognitive load is high for multi-item meals.

**Solution Direction:** Camera capture that identifies multiple foods at once and estimates calories automatically.

### B: Accuracy-First

**Problem:** Users don't trust their manual calorie estimates - they want objective measurement of what they're actually eating.

**Root Cause:** Portion sizes are hard to estimate visually, and users tend to underestimate calories by 20-40%.

**Solution Direction:** AI that measures portion sizes from photos and provides accurate calorie counts.

### C: Discovery-First

**Problem:** Users don't know what's in restaurant/street food dishes - they can't log what they can't identify.

**Root Cause:** Vietnamese street food and restaurant dishes often lack calorie information; users can't find them in databases.

**Solution Direction:** Food identification that recognizes dishes and provides nutritional estimates for unknown foods.

---

## Selected Framing: A (Convenience-First)

**Rationale:** Speed is the core UX axis. Convenience-first aligns with reducing friction. Accuracy (B) and discovery (C) are secondary benefits that come with visual recognition.

---

## Hypothesis

**IF** we provide camera-based food recognition with auto-calorie estimation
**THEN** users will log complex meals they would otherwise skip
**FOR** busy Vietnamese users who eat varied meals throughout the day
**BECAUSE** the effort reduction makes logging feel effortless rather than tedious

---

## Key Assumptions

| ID | Assumption | Risk | Validation Method |
|----|------------|------|-------------------|
| A-01 | AI can accurately recognize Vietnamese food | High | Test with 100 VN food images |
| A-02 | Users will trust AI estimates enough to use them | High | Survey post-scan satisfaction |
| A-03 | Photo capture is faster than typing for complex meals | Medium | Compare time-to-log metrics |
| A-04 | Camera permission won't be a significant barrier | Medium | Track permission grant rate |
| A-05 | Lighting/angle variations won't break recognition | High | Test in varied conditions |
| A-06 | Users will correct wrong estimates (feedback loop) | Medium | Track edit rate post-scan |

---

## Success Metrics

| Metric | Target | Fail Threshold |
|--------|--------|----------------|
| Food recognition accuracy | >80% | <60% |
| Time to log (scan vs manual) | 50% faster | Same or slower |
| Scan feature adoption | >30% of logs | <10% of logs |
| User trust (keep AI estimate) | >70% | <50% |
| Edit rate after scan | <30% | >50% |

---

## Decision

[x] **A: Convenience-First** - Fast capture, auto-estimate
[ ] B: Accuracy-First - Precise portion measurement
[ ] C: Discovery-First - Food identification for unknowns

**Notes:** A delivers speed benefit. Accuracy improves over time with ML training. Discovery is a bonus feature, not primary value prop.
