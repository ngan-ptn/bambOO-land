# User Flows: Social Challenges & Leaderboards

## 3.1 Derive Jobs-to-be-Done

From objects, actions, and IA, derive jobs:

| Job ID | Job Statement | Primary Objects | IA Location | Key Actions |
|--------|---------------|-----------------|-------------|-------------|
| J1 | When I feel unmotivated alone, I want to join social challenges with friends, So that I stay accountable and engaged | Challenge, Social Group | /challenges, /social | browse, join, invite friends |
| J2 | When I want to see how I'm doing, I want to check leaderboards and compare progress, So that I feel competitive motivation | Leaderboard, Social Profile | /leaderboards | view rankings, filter, compare |
| J3 | When I accomplish something, I want to share achievements and get recognition, So that I feel valued by my social circle | Achievement, Social Profile | /social | earn, share, receive cheers |
| J4 | When I want to build fitness community, I want to connect with friends and form groups, So that I have ongoing social support | Social Profile, Social Group | /social | find friends, connect, create groups |

## 3.2 Create Complete Flow Diagram

Show all jobs navigating through IA:

```mermaid
flowchart TB
    subgraph ENTRY["🚀 Entry Points"]
        E1[/"App launch"/]
        E2[/"Social notification"/]
        E3[/"Challenge reminder"/]
        E4[/"Friend activity"/]
    end

    subgraph IA["📱 IA Structure"]
        HOME["Home"]
        CHALLENGES["Challenges"]
        LEADERBOARDS["Leaderboards"]
        SOCIAL["Social"]
    end

    subgraph J1["J1: Join Social Challenges ⭐"]
        direction LR
        J1A["Browse challenges"]
        J1B["View participants"]
        J1C["Join challenge"]
        J1D["Invite friends"]
        J1E["Start tracking"]

        J1A --> J1B --> J1C --> J1D --> J1E
    end

    subgraph J2["J2: Check Leaderboards"]
        direction LR
        J2A["View rankings"]
        J2B["Filter by friends"]
        J2C["Compare progress"]
        J2D["Set goals"]

        J2A --> J2B --> J2C --> J2D
    end

    subgraph J3["J3: Share Achievements"]
        direction LR
        J3A["Earn achievement"]
        J3B["Share to feed"]
        J3C["Receive cheers"]
        J3D["Respond to friends"]

        J3A --> J3B --> J3C --> J3D
    end

    subgraph J4["J4: Build Social Connections"]
        direction LR
        J4A["Find friends"]
        J4B["Send requests"]
        J4C["Accept connections"]
        J4D["Create groups"]

        J4A --> J4B --> J4C --> J4D
    end

    E1 --> HOME
    E2 --> SOCIAL
    E3 --> CHALLENGES
    E4 --> SOCIAL

    HOME --> CHALLENGES
    HOME --> LEADERBOARDS
    HOME --> SOCIAL

    CHALLENGES --> J1
    LEADERBOARDS --> J2
    SOCIAL --> J3
    SOCIAL --> J4

    J1 --> HOME
    J2 --> HOME
    J3 --> HOME
    J4 --> HOME

    style J1 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```

## 3.3 Create Individual Job Flows

### J1: Join Social Challenges (Primary Job)

```mermaid
flowchart TB
    A[/"Entry: Challenges tab"/]
    B["Browse challenge list"]
    C["Select challenge"]
    D["View challenge details"]
    E["Check friend participation"]
    F{"Friends joined?"}
    G["Join challenge alone"]
    H["Invite friends to join"]
    I["Confirm participation"]
    J[/"Outcome: Active in challenge"/]

    A --> B --> C --> D --> E --> F
    F -->|Yes| H --> I --> J
    F -->|No| G --> I

    style A fill:#e8f5e9
    style J fill:#e8f5e9
```

### J2: Check Leaderboards

```mermaid
flowchart TB
    A[/"Entry: Leaderboards tab"/]
    B["Choose leaderboard type"]
    C["View current rankings"]
    D["See personal position"]
    E{"Want to filter?"}
    F["Filter by friends"]
    G["Compare with friends"]
    H["View detailed progress"]
    I[/"Outcome: Motivated to improve"/]

    A --> B --> C --> D --> E
    E -->|Yes| F --> G --> H --> I
    E -->|No| H --> I

    style A fill:#e8f5e9
    style I fill:#e8f5e9
```

### J3: Share Achievements

```mermaid
flowchart TB
    A[/"Entry: Achievement earned"/]
    B["View achievement details"]
    C{"Share publicly?"}
    D["Select sharing options"]
    E["Share to social feed"]
    F["Friends see achievement"]
    G["Receive cheers/messages"]
    H["Respond to friends"]
    I[/"Outcome: Social recognition"/]

    A --> B --> C
    C -->|Yes| D --> E --> F --> G --> H --> I
    C -->|No| I

    style A fill:#e8f5e9
    style I fill:#e8f5e9
```

### J4: Build Social Connections

```mermaid
flowchart TB
    A[/"Entry: Social tab"/]
    B["Choose connection method"]
    C["Search by username"]
    D["Import contacts"]
    E["View suggestions"]
    F["Select potential friends"]
    G["Send friend requests"]
    H["Wait for responses"]
    I["Accept incoming requests"]
    J["Create or join groups"]
    K[/"Outcome: Social network built"/]

    A --> B
    B --> C
    B --> D
    B --> E
    C --> F
    D --> F
    E --> F --> G --> H --> I --> J --> K

    style A fill:#e8f5e9
    style K fill:#e8f5e9
```

## 3.4 Job Summary

| Job | IA Entry Point | Steps | Decision Points | Exit Point |
|-----|----------------|-------|-----------------|------------|
| J1: Join Social Challenges | Challenges tab | 5 | 1 | Home |
| J2: Check Leaderboards | Leaderboards tab | 4 | 1 | Home |
| J3: Share Achievements | Achievement notification | 4 | 1 | Home |
| J4: Build Social Connections | Social tab | 6 | 0 | Home |</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR06-social-challenges/7-user-flows.md