# OOUX Dot Map: Multi-User Support Mode

## 1.1 Identify Objects

Extract objects (nouns) from hypotheses and assumptions:

| Type | Object | Description |
|------|--------|-------------|
| **Primary** | Family Account | Shared subscription container for multiple users |
| **Primary** | Individual Profile | Personal user identity with private data |
| **Primary** | Household Dashboard | Shared view of family nutrition activity |
| **Secondary** | Profile Switcher | Interface for changing between family members |
| **Secondary** | Shared Subscription | Financial benefits of account sharing |
| **Derived** | Family Activity Feed | Aggregated nutrition data across household |

## 1.2 Map Attributes per Object

### Family Account
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| subscription_id | string | Required |
| account_owner_id | string | Required |
| member_limit | number | Required |
| created_date | date | Required |
| billing_cycle | enum | Required |

### Individual Profile
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| family_account_id | string | Required |
| display_name | string | Required |
| avatar_url | string | Optional |
| role | enum | Required |
| personal_goals | object | Optional |
| privacy_settings | object | Required |

### Household Dashboard
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| family_account_id | string | Required |
| activity_summary | object | Derived |
| shared_goals | array | Optional |
| member_highlights | array | Derived |

### Profile Switcher
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| family_account_id | string | Required |
| available_profiles | array | Required |
| last_active_profile | string | Derived |
| quick_switch_enabled | boolean | Required |

### Shared Subscription
| Attribute | Type | Status |
|-----------|------|--------|
| id | string | Required |
| plan_type | enum | Required |
| member_count | number | Derived |
| cost_per_member | number | Derived |
| renewal_date | date | Required |
| features_unlocked | array | Required |

## 1.3 Define Actions per Object

| Object | User Actions (Verbs) |
|--------|---------------------|
| Family Account | create, manage, upgrade, cancel |
| Individual Profile | create, switch, edit, customize |
| Household Dashboard | view, navigate, share |
| Profile Switcher | access, select, remember |
| Shared Subscription | view benefits, manage members, pay |

## 1.4 Draw Relationships

```
Family Account --< contains >-- Individual Profile
Family Account --< has >-- Household Dashboard
Family Account --< owns >-- Shared Subscription
Individual Profile --< uses >-- Profile Switcher
Household Dashboard -.-> aggregates >-- Individual Profile (activity)
```

## 1.5 Generate Mermaid Diagram

```mermaid
flowchart TB
    subgraph Primary["Primary Objects"]
        FA((Family Account))
        IP((Individual Profile))
        HD((Household Dashboard))
    end

    subgraph Secondary["Secondary Objects"]
        PS((Profile Switcher))
        SS((Shared Subscription))
    end

    FA -->|contains| IP
    FA -->|has| HD
    FA -->|owns| SS
    IP -->|uses| PS
    HD -.->|aggregates| IP

    style FA stroke-width:3px
    style IP stroke-width:3px
    style HD stroke-width:3px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR05-multi-user-support/7-ooux-dot-map.md