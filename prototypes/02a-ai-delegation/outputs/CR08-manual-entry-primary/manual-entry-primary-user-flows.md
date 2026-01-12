# Design-Lite Workflow: Manual Entry Primary, AI Scan Secondary

## Step 5: USER-FLOWS
*Combined: IA map + Mermaid flows + Screen list*

### Information Architecture (IA) Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALOR TRACKER - MANUAL FIRST MVP             │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   HOME          │    │   LOGGING       │    │  HISTORY        │ │
│  │  ├─ Manual Entry│    │  ├─ Meal Logger │    │  ├─ Daily View  │ │
│  │  ├─ AI Scan     │    │  ├─ Food Search │    │  ├─ Weekly      │ │
│  │  │  (Secondary) │    │  ├─ Quick Add   │    │  ├─ Monthly     │ │
│  │  └─ Recent Meals│    │  └─ Favorites   │    │  └─ Trends      │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   CHALLENGES    │    │   PROFILE       │    │   SETTINGS      │ │
│  │  ├─ Active      │    │  ├─ Stats       │    │  ├─ Preferences  │ │
│  │  ├─ Browse      │    │  ├─ Goals       │    │  ├─ Data Export  │ │
│  │  ├─ Social      │    │  ├─ Achievements│    │  ├─ AI Settings  │ │
│  │  └─ Leaderboards│    │  └─ Account     │    │  └─ Help         │ │
│  │                  │    │                  │    │                  │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Navigation Changes:
• Home screen now prioritizes Manual Entry as primary action
• AI Scan moved to secondary position with reduced prominence
• Clear visual hierarchy: Manual (70%) > Recent Meals (20%) > AI Scan (10%)
• Tab bar unchanged, but home screen content restructured
```

### Key User Flows (Mermaid Diagrams)

#### Flow 1: Primary Manual Entry Journey
```mermaid
flowchart TD
    A[User Opens App] --> B[Home Screen Loads]
    B --> C[Prominent Manual Entry Button Displayed]

    C --> D{User Taps Manual Entry?}
    D -->|Yes| E[Food Search Interface Opens]
    D -->|No| F[User Views Recent Meals]

    E --> G[Search for Food Item]
    G --> H[Select from Results or Add Custom]
    H --> I[Enter Quantity/Portion]
    I --> J[Review Nutritional Info]
    J --> K[Save to Meal Log]

    K --> L[Success Confirmation]
    L --> M[Return to Home Screen]

    F --> N{User Taps Recent Meal?}
    N -->|Yes| O[Quick Add to Current Log]
    N -->|No| P[User Considers Options]

    P --> Q{Ready to Log Food?}
    Q -->|Yes| R[Tap Manual Entry Button]
    Q -->|No| S[Exit or Browse Other Features]

    R --> E
    S --> T[App Background]
```

#### Flow 2: Secondary AI Scan Journey
```mermaid
flowchart TD
    A[User on Home Screen] --> B[Sees Secondary AI Scan Button]

    B --> C{User Notices AI Scan Option?}
    C -->|Yes| D[Taps AI Scan Button]
    C -->|No| E[Continues with Manual Entry]

    D --> F[Camera Permission Request]
    F --> G{Grants Permission?}

    G -->|Yes| H[Camera Interface Opens]
    G -->|No| I[Manual Entry Fallback]

    H --> J[Position Camera Over Food]
    J --> K[Tap to Capture Photo]
    K --> L[AI Processing Animation]

    L --> M[AI Detection Results]
    M --> N{User Satisfied with Results?}

    N -->|Yes| O[Accept AI Results]
    N -->|No| P[Edit Manually]

    O --> Q[Save to Meal Log]
    P --> R[Manual Correction Interface]
    R --> S[Adjust Food Items]
    S --> T[Update Quantities]
    T --> Q

    Q --> U[Success Confirmation]
    U --> V[Return to Home Screen]

    I --> W[Manual Entry Flow]
    E --> W
```

#### Flow 3: First-Time User Onboarding
```mermaid
flowchart TD
    A[New User Downloads App] --> B[Welcome Screen]
    B --> C[Basic Profile Setup]
    C --> D[First Home Screen Load]

    D --> E[Prominent Manual Entry Button]
    E --> F[Tooltip: "Start with accurate manual entry"]
    F --> G[Secondary AI Scan Button]
    G --> H[Tooltip: "Try AI scanning when you're ready"]

    H --> I[Educational Modal]
    I --> J["AI works great for simple meals, but manual entry gives you complete control over accuracy"]

    J --> K{Demo Manual Entry?}
    K -->|Yes| L[Guided Manual Entry Tutorial]
    K -->|No| M[Skip Tutorial]

    L --> N[Walkthrough: Search → Select → Quantity → Save]
    N --> O[Tutorial Completion]
    O --> P[First Manual Entry Attempt]

    M --> P
    P --> Q[Success Feedback]
    Q --> R[Suggest Trying AI Scan Next Time]

    R --> S[User Can Now Log Independently]
```

#### Flow 4: Existing User Adaptation
```mermaid
flowchart TD
    A[Existing User Updates App] --> B[Update Modal Appears]

    B --> C["We've improved food logging! Manual entry is now primary for better accuracy"]
    C --> D[Show Before/After Comparison]

    D --> E[Old: AI Scan Prominent]
    E --> F[New: Manual Entry Prominent]
    F --> G[User Acknowledges Change]

    G --> H[First Updated Home Screen]
    H --> I[Prominent Manual Entry Button]

    I --> J{User Taps Manual Entry?}
    J -->|Yes| K[Proceeds with Normal Flow]
    J -->|No| L[Settings Option Available]

    L --> M["Restore AI as Primary" Toggle]
    M --> N{User Toggles On?}

    N -->|Yes| O[AI Scan Becomes Primary Again]
    N -->|No| P[Keeps Manual Primary]

    K --> Q[Normal Usage Continues]
    O --> Q
    P --> Q

    Q --> R[Analytics Track Adaptation]
```

### Comprehensive Screen List

#### Core Updated Screens (Modified)
1. **Home Screen** - Complete redesign with manual entry prominence
2. **Manual Entry Interface** - Enhanced with primary positioning
3. **AI Scan Interface** - Moved to secondary flow, added validation step
4. **Onboarding Flow** - Updated to explain new hierarchy

#### New Screens/Components (Added)
5. **Hierarchy Explanation Modal** - Explains why manual is primary
6. **AI Results Review Screen** - New validation step for AI scans
7. **Accuracy Tooltip Component** - Contextual help about data quality
8. **Preference Toggle** - Settings option to customize hierarchy

#### Enhanced Existing Screens (Minor Updates)
9. **Settings > Logging** - Added AI/manual preference controls
10. **Help Center** - Updated FAQ about logging methods
11. **Analytics Dashboard** - New metrics for manual vs AI usage

#### Edge Case & Empty State Screens
12. **No Camera Permission** - Fallback when AI scan unavailable
13. **AI Processing Failed** - Error state with manual fallback
14. **First Manual Entry** - Encouraging empty state for new users
15. **AI Confidence Low** - Warning state when AI might be inaccurate

**Total Screens:** 15 (4 new, 8 modified, 3 edge cases)

**Navigation Patterns:**
- Primary action (manual entry) dominates home screen
- Secondary action (AI scan) accessible but not prominent
- Clear back navigation from all logging flows
- Contextual help available throughout
- Settings allow user customization

**Responsive Considerations:**
- Mobile-first: Large touch targets for primary action
- Tablet: Adjusted proportions but maintained hierarchy
- Accessibility: Screen reader support for action prominence
- Progressive enhancement for slower connections</content>
<parameter name="filePath">.claude/outputs/design-lite-workflow/manual-entry-primary-user-flows.md