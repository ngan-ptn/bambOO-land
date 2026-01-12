# Design-Lite Workflow: Social Challenges & Leaderboards

## Step 5: USER-FLOWS
*Combined: IA map + Mermaid flows + Screen list*

### Information Architecture (IA) Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALOR TRACKER - SOCIAL MVP                    │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   HOME          │    │   CHALLENGES    │    │  LEADERBOARDS   │ │
│  │  ├─ Dashboard  │    │  ├─ Browse      │    │  ├─ Global       │ │
│  │  ├─ Activity   │    │  ├─ My Active   │    │  ├─ Friends      │ │
│  │  │  Feed        │    │  ├─ Social      │    │  ├─ Categories   │ │
│  │  └─ Social      │    │  ├─ Completed   │    │  └─ History      │ │
│  │     Feed        │    │  └─ Create New  │    │                  │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   SOCIAL        │    │   PROFILE       │    │   SETTINGS      │ │
│  │  ├─ Friends     │    │  ├─ Stats       │    │  ├─ Privacy      │ │
│  │  ├─ Find        │    │  ├─ Achievements│    │  ├─ Notifications │ │
│  │  ├─ Requests    │    │  ├─ Social      │    │  ├─ Social       │ │
│  │  └─ Activity    │    │  └─ Settings    │    │  └─ Preferences  │ │
│  │                  │    │                  │    │                  │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Navigation Patterns:
• Bottom Tab Bar: Home | Challenges | Leaderboards | Social | Profile
• Social overlays on existing screens (friend indicators, social context)
• Deep linking support for challenge invites and social shares
```

### Key User Flows (Mermaid Diagrams)

#### Flow 1: Discover & Join Social Challenge
```mermaid
flowchart TD
    A[User on Challenges Tab] --> B[Browse Challenge Cards]
    B --> C[View Challenge Details]
    C --> D{See Social Context?}

    D -->|Yes| E[View Friend Participants]
    D -->|No| F[View Public Leaderboard]

    E --> G[See Friend Rankings]
    F --> G

    G --> H{Interested in Joining?}
    H -->|Yes| I[Tap Join Button]
    H -->|No| J[Browse Other Challenges]

    I --> K[Confirm Participation]
    K --> L[Challenge Added to My Active]
    L --> M[Social Feed Updates]
    M --> N[Friends Notified of Join]

    J --> B
```

#### Flow 2: Social Progress Tracking & Encouragement
```mermaid
flowchart TD
    A[User Completes Activity] --> B[Progress Updates]
    B --> C[Personal Stats Update]
    C --> D[Social Rankings Recalculate]

    D --> E{User Moved in Rankings?}
    E -->|Up| F[Show Positive Feedback]
    E -->|Down| G[Show Encouragement]

    F --> H[Social Feed Post Option]
    G --> H

    H --> I{Share Achievement?}
    I -->|Yes| J[Compose Social Post]
    I -->|No| K[Continue to Dashboard]

    J --> L[Select Recipients]
    L --> M[Post to Feed]
    M --> N[Friends Receive Notification]

    K --> O[View Updated Leaderboard]
    N --> O

    O --> P{Friends Respond?}
    P -->|Yes| Q[Receive Cheers/Messages]
    P -->|No| R[Normal Dashboard View]

    Q --> S[Respond to Encouragement]
    S --> R
```

#### Flow 3: Friend Discovery & Connection
```mermaid
flowchart TD
    A[User in Social Tab] --> B[View Friends List]
    B --> C{Find New Friends?}

    C -->|Yes| D[Tap Find Friends]
    C -->|No| E[View Friend Activity]

    D --> F[Choose Discovery Method]
    F --> G[Search by Username]
    F --> H[Import Contacts]
    F --> I[View Suggestions]

    G --> J[Search Results]
    H --> K[Contact Match Results]
    I --> L[Suggested Friends]

    J --> M{Find Desired Friend?}
    K --> M
    L --> M

    M -->|Yes| N[Send Friend Request]
    M -->|No| O[Try Different Method]

    N --> P[Request Sent]
    P --> Q{Recipient Responds?}

    Q -->|Accepts| R[Become Friends]
    Q -->|Declines| S[Show Decline Message]

    R --> T[Unlock Social Features]
    T --> U[Shared Challenges Available]

    O --> F
    S --> D
```

#### Flow 4: Leaderboard Competition & Motivation
```mermaid
flowchart TD
    A[User on Leaderboards Tab] --> B[Choose Leaderboard Type]
    B --> C[Global Rankings]
    B --> D[Friends Only]
    B --> E[Category Specific]

    C --> F[View Top Performers]
    D --> F
    E --> F

    F --> G[See Personal Position]
    G --> H{User in Top 10?}

    H -->|Yes| I[Show Celebration]
    H -->|No| J[Show Progress to Next Rank]

    I --> K[Share Achievement]
    J --> L[View Improvement Tips]

    K --> M[Post to Social Feed]
    L --> N[See Detailed Breakdown]

    M --> O[Friends Engage]
    N --> P[Set Personal Goal]

    O --> Q[Increased Motivation]
    P --> Q

    Q --> R[Complete More Activities]
    R --> S[Rankings Update]
    S --> F
```

### Comprehensive Screen List

#### Core Social Screens (New)
1. **Social Hub** - Main social dashboard with friend activity feed
2. **Find Friends** - Friend discovery and connection interface
3. **Friend Requests** - Incoming/outgoing friend request management
4. **Friend Profile** - Individual friend profile with shared challenges
5. **Social Settings** - Privacy controls and social preferences

#### Enhanced Challenge Screens (Modified)
6. **Challenge Browser** - Updated with social context and friend participation
7. **Challenge Details** - Enhanced with social leaderboard and friend list
8. **Active Challenges** - Personal challenge dashboard with social progress
9. **Challenge Creation** - Social challenge creation with friend invitation
10. **Challenge Completion** - Celebration screen with social sharing options

#### Leaderboard Screens (New)
11. **Leaderboard Hub** - Main leaderboard navigation and filtering
12. **Global Leaderboard** - Public rankings across all challenges
13. **Friends Leaderboard** - Private rankings among connected friends
14. **Category Leaderboards** - Challenge-specific rankings (Steps, Cardio, etc.)
15. **Personal Ranking** - Detailed view of user's position and progress

#### Social Overlay Components (Reusable)
16. **Social Context Card** - Shows friend participation in challenges
17. **Friend Activity Feed** - Scrollable list of friend achievements
18. **Quick Encouragement** - Modal for sending cheers and messages
19. **Social Share Sheet** - Native sharing for achievements and challenges
20. **Friend Selector** - Multi-select interface for sharing and invitations

#### Enhanced Existing Screens
21. **Home Dashboard** - Added social feed integration and friend highlights
22. **Profile Screen** - Social stats, friend count, and social achievements
23. **Settings > Social** - Granular privacy controls for social features
24. **Notifications** - Social notification preferences and history

#### Edge Case & Empty State Screens
25. **No Friends Connected** - Onboarding screen for social features
26. **Empty Leaderboard** - State when insufficient participants
27. **Social Feature Disabled** - Privacy-focused user experience
28. **Challenge Invite** - Deep-linked invitation acceptance flow

**Total Screens:** 28 (8 new core, 8 enhanced, 12 components/edge cases)

**Navigation Patterns:**
- Tab-based main navigation (5 tabs)
- Stack navigation within tabs
- Modal overlays for social interactions
- Deep linking for external invitations
- Bottom sheet for quick actions

**Responsive Considerations:**
- Mobile-first design with tablet optimizations
- Progressive enhancement for larger screens
- Touch-friendly social interactions
- Swipe gestures for leaderboard browsing</content>
<parameter name="filePath">.claude/outputs/design-lite-workflow/social-challenges-user-flows.md