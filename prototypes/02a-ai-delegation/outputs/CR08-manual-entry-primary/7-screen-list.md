# Screen List: Manual Entry Primary, AI Scan Secondary

## 4.1 Identify Screens from Flow Moments

| Flow Moment | Job | IA Location | Type | Screen Needed? | Rationale |
|-------------|-----|-------------|------|----------------|-----------|
| Tap manual entry button | J1 | /home | Input | Yes | Primary entry point for accurate logging |
| Food search interface | J1 | /home/search | Input | Yes | Core food selection experience |
| Enter quantity/portion | J1 | /home/search/[food] | Input | Yes | Quantity specification |
| Review nutritional info | J1 | /home/search/[food] | View | Yes | Nutritional data confirmation |
| Save meal log | J1 | /home | Feedback | Yes | Logging confirmation |
| Tap AI scan button | J2 | /home/scan | Capture | Yes | Secondary AI entry point |
| Grant camera permission | J2 | /home/scan | Decision | Yes | Permission handling |
| Capture photo | J2 | /home/scan | Capture | Yes | Photo capture interface |
| Review detected foods | J2 | /home/scan/results | Decision | Yes | AI result validation |
| Edit incorrect items | J2 | /home/scan/results | Input | Yes | Manual correction interface |
| View meal history | J3 | /meals | View | Yes | Meal log browsing |
| Select specific meal | J3 | /meals/[id] | View | Yes | Individual meal details |
| Modify food items | J3 | /meals/[id]/edit | Input | Yes | Meal editing interface |
| Access data settings | J4 | /settings/data | View | Yes | Accuracy monitoring dashboard |
| Adjust AI preferences | J4 | /settings/data | Input | Yes | AI control settings |

Types: Decision, Input, View, Capture, Feedback

## 4.2 Consolidate Screen List

### Home Section (Modified)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S01 | Home Dashboard | /home | J1, J2 | Entry point with primary/secondary actions |
| S02 | Manual Entry Interface | /home/manual | J1 | Primary food logging experience |
| S03 | Food Search | /home/search | J1 | Food database browsing and selection |
| S04 | Food Details | /home/search/[food] | J1 | Nutritional information and quantity input |
| S05 | Meal Confirmation | /home/confirm | J1 | Logging success feedback |

### AI Scan Section (Modified)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S06 | Camera Permission | /home/scan | J2 | Permission request and explanation |
| S07 | Camera Capture | /home/scan/capture | J2 | Photo capture interface |
| S08 | Processing | /home/scan/processing | J2 | AI analysis feedback |
| S09 | Scan Results Review | /home/scan/results | J2 | AI detection validation |
| S10 | Scan Correction | /home/scan/results/edit | J2 | Manual correction of AI results |

### Meals Management Section (Enhanced)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S11 | Meals History | /meals | J3 | Browse logged meals |
| S12 | Meal Details | /meals/[id] | J3 | View individual meal composition |
| S13 | Edit Meal | /meals/[id]/edit | J3 | Modify existing meal entries |

### Settings Section (Enhanced)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S14 | Data & Accuracy | /settings/data | J4 | Accuracy monitoring dashboard |
| S15 | AI Preferences | /settings/data/ai | J4 | AI scan control settings |

## 4.3 Map Screens to Jobs and IA

| Screen | IA Location | Jobs Supported |
|--------|-------------|----------------|
| S01-S05 | /home | J1 (Manual Food Entry) |
| S06-S10 | /home/scan | J2 (AI Scan with Verification) |
| S11-S13 | /meals | J3 (Manage Meal Logs) |
| S14-S15 | /settings/data | J4 (Monitor Data Accuracy) |

## 4.4 Create Screen Flow Diagram

```mermaid
flowchart TB
    subgraph HOME["Home Section"]
        S01["S01: Home Dashboard"]
        S02["S02: Manual Entry"]
        S03["S03: Food Search"]
        S04["S04: Food Details"]
        S05["S05: Meal Confirmation"]
    end

    subgraph SCAN["AI Scan Section"]
        S06["S06: Camera Permission"]
        S07["S07: Camera Capture"]
        S08["S08: Processing"]
        S09["S09: Scan Results"]
        S10["S10: Scan Correction"]
    end

    subgraph MEALS["Meals Section"]
        S11["S11: Meals History"]
        S12["S12: Meal Details"]
        S13["S13: Edit Meal"]
    end

    subgraph SETTINGS["Settings Section"]
        S14["S14: Data & Accuracy"]
        S15["S15: AI Preferences"]
    end

    S01 --> S02 --> S03 --> S04 --> S05
    S05 -.-> S01

    S01 --> S06 --> S07 --> S08 --> S09 --> S10
    S10 -.-> S05
    S09 -.-> S05

    S01 --> S11 --> S12 --> S13
    S13 -.-> S12

    S01 --> S14 --> S15

    style S01 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S02 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S06 fill:#fff3e0,stroke:#ff9800,stroke-width:2px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR08-manual-entry-primary/7-screen-list.md