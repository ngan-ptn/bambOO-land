# OOUX Dot Map: Portion Estimation UX Enhancement

## 1.1 Identify Objects

Extract objects (nouns) from hypotheses and assumptions:

| Type | Object | Description |
|------|--------|-------------|
| **Primary** | Portion Estimate | AI-generated portion size with confidence level |
| **Primary** | Confidence Indicator | Visual representation of AI certainty |
| **Primary** | Adjustment Control | User interface for modifying estimates |
| **Secondary** | Portion Reference | Visual or comparative aids for accurate sizing |
| **Secondary** | Correction History | Record of user adjustments for learning |
| **Derived** | Portion Accuracy | Comparison between AI estimate and user correction |

## 1.2 Map Attributes per Object

### Portion Estimate
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| food_item_id | string | Required |
| estimated_quantity | number | Required |
| unit | enum | Required |
| confidence_score | number | Required |
| ai_model_version | string | Required |

### Confidence Indicator
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| portion_estimate_id | string | Required |
| visual_representation | enum | Required |
| color_code | string | Required |
| tooltip_text | string | Required |

### Adjustment Control
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| portion_estimate_id | string | Required |
| control_type | enum | Required |
| min_value | number | Required |
| max_value | number | Required |
| step_size | number | Required |

### Portion Reference
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| reference_type | enum | Required |
| visual_asset | string | Optional |
| comparison_text | string | Required |
| example_quantity | number | Required |

### Correction History
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| user_id | string | Required |
| original_estimate_id | string | Required |
| user_correction | number | Required |
| correction_timestamp | date | Required |
| reason_category | enum | Optional |

## 1.3 Define Actions per Object

| Object | User Actions (Verbs) |
|--------|---------------------|
| Portion Estimate | view, accept, adjust, reject |
| Confidence Indicator | tap, learn, understand |
| Adjustment Control | drag, input, reset, confirm |
| Portion Reference | view, compare, reference |
| Correction History | review, learn, analyze |

## 1.4 Draw Relationships

```
Portion Estimate --< has >-- Confidence Indicator
Portion Estimate --< enables >-- Adjustment Control
Adjustment Control --< uses >-- Portion Reference
Adjustment Control --< creates >-- Correction History
Correction History -.-> improves >-- Portion Estimate (learning)
```

## 1.5 Generate Mermaid Diagram

```mermaid
flowchart TB
    subgraph Primary["Primary Objects"]
        PE((Portion Estimate))
        CI((Confidence Indicator))
        AC((Adjustment Control))
    end

    subgraph Secondary["Secondary Objects"]
        PR((Portion Reference))
        CH((Correction History))
    end

    PE -->|has| CI
    PE -->|enables| AC
    AC -->|uses| PR
    AC -->|creates| CH
    CH -.->|improves| PE

    style PE stroke-width:3px
    style CI stroke-width:3px
    style AC stroke-width:3px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR04-portion-estimation/7-ooux-dot-map.md