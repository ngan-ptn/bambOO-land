# Design-Lite Workflow: Manual Entry Primary, AI Scan Secondary

## Step 1: FRAMING
*Combined: Problem reframes + Assumptions + Testable hypothesis*

### Problem Reframes (3 Alternative Views)

**Reframe 1: AI Accuracy vs User Trust**
Users are experiencing frustration and data quality issues due to incorrect AI food detections, leading to loss of trust in the app's core tracking functionality. The current AI-first approach creates a poor user experience when the "smart" feature fails to be smart.

**Reframe 2: Control vs Convenience Tension**
The app's AI-first design prioritizes speed over accuracy, but users need reliable calorie tracking more than quick scanning. When AI fails, users lack a clear, prominent path to manually enter accurate data, creating friction in the primary user job of logging meals.

**Reframe 3: User Agency in Data Quality**
Users feel disempowered when AI makes incorrect assumptions about their food choices. The current design treats manual entry as a fallback rather than the reliable foundation it should be, undermining user confidence in their own nutrition tracking.

### Assumptions (Risk-Rated)

**High Risk Assumptions:**
1. **AI accuracy is the main pain point** - Users are actually complaining about wrong detections, not just preferring manual entry
2. **Manual entry will reduce complaints** - Making manual entry primary will actually solve the user satisfaction issue
3. **Users will still use AI scanning** - Secondary AI scanning won't be ignored completely

**Medium Risk Assumptions:**
4. **Current AI scan is prominent** - The AI scan is currently the primary action on home screen
5. **Users understand manual entry** - Users know how to manually enter food data
6. **Data accuracy matters more than speed** - Users prioritize correct calorie counts over quick logging

**Low Risk Assumptions:**
7. **UI hierarchy can be redesigned** - Technical ability to change home screen layout
8. **AI scanning still provides value** - Even as secondary feature, users will benefit from it
9. **Stakeholder feedback represents user sentiment** - Complaints reflect actual user experience

### Testable Hypothesis

**Root Cause Hypothesis:**
We believe the high volume of complaints about wrong AI detections stems from the current AI-first design that positions scanning as the primary action, causing users to rely on inaccurate AI results rather than using the more reliable manual entry option.

**Testable Hypothesis:**
IF we redesign the home screen to make manual food entry the prominent primary action and move AI scanning to a secondary position (smaller button, less visual prominence),
THEN user complaints about wrong detections will decrease by 70% within 30 days AND manual entry usage will increase by 40% AND user satisfaction scores will improve by 25%,
FOR calorie tracking users who currently experience AI detection errors,
BECAUSE users will have clearer agency over their data accuracy and won't be pushed toward unreliable AI features.

**Falsification Criteria:**
We're WRONG if:
- Complaints don't decrease or actually increase
- Manual entry adoption stays below 20%
- Users report missing the AI scanning convenience
- App usage frequency declines

**Success Metrics:**
- Complaint reduction → Pass: >60% decrease  Fail: <30% decrease
- Manual entry adoption → Pass: >35% increase  Fail: No change or decline
- User satisfaction (NPS) → Pass: +20% improvement  Fail: <10% improvement
- AI scan usage → Pass: >50% retention  Fail: <30% retention

**AI Recommendation:** Ready for ideation - clear user pain point with measurable solution.

**Decision:** ✅ Proceed to ideation
**Notes:** Strong alignment with stakeholder feedback. Prioritizes data accuracy over automation speed.</content>
<parameter name="filePath">.claude/outputs/design-lite-workflow/manual-entry-primary-framing.md