# Design-Lite Workflow: Portion Estimation UX Enhancement

## Step 5: USER-FLOWS
*Combined: IA map + Mermaid flows + Screen list*

### Information Architecture (IA) Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALOR TRACKER - PORTION ENHANCED             │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   HOME          │    │   MEALS         │    │   SCAN          │ │
│  │  ├─ Dashboard  │    │  ├─ History     │    │  ├─ Camera      │ │
│  │  ├─ Quick Log  │    │  ├─ Today       │    │  ├─ Processing  │ │
│  │  │  (Manual)    │    │  ├─ Add Meal    │    │  ├─ Results ⭐   │ │
│  │  └─ AI Scan     │    │  └─ Edit        │    │  └─ Corrections │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   SEARCH        │    │   PROFILE      │    │   SETTINGS      │ │
│  │  ├─ Food DB     │    │  ├─ Stats       │    │  ├─ Preferences │ │
│  │  ├─ Favorites   │    │  ├─ Goals       │    │  ├─ AI Settings  │ │
│  │  ├─ Recent      │    │  ├─ Achievements│    │  ├─ Portion UX   │ │
│  │  └─ Categories  │    │  └─ Account     │    │  └─ Help         │ │
│  │                  │    │                  │    │                  │
│ └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Navigation Changes:
• Scan Results enhanced with confidence bands and adjustment controls
• Settings expanded with Portion UX preferences
• All portion displays now include confidence indicators
• Adjustment flows integrated seamlessly into existing logging
```

### Key User Flows (Mermaid Diagrams)

#### Flow 1: Confidence-Based Portion Review
```mermaid
flowchart TD
    A[/"AI scan completes"/]
    B["Results screen displays"]
    C["View portion estimates with confidence bands"]
    D{Confidence level?}
    E["Green band: High confidence"]
    F["Yellow band: Medium confidence"]
    G["Red band: Low confidence"]
    H["Quick accept button visible"]
    I{"User accepts?"}
    J["Tap Accept"]
    K["Meal logged successfully"]
    L[/"Flow complete"/]

    A --> B --> C --> D
    D -->|High| E --> H --> I -->|Yes| J --> K --> L
    D -->|Medium| F --> M
    D -->|Low| G --> M

    M["Tap band to reveal slider"]
    M --> N["Adjust portion with visual feedback"]
    N --> O["Real-time calorie recalculation"]
    O --> P{"Satisfied?"}
    P -->|Yes| Q["Tap Save Adjustments"]
    P -->|No| N
    Q --> K
```

#### Flow 2: Educational Adjustment Experience
```mermaid
flowchart TD
    A[/"User encounters yellow/red band"/]
    B["Tap confidence band"]
    C["Slider reveals with comparison aids"]
    D["View educational tooltip"]
    E["See visual portion references"]
    F["Drag slider to adjust"]
    G["Watch calorie changes in real-time"]
    H["Compare to common objects"]
    I{"Need more help?"}
    J["Tap tooltip for detailed explanation"]
    K["Learn about confidence calculations"]
    L["Continue adjusting"]
    M{"Adjustment complete?"}
    N["Tap Save"]
    O["Success feedback with learning note"]
    P[/"Adjustment logged"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I
    I -->|Yes| J --> K --> L --> M
    I -->|No| L --> M
    M -->|Yes| N --> O --> P
    M -->|No| L
```

#### Flow 3: Progressive Trust Building
```mermaid
flowchart TD
    A[/"User consistently adjusts portions"/]
    B["App learns from corrections"]
    C["Confidence scores improve over time"]
    D["More green bands appear"]
    E["User sees improvement"]
    F["Trust in AI increases"]
    G["Fewer manual adjustments needed"]
    H["Positive reinforcement messages"]
    I["User feels empowered"]
    J[/"Enhanced logging experience"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J
```

#### Flow 4: Accessibility-First Design
```mermaid
flowchart TD
    A[/"User with accessibility needs"/]
    B["Screen reader announces confidence"]
    C["Voice guidance: 'Medium confidence portion'"]
    D["Alternative interaction available"]
    E["Voice commands for adjustment"]
    F["High contrast confidence bands"]
    G["Pattern overlays for color-blind users"]
    H["Simplified adjustment interface"]
    I["Full keyboard navigation"]
    J[/"Inclusive adjustment experience"/]

    A --> B --> C --> D
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    E --> J
    F --> J
    G --> J
    H --> J
    I --> J
```

### Comprehensive Screen List

#### Enhanced Existing Screens (Modified)
1. **Scan Results** - Enhanced with confidence bands and adjustment controls
2. **Manual Entry** - Added confidence indicators for AI suggestions
3. **Meal Builder** - Portion adjustments integrated into meal creation
4. **Food Search** - Confidence indicators on AI-suggested portions

#### New Components (Added)
5. **Confidence Band** - Color-coded indicator with tap-to-adjust functionality
6. **Portion Slider** - Smooth adjustment control with real-time feedback
7. **Comparison Overlay** - Visual aids showing portion equivalencies
8. **Educational Tooltip** - Explanations of confidence levels and adjustments

#### Settings & Preferences (Enhanced)
9. **Portion UX Settings** - User preferences for confidence display and adjustment behavior
10. **Accessibility Options** - Controls for confidence band appearance and interaction methods

#### Edge Case & Empty State Screens
11. **Adjustment Tutorial** - First-time user guidance for portion adjustments
12. **Confidence Calibration** - User feedback on confidence accuracy
13. **Adjustment History** - Review of past corrections and learning progress

**Total Screens:** 13 (4 enhanced, 6 new components, 3 edge cases)

**Navigation Patterns:**
- Confidence bands appear on all portion estimates
- Tap interactions reveal adjustment controls inline
- Seamless integration with existing logging flows
- Progressive disclosure prevents UI clutter

**Responsive Considerations:**
- Mobile-first: Touch-optimized sliders and bands
- Tablet: Enhanced comparison visuals and side-by-side views
- Accessibility: Full keyboard and screen reader support
- Performance: Efficient animations and real-time calculations</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR04-portion-estimation/5-user-flows.md