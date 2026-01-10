# ADR-003 – Simulated AI Food Scan

**Date:** 2025-01-10
**Prototype:** 02a-ai-delegation
**Status:** Accepted

---

## Context
CR03 requires AI-assisted food scanning. Need to decide whether to integrate real AI/ML model or simulate detection for prototype purposes.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| A. Real AI model (TensorFlow.js, ONNX) | Authentic UX testing | Heavy bundle, complex setup, accuracy issues |
| B. Cloud AI API (Google Vision, etc.) | Good accuracy | Requires API key, cost, latency |
| C. Simulated detection | Fast, predictable, tests UI flow | Not testing real recognition |

## Decision
**Option C: Simulated detection with realistic delays and confidence scores.**

`scanSim.ts` provides:
- Simulated 1-2 second "processing" delay
- Random selection of 1-3 foods from database
- Randomized confidence scores (0.7-0.95)
- Multi-food detection with varied portions

## UX Trade-offs
- Gain: Can test full UI flow without ML complexity
- Gain: Predictable results for demo/testing
- Lose: Not testing actual recognition accuracy
- Lose: May give false confidence about real-world UX

## User Impact
- Prototype users get smooth scan experience
- Real users would need actual AI for value
- Clear path to swap in real model later

## Reversibility
- [x] Easy to change
- [ ] Costly to reverse
- [ ] Hard to reverse

`scanSim.ts` is isolated - can replace with real API call without touching UI components.

## Consequences
- Enables: Full scan flow testing without ML setup
- Enables: Consistent demo experience
- Requires: Future work to integrate real AI for production
- Interface: `simulateScan(photoId: string) => Promise<DetectedFood[]>`
