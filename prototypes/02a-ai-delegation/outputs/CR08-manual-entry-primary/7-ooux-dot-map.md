# OOUX Dot Map: Manual Entry Primary, AI Scan Secondary

## 1.1 Identify Objects

Extract objects (nouns) from hypotheses and assumptions:

| Type | Object | Description |
|------|--------|-------------|
| **Primary** | Manual Entry | Primary, reliable food logging interface |
| **Primary** | AI Scan | Secondary, convenience food detection feature |
| **Primary** | Food Item | Individual food entries with nutritional data |
| **Secondary** | Meal Log | Collection of food items for a specific meal |
| **Secondary** | Accuracy Assurance | User confidence in logged data |
| **Derived** | Scan Validation | AI result verification and correction |

## 1.2 Map Attributes per Object

### Manual Entry
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| food_name | string | Required |
| quantity | number | Required |
| unit | enum | Required |
| calories | number | Derived |
| macronutrients | object | Derived |
| timestamp | date | Required |

### AI Scan
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| image_url | string | Required |
| detected_foods | array | Required |
| confidence_score | number | Required |
| validation_status | enum | Required |
| correction_count | number | Derived |

### Food Item
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| name | string | Required |
| brand | string | Optional |
| serving_size | number | Required |
| serving_unit | string | Required |
| calories_per_serving | number | Required |
| nutrients | object | Required |

### Meal Log
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| user_id | string | Required |
| meal_type | enum | Required |
| food_items | array | Required |
| total_calories | number | Derived |
| total_nutrients | object | Derived |
| logged_at | timestamp | Required |

### Accuracy Assurance
| Attribute | Type | Status |
|-----------|------|--------|
| user_id | string | Required |
| trust_score | number | Derived |
| manual_entry_ratio | number | Derived |
| ai_correction_rate | number | Derived |
| data_quality_score | number | Derived |

## 1.3 Define Actions per Object

| Object | User Actions (Verbs) |
|--------|---------------------|
| Manual Entry | create, search, select, customize, save, edit |
| AI Scan | initiate, capture, review, accept, correct, reject |
| Food Item | search, select, customize, add to meal |
| Meal Log | create, add items, review, save, edit, delete |
| Accuracy Assurance | view confidence, adjust settings, provide feedback |

## 1.4 Draw Relationships

```
Manual Entry --< belongs-to >-- Meal Log
AI Scan --< belongs-to >-- Meal Log
Manual Entry --< references >-- Food Item
AI Scan --< derives >-- Manual Entry (via correction)
Food Item --< has-many >-- Meal Log
Accuracy Assurance --< belongs-to >-- User
Accuracy Assurance -.-> influences >-- Manual Entry (trust-based)
```

## 1.5 Generate Mermaid Diagram

```mermaid
flowchart TB
    subgraph Primary["Primary Objects"]
        ME((Manual Entry))
        AIS((AI Scan))
        FI((Food Item))
    end

    subgraph Secondary["Secondary Objects"]
        ML((Meal Log))
        AA((Accuracy Assurance))
    end

    ME -->|belongs-to| ML
    AIS -->|belongs-to| ML
    ME -->|references| FI
    AIS -.->|derives| ME
    FI -->|has-many| ML
    AA -->|belongs-to| USER((User))
    AA -.->|influences| ME

    style ME stroke-width:3px
    style FI stroke-width:3px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR08-manual-entry-primary/7-ooux-dot-map.md