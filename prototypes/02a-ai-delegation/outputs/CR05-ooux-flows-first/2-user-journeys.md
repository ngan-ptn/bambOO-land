# User Journeys - CR05 Multi-User Support

## User Goals Summary

| Goal ID | Goal Statement | Things Involved | Key Actions |
|---------|----------------|-----------------|-------------|
| **G1** | When I want to track meals for both of us, I want to add my partner, so that we can share meal logging | Profile, Partner Link, Consent | create, grant |
| **G2** | When we eat together, I want to log for both of us at once, so that we save time | Food Log, Shared Meal | log for both, confirm |
| **G3** | When I want to see my partner's progress, I want to switch profiles, so that I can help them stay on track | Profile | switch, view |
| **G4** | When my partner logs something wrong for me, I want to take back my consent, so that I control my own data | Consent | take back |

---

## Individual Journey Diagrams

### G1: Add Partner (First-Time Setup)

**Goal:** When I want to track meals for both of us, I want to add my partner, so that we can share meal logging.

**How often:** Once per household

```mermaid
flowchart TB
    A[/"Start: Home"/]
    B["Tap your avatar"]
    C["Dropdown opens"]
    D["Tap 'Add Partner'"]
    E["Add Partner page opens"]
    F["Enter partner's name"]
    G["Choose partner's avatar"]
    H["Set partner's calorie goal"]
    I{"Enable 'Log for Both'?"}
    J["Toggle ON"]
    K["Toggle OFF"]
    L["Tap 'Add Partner' button"]
    M["Partner profile created"]
    N["Partner appears in dropdown"]
    O["Notification: 'Partner added'"]
    P[/"Done: Back to Home"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I
    I -->|"Yes"| J --> L
    I -->|"Not now"| K --> L
    L --> M --> N --> O --> P

    style E fill:#d4edda,stroke:#28a745
    style J fill:#e8f5e9,stroke:#4CAF50
    style M fill:#e8f5e9,stroke:#4CAF50
```

**Steps:** 9 | **Decisions:** 1 (consent) | **Time:** ~30 seconds

**Success looks like:**
- Partner appears in profile dropdown
- "Log for Both" toggle is available (if consent enabled)

---

### G2: Log for Both (Primary CR05 Journey)

**Goal:** When we eat together, I want to log for both of us at once, so that we save time.

**How often:** Very High (60-70% of meals are shared)

```mermaid
flowchart TB
    A[/"Start: Home"/]
    B["Tap a food item"]
    C["Choose Portion opens"]
    D["Select your portion (S/M/L)"]
    E{"Partner exists & consent enabled?"}
    F["'Log for Both' toggle visible"]
    G["Toggle 'Also log for [Partner]'"]
    H["Partner portion selector appears"]
    I["Select partner's portion (S/M/L)"]
    J["Tap Confirm"]
    K["Food log created for you"]
    L["Food log created for partner"]
    M["Shared Meal link created"]
    N["Notification: 'Added for you + [Partner]'"]
    O["Progress ring updates"]
    P[/"Done: Back to Home"/]
    Q["No toggle shown"]
    R["Tap Confirm (self only)"]
    S["Notification: 'Added [food]'"]

    A --> B --> C --> D --> E
    E -->|"Yes"| F --> G --> H --> I --> J
    E -->|"No"| Q --> R --> K --> S --> O --> P
    J --> K --> L --> M --> N --> O --> P

    style C fill:#fff3e0,stroke:#ffc107
    style G fill:#d4edda,stroke:#28a745,stroke-width:2px
    style H fill:#d4edda,stroke:#28a745
    style N fill:#e8f5e9,stroke:#4CAF50
```

**Steps:** 7 (with partner) / 5 (without) | **Decisions:** 2 (your portion, partner portion) | **Time:** <30 seconds

**Success looks like:**
- Both food logs created
- Shared Meal record links them
- Notification shows both names
- Both progress rings update

---

### G3: Switch Profile (View Partner's Progress)

**Goal:** When I want to see my partner's progress, I want to switch profiles, so that I can help them stay on track.

**How often:** Medium (a few times per day)

```mermaid
flowchart TB
    A[/"Start: Home (viewing as yourself)"/]
    B["Tap your avatar"]
    C["Dropdown opens"]
    D["See yourself (active indicator)"]
    E["See partner option"]
    F["Tap partner's name/avatar"]
    G["Home reloads"]
    H["Header shows: 'Viewing as [Partner]'"]
    I["Progress ring shows partner's data"]
    J["Favorites shows partner's favorites"]
    K["Meal History shows partner's logs"]
    L[/"Done: Home (viewing as partner)"/]

    A --> B --> C --> D
    C --> E --> F --> G --> H --> I --> J --> K --> L

    style C fill:#fff3e0,stroke:#ffc107
    style H fill:#d4edda,stroke:#28a745
    style L fill:#e3f2fd,stroke:#2196F3
```

**Steps:** 4 | **Decisions:** 0 | **Time:** ~2 seconds

**Success looks like:**
- Header clearly shows active profile
- All data shows partner's info
- Can log for partner while in their view

---

### G4: Take Back Consent (Revoke Permission)

**Goal:** When my partner logs something wrong for me, I want to take back my consent, so that I control my own data.

**How often:** Rare (edge case)

```mermaid
flowchart TB
    A[/"Start: Home (partner wants to revoke)"/]
    B["Tap avatar"]
    C["Go to Settings"]
    D["Find 'Partner Logging' section"]
    E["See consent status: ON"]
    F["Tap to toggle OFF"]
    G{"Confirm revoke?"}
    H["Consent revoked"]
    I["'Log for Both' no longer available"]
    J["Notification: 'Partner logging disabled'"]
    K[/"Done: Back to Home"/]
    L["Keep consent ON"]

    A --> B --> C --> D --> E --> F --> G
    G -->|"Yes"| H --> I --> J --> K
    G -->|"Cancel"| L --> K

    style G fill:#ffebee,stroke:#f44336
    style H fill:#fff3e0,stroke:#ffc107
```

**Steps:** 6 | **Decisions:** 1 (confirm revoke) | **Time:** ~10 seconds

**Note:** This journey is for future implementation. MVP assumes consent stays enabled once granted.

---

## Complete Journey Map

Shows all goals and how they connect:

```mermaid
flowchart TB
    subgraph ENTRY["Entry Points"]
        E1[/"Open app"/]
        E2[/"Notification"/]
    end

    subgraph HOME["Home"]
        DASH["Home"]
        SWITCHER["Profile Dropdown"]
        PORTION["Choose Portion"]
    end

    subgraph G1["G1: Add Partner"]
        direction LR
        G1A["Tap avatar"]
        G1B["Tap 'Add Partner'"]
        G1C["Enter name"]
        G1D["Set goal"]
        G1E["Confirm"]
        G1F["Partner added"]
    end

    subgraph G2["G2: Log for Both"]
        direction LR
        G2A["Select food"]
        G2B["Your portion"]
        G2C["Toggle 'Log for Both'"]
        G2D["Partner portion"]
        G2E["Confirm"]
        G2F["Both logged"]
    end

    subgraph G3["G3: Switch Profile"]
        direction LR
        G3A["Tap avatar"]
        G3B["Tap partner"]
        G3C["Home updates"]
    end

    E1 --> DASH
    E2 --> DASH

    DASH --> SWITCHER --> G1
    DASH --> PORTION --> G2
    SWITCHER --> G3

    G1 --> DASH
    G2 --> DASH
    G3 --> DASH

    style G2 fill:#d4edda,stroke:#28a745,stroke-width:3px
    style PORTION fill:#fff3e0,stroke:#ffc107,stroke-width:2px
```

---

## Journey Summary

| Goal | Entry Point | Steps | Decisions | Exit Point | How Often |
|------|-------------|-------|-----------|------------|-----------|
| G1: Add Partner | Profile Dropdown | 9 | 1 | Home | Once |
| G2: Log for Both | Choose Portion | 7 | 2 | Home | Very High |
| G3: Switch Profile | Profile Dropdown | 4 | 0 | Home | Medium |
| G4: Take Back Consent | Settings | 6 | 1 | Home | Rare |

---

## How CR05 Journeys Connect to Existing Journeys

```mermaid
flowchart LR
    subgraph EXISTING["Existing Journeys"]
        EX1["Quick Log"]
        EX2["Favorite Log"]
        EX3["Manual Entry"]
        EX4["Scan Food"]
    end

    subgraph CR05["CR05 Journeys"]
        CR1["G1: Add Partner"]
        CR2["G2: Log for Both"]
        CR3["G3: Switch Profile"]
    end

    subgraph SHARED["Shared Component"]
        PORTION["Choose Portion"]
    end

    EX1 --> PORTION
    EX2 --> PORTION
    EX3 --> PORTION
    EX4 --> PORTION

    PORTION --> CR2

    CR1 -.->|"enables"| CR2
    CR3 -.->|"affects view of"| EX1
    CR3 -.->|"affects view of"| EX2

    style PORTION fill:#fff3e0,stroke:#ffc107,stroke-width:2px
    style CR2 fill:#d4edda,stroke:#28a745,stroke-width:2px
```

---

## Edge Cases & Error Handling

| Scenario | How to Handle |
|----------|---------------|
| Partner not added yet | "Log for Both" toggle not shown |
| Consent not enabled | "Log for Both" toggle not shown |
| Partner profile still loading | Toggle disabled until loaded |
| Partner log fails | Show "Added for you (partner failed)" |
| User deletes shared meal | Only deletes their log, partner's stays |
| Undo after "Log for Both" | Only undoes user's log |

---

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Shared meal logging time | ≤30 seconds | Timer from tap to confirm |
| Meal logging increase | +40% | Compare pre/post CR05 logs |
| Active profile clarity | 9/10 users correct | User testing |
