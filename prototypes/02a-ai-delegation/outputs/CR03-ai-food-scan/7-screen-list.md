# Screen List: AI-Powered Food Scan

## 4.1 Identify Screens from Flow Moments

| Flow Moment | Job | IA Location | Type | Screen Needed? | Rationale |
|-------------|-----|-------------|------|----------------|-----------|
| Tap AI Scan button | J1 | /home or /meals | Input | Yes | Primary entry point for scanning |
| Camera permissions | J1 | /scan/capture | Decision | Yes | Permission handling required |
| Full-screen camera | J1 | /scan/capture | Capture | Yes | Core photo capture experience |
| AI processing | J1 | /scan/processing | Feedback | Yes | Loading states and progress |
| Results display | J1 | /scan/results | View | Yes | AI detection results presentation |
| Review detections | J2 | /scan/results | Decision | Yes | Accuracy verification interface |
| Manual corrections | J2 | /scan/results/edit | Input | Yes | Food editing and replacement |
| Start meal logging | J3 | /meals/add | Input | Yes | Meal creation interface |
| Add scan results | J3 | /meals/add | Input | Yes | Integrating scans into meals |
| Add manual items | J3 | /meals/add/manual | Input | Yes | Manual food addition |
| Review complete meal | J3 | /meals/add | View | Yes | Final meal composition check |
| View scan history | J4 | /scan/history | View | Yes | Historical scan review |
| Review specific scan | J4 | /scan/history/[id] | View | Yes | Individual scan analysis |

Types: Decision, Input, View, Capture, Feedback

## 4.2 Consolidate Screen List

### Scan Section (New)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S01 | Scan Entry | /scan | J1, J4 | Access point for scanning features |
| S02 | Camera Permission | /scan/capture | J1 | Request camera access with explanation |
| S03 | Camera Capture | /scan/capture | J1 | Full-screen food photography interface |
| S04 | Processing | /scan/processing | J1 | AI analysis loading states |
| S05 | Scan Results | /scan/results | J1, J2 | AI detection results and corrections |
| S06 | Result Corrections | /scan/results/edit | J2 | Manual editing of AI detections |
| S07 | Scan History | /scan/history | J4 | Browse previous scans |
| S08 | Scan Detail | /scan/history/[id] | J4 | Review individual scan accuracy |

### Meals Section (Enhanced)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S09 | Add Meal | /meals/add | J3 | Meal creation and composition |
| S10 | Manual Food Entry | /meals/add/manual | J3 | Search and add foods manually |
| S11 | Meal Review | /meals/add/review | J3 | Final meal verification |

### Enhanced Existing Screens
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S12 | Home Dashboard | /home | J1 | Quick access to AI scanning |
| S13 | Meals List | /meals | J3 | Access meal logging features |

## 4.3 Map Screens to Jobs and IA

| Screen | IA Location | Jobs Supported |
|--------|-------------|----------------|
| S01-S08 | /scan | J1 (Quick Photo Logging), J2 (Correct AI), J4 (Learn from History) |
| S09-S11 | /meals/add | J3 (Build Complete Meals) |
| S12 | /home | J1 (Quick Photo Logging) |
| S13 | /meals | J3 (Build Complete Meals) |

## 4.4 Create Screen Flow Diagram

```mermaid
flowchart TB
    subgraph SCAN["Scan Section"]
        S01["S01: Scan Entry"]
        S02["S02: Camera Permission"]
        S03["S03: Camera Capture"]
        S04["S04: Processing"]
        S05["S05: Scan Results"]
        S06["S06: Result Corrections"]
        S07["S07: Scan History"]
        S08["S08: Scan Detail"]
    end

    subgraph MEALS["Meals Section"]
        S09["S09: Add Meal"]
        S10["S10: Manual Food Entry"]
        S11["S11: Meal Review"]
        S13["S13: Meals List"]
    end

    subgraph HOME["Home"]
        S12["S12: Home Dashboard"]
    end

    S12 --> S01 --> S02 --> S03 --> S04 --> S05 --> S06
    S06 -.-> S05
    S05 -.-> S09

    S13 --> S09 --> S10 --> S11
    S09 --> S01

    S01 --> S07 --> S08

    style S01 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S03 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S05 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR03-ai-food-scan/7-screen-list.md