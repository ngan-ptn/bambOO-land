# Screen List: Social Challenges & Leaderboards

## 4.1 Identify Screens from Flow Moments

| Flow Moment | Job | IA Location | Type | Screen Needed? | Rationale |
|-------------|-----|-------------|------|----------------|-----------|
| Browse challenges | J1 | /challenges | View | Yes | Core discovery experience |
| Select challenge | J1 | /challenges/[id] | View | Yes | Challenge details and social context |
| Check friend participation | J1 | /challenges/[id] | Decision | Yes | Social participant information |
| Join challenge | J1 | /challenges/[id] | Input | Yes | Participation confirmation |
| Invite friends | J1 | /challenges/[id] | Input | Yes | Friend selection interface |
| View rankings | J2 | /leaderboards | View | Yes | Rankings display |
| Filter by friends | J2 | /leaderboards | Input | Yes | Filter controls |
| Compare progress | J2 | /leaderboards/[user] | View | Yes | Personal vs others comparison |
| Earn achievement | J3 | Achievement notification | Feedback | Yes | Achievement celebration |
| Share to feed | J3 | /social/share | Input | Yes | Sharing interface |
| Receive cheers | J3 | /social | Feedback | Yes | Social interaction notifications |
| Find friends | J4 | /social/find | Input | Yes | Friend discovery |
| Send requests | J4 | /social/find | Input | Yes | Request sending |
| Accept requests | J4 | /social/requests | Decision | Yes | Request management |
| Create groups | J4 | /social/groups | Input | Yes | Group creation |

Types: Decision, Input, View, Capture, Feedback

## 4.2 Consolidate Screen List

### Challenges Section
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S01 | Challenge List | /challenges | J1 | Browse and discover challenges |
| S02 | Challenge Detail | /challenges/[id] | J1 | View challenge info and participants |
| S03 | Join Challenge | /challenges/[id]/join | J1 | Confirm participation |
| S04 | Invite Friends | /challenges/[id]/invite | J1 | Select friends to invite |

### Leaderboards Section
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S05 | Leaderboard Hub | /leaderboards | J2 | Choose leaderboard type |
| S06 | Global Rankings | /leaderboards/global | J2 | View overall rankings |
| S07 | Friends Rankings | /leaderboards/friends | J2 | View friend-only rankings |
| S08 | Category Rankings | /leaderboards/category/[id] | J2 | View category-specific rankings |
| S09 | Personal Progress | /leaderboards/profile | J2 | Detailed personal comparison |

### Social Section
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S10 | Social Feed | /social | J3, J4 | View friend activity and achievements |
| S11 | Find Friends | /social/find | J4 | Discover and connect with friends |
| S12 | Friend Requests | /social/requests | J4 | Manage incoming/outgoing requests |
| S13 | Social Profile | /social/profile | J3, J4 | View personal social stats |
| S14 | Achievement Gallery | /social/profile/achievements | J3 | View earned achievements |
| S15 | Create Group | /social/groups/create | J4 | Form new social groups |
| S16 | Group Detail | /social/groups/[id] | J4 | Manage group membership |
| S17 | Share Achievement | /social/share | J3 | Compose and post achievements |

### Enhanced Existing Screens
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S18 | Home Dashboard | /home | All | Social feed integration |
| S19 | Profile Settings | /profile | J3, J4 | Social preferences |

## 4.3 Map Screens to Jobs and IA

| Screen | IA Location | Jobs Supported |
|--------|-------------|----------------|
| S01-S04 | /challenges | J1 (Join Social Challenges) |
| S05-S09 | /leaderboards | J2 (Check Leaderboards) |
| S10, S13, S14, S17 | /social | J3 (Share Achievements) |
| S10-S16 | /social | J4 (Build Social Connections) |
| S18 | /home | J1, J2, J3, J4 (Cross-feature integration) |

## 4.4 Create Screen Flow Diagram

```mermaid
flowchart TB
    subgraph CHALLENGES["Challenges Section"]
        S01["S01: Challenge List"]
        S02["S02: Challenge Detail"]
        S03["S03: Join Challenge"]
        S04["S04: Invite Friends"]
    end

    subgraph LEADERBOARDS["Leaderboards Section"]
        S05["S05: Leaderboard Hub"]
        S06["S06: Global Rankings"]
        S07["S07: Friends Rankings"]
        S08["S08: Category Rankings"]
        S09["S09: Personal Progress"]
    end

    subgraph SOCIAL["Social Section"]
        S10["S10: Social Feed"]
        S11["S11: Find Friends"]
        S12["S12: Friend Requests"]
        S13["S13: Social Profile"]
        S14["S14: Achievement Gallery"]
        S15["S15: Create Group"]
        S16["S16: Group Detail"]
        S17["S17: Share Achievement"]
    end

    subgraph HOME["Home & Profile"]
        S18["S18: Home Dashboard"]
        S19["S19: Profile Settings"]
    end

    S01 --> S02 --> S03 --> S04
    S04 -.-> S01

    S05 --> S06
    S05 --> S07
    S05 --> S08
    S06 --> S09
    S07 --> S09
    S08 --> S09

    S10 --> S13 --> S14
    S10 --> S11 --> S12
    S10 --> S15 --> S16
    S13 --> S17

    S18 <--> S10
    S18 <--> S01
    S18 <--> S05

    S19 -.-> S11
    S19 -.-> S17

    style S01 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S10 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S05 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR06-social-challenges/7-screen-list.md