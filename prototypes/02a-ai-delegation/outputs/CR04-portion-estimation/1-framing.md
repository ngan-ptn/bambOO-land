# Design-Lite Workflow: Portion Estimation UX Enhancement

## Step 1: FRAMING
*Combined: Problem reframes + Assumptions + Testable hypothesis*

### Problem Reframes (3 Alternative Views)

**Reframe 1: Trust Erosion Through Opacity**
Users don't trust AI portion estimates because the system appears as a "black box" - they can't see the reasoning behind estimates or easily verify/correct them, leading to skepticism about the entire AI system.

**Reframe 2: Control vs Automation Tension**
AI portion estimation provides speed but removes user agency. Users want the efficiency of automation but need the control to override when estimates feel wrong, creating friction between speed and accuracy.

**Reframe 3: Learning Opportunity Missed**
Poor portion estimation UX prevents users from learning about actual portion sizes. Instead of teaching users through interactive adjustments, the current system forces acceptance or abandonment, missing an educational moment.

### Assumptions (Risk-Rated)

**High Risk Assumptions:**
1. **Users want control over portions** - The 40% who distrust AI actually want to adjust, not just complain
2. **Current adjustment UX is poor** - The problem is UX difficulty, not user capability
3. **Improved UX will rebuild trust** - Better adjustment controls will increase AI acceptance

**Medium Risk Assumptions:**
4. **Portion accuracy matters** - Users care enough about portion precision to invest time in adjustments
5. **Educational value exists** - Interactive adjustments can teach users about real portion sizes
6. **Performance impact is acceptable** - Enhanced controls won't slow down the logging experience

**Low Risk Assumptions:**
7. **Visual adjustment patterns exist** - Sliders, comparators, and visual aids are established UX patterns
8. **Technical feasibility** - Portion adjustment can be implemented without major AI changes
9. **Data collection is ethical** - User corrections can improve AI without privacy concerns

### Testable Hypothesis

**Root Cause Hypothesis:**
We believe users distrust AI portion estimates because the current adjustment UX is difficult and opaque, forcing them to either accept inaccurate estimates or abandon logging entirely.

**Testable Hypothesis:**
IF we redesign portion estimation with prominent confidence indicators, easy visual adjustment controls, and clear edit flows that make corrections feel empowering rather than punitive,
THEN user trust in AI portions will increase by 60% AND portion adjustment completion rate will rise from <20% to >70% AND overall logging satisfaction will improve by 40%,
FOR users who currently encounter AI portion estimates they don't trust,
BECAUSE transparent confidence indicators and frictionless adjustment controls will rebuild trust while maintaining logging momentum.

**Falsification Criteria:**
We're WRONG if:
- Users ignore adjustment controls despite improved UX
- Trust metrics don't improve or actually decline
- Adjustment friction causes more logging abandonment
- Users prefer completely manual entry over enhanced AI

**Success Metrics:**
- Trust improvement → Pass: >50% increase in AI portion acceptance  Fail: <20% increase
- Adjustment completion → Pass: >60% of distrusting users complete adjustments  Fail: <30%
- User satisfaction → Pass: +35% improvement in logging experience  Fail: <15% improvement
- Logging retention → Pass: No increase in abandonment  Fail: >10% increase

**AI Recommendation:** Ready for ideation - clear user pain with well-defined solution space.

**Decision:** ✅ Proceed to ideation
**Notes:** Focus on rebuilding trust through transparency and control, not just better AI accuracy.</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR04-portion-estimation/1-framing.md