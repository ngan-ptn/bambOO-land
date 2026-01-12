# Design-Lite Workflow: Manual Entry Primary, AI Scan Secondary

## Step 3: SELECT
*Combined: Tradeoff analysis + Pick winner*

### Detailed Tradeoff Analysis

#### Approach A: Primary Button Dominance
**Benefits:**
- **Crystal Clear Hierarchy:** No ambiguity about which action is primary
- **Direct Solution to Complaints:** Immediately addresses stakeholder feedback by making manual entry impossible to miss
- **Low Technical Risk:** Mostly visual changes, minimal logic changes
- **Fast Implementation:** Can be tested and deployed quickly
- **User Agency:** Puts control back in users' hands

**Costs/Risks:**
- **AI Feature Visibility:** Might make AI scanning feel "hidden" or de-emphasized
- **User Overwhelm:** Very large button might feel aggressive or cluttered
- **Limited Nuance:** Doesn't explain WHY manual is better, just makes it bigger
- **Potential AI Abandonment:** Users might stop using AI scanning entirely

**Best For:** Direct response to stakeholder complaints about AI accuracy issues
**Worst For:** Situations where AI scanning still needs to be a primary discovery mechanism

#### Approach B: Progressive Disclosure Flow
**Benefits:**
- **Educational Approach:** Can include explanations of when AI works well
- **Flexible User Journey:** Users can start simple and upgrade to AI
- **Retains AI Value:** Keeps AI scanning discoverable for appropriate use cases
- **Contextual Help:** Can guide users toward the right input method

**Costs/Risks:**
- **More Complex Flow:** Users have to navigate through steps to find AI scanning
- **Learning Curve:** Requires users to understand the progressive nature
- **Implementation Complexity:** More state management and conditional UI
- **Slower Initial Adoption:** Users might not discover AI scanning as readily

**Best For:** Apps where both manual and AI methods have valid use cases
**Worst For:** Users who want immediate access to all options

#### Approach C: Dual Path Dashboard
**Benefits:**
- **Balanced Approach:** Shows both options without hiding either
- **Visual Comparison:** Users can see the prominence difference
- **Flexible Usage:** Users can choose based on context or preference
- **Familiar Pattern:** Similar to other apps with multiple action paths

**Costs/Risks:**
- **Design Complexity:** Harder to create clear visual hierarchy in split layout
- **User Choice Paralysis:** Might confuse users about which option to pick
- **Space Constraints:** Mobile screens have limited real estate for dual paths
- **Maintenance Burden:** Two prominent UI elements to maintain and test

**Best For:** Apps where both features are equally important
**Worst For:** Clear stakeholder direction that one feature should be primary

#### Approach D: Confidence-Based Hierarchy
**Benefits:**
- **Intelligent Adaptation:** Uses AI to determine when it's reliable
- **Personalized Experience:** Adapts based on individual user patterns
- **Future-Proof:** Improves over time as AI gets better
- **Transparent About Limitations:** Shows users when AI might be unreliable

**Costs/Risks:**
- **Technical Complexity:** Requires AI confidence scoring integration
- **User Confusion:** Confidence indicators might be hard to understand
- **Delayed Implementation:** Depends on AI system maturity
- **Mixed Messaging:** Still promotes AI while trying to de-emphasize it

**Best For:** Advanced AI systems with good confidence metrics
**Worst For:** Current situation with reported AI accuracy problems

### Risk-Adjusted Decision Matrix

| Factor | Weight | A: Button Dominance | B: Progressive Flow | C: Split Dashboard | D: Confidence-Based |
|--------|--------|-------------------|-------------------|-------------------|-------------------|
| **Direct Complaint Solution** | 5 | 9/10 | 7/10 | 6/10 | 8/10 |
| **Implementation Speed** | 4 | 9/10 | 6/10 | 7/10 | 4/10 |
| **User Clarity** | 4 | 8/10 | 7/10 | 5/10 | 6/10 |
| **Technical Risk** | 3 | 9/10 | 7/10 | 8/10 | 5/10 |
| **AI Feature Retention** | 3 | 6/10 | 8/10 | 8/10 | 7/10 |
| **Long-term Scalability** | 2 | 8/10 | 9/10 | 7/10 | 9/10 |
| **Weighted Total** | - | **8.1** | **7.0** | **6.4** | **6.5** |

### Final Recommendation: **APPROACH A (Primary Button Dominance)**

**Why A Wins:**
1. **Highest Risk-Adjusted Score:** 8.1/10 - best balance of solving the immediate problem quickly
2. **Direct Response to Stakeholders:** Immediately addresses the complaint by making manual entry impossible to ignore
3. **Minimal Risk:** Visual changes only, can be reverted easily if needed
4. **Clear User Intent:** No ambiguity about the hierarchy - manual entry is clearly primary
5. **Fast Validation:** Can be implemented and tested within 2 weeks

**What We Still Learn Even If Wrong:**
- If users complain about AI being "too hidden," we learn they want both options visible
- If complaints decrease but AI usage drops to near zero, we learn the feature needs different positioning
- Either outcome gives clear direction for next iteration

**Implementation Scope for A:**
- Hero-sized manual entry button dominating the home screen
- AI scan moved to small, secondary position (corner or below fold)
- Clear labeling and visual hierarchy
- User testing to ensure the change feels right (not overwhelming)
- Analytics to track manual entry adoption vs AI scan usage

**Next Steps:** Proceed to DESIGN phase with Approach A as the foundation.</content>
<parameter name="filePath">.claude/outputs/design-lite-workflow/manual-entry-primary-select.md