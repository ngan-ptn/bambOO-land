# Design-Lite Workflow: AI-Powered Food Scan

## Step 5: USER-FLOWS
*Combined: IA map + Mermaid flows + Screen list*

### Information Architecture (IA) Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALOR TRACKER - AI SCAN MVP                   │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   HOME          │    │   MEALS         │    │   SCAN          │ │
│  │  ├─ Dashboard  │    │  ├─ History     │    │  ├─ Camera      │ │
│  │  ├─ Quick Log  │    │  ├─ Today       │    │  ├─ Processing  │ │
│  │  │  (Manual)    │    │  ├─ Add Meal    │    │  ├─ Results     │ │
│  │  └─ AI Scan ⭐   │    │  └─ Edit        │    │  └─ Corrections │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   SEARCH        │    │   PROFILE      │    │   SETTINGS      │ │
│  │  ├─ Food DB     │    │  ├─ Stats       │    │  ├─ Preferences │ │
│  │  ├─ Favorites   │    │  ├─ Goals       │    │  ├─ AI Settings │ │
│  │  ├─ Recent      │    │  ├─ Achievements│    │  └─ Privacy     │ │
│  │  └─ Categories  │    │  └─ Account     │    │                  │ │
│  │                  │    │                  │    │                  │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Navigation Changes:
• AI Scan promoted as primary action on home screen
• New dedicated SCAN section for camera workflow
• Quick access from meals section for adding to existing logs
• Settings integration for AI preferences and accuracy controls
```

### Key User Flows (Mermaid Diagrams)

#### Flow 1: Primary Scan Journey
```mermaid
flowchart TD
    A[/"User opens app"/]
    B["Views home screen"]
    C["Sees prominent AI Scan button"]
    D{"Wants to log food?"}
    E["Taps AI Scan button"]
    F["Camera permission prompt"]
    G{"Grants permission?"}
    H["Camera interface opens"]
    I["Positions food in frame"]
    J["Tap to capture"]
    K["Photo captured with feedback"]
    L["Processing animation begins"]
    M["AI analysis completes"]
    N["Results screen displays"]
    O{"Results accurate?"}
    P["Tap Accept to save"]
    Q["Meal added to log"]
    R[/"Success confirmation"/]

    A --> B --> C --> D -->|Yes| E --> F --> G -->|Yes| H --> I --> J --> K --> L --> M --> N --> O -->|Yes| P --> Q --> R
    O -->|No| S["Tap to edit results"]
    S --> T["Correction interface"]
    T --> U["Make adjustments"]
    U --> V["Save corrected meal"]
    V --> Q
    G -->|No| W["Manual entry fallback"]
    W --> Q
    D -->|No| X["Browse other features"]
```

#### Flow 2: Contextual Scan from Meals
```mermaid
flowchart TD
    A[/"User in meals section"/]
    B["Views meal history"]
    C{"Wants to add meal?"}
    D["Tap Add Meal"]
    E["Meal entry interface"]
    F["See AI Scan option"]
    G{"Try AI scan?"}
    H["Tap AI Scan button"]
    I["Quick camera access"]
    J["Capture food photo"]
    K["Return to meal context"]
    L["AI results integrated"]
    M["Review in meal builder"]
    N["Save complete meal"]
    O[/"Meal logged successfully"/]

    A --> B --> C -->|Yes| D --> E --> F --> G -->|Yes| H --> I --> J --> K --> L --> M --> N --> O
    G -->|No| P["Manual food entry"]
    P --> M
    C -->|No| Q["View meal details"]
```

#### Flow 3: Error Recovery Flow
```mermaid
flowchart TD
    A[/"Scan initiated"/]
    B["Photo captured"]
    C["AI processing starts"]
    D{"Processing succeeds?"}
    E["Results display"]
    F["User reviews results"]
    G[/"Normal flow continues"/]

    D -->|No| H{"Error type?"}
    H -->|Network| I["Offline processing queued"]
    H -->|Poor quality| J["Retake suggestion"]
    H -->|No detection| K["Manual entry prompt"]

    I --> L["Process when connected"]
    L --> M["Results available later"]
    M --> G

    J --> N["Camera guidance tips"]
    N --> O["Improved capture"]
    O --> C

    K --> P["Seamless manual entry"]
    P --> Q["Complete logging"]
    Q --> G
```

### Comprehensive Screen List

#### Core Scan Screens (New)
1. **Scan Camera** - Full-screen camera interface with food positioning guidance
2. **Scan Processing** - Loading state with progress animation and estimated time
3. **Scan Results** - AI detection results with nutritional breakdown and confidence
4. **Scan Corrections** - Manual editing interface for inaccurate detections

#### Enhanced Existing Screens (Modified)
5. **Home Dashboard** - Added prominent AI scan button and quick access
6. **Meal Builder** - Integrated scan results into meal creation workflow
7. **Settings > AI** - New section for scan preferences and accuracy controls
8. **Food Search** - Enhanced with scan fallback and comparison features

#### Edge Case & Empty State Screens
9. **Camera Permission** - Permission request with clear value proposition
10. **Scan Failed** - Error recovery with retake options and manual fallback
11. **Offline Processing** - Queue status when network unavailable
12. **Scan History** - Previous scans with reprocessing options

**Total Screens:** 12 (4 new core, 4 enhanced, 4 edge cases)

**Navigation Patterns:**
- Direct camera launch from home screen
- Contextual scan access from meal logging
- Seamless fallback to manual entry on failures
- Settings integration for preferences

**Responsive Considerations:**
- Mobile-first camera optimization
- Tablet support with adjusted layouts
- Progressive enhancement for camera capabilities
- Touch-friendly controls for all interactions</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR03-ai-food-scan/5-user-flows.md