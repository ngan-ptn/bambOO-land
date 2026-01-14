# Pull Request Workflow Guide

## Overview

Step-by-step guide for creating reviewable pull requests with documentation previews. Optimized for Change Request (CR) workflow where changes span code, documentation, and visual artifacts.

**Prerequisites:**
- Feature branch with committed changes
- CR spec file completed (proposed → approved → implemented)
- Visual artifacts updated (IA map, user flows, wireframes if applicable)

---

## Creating a PR (Web UI)

### Step 1: Push branch to remote

```bash
# From your feature branch (e.g., CR06-gary)
git push -u origin CR06-gary
```

**What this does:**
- Creates remote branch on GitHub
- Sets upstream tracking (`-u` flag)
- Enables PR creation via web UI

---

### Step 2: Create PR via GitHub web UI

**Option A: Quick create (after push)**
1. Navigate to: `https://github.com/tini-works/coredesign`
2. GitHub shows banner: **"CR06-gary had recent pushes"**
3. Click **"Compare & pull request"** button

**Option B: Manual create**
1. Navigate to repository
2. Click **"Pull requests"** tab
3. Click **"New pull request"** button
4. Set **base:** `main`, **compare:** `CR06-gary`
5. Click **"Create pull request"**

---

### Step 3: Fill PR description

Use the PR template (`.claude/templates/pr-template.md`) to structure your description:

**Title format:** `[CR##-##] Brief description of change`

**Example title:** `[CR06-01] Reorder Action Sheet buttons (Manual → Search → Scan → Favorites)`

**Description template:**

```markdown
## Change Request
- CR ID: CR06-01
- Status: Implemented
- Parent: Entry Method Priority (CR#6)

## Summary
Reorder Action Sheet buttons to prioritize Manual Entry as primary food entry method. Addresses stakeholder feedback about AI Scan wrong detections.

## Changes
- Reordered ActionSheet.tsx button JSX (Manual/Search/Scan/Favorites)
- Updated IA.md documentation (button order comment)
- Added backlinks to CR02-02, CR03-02, CR04-01

## Review Focus
- [ ] Button order matches CR06-01 spec (Manual first)
- [ ] Navigation to each entry method works
- [ ] Tab order accessibility (Manual focused first)
- [ ] IA map updated correctly

## Artifacts to Review
- CR Spec: [CR06-01](calo-tracker/docs/change-requests/06-entry-method-priority/CR06-01-action-sheet-reorder/CR06-01-action-sheet-reorder.md)
- IA Map: [IA.md](calo-tracker/docs/artifacts/ia-map/IA.md)
- Code: [ActionSheet.tsx](calo-tracker/src/components/Dashboard/ActionSheet.tsx)

## Testing
- Manual testing: Button order verified visually
- Keyboard accessibility: Tab order tested (Manual → Search → Scan → Cancel)
- Playwright: All navigation paths tested
- Edge cases: See CR06-01 EC checklist (4/8 tested)
```

---

### Step 4: Review PR files changed

**Navigate to "Files changed" tab:**
- Review each file diff
- **Green lines** = additions
- **Red lines** = deletions
- Toggle **split view** vs **unified view** (gear icon)

**Add inline comments:**
1. Click line number in diff
2. Click **"+"** icon that appears
3. Write comment
4. Click **"Add single comment"** (immediate) or **"Start a review"** (batch comments)

**Review checklist:**
- [ ] Code changes match CR spec
- [ ] Documentation updated (IA map, CR file)
- [ ] No unintended changes (check diff carefully)
- [ ] Commit messages clear and descriptive

---

## Preview Documentation in PR

### Option A: GitHub's built-in markdown rendering

**How:**
- Click file in "Files changed" tab (e.g., `CR06-01-action-sheet-reorder.md`)
- Click **"View file"** button (top right of diff)
- GitHub renders markdown automatically

**Pros:**
- No setup required
- Fast preview

**Cons:**
- D2 diagrams not rendered (shows raw D2 syntax)
- Relative links may break
- Limited to single file view

**Best for:** Quick CR spec review, checking markdown formatting

---

### Option B: Raw file view from branch

**How:**
1. Navigate to file in branch view
2. URL format: `https://github.com/tini-works/coredesign/blob/CR06-gary/<file-path>`
3. Example: `https://github.com/tini-works/coredesign/blob/CR06-gary/calo-tracker/docs/change-requests/06-entry-method-priority/CR06-01-action-sheet-reorder/CR06-01-action-sheet-reorder.md`

**Pros:**
- Full markdown rendering with proper relative links
- Navigate between related files (IA map, user flows)
- Best GitHub native experience

**Cons:**
- D2 diagrams still not rendered
- Requires manual URL construction

**Best for:** Reviewing full CR spec with cross-references, exploring documentation hierarchy

**Pro tip:** Include these direct links in PR description under "Artifacts to Review"

---

### Option C: Local preview (best for complex artifacts)

**How:**
```bash
# Checkout PR branch locally
git fetch origin
git checkout CR06-gary

# Serve docs directory
cd calo-tracker/docs
python3 -m http.server 8000

# Open in browser
# http://localhost:8000/change-requests/06-entry-method-priority/CR06-01-action-sheet-reorder/CR06-01-action-sheet-reorder.md
```

**Pros:**
- Full control over rendering
- Can add D2 diagram rendering (if tooling exists)
- Test relative link navigation locally

**Cons:**
- Requires local checkout
- Markdown rendering depends on browser (may not render at all)
- More setup overhead

**Best for:** D2 userflow diagrams, testing local doc site builds, offline review

---

## Preview Links Strategy for CEO Demo

**Recommended approach:**
1. **Use Option B (raw branch view)** for CR spec previews
   - Best rendering quality
   - Proper relative links
   - No local setup

2. **Include direct preview links in PR description:**
   ```markdown
   ## Artifacts to Review
   - CR Spec: [CR06-01](https://github.com/tini-works/coredesign/blob/CR06-gary/calo-tracker/docs/change-requests/06-entry-method-priority/CR06-01-action-sheet-reorder/CR06-01-action-sheet-reorder.md)
   - IA Map: [IA.md](https://github.com/tini-works/coredesign/blob/CR06-gary/calo-tracker/docs/artifacts/ia-map/IA.md)
   - Wireframes: [WIRE251217](https://github.com/tini-works/coredesign/blob/CR06-gary/calo-tracker/docs/artifacts/wireframes/WIRE251217-cr03-02-scan-results.md)
   ```

3. **Use local preview for D2 userflows** if needed during review

---

### Step 5: Request review

**Add reviewers:**
1. Click **gear icon** next to "Reviewers" (right sidebar)
2. Select team members or yourself
3. Reviewers receive notification

**Add labels (optional):**
- `CR06` - Change Request number
- `enhancement` - Feature addition
- `documentation` - Doc changes included
- `bug` - Bug fix

**Assign to project board (optional):**
- Link to project milestone
- Track PR status in Kanban board

---

### Step 6: Merge after approval

**When ready to merge:**
1. Ensure all CI checks pass (if configured)
2. Resolve any merge conflicts
3. Click **"Merge pull request"**

**Merge options:**

| Option | When to use | Commit history |
|--------|-------------|----------------|
| **Create merge commit** | CR workflow (RECOMMENDED) | Preserves all individual commits (approve, sync, implement, fix) |
| **Squash and merge** | Cleanup messy commits | Combines all commits into one |
| **Rebase and merge** | Linear history desired | Rebases commits on top of base branch |

**For CR workflow:** Use **"Create merge commit"** to preserve commit granularity:
- Approval commit
- Backlink sync commit
- Implementation commit
- Bug fix commit

This maintains traceability and allows reverting specific changes.

---

### Step 7: Delete branch after merge

**Automatic prompt:**
- GitHub shows: **"Pull request successfully merged and closed"**
- Click **"Delete branch"** (deletes remote branch only)

**Local cleanup:**
```bash
# Switch to main
git checkout main

# Pull merged changes
git pull

# Delete local feature branch
git branch -d CR06-gary

# Verify branch deleted
git branch --list
```

---

## Best Practices

### Commit Strategy
- **Separate commits by concern:** approve, sync, implement, fix
- **Clear commit messages:** `feat: add Anti-Goals to CR template` not `update files`
- **Atomic commits:** Each commit should be self-contained and revertible

### PR Description
- **Link to CR spec** in description (not just file path)
- **Include preview links** to documentation (Option B URLs)
- **List review focus areas** (what reviewers should prioritize)
- **Document testing status** (Playwright, manual, edge cases)

### Review Process
- **Review code + docs together** (not separately)
- **Check IA map consistency** if navigation changed
- **Verify backlinks** in dependent CRs
- **Test edge cases** from EC checklist if applicable

### Merge Hygiene
- **Use "Create merge commit"** for CR workflow (preserves history)
- **Delete branch immediately after merge** (avoid stale branches)
- **Update local main** before starting next CR

---

## GitHub Pages (Advanced, Optional)

If repository has GitHub Pages enabled:

### Setup
1. **Settings** → **Pages**
2. **Source:** Deploy from branch
3. Select branch: `gh-pages` or `main`
4. Select folder: `/docs` (if docs in root) or `/` (if docs in subfolder)

### Deployment
- Documentation deployed to: `https://tini-works.github.io/coredesign/`
- URL format: `https://<org>.github.io/<repo>/<file-path>`

### Preview branch (requires GitHub Actions)
**Workflow example:**
```yaml
name: Deploy PR preview
on: pull_request
jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Netlify (or Vercel)
        # Deploy docs/ to temporary preview URL
```

**Benefits:**
- Preview full documentation site from PR branch
- D2 diagrams rendered (if build step included)
- Interactive navigation testing

**Cons:**
- Requires CI/CD setup
- More complex than direct GitHub preview

---

## Troubleshooting

### "No conflicts" but merge button disabled
- **Cause:** CI checks failing or required reviews missing
- **Fix:** Check PR status checks, request reviews

### Relative links broken in GitHub preview
- **Cause:** GitHub renders markdown from file context, not repo root
- **Fix:** Use Option B (raw branch view) instead of Option A (Files changed)

### D2 diagrams not rendering
- **Cause:** GitHub doesn't support D2 syntax natively
- **Fix:** Use Option C (local preview) or set up GitHub Pages with D2 build step

### Merge conflicts after approval
- **Cause:** Base branch (main) changed since PR created
- **Fix:**
  ```bash
  git checkout CR06-gary
  git pull origin main
  # Resolve conflicts
  git push origin CR06-gary
  ```

---

## Quick Reference

| Task | Command/Action |
|------|----------------|
| Push branch | `git push -u origin <branch>` |
| Create PR | GitHub UI: Pull requests → New |
| Preview CR spec | Option B: `github.com/.../blob/<branch>/<file>` |
| Local preview | `cd docs && python3 -m http.server 8000` |
| Merge PR | GitHub UI: Merge pull request → Create merge commit |
| Delete remote branch | GitHub UI: Delete branch (after merge) |
| Delete local branch | `git branch -d <branch>` |

---

## Examples

### Example PR: CR06-01 Action Sheet Reorder

**Title:** `[CR06-01] Reorder Action Sheet buttons (Manual → Search → Scan → Favorites)`

**Branch:** `CR06-gary`

**Commits:**
1. `67955e9` - CR06-01 implemented: Reorder Action Sheet buttons
2. `2dd3c6a` - fix: prevent brainstorming skill from writing plans in CR workflow
3. `4370363` - feat: add Anti-Goals and Edge Case checklist to CR template
4. `fb69c46` - docs: add Anti-Goals and Edge Cases to CR06-01

**Files changed:**
- `calo-tracker/src/components/Dashboard/ActionSheet.tsx` (8 lines)
- `calo-tracker/docs/artifacts/ia-map/IA.md` (6 lines)
- `calo-tracker/docs/change-requests/06-entry-method-priority/CR06-01-action-sheet-reorder/CR06-01-action-sheet-reorder.md` (339 lines, new file)
- `.claude/templates/change-request-template.md` (16 lines)
- `.claude/commands/explore-change.md` (6 lines)

**Preview links:**
- CR Spec: https://github.com/tini-works/coredesign/blob/CR06-gary/calo-tracker/docs/change-requests/06-entry-method-priority/CR06-01-action-sheet-reorder/CR06-01-action-sheet-reorder.md
- IA Map: https://github.com/tini-works/coredesign/blob/CR06-gary/calo-tracker/docs/artifacts/ia-map/IA.md

**Review focus:**
- Button order matches spec (Manual first)
- IA map updated correctly
- Backlinks added to CR02-02, CR03-02, CR04-01
- Tab order accessibility preserved

**Testing:**
- Playwright: All navigation paths ✓
- Keyboard: Tab order ✓
- Edge cases: 4/8 tested (see CR06-01 EC checklist)
