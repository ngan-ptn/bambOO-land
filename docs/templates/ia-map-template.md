# IA Map - [Prototype Name] with [Feature Name] Support

## Updated Information Architecture with [Feature Name]

```mermaid
flowchart TB
    subgraph ROOT["🏠 [App Name] - [Feature Name]"]
        direction TB

        %% AUTHENTICATION (Unchanged)
        subgraph AUTH["🔐 Authentication"]
            LOGIN["Sign In"]
            REGISTER["Create Account"]
            FORGOT["Forgot Password"]
            RESET["Reset Password"]
        end

        %% ONBOARDING (Unchanged)
        subgraph ONBOARDING["🎯 Getting Started"]
            WELCOME["Welcome"]
            NAME["Your Name"]
            GOAL["Choose Goal"]
            CALORIES["Set Daily Calories"]
        end

        %% MAIN APP (Modify as needed)
        subgraph MAIN["📱 Home (Add feature-specific notes)"]
            DASHBOARD["✏️ Home Dashboard"]

            %% HEADER - Add new elements here
            subgraph HEADER["Header"]
                AVATAR["User Avatar"]
                %% 🆕 ADD: New header elements below
                NEW_HEADER["🆕 [New Header Element]"]
            end

            %% SECTIONS - Modify for feature-specific sections
            subgraph SECTIONS["Quick Add"]
                TODAY["Today Progress"]
                FAVORITES["My Favorites"]
                TEMPLATES["Meal Combos"]
                HISTORY["Meal History"]
                FOODS["Food List"]
                SEARCH["Search Results"]
                %% 🆕 ADD: New sections below
                NEW_SECTION["🆕 [New Section]"]
            end

            %% MODALS - Add new modals here
            subgraph MODALS["Pop-ups"]
                PORTION["✏️ Choose Portion Size"]
                ACTION["Add Food Options"]
                CONFIRM["Confirm Combo"]
                %% 🆕 ADD: New modals below
                NEW_MODAL["🆕 [New Modal]"]
            end
        end

        %% 🆕 NEW: Add new top-level sections here
        subgraph FEATURE["🆕 [Feature Name] Section"]
            NEW_PAGE["🆕 [New Page]"]
            EDIT_PAGE["🆕 [Edit Page]"]
        end

        %% ADD FLOW (Modify as needed)
        subgraph ADDFLOW["➕ Add Food"]
            MANUAL["Enter Manually"]
            SCAN["Scan Food"]
            RESULTS["Scan Results"]
        end

        %% PROFILE (Modify as needed)
        subgraph PROFILE["👤 Profile"]
            PROFILE_PAGE["Profile Page"]
            EDIT_PROFILE["Edit Profile"]
            EDIT_GOALS["Edit Goals"]
            CHANGE_PWD["Change Password"]
        end
    end

    %% Auth Flow (Unchanged)
    LOGIN --> REGISTER
    LOGIN --> FORGOT --> RESET
    LOGIN -->|success| WELCOME
    REGISTER -->|success| WELCOME

    %% Onboarding (Unchanged)
    WELCOME --> NAME --> GOAL --> CALORIES -->|complete| DASHBOARD

    %% Header Navigation
    DASHBOARD --> HEADER
    %% 🆕 ADD: Header connections below
    NEW_HEADER -->|action| DASHBOARD

    %% Dashboard to Sections
    DASHBOARD --> SECTIONS

    %% 🆕 ADD: New section connections below
    NEW_SECTION -->|action| DASHBOARD

    %% Add Food Flow (Modify as needed)
    DASHBOARD -->|tap +| ACTION
    ACTION -->|Search| SEARCH
    ACTION -->|Manual| MANUAL
    ACTION -->|Scan| SCAN --> RESULTS -->|confirm| DASHBOARD

    %% Food Selection (Modify as needed)
    FOODS -->|tap| PORTION
    FAVORITES -->|tap| PORTION
    SEARCH -->|tap| PORTION
    RESULTS -->|change| PORTION

    %% Portion Options (Modify as needed)
    PORTION -->|Log| DASHBOARD
    %% 🆕 ADD: New portion options below
    PORTION -->|🆕 New Option| DASHBOARD

    %% Combo (Unchanged)
    TEMPLATES -->|tap| CONFIRM --> DASHBOARD

    %% Profile Flow (Modify as needed)
    DASHBOARD -->|avatar| PROFILE_PAGE --> EDIT_PROFILE
    PROFILE_PAGE --> EDIT_GOALS
    PROFILE_PAGE --> CHANGE_PWD
    PROFILE_PAGE -->|logout| LOGIN
    %% 🆕 ADD: Profile connections below
    PROFILE_PAGE -->|Manage Feature| NEW_PAGE

    %% 🆕 ADD: Feature page connections below
    NEW_PAGE -->|action| DASHBOARD
    NEW_PAGE -->|edit| EDIT_PAGE -->|save| DASHBOARD

    %% STYLING GUIDE
    %% Use these colors consistently:
    %% - Unchanged: No style (default)
    %% - Modified (✏️): fill:#fff3cd,stroke:#ffc107,stroke-width:2px (Yellow/Orange)
    %% - New (🆕): fill:#d4edda,stroke:#28a745,stroke-width:3px (Green)

    %% Styling examples
    style DASHBOARD fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    style NEW_HEADER fill:#d4edda,stroke:#28a745,stroke-width:3px
    style NEW_SECTION fill:#d4edda,stroke:#28a745,stroke-width:3px
    style NEW_MODAL fill:#d4edda,stroke:#28a745,stroke-width:3px
    style NEW_PAGE fill:#d4edda,stroke:#28a745,stroke-width:3px
    style EDIT_PAGE fill:#d4edda,stroke:#28a745,stroke-width:3px
```

---

## Summary of Changes

### 🆕 NEW Elements

| Component | Location | Purpose |
|-----------|----------|---------|
| **[New Element 1]** | [Location] | [Purpose] |
| **[New Element 2]** | [Location] | [Purpose] |
| **[New Element 3]** | [Location] | [Purpose] |

### ✏️ MODIFIED Elements

| Component | Change | Impact |
|-----------|--------|--------|
| **[Modified Element 1]** | [Description of change] | [Impact] |
| **[Modified Element 2]** | [Description of change] | [Impact] |
| **[Modified Element 3]** | [Description of change] | [Impact] |

### Navigation Changes

| Navigation | Before | After |
|------------|--------|-------|
| [Navigation Path 1] | [Previous flow] | [New flow] |
| [Navigation Path 2] | [Previous flow] | [New flow] |
| [Navigation Path 3] | [Previous flow] | [New flow] |

### Data Model Additions

```
[New Object 1]:
├── [field 1]
├── [field 2]
└── [field 3]

[New Object 2]:
└── [field 1]

[Existing Object] (ENHANCED):
└── [new relationship/field]
```

---

## Route Structure Updates

| Route | Screen Name | Protection | Change | Purpose |
|-------|-------------|------------|--------|---------|
| `/[route]` | [Screen] | [Protection level] | 🆕 NEW | [Purpose] |
| `/[route]` | [Screen] | [Protection level] | ✏️ MODIFIED | [Purpose] |
| `/[route]` | [Screen] | [Protection level] | Unchanged | [Purpose] |

---

## Object Location Mapping Updates

| Object | Primary Location | Secondary Location(s) | Change | Access From |
|--------|------------------|----------------------|--------|-------------|
| **[Object 1]** | [Location] | [Secondary location] | 🆕 NEW | [Access path] |
| **[Object 2]** | [Location] | [Secondary location] | ✏️ MODIFIED | [Access path] |
| **[Object 3]** | [Location] | [Secondary location] | Unchanged | [Access path] |

---

## Screen Sections Updates

### [Screen Name] Sections

```
┌─────────────────────────────────────────────┐
│ [Header Section]                          │  ← [Change type]
├─────────────────────────────────────────────┤
│ [Content Section 1]                      │  ← [Change type]
├─────────────────────────────────────────────┤
│ [Content Section 2]                      │  ← [Change type]
├─────────────────────────────────────────────┤
│ [Action Section]                          │  ← [Change type]
└─────────────────────────────────────────────┘
```

### Pop-ups & Sheets (Enhanced)

| Name | Type | Trigger | Change | Purpose |
|------|------|---------|--------|---------|
| [Modal Name] | [Type] | [Trigger] | 🆕 NEW | [Purpose] |
| [Modal Name] | [Type] | [Trigger] | ✏️ ENHANCED | [Purpose] |
| [Modal Name] | [Type] | [Trigger] | Unchanged | [Purpose] |

---

## Key Features Delivered

1. **[Feature 1]** - [Description]
2. **[Feature 2]** - [Description]
3. **[Feature 3]** - [Description]
4. **[Feature 4]** - [Description]
5. **[Feature 5]** - [Description]

---

## Implementation Notes

- **[Note 1]:** [Implementation detail]
- **[Note 2]:** [Implementation detail]
- **[Note 3]:** [Implementation detail]
- **[Note 4]:** [Implementation detail]
- **[Note 5]:** [Implementation detail]

---

## Template Usage Instructions

1. **Copy this file** to your feature's outputs directory
2. **Replace placeholders** with actual feature names
3. **Add new elements** where marked with `🆕 ADD:`
4. **Modify existing elements** where marked with `✏️`
5. **Update connections** between nodes in the diagram
6. **Apply styling** using the color guide:
   - **Unchanged**: No style (default gray)
   - **Modified**: Yellow/Orange (`fill:#fff3cd,stroke:#ffc107`)
   - **New**: Green (`fill:#d4edda,stroke:#28a745`)
7. **Fill in summary tables** with actual changes
8. **Remove this instruction section** before finalizing

## Styling Color Reference

| Type | CSS Color | Hex Code | Visual |
|------|-----------|-----------|--------|
| **New (🆕)** | Light Green | `#d4edda` | 🟢 |
| **Modified (✏️)** | Light Yellow/Orange | `#fff3cd` | 🟡 |
| **Unchanged** | Default Gray | (default) | ⚪ |
| **Blue (Info)** | Light Blue | `#d1ecf1` | 🔵 |

Apply using: `style [NODE_NAME] fill:[COLOR],stroke:[STROKE],stroke-width:[WIDTH]`
