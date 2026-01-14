# User Flows - CR05 Multi-User Support

## Jobs-to-be-Done Summary

| Job ID | Job Statement | Objects | Location | Key Actions |
|--------|---------------|---------|----------|-------------|
| **J1** | When I want to track meals for both of us, I want to add my partner, So that we can share meal logging | Profile, Partner Link, Consent | Add Partner | create profile, grant consent |
| **J2** | When we eat together, I want to log for both of us at once, So that we save time | Food Log, Shared Meal | Home → Choose Portion | toggle "Log for Both", confirm |
| **J3** | When I want to see my partner's progress, I want to switch profiles, So that I can help them stay on track | Profile | Profile Switcher | tap partner, view dashboard |
| **J4** | When my partner logs something wrong for me, I want to manage my consent, So that I control my own data | Consent | Settings (future) | revoke consent |

---

## Complete Flow Diagram

```mermaid
flowchart TB
    subgraph ENTRY["Entry Points"]
        E1[/"Open App"/]
        E2[/"Notification"/]
    end

    subgraph HOME["Home"]
        DASH["Home Dashboard"]
        SWITCHER["Profile Switcher"]
        PORTION["Choose Portion"]
    end

    subgraph J1["J1: Add Partner"]
        direction LR
        J1A["Tap avatar"]
        J1B["Tap 'Add Partner'"]
        J1C["Enter partner name"]
        J1D["Set partner goal"]
        J1E["Confirm"]
        J1F["Partner added"]
    end

    subgraph J2["J2: Log for Both"]
        direction LR
        J2A["Select food"]
        J2B["Choose your portion"]
        J2C["Toggle 'Log for Both'"]
        J2D["Choose partner portion"]
        J2E["Confirm"]
        J2F["Both logged"]
    end

    subgraph J3["J3: Switch Profile"]
        direction LR
        J3A["Tap avatar"]
        J3B["Tap partner name"]
        J3C["Dashboard updates"]
    end

    E1 --> DASH
    E2 --> DASH

    DASH --> SWITCHER --> J1
    DASH --> PORTION --> J2
    SWITCHER --> J3

    J1 --> DASH
    J2 --> DASH
    J3 --> DASH

    style J2 fill:#d4edda,stroke:#28a745,stroke-width:3px
    style PORTION fill:#fff3e0,stroke:#ffc107,stroke-width:2px
```

---

## Individual Job Flows

### J1: Add Partner (First-Time Setup)

**Job Statement:** When I want to track meals for both of us, I want to add my partner, So that we can share meal logging.

**Frequency:** Once per household

```mermaid
flowchart TB
    A[/"Home"/]
    B["Tap avatar in header"]
    C["Profile Switcher opens"]
    D["Tap 'Add Partner'"]
    E["Add Partner page opens"]
    F["Enter partner's name"]
    G["Choose partner's avatar"]
    H["Set partner's daily calorie goal"]
    I{"Enable 'Log for Both'?"}
    J["Consent toggle ON"]
    K["Consent toggle OFF"]
    L["Tap 'Add Partner' button"]
    M["Partner profile created"]
    N["Partner appears in Switcher"]
    O["Notification: 'Partner added'"]
    P[/"Back to Home"/]

    A --> B --> C --> D --> E --> F --> G --> H --> I
    I -->|"Yes"| J --> L
    I -->|"Not now"| K --> L
    L --> M --> N --> O --> P

    style E fill:#d4edda,stroke:#28a745
    style J fill:#e8f5e9,stroke:#4CAF50
    style M fill:#e8f5e9,stroke:#4CAF50
```

**Steps:** 9 | **Decisions:** 1 (consent) | **Time:** ~30 seconds

**Success Criteria:**
- Partner appears in Profile Switcher
- "Log for Both" toggle available in Choose Portion (if consent enabled)

---

### J2: Log for Both (Primary CR05 Flow)

**Job Statement:** When we eat together, I want to log for both of us at once, So that we save time.

**Frequency:** Very High (60-70% of meals are shared)

```mermaid
flowchart TB
    A[/"Home"/]
    B["Tap food item"]
    C["Choose Portion opens"]
    D["Select your portion (S/M/L)"]
    E{"Partner exists & consent enabled?"}
    F["'Log for Both' toggle visible"]
    G["Toggle 'Also log for [Partner]'"]
    H["Partner portion selector appears"]
    I["Select partner's portion (S/M/L)"]
    J["Tap Confirm"]
    K["Food log created for self"]
    L["Food log created for partner"]
    M["Shared Meal link created"]
    N["Notification: 'Added for you + [Partner]'"]
    O["Progress ring updates"]
    P[/"Back to Home"/]
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

**Success Criteria:**
- Both food logs created
- Shared Meal record links them
- Toast shows both names
- Both progress rings update

---

### J3: Switch Profile (View Partner's Dashboard)

**Job Statement:** When I want to see my partner's progress, I want to switch profiles, So that I can help them stay on track.

**Frequency:** Medium (a few times per day)

```mermaid
flowchart TB
    A[/"Home (viewing as self)"/]
    B["Tap avatar in header"]
    C["Profile Switcher dropdown opens"]
    D["See self (active indicator)"]
    E["See partner option"]
    F["Tap partner's name/avatar"]
    G["Dashboard reloads"]
    H["Header shows: 'Viewing as [Partner]'"]
    I["Progress ring shows partner's data"]
    J["Favorites shows partner's favorites"]
    K["Meal History shows partner's logs"]
    L[/"Home (viewing as partner)"/]

    A --> B --> C --> D
    C --> E --> F --> G --> H --> I --> J --> K --> L

    style C fill:#fff3e0,stroke:#ffc107
    style H fill:#d4edda,stroke:#28a745
    style L fill:#e3f2fd,stroke:#2196F3
```

**Steps:** 4 | **Decisions:** 0 | **Time:** ~2 seconds

**Success Criteria:**
- Header clearly shows active profile
- All data reflects partner's profile
- Can log for partner while in their view

---

### J4: Manage Consent (Revoke Permission)

**Job Statement:** When my partner logs something wrong for me, I want to manage my consent, So that I control my own data.

**Frequency:** Rare (edge case)

```mermaid
flowchart TB
    A[/"Home (partner wants to revoke)"/]
    B["Tap avatar"]
    C["Go to Settings"]
    D["Find 'Partner Logging' section"]
    E["See consent status: ON"]
    F["Tap to toggle OFF"]
    G{"Confirm revoke?"}
    H["Consent revoked"]
    I["'Log for Both' no longer available"]
    J["Notification: 'Partner logging disabled'"]
    K[/"Back to Home"/]
    L["Keep consent ON"]

    A --> B --> C --> D --> E --> F --> G
    G -->|"Yes"| H --> I --> J --> K
    G -->|"Cancel"| L --> K

    style G fill:#ffebee,stroke:#f44336
    style H fill:#fff3e0,stroke:#ffc107
```

**Steps:** 6 | **Decisions:** 1 (confirm revoke) | **Time:** ~10 seconds

**Note:** This flow is for future implementation. MVP assumes consent stays enabled once granted.

---

## Flow Interactions

### How CR05 Flows Connect to Existing Flows

```mermaid
flowchart LR
    subgraph EXISTING["Existing Flows"]
        EX1["J1: Quick Log"]
        EX2["J2: Favorite Log"]
        EX3["J5: Manual Entry"]
        EX4["J6: Scan Food"]
    end

    subgraph CR05["CR05 Flows"]
        CR1["Add Partner"]
        CR2["Log for Both"]
        CR3["Switch Profile"]
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

## Job Summary

| Job | Entry Point | Steps | Decisions | Exit Point | Frequency |
|-----|-------------|-------|-----------|------------|-----------|
| J1: Add Partner | Profile Switcher | 9 | 1 | Home | Once |
| J2: Log for Both | Choose Portion | 7 | 2 | Home | Very High |
| J3: Switch Profile | Profile Switcher | 4 | 0 | Home | Medium |
| J4: Manage Consent | Settings | 6 | 1 | Home | Rare |

---

## Edge Cases & Error Handling

| Scenario | Handling |
|----------|----------|
| Partner not added yet | "Log for Both" toggle not shown |
| Consent not enabled | "Log for Both" toggle not shown |
| Partner profile still loading | Toggle disabled until loaded |
| Partner log fails | Show "Added for you (partner failed)" |
| User tries to delete shared meal | Only deletes their log, partner's remains |
| Undo after "Log for Both" | Only undoes user's log |

---

## Success Metrics (From Hypothesis)

| Metric | Target | How Measured |
|--------|--------|--------------|
| Shared meal logging time | ≤30 seconds | Timer from tap to confirm |
| Meal logging increase | +40% | Compare pre/post CR05 logs |
| Active profile clarity | 9/10 users correct | User testing |
