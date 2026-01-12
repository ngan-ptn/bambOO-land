# User Flows: AI-Powered Food Scan

## 3.1 Derive Jobs-to-be-Done

From objects, actions, and IA, derive jobs:

| Job ID | Job Statement | Primary Objects | IA Location | Key Actions |
|--------|---------------|-----------------|-------------|-------------|
| J1 | When I want to log food quickly without typing, I want to take a photo and get instant calorie estimates, So that I can maintain consistent tracking with minimal effort | Food Photo, AI Detection, Scan Result | /scan | capture, process, review, accept |
| J2 | When AI detection is wrong, I want to easily correct the results manually, So that I can ensure nutritional accuracy while benefiting from AI speed | Scan Result, Manual Entry | /scan/results | review, edit, correct, save |
| J3 | When I want to track complete meals, I want to combine multiple scans or manual entries, So that I can log comprehensive nutritional information | Scan Result, Meal Log | /meal/add | combine, organize, complete |
| J4 | When I want to improve future scans, I want to see my scanning history and patterns, So that I can learn to take better photos for more accurate results | Scan History, Food Photo | /scan/history | review, analyze, learn |

## 3.2 Create Complete Flow Diagram

Show all jobs navigating through IA:

```mermaid
flowchart TB
    subgraph ENTRY["🚀 Entry Points"]
        E1[/"App launch - quick scan"/]
        E2[/"Meal logging context"/]
        E3[/"Search fallback"/]
        E4[/"History review"/]
    end

    subgraph IA["📱 IA Structure"]
        HOME["Home"]
        SCAN["Scan"]
        MEALS["Meals"]
        SEARCH["Search"]
    end

    subgraph J1["J1: Quick Photo Logging ⭐"]
        direction LR
        J1A["Access camera"]
        J1B["Capture food photo"]
        J1C["AI processing"]
        J1D["Review results"]
        J1E["Accept/save"]

        J1A --> J1B --> J1C --> J1D --> J1E
    end

    subgraph J2["J2: Correct AI Results"]
        direction LR
        J2A["Review scan results"]
        J2B["Identify errors"]
        J2C["Manual corrections"]
        J2D["Verify accuracy"]
        J2E["Save corrected"]

        J2A --> J2B --> J2C --> J2D --> J2E
    end

    subgraph J3["J3: Build Complete Meals"]
        direction LR
        J3A["Start meal logging"]
        J3B["Add scan results"]
        J3C["Add manual items"]
        J3D["Review complete meal"]
        J3E["Save meal log"]

        J3A --> J3B --> J3C --> J3D --> J3E
    end

    subgraph J4["J4: Learn from History"]
        direction LR
        J4A["View scan history"]
        J4B["Analyze patterns"]
        J4C["Review accuracy"]
        J4D["Apply learnings"]

        J4A --> J4B --> J4C --> J4D
    end

    E1 --> HOME
    E2 --> MEALS
    E3 --> SEARCH
    E4 --> SCAN

    HOME --> SCAN
    SCAN --> J1
    SCAN --> J4
    MEALS --> J3
    SEARCH --> J2

    J1 --> J2
    J1 --> J3
    J2 --> J3
    J3 --> HOME
    J4 --> SCAN

    style J1 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```

## 3.3 Create Individual Job Flows

### J1: Quick Photo Logging (Primary Job)

```mermaid
flowchart TB
    A[/"Entry: Home or Meals tab"/]
    B["Tap AI Scan button"]
    C["Camera permissions granted"]
    D["Full-screen camera opens"]
    E["Position food in frame"]
    F["Tap capture button"]
    G["Photo taken with feedback"]
    H["AI processing begins"]
    I["Animated loading states"]
    J["Results display"]
    K{"Accept results?"}
    L["Tap Accept"]
    M["Meal logged successfully"]
    N[/"Quick logging complete"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K -->|Yes| L --> M --> N
    K -->|No| O["Tap to edit"]
    O --> P["Correction interface"]
    P --> Q["Make changes"]
    Q --> L
    C -->|Denied| R["Manual entry fallback"]
    R --> S["Search for food"]
    S --> L
```

### J2: Correct AI Results

```mermaid
flowchart TB
    A[/"Entry: Scan results screen"/]
    B["View AI detections"]
    C["Review confidence indicators"]
    D{"Results accurate?"}
    E["Tap Accept All"]
    F["Results saved"]
    G[/"Job complete"/]

    A --> B --> C --> D -->|Yes| E --> F --> G
    D -->|No| H["Identify incorrect items"]
    H --> I["Tap incorrect food"]
    I --> J["Manual correction options"]
    J --> K["Search replacement food"]
    K --> L["Select correct food"]
    L --> M["Adjust quantity"]
    M --> N["Confirm changes"]
    N --> O{"More corrections?"}
    O -->|Yes| H
    O -->|No| E
```

### J3: Build Complete Meals

```mermaid
flowchart TB
    A[/"Entry: Meals tab"/]
    B["Tap Add Meal"]
    C["Choose meal type"]
    D{"Add from scan?"}
    E["Tap Scan button"]
    F["Complete scan flow"]
    G["Scan results added"]
    H["Review meal composition"]
    I{"Add more items?"}
    J["Tap Manual Entry"]
    K["Search for additional foods"]
    L["Add manual items"]
    M["Review complete meal"]
    N["Adjust quantities if needed"]
    O["Tap Save Meal"]
    P["Meal logged with timestamp"]
    Q[/"Complete meal tracking"/]

    A --> B --> C --> D -->|Yes| E --> F --> G --> H --> I -->|Yes| J --> K --> L --> M --> N --> O --> P --> Q
    I -->|No| M
    D -->|No| J
```

### J4: Learn from History

```mermaid
flowchart TB
    A[/"Entry: Scan section"/]
    B["Navigate to History"]
    C["View past scans"]
    D["Select specific scan"]
    E["Review original photo"]
    F["Compare with final results"]
    G["See accuracy rating"]
    H["View user corrections"]
    I["Learn improvement tips"]
    J[/"Better future scanning"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J
```

## 3.4 Job Summary

| Job | IA Entry Point | Steps | Decision Points | Exit Point |
|-----|----------------|-------|-----------------|------------|
| J1: Quick Photo Logging | Home/Meals | 8 | 2 | Meal logged |
| J2: Correct AI Results | Scan results | 6 | 2 | Corrections saved |
| J3: Build Complete Meals | Meals | 7 | 1 | Meal completed |
| J4: Learn from History | Scan | 4 | 0 | History reviewed |</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR03-ai-food-scan/7-user-flows.md