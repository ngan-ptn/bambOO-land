# Dev Journal: 02c-Prototype-Gated

---

## 2025-01-11

### What I Worked On
- Set up docs folder structure for 02c-prototype-gated
- Created overview.md based on gated approach
- Documented 11-step full OOUX process with mandatory gates
- Identified mandatory vs optional gates criteria
- Cloned from 02-PROTOTYPE base implementation
- Created gate tracking metrics template
- Created gate decision template for ADR documentation

### Thinking / Debates
**Gate Frequency:** How many gates are optimal? 02a (AI delegation) had 0 gates (just acceptance criteria). 02b (prototype-lite) has 0 gates. 02c (gated) has 5-9 mandatory gates depending on feature complexity.

**Trade-off Analysis:**
- More gates = more rework prevented but also more delays waiting for review
- Fewer gates = faster velocity but higher risk of major pivots
- **Question:** Is there a "sweet spot" - maybe 3-5 gates for medium features?

**Gate Value Measurement:** How do we objectively measure if a gate was "worth it"?
- If gate catches major bug → worth it
- If gate is ceremonial (approves obvious work) → waste
- **Challenge:** Can't know until we're in gate - hard to design criteria that filter ceremonial gates

**Optional Gates:** Should we ever have optional gates? They create decision overhead without clear "must-pass" requirement. Maybe all gates should be mandatory with clear criteria, and if criteria are weak, skip the gate entirely (not make it optional with weak criteria).

### Decisions Made Today
- Decision: All 6 upstream gates (Framing → Ideation → Selection → Dot Map → IA Map → User Flows) are mandatory
  - Confidence level: High - prevents going in wrong direction
- Decision: Wireframes + Visual Design + Implementation are separate mandatory gates
  - Confidence level: High - prevents building wrong thing
  - Note: Implementation is always mandatory (can't skip "does code match spec?")
- Decision: Tests gate is mandatory for all features
  - Confidence level: Medium - could be skipped for trivial prototype features
- Decision: Dot Map, IA Map, User Flows, Screen List are conditionally mandatory
  - Confidence level: High - only optional if data model/IA is simple/unchanged

### Open Bets
- Gated approach will produce highest quality but slowest velocity
- Gate friction (waiting for reviewer) may be significant bottleneck
- Gate reviewers will complain about ceremonial gates unless criteria are strong
- Gates after implementation (testing, integration) are most valuable; early gates (framing, ideation) feel most bureaucratic

### Questions / Uncertainties
- Who acts as gate reviewer? For comparison experiment, do we need 1 reviewer reviewing all 4 variants? That's a lot of overhead.
- If gates are self-review (developer reviews their own work), do they have discipline to be rigorous?
- What happens if gate reviewer is unavailable for hours? Implementation blocked?
- How to handle "gate failed" - return to previous step or fix in place and continue?

### Tomorrow
- Define specific feature to implement for comparison across all 4 variants
- Determine gate reviewer strategy (self-review vs external reviewer vs no reviewer for comparison)
- Begin 11-step gated workflow for chosen feature
- Track time spent at each gate to validate overhead

---

## Template for Future Entries

### What I Worked On
Concrete actions taken.

### Thinking / Debates
Reasoning, internal conflict, alternative paths considered.

### Decisions Made Today
- Decision:
- Confidence level: High / Medium / Low

### Open Bets
Things intentionally left unresolved.

### Questions / Uncertainties
What still feels unclear.

### Tomorrow
Planned next steps.
