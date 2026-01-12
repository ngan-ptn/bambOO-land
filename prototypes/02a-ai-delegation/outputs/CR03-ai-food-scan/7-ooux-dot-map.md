# OOUX Dot Map: AI-Powered Food Scan

## 1.1 Identify Objects

Extract objects (nouns) from hypotheses and assumptions:

| Type | Object | Description |
|------|--------|-------------|
| **Primary** | Food Photo | User's captured image of food for AI analysis |
| **Primary** | AI Detection | AI-generated food identification and calorie estimation |
| **Primary** | Scan Result | Processed nutritional information with confidence indicators |
| **Secondary** | Manual Entry | Fallback manual food logging interface |
| **Secondary** | Meal Log | Collection of food items for a specific meal |
| **Derived** | Scan History | Record of previous AI scans for learning |

## 1.2 Map Attributes per Object

### Food Photo
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| image_url | string | Required |
| capture_timestamp | date | Required |
| device_info | object | Optional |
| image_quality_score | number | Derived |

### AI Detection
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| food_photo_id | string | Required |
| detected_foods | array | Required |
| confidence_scores | object | Required |
| processing_timestamp | date | Required |
| ai_model_version | string | Required |

### Scan Result
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| ai_detection_id | string | Required |
| final_foods | array | Required |
| total_calories | number | Derived |
| total_nutrients | object | Derived |
| user_modifications | array | Optional |

### Manual Entry
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| food_name | string | Required |
| quantity | number | Required |
| unit | enum | Required |
| source | enum | Required |

### Meal Log
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| user_id | string | Required |
| food_entries | array | Required |
| meal_type | enum | Required |
| logged_at | timestamp | Required |

## 1.3 Define Actions per Object

| Object | User Actions (Verbs) |
|--------|---------------------|
| Food Photo | capture, retake, delete |
| AI Detection | review, accept, correct, reject |
| Scan Result | save, edit, share, delete |
| Manual Entry | create, search, select, modify |
| Meal Log | create, add items, complete, edit |

## 1.4 Draw Relationships

```
Food Photo --< generates >-- AI Detection
AI Detection --< produces >-- Scan Result
Scan Result --< belongs-to >-- Meal Log
Manual Entry --< alternative-to >-- Scan Result
Scan Result -.-> improves >-- AI Detection (learning)
```

## 1.5 Generate Mermaid Diagram

```mermaid
flowchart TB
    subgraph Primary["Primary Objects"]
        FP((Food Photo))
        AID((AI Detection))
        SR((Scan Result))
    end

    subgraph Secondary["Secondary Objects"]
        ME((Manual Entry))
        ML((Meal Log))
    end

    FP -->|generates| AID
    AID -->|produces| SR
    SR -->|belongs-to| ML
    ME -.->|alternative-to| SR
    SR -.->|improves| AID

    style FP stroke-width:3px
    style AID stroke-width:3px
    style SR stroke-width:3px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR03-ai-food-scan/7-ooux-dot-map.md