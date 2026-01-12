# Design-Lite Workflow: Manual Entry Primary, AI Scan Secondary

## Step 2: IDEATION
*Combined: Evaluation criteria + Solution approaches with inspiration*

### Evaluation Criteria (Benchmarking Framework)

**Must-Have Criteria (High Weight):**
1. **User Trust** (5/5) - Builds confidence in data accuracy through clear manual control
2. **Complaint Reduction** (5/5) - Directly addresses stakeholder-reported issues with AI detection errors
3. **Data Accuracy** (5/5) - Prioritizes correct calorie tracking over quick entry

**Should-Have Criteria (Medium Weight):**
4. **User Adoption** (4/5) - Maintains or increases overall app usage and engagement
5. **Design Clarity** (4/5) - Clear visual hierarchy that users understand immediately
6. **Technical Feasibility** (4/5) - Can be implemented without major architectural changes

**Nice-to-Have Criteria (Low Weight):**
7. **AI Feature Retention** (3/5) - Keeps AI scanning available for users who want convenience
8. **Progressive Enhancement** (3/5) - Allows users to upgrade from manual to AI scanning
9. **Onboarding Effectiveness** (3/5) - Helps new users understand the manual-first approach

### Solution Approaches (4 Options with Cross-Domain Inspiration)

#### Approach A: "Primary Button Dominance"
**Core Concept:** Massive, prominent manual entry button dominates the home screen with AI scanning relegated to a small secondary button.

**Inspiration:** Amazon's "Buy Now" button approach - when they want to drive a specific action, they make that button huge and impossible to miss. Here, manual entry becomes the "Buy Now" of food logging.

**Key Features:**
- Hero-sized manual entry button (70% screen width)
- Small AI scan icon/button in corner or bottom
- Clear labeling: "Enter Food Manually" vs "Try AI Scan"
- Visual hierarchy with manual entry as clear primary action
- Educational tooltip explaining why manual is primary

**Cross-Domain Inspiration:** E-commerce sites where the primary CTA (buy button) is massive and secondary actions are minimized to drive conversion.

**Build Effort:** Low (2-3 weeks - mostly UI changes)
**Risk:** Users might feel overwhelmed by the large button, AI scanning might be underutilized

#### Approach B: "Progressive Disclosure Flow"
**Core Concept:** Manual entry as the default landing state, with AI scanning as an optional enhancement users can discover.

**Inspiration:** TurboTax's progressive disclosure - starts simple (manual), then offers advanced features. Users begin with reliable manual entry and can opt into AI scanning when they're ready.

**Key Features:**
- Manual entry form loads immediately on home screen
- AI scan as a toggle/switch within the manual entry interface
- "Quick Scan" button appears after manual entry is complete
- Contextual help explaining when AI works best
- Settings to make AI primary for power users

**Cross-Domain Inspiration:** Tax software that starts with guided manual entry then offers automated features as users become comfortable.

**Build Effort:** Medium (3-4 weeks - some flow logic changes)
**Risk:** More complex user flow, might confuse users about the hierarchy

#### Approach C: "Dual Path Dashboard"
**Core Concept:** Split-screen approach with manual entry prominently featured alongside a smaller AI scanning section.

**Inspiration:** Banking apps with "Transfer Money" as the primary action and "Quick Pay" secondary. Creates clear visual separation between reliable manual entry and experimental AI features.

**Key Features:**
- Top section: Large manual entry area with recent foods
- Bottom section: Smaller "AI Scan" card with limited prominence
- Visual weight ratio: 70% manual, 30% AI
- Clear messaging about accuracy vs convenience trade-off
- Easy switching between modes with state persistence

**Cross-Domain Inspiration:** Financial apps where secure, manual transfers are prominent and quick payment features are secondary but available.

**Build Effort:** Medium (3-4 weeks - layout changes)
**Risk:** Screen real estate competition, might still confuse users about which to use

#### Approach D: "Confidence-Based Hierarchy"
**Core Concept:** Dynamic hierarchy based on AI confidence levels, but defaults to manual entry prominence.

**Inspiration:** Google's "I'm Feeling Lucky" vs search box - the reliable option (manual entry) is always prominent, while the AI feature adapts based on success rates.

**Key Features:**
- Manual entry always primary, visually dominant
- AI scan button shows confidence indicators ("High Accuracy" vs "May Need Correction")
- Post-scan validation step encourages manual correction
- Learning system tracks user corrections to improve AI
- Clear "Manual Override" option after any AI scan

**Cross-Domain Inspiration:** Search engines where the basic search box is always the star, and AI features enhance rather than replace it.

**Build Effort:** High (5-6 weeks - AI confidence integration)
**Risk:** Technical complexity, might not address complaints if AI confidence indicators don't help

### Quick Comparison Matrix

| Criteria | A: Button Dominance | B: Progressive Flow | C: Split Dashboard | D: Confidence-Based |
|----------|-------------------|-------------------|-------------------|-------------------|
| User Trust | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Complaint Reduction | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Data Accuracy | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| User Adoption | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Design Clarity | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Technical Feasibility | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| AI Feature Retention | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Progressive Enhancement | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Onboarding Effectiveness | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **TOTAL SCORE** | **40/45** | **39/45** | **38/45** | **36/45** |

**AI Recommendation:** Approach A (Primary Button Dominance) scores highest - simplest, most direct solution that clearly addresses the complaint issue with minimal technical risk.</content>
<parameter name="filePath">.claude/outputs/design-lite-workflow/manual-entry-primary-ideation.md