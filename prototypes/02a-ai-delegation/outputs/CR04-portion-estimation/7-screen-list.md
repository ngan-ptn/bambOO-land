# Screen List: Portion Estimation UX Enhancement

## 4.1 Identify Screens from Flow Moments

| Flow Moment | Job | IA Location | Type | Screen Needed? | Rationale |
|-------------|-----|-------------|------|----------------|-----------|
| View portion estimate | J1 | /scan/results, /meal/add | View | Yes | Core estimate display with indicators |
| Tap confidence band | J1 | /scan/results, /meal/add | Input | Yes | Interactive confidence elements |
| Read tooltip explanation | J1 | /scan/results, /meal/add | Feedback | Yes | Educational content overlay |
| Access adjustment controls | J2 | /scan/results/edit, /meal/add/edit | Input | Yes | Portion modification interface |
| View visual references | J2 | /scan/results/help, /meal/add/help | View | Yes | Reference comparison displays |
| Make corrections | J2 | /scan/results/edit, /meal/add/edit | Input | Yes | Slider and input controls |
| Confirm changes | J2 | /scan/results/edit, /meal/add/edit | Decision | Yes | Change validation and saving |
| Access reference guides | J3 | /settings/tutorial | View | Yes | Educational reference library |
| View comparison examples | J3 | /settings/tutorial/[reference] | View | Yes | Detailed comparison displays |
| Apply learnings | J3 | /scan/results/edit, /meal/add/edit | Input | Yes | Learning application interface |
| Access correction history | J4 | /settings/data/corrections | View | Yes | Historical correction review |
| Analyze patterns | J4 | /settings/data/corrections | View | Yes | Pattern analysis interface |

Types: Decision, Input, View, Capture, Feedback

## 4.2 Consolidate Screen List

### Enhanced Existing Screens (Modified)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S01 | Scan Results | /scan/results | J1, J2 | AI results with confidence indicators and adjustments |
| S02 | Add Meal | /meal/add | J1, J2 | Meal composition with portion controls |
| S03 | Edit Meal | /meal/add/edit | J2 | Existing meal portion modifications |

### New Educational Screens
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S04 | Portion References | /settings/tutorial/references | J3 | Visual reference library for portion sizes |
| S05 | Reference Detail | /settings/tutorial/references/[id] | J3 | Detailed comparison for specific reference |
| S06 | Confidence Tutorial | /settings/tutorial/confidence | J1 | Educational content about confidence indicators |

### New Data & Learning Screens
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S07 | Correction History | /settings/data/corrections | J4 | Review of user portion adjustments |
| S08 | Accuracy Analytics | /settings/data/analytics | J4 | Pattern analysis and learning insights |
| S09 | Data Quality Dashboard | /settings/data | J4 | Overall data quality and trust metrics |

### Component Overlays (Shared)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S10 | Confidence Tooltip | Overlay | J1 | Contextual explanations of confidence levels |
| S11 | Adjustment Slider | Overlay | J2 | Interactive portion modification control |
| S12 | Reference Comparison | Overlay | J2, J3 | Visual comparison aids during adjustment |

## 4.3 Map Screens to Jobs and IA

| Screen | IA Location | Jobs Supported |
|--------|-------------|----------------|
| S01, S10 | /scan/results | J1 (Understand AI Trust), J2 (Adjust Portions) |
| S02, S03, S11, S12 | /meal/add | J1 (Understand AI Trust), J2 (Adjust Portions) |
| S04, S05, S06 | /settings/tutorial | J3 (Learn References) |
| S07, S08, S09 | /settings/data | J4 (Review History) |

## 4.4 Create Screen Flow Diagram

```mermaid
flowchart TB
    subgraph SCAN_MEAL["Scan & Meal Logging"]
        S01["S01: Scan Results"]
        S02["S02: Add Meal"]
        S03["S03: Edit Meal"]
    end

    subgraph TUTORIAL["Educational Content"]
        S04["S04: Portion References"]
        S05["S05: Reference Detail"]
        S06["S06: Confidence Tutorial"]
    end

    subgraph DATA_LEARNING["Data & Learning"]
        S07["S07: Correction History"]
        S08["S08: Accuracy Analytics"]
        S09["S09: Data Quality Dashboard"]
    end

    subgraph OVERLAYS["Shared Components"]
        S10["S10: Confidence Tooltip"]
        S11["S11: Adjustment Slider"]
        S12["S12: Reference Comparison"]
    end

    S01 --> S10
    S01 --> S11
    S02 --> S11
    S03 --> S11
    S01 --> S12
    S02 --> S12
    S03 --> S12

    S04 --> S05
    S04 --> S06

    S09 --> S07
    S09 --> S08

    style S01 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S10 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S11 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S12 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR04-portion-estimation/7-screen-list.md