# FuelUp Usability Test Findings Report
## Automated Flow Verification & Heuristic Walkthrough

**Date:** 2026-01-09
**Prototype:** FuelUp — Streak Partners Edition
**Method:** Automated UI flow verification with heuristic evaluation
**Tasks Tested:** 5 core user flows
**Personas Framed:** 3

---

## Important Disclaimer

> **This report documents automated UI testing, NOT real usability testing.**
>
> AI simulation cannot measure genuine user emotions, cognitive load, or behavioral patterns. The "persona" framing provides heuristic context but does not represent actual user behavior. All findings should be treated as **hypotheses to validate** with real users.

### What This Report Contains

| Category | Validity | How to Use |
|----------|----------|------------|
| **Facts** | Verified | Technical findings - act on these |
| **Heuristic Observations** | Likely valid | Based on UX patterns - prioritize for testing |
| **Speculation** | Unverified | Hypotheses only - must validate with real users |

---

## Executive Summary

### Facts (Verified)
- All 5 task flows completed successfully (100% technical completion)
- 31 screenshots captured documenting UI states
- Average task completion: 1.5-4.5 seconds (script execution time, NOT user time)

### Heuristic Observations (Likely Valid)
- Dashboard lacks macro breakdown (P/C/F) - common expectation for fitness apps
- No search function in food grid - standard UX pattern missing
- AI scan results cannot be edited before logging - flexibility heuristic violation

### Speculation (Requires Validation)
- ~~SUS scores~~ - Cannot be estimated without real users
- ~~Persona emotional responses~~ - Cannot be simulated
- ~~"Users would feel confused by X"~~ - Hypothesis only

---

## Task Results Summary

| Task | Technical Status | Script Duration | Issues Found |
|------|------------------|-----------------|--------------|
| 1. View Dashboard | PASS | 93-1082ms | 3 heuristic |
| 2. Log Meal Manually | PASS | 2426-3597ms | 6 heuristic |
| 3. AI Scan | PASS | 4276-4571ms | 5 heuristic |
| 4. Send Nudge | PASS | 1554-1581ms | 3 heuristic |
| 5. Partnership Settings | PASS | 529-1700ms | 4 heuristic |

**Note:** Duration reflects script execution speed, not human task completion time.

---

## Detailed Findings by Task

### Task 1: View Dashboard and Understand Streak Status

#### Facts (Verified via DOM inspection)
- Streak counter displays "12" in `#streak-counter` element
- Remaining calories "2200" visible in `#display-remaining`
- Partner indicators show initials "D" and "A"
- "Shared Streak" label present in markup
- Status dots exist (green/red classes applied dynamically)

#### Heuristic Observations (Based on UX patterns)
- No macro breakdown (P/C/F) visible - violates "recognition over recall" for fitness users
- Status dot colors have no visible legend - violates "help and documentation"
- No onboarding tooltip for "Shared Streak" concept - violates "help users recognize"

#### Speculation (Requires validation)
- ~~"Fire icon draws attention"~~ - Assumption; needs eye-tracking or observation
- ~~"First-timers would understand partner concept"~~ - Hypothesis; test with real novices
- ~~"Dashboard provides clear at-a-glance info"~~ - Subjective; needs user feedback

---

### Task 2: Log a Meal Manually

#### Facts (Verified via DOM inspection)
- Navigation button exists and triggers view change
- Food grid renders 5 items with emoji icons
- Portion picker modal appears on food selection
- S/M/L buttons show calorie values
- Logging updates meal list in dashboard

#### Heuristic Observations (Based on UX patterns)
- No search/filter input in food grid - violates "flexibility and efficiency"
- Portions show calories but not gram weights - incomplete information
- Limited to 5 pre-defined foods - scalability concern
- No custom portion input option - violates "user control and freedom"

#### Speculation (Requires validation)
- ~~"Portion picker is intuitive"~~ - Assumption; test with real users
- ~~"Users would complete in <30 seconds"~~ - Script time ≠ user time
- ~~"Food icons aid recognition"~~ - Hypothesis; needs validation

---

### Task 3: Use AI Scan to Log Food

#### Facts (Verified via DOM inspection)
- Manual/Scan tab toggle exists and functions
- Camera frame UI renders with corner guides
- Scan animation runs for ~2 seconds
- Result displays "98%" confidence, "Phở Bò", "450 kcal"
- "Log to Dashboard" button exists and functions
- No edit controls in scan result UI

#### Heuristic Observations (Based on UX patterns)
- Cannot edit detected food before logging - violates "user control and freedom"
- Cannot adjust portion size after scan - violates "flexibility"
- No visible "retry" or "wrong result" option - violates "error recovery"
- Demo hardcoded to return Phở Bò - testing limitation

#### Speculation (Requires validation)
- ~~"98% confidence builds trust"~~ - Assumption; trust requires real measurement
- ~~"Scanning animation feels purposeful"~~ - Subjective experience
- ~~"Camera interface is intuitive"~~ - Hypothesis; test with real users

---

### Task 4: Send a Nudge to Partner

#### Facts (Verified via DOM inspection)
- Partner warning card (`#partner-nudge-card`) exists
- Card visibility controlled by `hidden` class
- "Nudge Her" button triggers `sendNudge()` function
- Warning text displays partner name dynamically
- Card appears after 1-second delay if partner hasn't logged

#### Heuristic Observations (Based on UX patterns)
- No explanation of what "nudge" does (notification? text? in-app?) - violates "visibility of system status"
- Cannot customize nudge message - limited flexibility
- No way to view partner's actual log status in detail

#### Speculation (Requires validation)
- ~~"Warning message creates urgency"~~ - Emotional response; can't simulate
- ~~"Nudge feels supportive not punitive"~~ - Subjective; needs user feedback
- ~~"Users would notice warning card"~~ - Attention is not simulatable

---

### Task 5: Access Partnership Settings

#### Facts (Verified via DOM inspection)
- Settings button in header triggers `navigate('settings')`
- Partnership screen shows partner name in `#partner-settings-name`
- Profile Control section with switch buttons exists
- Profile switching updates `state.activeId`
- Explanation text present below profile controls

#### Heuristic Observations (Based on UX patterns)
- Settings icon is small (standard size but may be overlooked)
- Multiple paths to settings (header icon, nav) - good redundancy
- Profile switching concept may need explanation for first-time users

#### Speculation (Requires validation)
- ~~"Users can find settings within 10 seconds"~~ - Script time ≠ discovery time
- ~~"Profile switching is understood"~~ - Conceptual understanding not tested
- ~~"Partner info display is clear"~~ - Clarity is subjective

---

## Consolidated Issues by Category

### Facts - Technical Issues (Act on these)
| Issue | Location | Status |
|-------|----------|--------|
| No edit capability for AI scan results | `#scan-result` | Missing feature |
| No search input in food grid | `#food-grid` | Missing feature |
| Hardcoded scan result (Phở Bò) | `startScanning()` | Demo limitation |

### Heuristic Issues (Prioritize for user testing)
| Issue | Heuristic Violated | Priority |
|-------|-------------------|----------|
| No macro display on dashboard | Recognition over recall | High |
| Status dots have no legend | Help and documentation | Medium |
| Cannot adjust portion after scan | User control and freedom | High |
| No onboarding for "Shared Streak" | Help users recognize | Medium |
| Nudge mechanism unexplained | Visibility of system status | Medium |
| No custom portion size input | Flexibility and efficiency | Medium |

### Speculation - Hypotheses to Test (Validate with real users)
| Hypothesis | How to Validate |
|------------|-----------------|
| "First-time users understand Shared Streak" | Think-aloud with 3-5 novices |
| "Users trust 98% AI confidence" | Post-task trust rating |
| "Nudge feels supportive" | Sentiment questions |
| "Portion picker is intuitive" | Task success + ease rating |
| "Dashboard provides quick overview" | Time-to-information + eye-tracking |

---

## Screenshots Reference

### Persona 1: Linh Nguyen (Young Professional, Efficiency-Focused)

#### What Simulation Did vs. What Real Linh Would Do

| Aspect | My Simulation | Real Linh |
|--------|---------------|-----------|
| **Task approach** | Clicked buttons in expected sequence | Might scan UI first, tap impatiently if slow |
| **Speed expectation** | Script ran in 2.4s | Would actually time herself, abandon if >30s |
| **Portion selection** | Selected "M" as scripted | Might calculate macros first, debate S vs M |
| **AI Scan usage** | Followed happy path | Might try to edit result, get frustrated if can't |
| **Frustration** | None (no emotions) | Would feel friction if workflow feels slow |

#### Screenshots (9 total)
| File | What It Shows | What It DOESN'T Show |
|------|---------------|---------------------|
| `linh-task1-01-dashboard.png` | Initial dashboard state | Where Linh's eyes actually look first |
| `linh-task2-01-add-view.png` | Food grid UI | Whether Linh notices + button easily |
| `linh-task2-02-portion-picker.png` | Portion modal | Linh's decision-making process |
| `linh-task2-03-logged.png` | Dashboard after log | Satisfaction/confidence level |
| `linh-task3-01-scan-view.png` | Camera interface | Linh's comfort with AI feature |
| `linh-task3-02-scan-result.png` | Detected result | Trust in 98% confidence |
| `linh-task3-03-logged.png` | After scan log | Whether this felt faster than manual |
| `linh-task4-01-dashboard.png` | Nudge card state | Whether Linh noticed warning |
| `linh-task5-01-settings.png` | Settings screen | Whether settings met expectations |

---

### Persona 2: Minh Tran (Student, First-Time Tracker)

#### What Simulation Did vs. What Real Minh Would Do

| Aspect | My Simulation | Real Minh |
|--------|---------------|-----------|
| **Initial reaction** | Immediately read DOM values | Would stare, wonder "what is this app?" |
| **Exploration** | Clicked both tabs as scripted | Might tap randomly, make mistakes, backtrack |
| **Comprehension** | "Understood" Shared Streak instantly | Would need time to grasp accountability concept |
| **Portion choice** | Selected "S" as scripted | Might genuinely not know their portion size |
| **Confusion** | None (perfect execution) | Would likely hesitate, re-read labels |
| **Questions** | None generated | "What does the fire mean?" "What's a nudge?" |

#### Screenshots (11 total)
| File | What It Shows | What It DOESN'T Show |
|------|---------------|---------------------|
| `minh-task1-01-dashboard.png` | Dashboard view | Minh's confusion about terminology |
| `minh-task2-01-add-view.png` | Food grid | Whether icons help recognition |
| `minh-task2-02-scan-tab.png` | AI Scan tab | Minh's curiosity vs hesitation |
| `minh-task2-03-portion-picker.png` | Portion picker | Uncertainty about portion estimation |
| `minh-task2-04-logged.png` | After logging | Confidence that it worked correctly |
| `minh-task3-01-scan-view.png` | Scan camera view | Comfort with AI technology |
| `minh-task3-02-scan-result.png` | Scan result | Whether 98% feels trustworthy |
| `minh-task3-03-logged.png` | After scan log | Understanding of what was logged |
| `minh-task4-01-dashboard.png` | Dashboard state | Whether warning was noticed |
| `minh-task5-01-settings.png` | Settings screen | Understanding of profile switching |
| `minh-task5-02-switched.png` | After profile switch | Grasp of multi-profile concept |

---

### Persona 3: Khoa Pham (Fitness Enthusiast, Precision-Focused)

#### What Simulation Did vs. What Real Khoa Would Do

| Aspect | My Simulation | Real Khoa |
|--------|---------------|-----------|
| **First look** | Read calorie value | Would immediately look for protein/macros |
| **Food search** | Clicked Phở Bò directly | Would want to search "chicken breast" or similar |
| **Portion selection** | Selected "L" as scripted | Would want to input exact grams (e.g., 350g) |
| **AI Scan reaction** | Accepted result | Would want to verify/edit nutritional values |
| **Disappointment** | None (can't feel) | Likely frustrated by lack of precision features |
| **Feature requests** | Listed as "friction points" | Would vocalize: "I need barcode scanner" |

#### Screenshots (11 total)
| File | What It Shows | What It DOESN'T Show |
|------|---------------|---------------------|
| `khoa-task1-01-dashboard.png` | Dashboard | Khoa's search for macro breakdown |
| `khoa-task2-01-add-view.png` | Food grid | Frustration at no search bar |
| `khoa-task2-02-portion-picker.png` | Portion options | Desire for gram-level precision |
| `khoa-task2-03-logged.png` | After logging | Skepticism about accuracy |
| `khoa-task3-01-scan-view.png` | Camera view | Evaluation of AI capability |
| `khoa-task3-02-scan-result.png` | Scan result | Desire to edit/verify values |
| `khoa-task3-03-logged.png` | After scan | Acceptance vs reluctance |
| `khoa-task4-01-dashboard.png` | Dashboard | Interest in partner accountability |
| `khoa-task5-01-settings.png` | Settings | Looking for advanced options |
| `khoa-task5-02-switched.png` | Profile switch | Testing feature capabilities |
| `khoa-task5-03-partner-dashboard.png` | Partner view | Desire for comparative stats |

---

## Recommendations

### Immediate (Before Real User Testing)
1. **Add edit capability to AI scan results** - Technical gap, not speculation
2. **Add search bar to food grid** - Standard UX pattern missing
3. **Add macro display (P/C/F) to dashboard** - Expected by fitness-focused users

### To Validate with Real Users
1. Do first-time users understand "Shared Streak" without explanation?
2. Is the portion picker (S/M/L) sufficient or do users want gram input?
3. Does the 98% AI confidence actually build trust?
4. Do users notice the partner warning card?
5. Is the nudge concept clear and perceived as supportive?

### Testing Method Recommendations
| Question | Method | Sample Size |
|----------|--------|-------------|
| Comprehension issues | Think-aloud | 3-5 per persona |
| Task success rates | Unmoderated remote | 15-20 total |
| Emotional response | Post-task interviews | 5-8 total |
| Long-term engagement | Diary study | 5-10, 1-2 weeks |

---

## Appendix: Methodology Limitations

This report used automated browser testing (Playwright via dev-browser) to verify UI flows. The simulation:

**Can verify:**
- Elements exist and are interactive
- Navigation paths function correctly
- UI states render as expected
- Technical task completion

**Cannot measure:**
- Genuine user confusion or clarity
- Emotional responses (trust, frustration, delight)
- Actual time users take to complete tasks
- Attention patterns (what users notice first)
- Cognitive load or mental effort
- Real-world context (distractions, device variations)

All persona-framed observations are hypotheses derived from heuristic evaluation, not empirical user data.

---

*Report generated from automated flow verification*
*FuelUp — Streak Partners Edition*
*Findings require validation with real users*
