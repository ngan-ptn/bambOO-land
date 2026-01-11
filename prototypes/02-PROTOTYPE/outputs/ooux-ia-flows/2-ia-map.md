# IA Map - Base (Calo Tracker)

## Current Information Architecture

```mermaid
flowchart TB
    subgraph ROOT["🏠 Calo Tracker"]
        direction TB

        subgraph AUTH["🔐 Sign In"]
            LOGIN["Sign In"]
            REGISTER["Create Account"]
            FORGOT["Forgot Password"]
            RESET["Reset Password"]
        end

        subgraph ONBOARDING["🎯 Getting Started"]
            OB_WELCOME["Welcome"]
            OB_NAME["Your Name"]
            OB_GOAL["Choose Goal"]
            OB_CALORIES["Set Daily Calories"]
        end

        subgraph MAIN["📱 Home"]
            DASHBOARD["Home"]

            subgraph QUICKADD["Quick Add Sections"]
                QA_DASHBOARD["Today's Progress"]
                QA_FAVORITES["My Favorites"]
                QA_TEMPLATES["Meal Combos"]
                QA_TIMELINE["Meal History"]
                QA_FOODS["Food List"]
                QA_SEARCH["Search Results"]
            end

            subgraph MODALS["Pop-ups"]
                PORTION["Choose Portion Size"]
                ACTION["Add Food Options"]
                TEMPLATE_EDIT["Edit Meal Combo"]
                TEMPLATE_CONFIRM["Confirm Meal Combo"]
                MANUAL_MODAL["Add Custom Food"]
            end
        end

        subgraph ADDFLOW["➕ Add Food"]
            MANUAL["Enter Food Manually"]
            SCAN_CAM["Scan Food"]
            SCAN_RESULTS["Scanned Food Details"]
        end

        subgraph PROFILE["👤 My Profile"]
            PROFILE_MAIN["Profile"]
            PROFILE_EDIT["Edit Profile"]
            PROFILE_GOALS["Edit Goals"]
            PROFILE_PWD["Change Password"]
        end
    end

    %% Auth Flow connections
    LOGIN --> REGISTER
    LOGIN --> FORGOT
    FORGOT --> RESET
    LOGIN -->|success| OB_WELCOME
    REGISTER -->|success| OB_WELCOME

    %% Onboarding Flow connections
    OB_WELCOME --> OB_NAME
    OB_NAME --> OB_GOAL
    OB_GOAL --> OB_CALORIES
    OB_CALORIES -->|complete| DASHBOARD

    %% Main App internal
    DASHBOARD --> QA_DASHBOARD
    DASHBOARD --> QA_FAVORITES
    DASHBOARD --> QA_TEMPLATES
    DASHBOARD --> QA_TIMELINE
    DASHBOARD --> QA_FOODS
    DASHBOARD --> QA_SEARCH

    %% Action triggers
    DASHBOARD -->|tap + button| ACTION
    ACTION -->|Search| QA_SEARCH
    ACTION -->|Manual| MANUAL
    ACTION -->|Scan| SCAN_CAM

    %% Food tile/favorite tap
    QA_FOODS -->|tap food| PORTION
    QA_FAVORITES -->|tap favorite| PORTION
    QA_SEARCH -->|tap result| PORTION

    %% Scan flow
    SCAN_CAM -->|capture| SCAN_RESULTS
    SCAN_RESULTS -->|confirm| DASHBOARD
    SCAN_RESULTS -->|change portion| PORTION

    %% Template flow
    QA_TEMPLATES -->|tap combo| TEMPLATE_CONFIRM
    QA_TEMPLATES -->|edit| TEMPLATE_EDIT

    %% Manual entry
    MANUAL -->|save| DASHBOARD

    %% Profile flow
    DASHBOARD -->|tap avatar| PROFILE_MAIN
    PROFILE_MAIN --> PROFILE_EDIT
    PROFILE_MAIN --> PROFILE_GOALS
    PROFILE_MAIN --> PROFILE_PWD
    PROFILE_MAIN -->|logout| LOGIN

    style DASHBOARD fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style LOGIN fill:#fff3e0,stroke:#FF9800,stroke-width:2px
    style PROFILE_MAIN fill:#e3f2fd,stroke:#2196F3,stroke-width:2px
```

---

## Route Structure

| Route | Screen Name | Protection | Purpose |
|-------|-------------|------------|---------|
| `/` | Redirect | - | Redirects to Sign In |
| `/login` | Sign In | Public (logged out only) | User authentication |
| `/register` | Create Account | Public (logged out only) | New user registration |
| `/forgot-password` | Forgot Password | Public | Password recovery |
| `/reset-password` | Reset Password | Public | Set new password |
| `/onboarding/welcome` | Welcome | Logged in only | Onboarding start |
| `/onboarding/name` | Your Name | Logged in only | Set display name |
| `/onboarding/goal` | Choose Goal | Logged in only | Select health goal |
| `/onboarding/calories` | Set Daily Calories | Logged in only | Set daily calories |
| `/dashboard` | Home | Logged in only | **Main app screen** |
| `/profile` | Profile | Logged in only | User profile |
| `/profile/edit` | Edit Profile | Logged in only | Edit name/avatar |
| `/profile/edit-goals` | Edit Goals | Logged in only | Edit nutrition goals |
| `/profile/change-password` | Change Password | Logged in only | Change password |

---

## Object Location Mapping

| Object | Primary Location | Secondary Location(s) | Access From |
|--------|------------------|----------------------|-------------|
| **User** | Profile | Home (header) | Profile button, Sign In |
| **Food Log** | Home (Meal History) | - | Timeline cards, Today's Progress |
| **System Food** | Home (Food List, Search) | Scanned Food Details | Tiles, Search, Scan |
| **Custom Food** | Home (Search) | - | Search results |
| **Favorite** | Home (My Favorites) | - | Favorites section |
| **Meal Combo** | Home (Meal Combos) | - | Templates section |
| **Daily Summary** | Home (Today's Progress) | - | Progress ring, Macro bars |

---

## Navigation Paths

### Primary Paths

| Task | Primary Path | Alternative Path(s) |
|------|--------------|---------------------|
| Log Food (from list) | Home → Tap food → Choose portion → Confirm | Home → + button → Scan → Review → Confirm |
| Log Food (manual) | Home → + button → Enter manually → Save | Search → No results → Add custom food |
| View Progress | Home (visible immediately) | - |
| View Meal History | Home → Scroll to Meal History | - |
| Use Favorite | Home → My Favorites → Tap food → Choose portion | - |
| Use Meal Combo | Home → Meal Combos → Tap combo → Confirm | - |
| Search Food | Home → Search bar → Type → Tap result | - |
| Edit Profile | Home → Avatar → Profile → Edit Profile | - |
| Edit Goals | Home → Avatar → Profile → Edit Goals | - |

### Authentication Paths

| Action | Path |
|--------|------|
| Sign In | Sign In → Enter email & password → Home |
| Create Account | Sign In → Create Account link → Create Account → Welcome |
| Forgot Password | Sign In → Forgot link → Forgot Password → Enter email → Reset Password |
| Sign Out | Profile → Sign Out → Sign In |

---

## Screen Sections

### Home Screen Sections

```
┌─────────────────────────────────────┐
│ Header: Greeting + Profile Picture  │
├─────────────────────────────────────┤
│ Today's Progress: Ring + Macro Bars │
├─────────────────────────────────────┤
│ Quick Add Title + Search Bar        │
├─────────────────────────────────────┤
│ My Favorites (horizontal scroll)    │
├─────────────────────────────────────┤
│ Meal Combos                         │
├─────────────────────────────────────┤
│ Meal History (tabs: Today / Week)   │
├─────────────────────────────────────┤
│ Food List (recent items)            │
├─────────────────────────────────────┤
│ [+ Add Food button]                 │
└─────────────────────────────────────┘
```

### Pop-ups & Sheets

| Name | Type | Trigger |
|------|------|---------|
| Add Food Options | Bottom sheet | Tap + button |
| Choose Portion Size | Bottom sheet | Tap any food |
| Confirm Meal Combo | Bottom sheet | Tap meal combo |
| Edit Meal Combo | Bottom sheet | Edit meal combo |
| Add Custom Food | Pop-up | From Add Options or no search results |
| Confirm Sign Out | Pop-up | Tap Sign Out button |
| Notification | Toast | After logging food |
