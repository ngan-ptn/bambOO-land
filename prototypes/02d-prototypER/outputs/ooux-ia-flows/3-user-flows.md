# User Flows - 02-ai-lead (Calo Tracker)

## Jobs-to-be-Done Summary

| Job ID | Job Statement | Primary Objects | Location | Key Actions |
|--------|---------------|-----------------|----------|-------------|
| J1 | When I want to track my meal, I want to quickly log food, So that I maintain accurate calorie records | Food Log, Built-in Food | Home | tap food, choose portion, confirm |
| J2 | When I eat a favorite meal, I want to log it with one tap, So that I save time on repetitive logging | Food Log, Favorite | Home | tap favorite, choose portion, confirm |
| J3 | When I eat a combo meal, I want to log multiple items at once, So that I don't log items individually | Food Log, Meal Combo | Home | tap combo, confirm items |
| J4 | When I can't find a food, I want to search for it, So that I can log less common foods | Built-in Food, Custom Food | Home | type search, select result, log |
| J5 | When I eat something not in the database, I want to add it manually, So that I can still track my nutrition | Food Log, Custom Food | Home → Enter Manually | enter details, save |
| J6 | When I have packaged food, I want to scan the barcode/label, So that I get accurate nutrition data | Food Log, Built-in Food | Home → Scan Food | capture, confirm, log |
| J7 | When I want to see my progress, I want to view today's summary, So that I know how much I've eaten | Daily Summary | Home | view ring, view macro bars |
| J8 | When I want to review what I ate, I want to see my timeline, So that I can track my eating patterns | Food Log | Home | scroll to meal history, view entries |
| J9 | When I log something by mistake, I want to undo it, So that my records stay accurate | Food Log | Home (notification) | tap undo |
| J10 | When I'm new to the app, I want to set up my profile, So that I get personalized calorie goals | User | Getting Started | complete steps |
| J11 | When my goals change, I want to update them, So that my targets reflect my current needs | User | Edit Goals | edit goals, save |

---

## Complete Flow Diagram

```mermaid
flowchart TB
    subgraph ENTRY["Entry Points"]
        E1[/"Open App"/]
        E2[/"Return Visit"/]
    end

    subgraph AUTH["Sign In"]
        LOGIN["Sign In"]
        REGISTER["Create Account"]
        FORGOT["Forgot Password"]
    end

    subgraph ONBOARD["Getting Started"]
        OB_WELCOME["Welcome"]
        OB_NAME["Your Name"]
        OB_GOAL["Choose Goal"]
        OB_CALORIES["Set Daily Calories"]
    end

    subgraph MAIN["Home"]
        DASH["Home"]

        subgraph QUICKLOG["J1-J4: Quick Logging"]
            TILES["Food List"]
            FAVS["My Favorites"]
            TEMPS["Meal Combos"]
            SEARCH["Search"]
            PORTION["Choose Portion Size"]
        end

        subgraph ADDFLOW["J5-J6: Add Food"]
            MANUAL["Enter Manually"]
            SCAN["Scan Food"]
            RESULTS["Scanned Food Details"]
        end

        subgraph PROGRESS["J7-J8: View Progress"]
            RING["Progress Ring"]
            MACROS["Macro Bars"]
            TIMELINE["Meal History"]
        end
    end

    subgraph PROFILE["My Profile"]
        PROF_MAIN["Profile"]
        PROF_EDIT["Edit Profile"]
        PROF_GOALS["Edit Goals"]
    end

    %% Entry paths
    E1 -->|"not signed in"| LOGIN
    E1 -->|"signed in, new user"| OB_WELCOME
    E1 -->|"signed in, setup done"| DASH
    E2 --> DASH

    %% Auth flow
    LOGIN -->|"success"| OB_WELCOME
    LOGIN --> REGISTER
    LOGIN --> FORGOT
    REGISTER -->|"success"| OB_WELCOME

    %% Getting Started flow
    OB_WELCOME --> OB_NAME --> OB_GOAL --> OB_CALORIES -->|"complete"| DASH

    %% Quick logging flows
    DASH --> TILES --> PORTION
    DASH --> FAVS --> PORTION
    DASH --> TEMPS -->|"confirm"| DASH
    DASH --> SEARCH --> PORTION
    PORTION -->|"confirm"| DASH

    %% Add food flows
    DASH -->|"+ button → Manual"| MANUAL --> DASH
    DASH -->|"+ button → Scan"| SCAN --> RESULTS --> DASH

    %% Progress flows
    DASH --> RING
    DASH --> MACROS
    DASH --> TIMELINE

    %% Profile flows
    DASH -->|"tap avatar"| PROF_MAIN
    PROF_MAIN --> PROF_EDIT --> PROF_MAIN
    PROF_MAIN --> PROF_GOALS --> PROF_MAIN
    PROF_MAIN -->|"sign out"| LOGIN

    style DASH fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style PORTION fill:#fff3e0,stroke:#FF9800,stroke-width:2px
```

---

## Individual Job Flows

### J1: Quick Food Logging (Primary Flow)

**Job Statement:** When I want to track my meal, I want to quickly log food, So that I maintain accurate calorie records.

```mermaid
flowchart TB
    A[/"Home screen"/]
    B["Scroll to Food List"]
    C["Tap food item"]
    D["Portion picker opens"]
    E{"Choose portion<br/>Small / Medium / Large"}
    F["Tap Confirm"]
    G["Notification: 'Logged [food]'"]
    H["Progress ring updates"]
    I[/"Back to Home"/]

    A --> B --> C --> D --> E
    E -->|"S"| F
    E -->|"M"| F
    E -->|"L"| F
    F --> G --> H --> I

    style D fill:#fff3e0,stroke:#FF9800
    style G fill:#e8f5e9,stroke:#4CAF50
```

**Steps:** 5 | **Decisions:** 1 (portion size) | **Time:** ~3 seconds

---

### J2: Favorite Quick Logging

**Job Statement:** When I eat a favorite meal, I want to log it with one tap, So that I save time on repetitive logging.

```mermaid
flowchart TB
    A[/"Home screen"/]
    B["Scroll to My Favorites"]
    C["Tap favorite"]
    D["Portion picker opens<br/>(default portion pre-selected)"]
    E{"Keep default or<br/>change portion?"}
    F["Tap Confirm"]
    G["Notification: 'Logged [food]'"]
    H[/"Back to Home"/]

    A --> B --> C --> D --> E
    E -->|"Keep"| F
    E -->|"Change"| D
    F --> G --> H

    style D fill:#fff3e0,stroke:#FF9800
```

**Steps:** 4 | **Decisions:** 1 | **Time:** ~2 seconds (with default)

---

### J3: Meal Combo Logging

**Job Statement:** When I eat a combo meal, I want to log multiple items at once, So that I don't log items individually.

```mermaid
flowchart TB
    A[/"Home screen"/]
    B["Scroll to Meal Combos"]
    C["Tap combo card"]
    D["Confirm combo sheet opens"]
    E["Review items list"]
    F{"All items correct?"}
    G["Tap 'Log All'"]
    H["Notification: logged summary"]
    I["Progress ring updates"]
    J[/"Back to Home"/]
    K["Edit combo"]

    A --> B --> C --> D --> E --> F
    F -->|"Yes"| G --> H --> I --> J
    F -->|"No"| K --> D

    style D fill:#e3f2fd,stroke:#2196F3
```

**Steps:** 6 | **Decisions:** 1 | **Time:** ~4 seconds

---

### J4: Search and Log Food

**Job Statement:** When I can't find a food, I want to search for it, So that I can log less common foods.

```mermaid
flowchart TB
    A[/"Home screen"/]
    B["Tap search bar"]
    C["Type food name"]
    D["Results appear"]
    E{"Found food?"}
    F["Tap result"]
    G["Portion picker opens"]
    H["Choose portion & confirm"]
    I["Notification: 'Logged'"]
    J[/"Back to Home"/]
    K["No results message"]
    L["Tap 'Add manually'"]
    M[/"Go to Enter Manually (J5)"/]

    A --> B --> C --> D --> E
    E -->|"Yes"| F --> G --> H --> I --> J
    E -->|"No"| K --> L --> M

    style G fill:#fff3e0,stroke:#FF9800
    style K fill:#ffebee,stroke:#f44336
```

**Steps:** 7 (found) / 5 (not found) | **Decisions:** 1 | **Time:** ~5-8 seconds

---

### J5: Manual Food Entry

**Job Statement:** When I eat something not in the database, I want to add it manually, So that I can still track my nutrition.

```mermaid
flowchart TB
    A[/"Home"/]
    B["Tap + button"]
    C["Add Options opens"]
    D["Tap 'Enter Manually'"]
    E["Enter Manually screen opens"]
    F["Enter food name"]
    G["Enter calories"]
    H{"Add macros?"}
    I["Enter protein/carbs/fat"]
    J["Tap Save"]
    K["Notification: 'Added [food]'"]
    L["Custom food saved"]
    M["Food logged"]
    N[/"Back to Home"/]

    A --> B --> C --> D --> E --> F --> G --> H
    H -->|"Yes"| I --> J
    H -->|"No"| J
    J --> K --> L --> M --> N

    style E fill:#e8f5e9,stroke:#4CAF50
    style L fill:#e3f2fd,stroke:#2196F3
```

**Steps:** 8-10 | **Decisions:** 1 | **Time:** ~15-30 seconds

---

### J6: Scan Food (Barcode/Label)

**Job Statement:** When I have packaged food, I want to scan the barcode/label, So that I get accurate nutrition data.

```mermaid
flowchart TB
    A[/"Home"/]
    B["Tap + button"]
    C["Add Options opens"]
    D["Tap 'Scan'"]
    E["Scan camera opens"]
    F["Point camera at barcode/label"]
    G["Capture image"]
    H["Scanned details screen"]
    I{"Food recognized?"}
    J["Review nutrition info"]
    K["Tap Confirm"]
    L["Portion picker if needed"]
    M["Notification: 'Logged'"]
    N[/"Back to Home"/]
    O["Tap 'Edit manually'"]
    P[/"Go to Enter Manually"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I
    I -->|"Yes"| J --> K --> L --> M --> N
    I -->|"No"| O --> P

    style E fill:#fff3e0,stroke:#FF9800
    style H fill:#e3f2fd,stroke:#2196F3
```

**Steps:** 9-10 | **Decisions:** 1 | **Time:** ~10-20 seconds

---

### J7: View Daily Progress

**Job Statement:** When I want to see my progress, I want to view today's summary, So that I know how much I've eaten.

```mermaid
flowchart TB
    A[/"Home loads"/]
    B["Progress Ring visible"]
    C["Shows: eaten / goal calories"]
    D["Macro Bars visible"]
    E["Shows: Protein / Carbs / Fat progress"]
    F{"Tap ring for details?"}
    G["Expand summary view"]
    H[/"Stay on Home"/]

    A --> B --> C
    A --> D --> E
    C --> F
    E --> F
    F -->|"Yes"| G --> H
    F -->|"No"| H

    style B fill:#e8f5e9,stroke:#4CAF50
    style D fill:#e8f5e9,stroke:#4CAF50
```

**Steps:** 1 (passive view) | **Decisions:** 0 | **Time:** Instant

---

### J8: Review Meal History

**Job Statement:** When I want to review what I ate, I want to see my timeline, So that I can track my eating patterns.

```mermaid
flowchart TB
    A[/"Home screen"/]
    B["Scroll to Meal History"]
    C["View Today tab"]
    D["See logged items with times"]
    E{"Switch to Week view?"}
    F["Tap Week tab"]
    G["See 7-day history"]
    H{"Delete an entry?"}
    I["Swipe or tap delete"]
    J["Confirm delete"]
    K["Notification with Undo"]
    L[/"Stay on Meal History"/]

    A --> B --> C --> D --> E
    E -->|"Yes"| F --> G --> H
    E -->|"No"| H
    H -->|"Yes"| I --> J --> K --> L
    H -->|"No"| L

    style C fill:#e8f5e9,stroke:#4CAF50
    style K fill:#fff3e0,stroke:#FF9800
```

**Steps:** 2-5 | **Decisions:** 2 | **Time:** Variable

---

### J10: New User Setup

**Job Statement:** When I'm new to the app, I want to set up my profile, So that I get personalized calorie goals.

```mermaid
flowchart TB
    A[/"Open App (new user)"/]
    B["Sign In / Create Account"]
    C["Welcome screen"]
    D["Tap 'Get Started'"]
    E["Your Name screen"]
    F["Enter display name"]
    G["Tap Continue"]
    H["Choose Goal screen"]
    I{"Select goal"}
    J["Set Daily Calories screen"]
    K["Set calorie target"]
    L["Tap Finish"]
    M["Profile saved"]
    N[/"Home"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I
    I -->|"Lose weight"| J
    I -->|"Maintain"| J
    I -->|"Gain muscle"| J
    J --> K --> L --> M --> N

    style C fill:#e3f2fd,stroke:#2196F3
    style N fill:#e8f5e9,stroke:#4CAF50
```

**Steps:** 8 | **Decisions:** 1 (goal selection) | **Time:** ~30-60 seconds

---

### J11: Edit Nutrition Goals

**Job Statement:** When my goals change, I want to update them, So that my targets reflect my current needs.

```mermaid
flowchart TB
    A[/"Home"/]
    B["Tap avatar/profile picture"]
    C["Profile screen"]
    D["Tap 'Edit Goals'"]
    E["Edit Goals screen"]
    F["Adjust calorie target"]
    G["Adjust macro targets"]
    H["Tap Save"]
    I["Goals updated"]
    J["Notification: 'Goals saved'"]
    K[/"Back to Profile"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K

    style E fill:#e8f5e9,stroke:#4CAF50
```

**Steps:** 7 | **Decisions:** 0 | **Time:** ~20-30 seconds

---

## Job Summary

| Job | Entry Point | Steps | Decisions | Exit Point | Frequency |
|-----|-------------|-------|-----------|------------|-----------|
| J1: Quick Log | Home (Food List) | 5 | 1 | Home | Very High |
| J2: Favorite Log | Home (My Favorites) | 4 | 1 | Home | High |
| J3: Combo Log | Home (Meal Combos) | 6 | 1 | Home | Medium |
| J4: Search Log | Home (Search) | 7 | 1 | Home | Medium |
| J5: Manual Entry | Home → + button | 8-10 | 1 | Home | Low |
| J6: Scan Food | Home → + button | 9-10 | 1 | Home | Low |
| J7: View Progress | Home | 1 | 0 | Home | Very High |
| J8: Review History | Home (Meal History) | 2-5 | 2 | Home | Medium |
| J9: Undo Log | Home (notification) | 2 | 1 | Home | Low |
| J10: New User Setup | Sign In → Getting Started | 8 | 1 | Home | Once |
| J11: Edit Goals | Profile | 7 | 0 | Profile | Rare |

---

## Flow Optimization Notes

### High-Frequency Paths (Optimized)
- **J1/J2**: 2-3 taps to log food from Home
- **J7**: Zero taps - progress visible immediately

### Pain Points Identified
- **J5 (Manual Entry)**: Most steps, highest friction - consider inline quick-add
- **J6 (Scan)**: Depends on camera/recognition accuracy

### Cross-Flow Connections
- J4 (Search) → J5 (Manual Entry) when food not found
- J6 (Scan) → J5 (Manual Entry) when recognition fails
- J1/J2/J3/J4 all converge at Choose Portion Size popup
