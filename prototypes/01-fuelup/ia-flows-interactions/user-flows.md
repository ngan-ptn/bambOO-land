# User Flows: Multi-User Support

## Jobs-to-be-Done

| Job ID | Job Statement | Primary Objects | Key Actions |
|--------|---------------|-----------------|-------------|
| J1 | When I first use the app with my partner, I want to set up profiles, so that we can track separately | Profile, Household, Consent | create, grant |
| J2 | When we eat together, I want to log once for both of us, so that tracking is fast | Meal, SharedMeal | logForBoth |
| J3 | When I want to log my own meal, I want to switch to my profile quickly, so that data goes to the right place | Profile | switch |
| J4 | When we want to see our progress, I want to view household goals, so that we stay motivated together | HouseholdGoal | view |

---

## Complete User Flow Diagram

```mermaid
flowchart TB
    subgraph ENTRY["🚀 Entry Points"]
        E1[/"First launch"/]
        E2[/"Returning user"/]
    end
    
    subgraph J1["J1: Setup Household"]
        direction LR
        J1A["Create Profile A\n(name + avatar)"]
        J1B["Create Profile B\n(name + avatar)"]
        J1C{"Enable consent?"}
        J1D["Profile B grants\nconsent to A"]
        J1E["Setup complete"]
        
        J1A --> J1B --> J1C
        J1C -->|Yes| J1D --> J1E
        J1C -->|Later| J1E
    end
    
    subgraph HUB["📱 Main Hub"]
        H1["Dashboard\n(active profile)"]
        H2["Avatar in header\n(always visible)"]
    end
    
    subgraph J2["J2: Log Shared Meal ⭐"]
        direction LR
        J2A["Open meal entry"]
        J2B["Search/select food"]
        J2C["Set portion"]
        J2D{"Consent\nenabled?"}
        J2E["Show checkbox:\n'Also log for [Partner]'"]
        J2F{"User checks\nbox?"}
        J2G["Confirm modal"]
        J2H["Log to both profiles"]
        J2I["Log to own only"]
        J2J[/"Toast: success"/]
        
        J2A --> J2B --> J2C --> J2D
        J2D -->|No| J2I
        J2D -->|Yes| J2E --> J2F
        J2F -->|Yes| J2G --> J2H --> J2J
        J2F -->|No| J2I --> J2J
    end
    
    subgraph J3["J3: Switch Profile"]
        direction LR
        J3A["Tap avatar"]
        J3B["Profile selector\nappears"]
        J3C["Select profile"]
        J3D["Context switches"]
        
        J3A --> J3B --> J3C --> J3D
    end
    
    subgraph J4["J4: View Household Progress"]
        direction LR
        J4A["Tap 'Household'\ntab/button"]
        J4B["See aggregate\nprogress"]
        J4C["See goal status"]
        
        J4A --> J4B --> J4C
    end
    
    E1 --> J1
    J1 --> HUB
    E2 --> HUB
    
    HUB --> J2
    HUB --> J3
    HUB --> J4
    
    J2 --> HUB
    J3 --> HUB
    J4 --> HUB
    
    style J2 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style HUB fill:#e3f2fd,stroke:#2196F3,stroke-width:2px
```

---

## Individual Job Flows

### J1: Setup Household (First-Time)

```mermaid
flowchart LR
    A[/"App first launch"/] --> B["Welcome screen:\n'Track together?'"]
    B --> C{"Add partner?"}
    C -->|No| D["Single profile\n(existing flow)"]
    C -->|Yes| E["Create Profile 1:\nname + avatar"]
    E --> F["Create Profile 2:\nname + avatar"]
    F --> G["Consent screen:\n'Allow partner to log for you?'"]
    G --> H{"Profile 2\ngrants consent?"}
    H -->|Yes| I["Toggle ON\n(C1 satisfied)"]
    H -->|Skip| J["Toggle OFF\n(can enable later)"]
    I --> K["Setup complete"]
    J --> K
    K --> L[/"Go to Dashboard"/]
```

---

### J2: Log Shared Meal (Primary Flow) ⭐

```mermaid
flowchart TB
    A[/"User on Dashboard"/] --> B["Tap '+' to log meal"]
    B --> C["Search food"]
    C --> D["Select food item"]
    D --> E["Choose portion S/M/L"]
    E --> F{"Partner consent\nenabled?"}
    
    F -->|No| G["Log button only"]
    G --> H["Meal logged\nto own profile"]
    
    F -->|Yes| I["Checkbox appears:\n'☐ Also log for [Partner]'"]
    I --> J{"Checkbox\nchecked?"}
    
    J -->|No| G
    J -->|Yes| K["Confirmation modal:\n'Log to both [You] and [Partner]?'"]
    K --> L{"Confirm?"}
    
    L -->|Cancel| I
    L -->|Confirm| M["Create Meal in Profile A"]
    M --> N["Copy Meal to Profile B\n(with loggedBy = Profile A)"]
    N --> O["Create SharedMeal link"]
    O --> P[/"Toast: 'Logged for both ✓'"/]
    
    H --> Q[/"Toast: 'Logged ✓'"/]
    
    style K fill:#fff3e0,stroke:#FF9800,stroke-width:2px
    style I fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```

---

### J3: Switch Profile

```mermaid
flowchart LR
    A[/"Any screen"/] --> B["Avatar visible\nin header"]
    B --> C["Tap avatar"]
    C --> D["Dropdown shows:\n• Profile A (current)\n• Profile B"]
    D --> E["Tap Profile B"]
    E --> F["Active profile\nswitches"]
    F --> G["Dashboard refreshes\nwith Profile B data"]
    G --> H[/"Avatar updates\nto Profile B"/]
```

---

### J4: View Household Progress

```mermaid
flowchart LR
    A[/"Dashboard"/] --> B["Tab bar shows:\n[Individual] [Household]"]
    B --> C["Tap 'Household'"]
    C --> D["Household Dashboard:\n• Combined calories\n• Goal progress bar\n• NO individual breakdown"]
    D --> E{"Goal set?"}
    E -->|No| F["Prompt: 'Set household goal'"]
    E -->|Yes| G["Show progress:\n'18/20 servings this week'"]
```

---

## Job Summary

| Job | Steps | Decision Points | Screens Touched | Frequency |
|-----|-------|-----------------|-----------------|-----------|
| J1: Setup | 5 | 2 | 3 | Once |
| J2: Shared Meal | 7 | 2 | 2 + modal | Daily (high) |
| J3: Switch | 4 | 0 | 1 + dropdown | Daily (medium) |
| J4: Household | 3 | 1 | 1 | Weekly |

---

## Key Flow Patterns

1. **Consent-gated interaction** - J2 checkbox only appears if consent granted
2. **Always-visible profile** - Avatar in header prevents wrong-profile mistakes
3. **Confirm before share** - Modal protects against accidental partner logging
4. **Non-blocking setup** - Consent can be enabled later, doesn't block onboarding
5. **Aggregate-only household** - J4 shows totals, never individual breakdown (C2)
