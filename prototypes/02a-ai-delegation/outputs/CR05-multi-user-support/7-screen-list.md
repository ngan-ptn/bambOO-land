# Screen List: Multi-User Support Mode

## 4.1 Identify Screens from Flow Moments

| Flow Moment | Job | IA Location | Type | Screen Needed? | Rationale |
|-------------|-----|-------------|------|----------------|-----------|
| View plan options | J1 | /signup/plans | Decision | Yes | Subscription plan selection |
| Select family plan | J1 | /signup/plans | Input | Yes | Family plan configuration |
| Create account owner profile | J1 | /profiles/create/owner | Input | Yes | Initial account setup |
| Set up first family member | J1 | /profiles/create/member | Input | Yes | First member profile creation |
| Add family member | J1 | /profiles/add | Input | Yes | Additional member addition |
| Send invitation | J1 | /profiles/invite | Input | Yes | Member invitation interface |
| Enter profile selection | J1 | /profiles | View | Yes | Main profile selection screen |
| Tap profile switcher | J2 | Global overlay | Input | Yes | Profile switching interface |
| View profile grid | J2 | /profiles/switcher | View | Yes | Available profiles display |
| Select target profile | J2 | /profiles/switcher | Input | Yes | Profile selection action |
| Load profile data | J2 | /home | Feedback | Yes | Profile loading state |
| Update dashboard | J2 | /home | View | Yes | Profile-specific dashboard |
| View family dashboard | J3 | /household | View | Yes | Household overview |
| See activity summary | J3 | /household | View | Yes | Family activity aggregation |
| Browse member highlights | J3 | /household | View | Yes | Individual member summaries |
| Switch to individual view | J3 | /profiles/[id] | Navigation | Yes | Profile transition |
| Navigate to privacy | J4 | /settings/privacy | View | Yes | Privacy settings access |
| View current settings | J4 | /settings/privacy | View | Yes | Current privacy configuration |
| Adjust data sharing | J4 | /settings/privacy | Input | Yes | Privacy control adjustments |

Types: Decision, Input, View, Capture, Feedback

## 4.2 Consolidate Screen List

### Profile Management Screens (New)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S01 | Profile Selection | /profiles | J1, J2 | Netflix-style profile cards for app entry |
| S02 | Profile Switcher | /profiles/switcher | J2 | Global overlay for profile switching |
| S03 | Create Profile | /profiles/create | J1 | New family member profile creation |
| S04 | Edit Profile | /profiles/edit | J4 | Profile customization and settings |
| S05 | Profile Invitations | /profiles/invite | J1 | Send and manage member invitations |

### Household Coordination Screens (New)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S06 | Household Dashboard | /household | J3 | Family activity overview and coordination |
| S07 | Family Activity | /household/activity | J3 | Shared nutrition activity feed |
| S08 | Member Highlights | /household/highlights | J3 | Individual family member summaries |

### Enhanced Existing Screens (Modified)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S09 | Home Dashboard | /home | J2 | Profile-specific personal dashboard |
| S10 | Settings Subscription | /settings/subscription | J1 | Family billing and member management |
| S11 | Settings Privacy | /settings/privacy | J4 | Profile privacy and data sharing controls |

### Onboarding & Setup Screens (New)
| ID | Screen | IA Location | Derived from Job(s) | Primary Purpose |
|----|--------|-------------|---------------------|-----------------|
| S12 | Plan Selection | /signup/plans | J1 | Choose individual vs family subscription |
| S13 | Family Setup | /signup/family | J1 | Initial family account configuration |
| S14 | Upgrade to Family | /settings/upgrade | J1 | Existing user family account conversion |

## 4.3 Map Screens to Jobs and IA

| Screen | IA Location | Jobs Supported |
|--------|-------------|----------------|
| S01, S12, S13, S14 | /profiles, /signup | J1 (Setup Family Account) |
| S01, S02, S09 | /profiles, /home | J2 (Switch Profiles Easily) |
| S06, S07, S08 | /household | J3 (Coordinate Household) |
| S04, S10, S11 | /settings | J4 (Maintain Privacy) |

## 4.4 Create Screen Flow Diagram

```mermaid
flowchart TB
    subgraph SIGNUP["Signup & Setup"]
        S12["S12: Plan Selection"]
        S13["S13: Family Setup"]
        S14["S14: Upgrade to Family"]
    end

    subgraph PROFILES["Profile Management"]
        S01["S01: Profile Selection"]
        S02["S02: Profile Switcher"]
        S03["S03: Create Profile"]
        S04["S04: Edit Profile"]
        S05["S05: Profile Invitations"]
    end

    subgraph HOUSEHOLD["Household Coordination"]
        S06["S06: Household Dashboard"]
        S07["S07: Family Activity"]
        S08["S08: Member Highlights"]
    end

    subgraph PERSONAL["Personal & Settings"]
        S09["S09: Home Dashboard"]
        S10["S10: Settings Subscription"]
        S11["S11: Settings Privacy"]
    end

    S12 --> S13 --> S01
    S14 --> S03 --> S01

    S01 --> S02 --> S09
    S02 --> S06

    S06 --> S07
    S06 --> S08
    S08 --> S04

    S09 --> S04
    S09 --> S11
    S09 --> S10

    S04 --> S05

    style S01 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S02 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
    style S06 fill:#e8f5e9,stroke:#4CAF50,stroke-width:2px
```</content>
<parameter name="filePath">prototypes/02a-ai-delegation/outputs/CR05-multi-user-support/7-screen-list.md