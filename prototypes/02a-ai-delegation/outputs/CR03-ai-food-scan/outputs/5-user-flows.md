# User Flows: CR03 AI-Powered Food Scan

## App Structure

### Where Things Live

| Thing | Main Location | Also Found | How to Get There |
|-------|---------------|------------|------------------|
| Photo | Camera screen | (temporary) | Take a picture |
| What AI Found | Results screen | - | After scanning |
| Recognized Food | Results screen | - | AI shows it |
| Logged Meal | Today's timeline | Results (confirm) | After you log it |

### Current App Structure

```mermaid
flowchart TB
    subgraph App["🏠 App"]
        direction TB
        Home["Home"]

        subgraph Tabs["Navigation"]
            Tab1["Home"]
            Tab2["Quick Add"]
            Tab3["History"]
            Tab4["Profile"]
        end

        subgraph QuickAdd["Quick Add"]
            Favorites["Favorites"]
            Search["Search"]
            Manual["Manual"]
        end
    end

    Home --> Tabs
    Tab2 --> QuickAdd
```

### What's New in This Feature

```mermaid
flowchart TB
    subgraph App["🏠 App"]
        direction TB
        Home["Home"]

        subgraph Tabs["Navigation"]
            Tab1["Home"]
            Tab2["Quick Add"]
            Tab3["History"]
            Tab4["Profile"]
        end

        subgraph QuickAdd["Quick Add"]
            Favorites["Favorites"]
            Search["Search"]
            Manual["Manual"]
            ScanBtn["🆕 Scan Button"]
        end

        subgraph ScanArea["🆕 Scan Your Food"]
            Camera["🆕 Camera"]
            Thinking["🆕 'Analyzing...'"]
            Results["🆕 What AI Found"]
        end
    end

    Home --> Tabs
    Tab2 --> QuickAdd
    ScanBtn --> ScanArea

    style ScanBtn fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style ScanArea fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```

### What's Changing

| Screen | Change | Why |
|--------|--------|-----|
| Quick Add | UPDATED | Add camera button |
| Camera | NEW | Take photo of your food |
| Analyzing | NEW | 2-3 second wait while AI thinks |
| Results | NEW | See what AI found + edit + confirm |
| Home | UNCHANGED | Shows logged meals |

---

## What Users Want to Do

| Goal | What They're Thinking | Where | Steps |
|------|----------------------|-------|-------|
| Scan & Log ⭐ | "I have food in front of me, let me take a picture instead of typing" | Camera → Results | snap, check, log |
| Fix AI Mistake | "It got it wrong, let me fix the name or calories" | Results screen | tap, edit, save |
| Add Missing Food | "AI couldn't figure this out, I'll add it myself" | Results → manual | tap, type, save |
| Pick What to Log | "It found multiple things but I'm only eating some of them" | Results screen | uncheck items, log |

---

## Complete Flow Overview

```mermaid
flowchart TB
    subgraph StartHere["🚀 Starting Point"]
        FromQuickAdd[/"Quick Add Page"/]
    end

    subgraph ScanArea["📱 Scan Your Food"]
        Camera["Camera Screen"]
        Thinking["'Analyzing...'"]
        Results["What AI Found"]
    end

    subgraph ScanAndLog["Scan & Log ⭐"]
        direction LR
        OpenCamera["Open Camera"]
        TakePhoto["Take Photo"]
        Wait["Wait 2-3s"]
        CheckResults["Check Results"]
        TapLog["Tap 'Log Meal'"]

        OpenCamera --> TakePhoto --> Wait --> CheckResults --> TapLog
    end

    subgraph FixMistake["Fix AI Mistake"]
        direction LR
        TapItem["Tap Item"]
        EditIt["Edit Name/Cal"]
        SaveEdit["Save"]

        TapItem --> EditIt --> SaveEdit
    end

    subgraph AddMissing["Add Missing Food"]
        direction LR
        SeeUnsure["See 'Not sure'"]
        TapManual["Tap 'Add manually'"]
        FillForm["Fill Form"]

        SeeUnsure --> TapManual --> FillForm
    end

    subgraph Done["✅ Done!"]
        Toast["'Logged!'"]
    end

    FromQuickAdd --> Camera
    Camera --> ScanAndLog
    ScanAndLog --> Thinking --> Results
    Results --> FixMistake --> Results
    Results --> AddMissing --> Results
    Results --> Toast

    Toast --> FromQuickAdd

    style ScanAndLog fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style ScanArea fill:#e3f2fd,stroke:#2196F3,stroke-width:2px
```

---

## Step-by-Step Flows

### Scan & Log (The Easy Way) ⭐

**How often:** Every day - alternative to typing
**Starting from:** Camera icon on Quick Add
**Ending at:** Success message, back to Quick Add

```mermaid
flowchart TB
    Start[/"Quick Add Page"/]
    TapCamera["Tap Camera Icon"]
    PermissionOK{"Camera allowed?"}
    CameraScreen["Camera Opens"]
    FrameFood["Point at Food"]
    TapCapture["Tap Capture"]
    PhotoTaken["Photo Taken"]
    Analyzing["'Analyzing...'"]
    ResultsScreen["See What AI Found"]
    CheckItems["Check the Items"]
    TapLog["Tap 'Log Meal'"]
    MealsLogged["Meals Logged!"]
    Toast["'Logged!'"]
    Done[/"Back to Quick Add"/]
    ShowExplain["Explain Why We Need Camera"]
    OpenSettings["Go to Settings"]

    Start --> TapCamera --> PermissionOK
    PermissionOK -->|Yes| CameraScreen --> FrameFood --> TapCapture --> PhotoTaken --> Analyzing --> ResultsScreen --> CheckItems --> TapLog --> MealsLogged --> Toast --> Done
    PermissionOK -->|No| ShowExplain --> OpenSettings

    style Analyzing fill:#fff3e0,stroke:#FF9800,stroke-width:2px
    style ResultsScreen fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```

**What happens:**
- Camera button → Opens camera (asks permission first)
- Capture button → Takes photo, starts AI
- Analyzing → 2-3 second wait with animation
- Results → List of foods AI found with calories
- Log Meal → Logs everything that's checked

**What if:**
- Camera not allowed → Shows why we need it + link to Settings
- Too dark → "Photo too dark" message
- Taking too long (>5s) → "Taking longer than usual..."

---

### Fix AI Mistake (When It Gets It Wrong)

**How often:** Sometimes - when AI is wrong
**Starting from:** Results screen, tap on an item
**Ending at:** Stay on results

```mermaid
flowchart TB
    Start["Results Screen"]
    SeeWrong["See Item with\nWrong Name or Calories"]
    TapItem["Tap the Item"]
    EditView["Edit Opens"]
    ChangeName["Change the Name"]
    InDatabase{"Name in\nour database?"}
    AutoUpdate["Calories Update\nAutomatically"]
    ManualCals["Type Calories\nManually"]
    TapSave["Tap Save"]
    ItemFixed["Item Updated"]
    Done[/"Back to Results"/]

    Start --> SeeWrong --> TapItem --> EditView --> ChangeName --> InDatabase
    InDatabase -->|Yes| AutoUpdate --> TapSave --> ItemFixed --> Done
    InDatabase -->|No| ManualCals --> TapSave

    style EditView fill:#fff3e0,stroke:#FF9800,stroke-width:2px
```

**What happens:**
- Tap item → Opens edit right there
- Change name → If we know that food, calories auto-update
- Change calories → You can override manually
- Save → Updates item in the list

**What if:**
- Multiple wrong items → Edit each one
- Food not in database → Enter calories manually

---

### Add Missing Food (When AI Can't Figure It Out)

**How often:** Sometimes - when AI fails
**Starting from:** Results screen shows low confidence
**Ending at:** Item added to results

```mermaid
flowchart TB
    Start["Results Screen"]
    SeeUnsure["See 'Not sure' or\nLow Confidence"]
    TapManual["Tap 'Add it manually'"]
    ManualForm["Add Food Form"]
    TypeName["Type Food Name"]
    TypeCals["Type Calories"]
    TapAdd["Tap Add"]
    ItemAdded["Food Added to List"]
    Done[/"Back to Results"/]

    Start --> SeeUnsure --> TapManual --> ManualForm --> TypeName --> TypeCals --> TapAdd --> ItemAdded --> Done

    style SeeUnsure fill:#ffebee,stroke:#f44336,stroke-width:2px
    style ManualForm fill:#fff3e0,stroke:#FF9800,stroke-width:2px
```

**What happens:**
- Low confidence → Shows "Not sure" badge
- Very low (<40%) → Suggests "Add it manually"
- Add manually → Opens simple form
- Add → Adds to the results list (you can still log all together)

**What if:**
- Nothing detected at all → "No food found. Try again or add manually?"
- Only some foods found → Shows what it found, asks about the rest

---

### Pick What to Log (Multiple Items)

**How often:** Sometimes - when scanning a plate with multiple foods
**Starting from:** Results screen with multiple items
**Ending at:** Only checked items logged

```mermaid
flowchart LR
    Start["Results Screen"]
    SeeMultiple["See Multiple Items\n(All ✓ checked)"]
    UncheckSome["Uncheck What\nYou Won't Eat"]
    TotalUpdates["Total Calories\nUpdates"]
    TapLog["Tap 'Log Meal'"]
    OnlyChecked["Only ✓ Items\nGet Logged"]
    Toast[/"'Logged X items'"/]

    Start --> SeeMultiple --> UncheckSome --> TotalUpdates --> TapLog --> OnlyChecked --> Toast

    style UncheckSome fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```

**What happens:**
- All items checked by default
- Tap checkbox to uncheck
- Total calories updates live
- Log Meal → Only logs what's checked

---

## All Screens

### Scan Screens

| Screen | Used For | What It Does |
|--------|----------|--------------|
| Camera | Taking photos | Point at food and capture |
| Analyzing | Waiting | Shows animation while AI thinks |
| Results | Reviewing | Shows what AI found, lets you edit and confirm |

### Popups & Forms

| Popup/Form | Used For | What It Does |
|------------|----------|--------------|
| Edit Item | Fixing mistakes | Change name or calories right there |
| Add Food Form | Missing items | Add what AI couldn't find |
| Confidence Badge | Transparency | Shows how sure AI is |
| Item Checkbox | Selection | Toggle items on/off |

### Shared Parts

| Part | Used For | What It Does |
|------|----------|--------------|
| Success Message | Feedback | Shows "Logged!" after confirming |

---

## Screen Connections

```mermaid
flowchart TB
    subgraph QuickAdd["Quick Add"]
        QAPage["Quick Add Page"]
        CameraBtn["Camera Button"]
    end

    subgraph Scan["Scan Your Food"]
        Camera["Camera"]
        Analyzing["Analyzing..."]
        Results["What AI Found"]
        EditItem["Edit Item"]
        AddManual["Add Manually"]
    end

    subgraph Done["Done"]
        Toast["'Logged!'"]
    end

    QAPage --> CameraBtn --> Camera
    Camera --> Analyzing --> Results
    Results --> EditItem --> Results
    Results --> AddManual --> Results
    Results --> Toast
    Toast -.-> QAPage
```

---

## Summary

| Goal | Where | Steps | Decisions | How Often |
|------|-------|-------|-----------|-----------|
| Scan & Log ⭐ | Camera → Results | 6 | 1 | Every day |
| Fix Mistake | Results screen | 4 | 1 | Sometimes |
| Add Missing | Results → manual | 4 | 0 | Sometimes |
| Pick Items | Results screen | 3 | 0 | Sometimes |

---

## Key Patterns

1. **Snap then review** - Take photo → wait → see results (not live scanning)
2. **Show confidence** - Green = sure, yellow = maybe, suggests next step
3. **Review before logging** - You check/edit before it's logged
4. **Graceful fallback** - Low confidence → "Add it manually" option
5. **Multiple items** - Toggle what to log when scanning a plate

---

## How to Get Around

| What | Main Way | Other Way |
|------|----------|-----------|
| Start Scan | Quick Add → Camera button | - |
| See Results | Camera → Take photo → Wait | - |
| Edit Item | Results → Tap item | - |
| Add Missing | Results → "Add manually" | AI shows "Not sure" → prompt |
| Log Everything | Results → "Log Meal" | - |
