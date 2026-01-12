# Design-Lite Workflow: Manual Entry Primary, AI Scan Secondary

## Step 4: DESIGN
*Combined: User jobs + Scope boundaries + UX interactions*

### OOUX Objects & User Jobs (Object-Oriented UX)

**Core Objects:**
1. **Manual Entry** - Primary, reliable food logging interface
2. **AI Scan** - Secondary, convenience food detection feature
3. **Food Item** - Individual food entries with nutritional data
4. **Meal Log** - Collection of food items for a specific meal/eating occasion
5. **Accuracy Assurance** - User confidence in logged data

**Primary User Jobs (What users hire our app to do):**

**Job 1: Accurately Track Calorie Intake**
- *Main Pain:* Inaccurate AI detections leading to wrong nutritional data
- *Desired Outcome:* Reliable, trustworthy calorie and nutrition tracking
- *Context:* Daily meal logging and dietary monitoring
- *Success Metrics:* 70% reduction in complaints, 40% increase in manual entry usage

**Job 2: Efficiently Log Food Consumption**
- *Main Pain:* Current AI-first approach creates friction when AI fails
- *Desired Outcome:* Smooth, reliable food logging experience
- *Context:* Various logging scenarios (home cooking, restaurants, packaged foods)
- *Success Metrics:* Improved user satisfaction, maintained or increased logging frequency

**Job 3: Build Trust in Nutrition Data**
- *Main Pain:* Loss of confidence due to AI errors
- *Desired Outcome:* Confidence that logged data is accurate and actionable
- *Context:* Using data for health decisions and dietary planning
- *Success Metrics:* Higher user satisfaction scores, reduced churn from data quality issues

### Scope Boundaries & Success Metrics

**IN SCOPE (MVP Changes):**
- ✅ Redesign home screen with prominent manual entry button
- ✅ Reposition AI scan as secondary action (smaller, less prominent)
- ✅ Update visual hierarchy and labeling to emphasize manual accuracy
- ✅ Maintain all existing manual entry functionality
- ✅ Keep AI scanning available but not featured
- ✅ Update onboarding to reflect new hierarchy
- ✅ Add tooltips explaining why manual entry is primary

**OUT OF SCOPE (Future Releases):**
- ❌ Major AI accuracy improvements (that's a separate initiative)
- ❌ New AI features or scanning modes
- ❌ Complete UI overhaul beyond home screen
- ❌ Advanced manual entry features (drag-and-drop, templates)
- ❌ Integration with external nutrition databases
- ❌ Offline functionality changes

**Technical Scope:**
- Frontend: Home screen layout changes, component repositioning
- Backend: No changes required (existing APIs work for both methods)
- Analytics: Track usage patterns of manual vs AI entry
- A/B Testing: Framework for testing the hierarchy change

**Success Metrics (North Star):**
- **Primary:** User complaints about AI detections decrease by 70%
- **Secondary:** Manual entry usage increases by 40%
- **Engagement:** Overall logging frequency maintained or improved
- **Satisfaction:** User satisfaction score improves by 25%
- **Retention:** No increase in churn due to the UI change

### UX Interactions & Edge Cases

**Core Interaction Patterns:**

**1. Home Screen Landing**
```
User Flow: Open App → See Prominent Manual Entry → Choose Logging Method
- Hero manual entry button (60-70% screen width, primary color)
- Secondary AI scan button (small, muted color, positioned below or corner)
- Clear labeling: "Enter Food Manually" vs "Try Quick Scan"
- Brief tooltip on first visit explaining the hierarchy
```

**2. Manual Entry Primary Flow**
```
User Flow: Tap Manual Entry → Search/Add Food → Enter Quantity → Save
- Immediate focus on food search/input field
- Recent/favorite foods prominently displayed
- Quantity input with smart defaults (common portions)
- Clear save action with immediate feedback
```

**3. AI Scan Secondary Flow**
```
User Flow: Tap AI Scan → Camera Interface → Photo Capture → Review Results → Manual Correction
- Smaller button leads to dedicated scan interface
- Post-scan validation step encourages accuracy checking
- Easy path back to manual entry for corrections
- Educational messaging about AI limitations
```

**4. Progressive AI Adoption**
```
User Flow: Use Manual Entry → See "Try AI for Similar Foods" → Optional AI Trial
- After successful manual entries, suggest AI for similar items
- User-controlled opt-in to AI suggestions
- Clear way to disable AI suggestions permanently
```

**Edge Cases & Error Handling:**

**AI Scan Fails or is Unavailable:**
- Graceful fallback to manual entry with helpful messaging
- "Camera not available? Enter manually instead"
- No blocking of app functionality when AI fails

**User Prefers AI Despite Complaints:**
- Settings option to restore AI as primary (for power users)
- Analytics tracking of preference patterns
- No judgment - accommodate different user needs

**First-Time Users:**
- Onboarding explains both options with clear accuracy vs speed trade-off
- Default to manual entry but demonstrate AI scanning
- Educational content about data quality importance

**Existing Users (Upgrade):**
- In-app notification explaining the change and rationale
- Easy A/B testing to validate the change works
- Quick revert option if adoption metrics are poor

**Technical Edge Cases:**
- Offline mode: Manual entry always available, AI scan disabled with explanation
- Large food databases: Efficient search with manual entry as reliable fallback
- Multi-language support: Clear labeling works across all supported languages

**Component Behavior Specifications:**

**Manual Entry Button (Primary):**
- Dominant size and positioning (top center, full width consideration)
- High contrast primary color, clear typography
- Hover/press states with subtle animation
- Accessibility: High contrast, large touch target

**AI Scan Button (Secondary):**
- Smaller size, secondary styling (outlined or muted)
- Positioned below manual entry or in corner
- Optional: Confidence indicator or "Beta" badge
- Tap: Opens camera interface with clear back navigation

**Entry Form:**
- Auto-focus on food search field
- Smart suggestions based on time of day and previous entries
- Quantity picker with common portions (1 cup, 100g, 1 serving)
- Save button with loading state and success feedback

**Scan Results Review:**
- Side-by-side comparison of AI suggestion vs manual correction
- Clear action buttons: "Accept AI" | "Edit Manually" | "Try Again"
- Educational notes about common AI limitations
- One-tap correction flow that feels empowering, not punitive

**Notification Patterns:**
- Post-logging: Success confirmation with calorie summary
- AI suggestion: Gentle "AI detected X, want to log it?" (opt-in)
- Weekly summary: "You logged Y meals manually for accuracy"
- Complaint reduction: Monitor and celebrate improvement metrics</content>
<parameter name="filePath">.claude/outputs/design-lite-workflow/manual-entry-primary-design.md