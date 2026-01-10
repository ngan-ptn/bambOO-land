# CR04: Improve Portion Estimation UX - SELECT

**Status:** COMPLETE
**Time:** 30 minutes (Step 6)

---

## Analyzing Top Approaches

From IDEATION: **A (Confidence Badge + Quick Adjust)** - top scorer

---

## Tradeoff Analysis

### A: Confidence Badge + Quick Adjust

**Primary Benefit:** Transparent AI confidence + easy adjustment in one interaction.

**Users Who Benefit:**
- Skeptical users who distrust AI (see confidence, feel informed)
- Quick adjusters (S/M/L covers most needs)
- Accuracy-focused users (Custom option for precision)
- New users learning the system (confidence guides expectations)

**Users Who May Suffer:**
- Users who don't understand confidence (what does "Medium confidence" mean?)
- Users who want visual references (no photos)
- Users overwhelmed by extra UI (badge + options)

**Risk Scenario:** Users see "Low confidence" and abandon the scan entirely rather than correcting. Confidence display backfires by highlighting AI weakness.

**If Wrong, We Still Learn:** Whether transparency helps or hurts adoption, what confidence threshold users accept, how often custom entry is used.

---

### B: Visual Portion Comparison (Comparison)

**Primary Benefit:** No numbers, just visual matching - intuitive for all users.

**Users Who Benefit:**
- Visual learners (see, don't calculate)
- Users bad at estimating grams/calories
- New users who need calibration

**Users Who May Suffer:**
- Users who eat non-standard foods (no reference photo)
- Users on slow connections (large images)
- Users with vision impairments

**Risk Scenario:** We don't have reference photos for 70% of Vietnamese foods. Users see generic bowl images that don't match their actual dish.

**If Wrong, We Still Learn:** Which foods need visual references most, whether visual matching improves accuracy.

---

## Comparison Summary

|         | A: Confidence Badge | B: Visual Comparison |
|---------|---------------------|----------------------|
| Benefit | Transparent, quick adjust | Intuitive visual matching |
| Risk | Medium (confidence may backfire) | High (asset library needed) |
| Effort | Low | High |
| Winners | Skeptics, precision seekers | Visual learners |
| Losers | Users who don't want to think | Non-standard food eaters |

---

## AI Recommendation

**Recommend: A (Confidence Badge + Quick Adjust)**

**Rationale:**
- Lower effort, faster to implement
- Confidence badge can be tuned (hide if < threshold)
- S/M/L + Custom covers adjustment needs
- Visual comparison (B) is Phase 2 enhancement when we have photos

**Confidence Display Strategy:**
- High confidence (>80%): Show green badge, default to "accept"
- Medium confidence (60-80%): Show yellow badge, prompt "Does this look right?"
- Low confidence (<60%): Skip badge, go directly to adjustment options

---

## Decision

[x] **A only** - Confidence Badge + Quick Adjust
[ ] B only - Visual Portion Comparison
[ ] Hybrid - A's badge + B's photos for top 20 foods
[ ] Return to IDEATION

**Rationale:** A is achievable in v1 with current assets. Visual comparison requires significant content creation - defer to Phase 2.

**Risk Mitigation:**
- Only show confidence badge for Medium+ confidence (hide low)
- Default to S/M/L selection (proven pattern)
- Custom entry as fallback, not primary
- "Looks good!" default button for high confidence scans
- Track confidence-to-edit correlation to tune thresholds
