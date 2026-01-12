# OOUX Dot Map: Social Challenges & Leaderboards

## 1.1 Identify Objects

Extract objects (nouns) from hypotheses and assumptions:

| Type | Object | Description |
|------|--------|-------------|
| **Primary** | Challenge | Core activity users compete in socially |
| **Primary** | Leaderboard | Rankings and progress comparison |
| **Primary** | Social Profile | User's social identity and connections |
| **Secondary** | Achievement | Milestones, streaks, and social recognition |
| **Secondary** | Social Group | Friend networks and challenge communities |
| **Derived** | Progress | User's current standing and advancement |

## 1.2 Map Attributes per Object

### Challenge
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| name | string | Required |
| description | string | Required |
| type | enum | Required |
| start_date | date | Required |
| end_date | date | Required |
| participant_count | number | Derived |
| creator_id | string | Required |

### Leaderboard
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| challenge_id | string | Required |
| user_id | string | Required |
| rank | number | Derived |
| score | number | Derived |
| progress_percentage | number | Derived |
| last_updated | timestamp | Required |

### Social Profile
| Attribute | Type | Status |
|-----------|------|--------|
| user_id | string | Required |
| display_name | string | Required |
| avatar_url | string | Optional |
| friend_count | number | Derived |
| total_challenges | number | Derived |
| achievements_count | number | Derived |

### Achievement
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| user_id | string | Required |
| type | enum | Required |
| earned_date | date | Required |
| challenge_id | string | Optional |
| points | number | Required |

### Social Group
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| name | string | Required |
| member_ids | array | Required |
| challenge_ids | array | Optional |
| created_by | string | Required |

## 1.3 Define Actions per Object

| Object | User Actions (Verbs) |
|--------|---------------------|
| Challenge | create, browse, join, leave, complete, share |
| Leaderboard | view, filter, compare, track progress |
| Social Profile | view, edit, connect, follow, unfollow |
| Achievement | earn, view, share, collect |
| Social Group | create, join, invite, manage members |

## 1.4 Draw Relationships

```
Challenge --< has-many >-- Leaderboard
Challenge --< has-many >-- Social Group (participants)
Social Profile --< has-many >-- Achievement
Social Profile --< belongs-to-many >-- Social Group
Leaderboard --< belongs-to >-- Social Profile
Leaderboard --< belongs-to >-- Challenge
Achievement -.-> derives >-- Leaderboard (affects score)
```

## 1.5 Generate Mermaid Diagram

```mermaid
flowchart TB
    subgraph Primary["Primary Objects"]
        CH((Challenge))
        LB((Leaderboard))
        SP((Social Profile))
    end

    subgraph Secondary["Secondary Objects"]
        AC((Achievement))
        SG((Social Group))
    end

    CH -->|has-many| LB
    CH -->|has-many| SG
    SP -->|has-many| AC
    SP -->|belongs-to-many| SG
    LB -->|belongs-to| SP
    LB -->|belongs-to| CH
    AC -.->|affects| LB

    style CH stroke-width:3px
    style LB stroke-width:3px
    style SP stroke-width:3px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR06-social-challenges/7-ooux-dot-map.md