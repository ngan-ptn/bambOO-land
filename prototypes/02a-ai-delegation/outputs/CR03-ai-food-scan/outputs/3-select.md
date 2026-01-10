# CR03: AI-Powered Food Scan - SELECT

**Status:** COMPLETE
**Time:** 30 minutes (Step 6)

---

## Analyzing Top Approaches

From IDEATION: **B (Capture-Then-Process)** - top scorer

---

## Tradeoff Analysis

### B: Capture-Then-Process

**Primary Benefit:** Simple, reliable photo-to-calories flow that works on all devices without battery drain.

**Users Who Benefit:**
- Users with complex meals (multiple items) - logs everything at once
- Users who skip logging due to effort - drastically reduces friction
- Users with older phones - no real-time processing needed
- Users unfamiliar with AI - clear "take photo → see result" mental model

**Users Who May Suffer:**
- Impatient users (2-3s processing feels slow)
- Users who want real-time preview
- Users in poor lighting (can't preview quality)
- Accuracy-focused users who distrust AI

**Risk Scenario:** AI misidentifies food 40% of the time, users lose trust, stop using scan feature entirely. Or: Processing time frustrates users, they abandon mid-scan.

**If Wrong, We Still Learn:** Which foods are hard to recognize (training data gaps), what processing time is acceptable, whether users prefer scan over manual.

---

### A: Real-Time Camera (Comparison)

**Primary Benefit:** Magical instant feedback - see calories overlay as you point camera.

**Users Who Benefit:**
- Tech enthusiasts who want cutting-edge UX
- Users who want to preview before capturing
- Users checking calories before eating (decision support)

**Users Who May Suffer:**
- Users with older phones (frame rate issues)
- Battery-conscious users (continuous processing)
- Users in public (holding up phone longer)

**Risk Scenario:** Real-time lags on 50% of user devices, creates perception that app is broken. Battery drain causes negative reviews.

**If Wrong, We Still Learn:** Device requirements for real-time ML, user tolerance for real-time vs batch processing.

---

## Comparison Summary

|         | B: Capture-Then-Process | A: Real-Time |
|---------|-------------------------|--------------|
| Benefit | Reliable, works everywhere | Magical instant feedback |
| Risk | Medium (processing wait) | High (device compatibility, battery) |
| Effort | Medium | High |
| Winners | Most users, older phones | Tech enthusiasts |
| Losers | Impatient users | Older devices, battery-conscious |

---

## AI Recommendation

**Recommend: B (Capture-Then-Process)** as primary

**Rationale:**
- Lower risk: works on all devices, no battery concerns
- Established pattern: MyFitnessPal, Lose It! use this approach
- Real-time can be added as "advanced mode" in v2
- Processing time (2-3s) is acceptable for the value delivered

---

## Decision

[x] **B only** - Capture-Then-Process
[ ] A only - Real-Time Camera
[ ] Hybrid - Start with B, add A as option later
[ ] Return to IDEATION

**Rationale:** B delivers 80% of the value with 50% of the complexity. Real-time is impressive but not necessary for core use case.

**Risk Mitigation:**
- Show engaging loading animation during processing
- Allow manual correction before confirming
- Provide "Not quite right? Edit" prominent CTA
- Log scan accuracy to improve ML model
- Fall back to manual search if recognition confidence is low
