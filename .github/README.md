# GitHub Actions Setup for Dependabot Auto-Merge

This repository includes a GitHub Action workflow that automatically merges Dependabot pull requests when all tests pass.

## Workflow: `dependabot-auto-merge.yml`

### What it does:
1. **Triggers** on Dependabot PRs (when `github.actor == 'dependabot[bot]'`)
2. **Waits** for all CI checks to complete (up to 5 minutes)
3. **Checks** if the PR is mergeable:
   - No merge conflicts
   - Not a draft PR
   - All status checks passed
   - All check runs passed
4. **Merges** the PR using squash merge

### Prerequisites

For this workflow to work, you need to enable **auto-merge** in your GitHub repository settings:

1. Go to **Settings** → **General**
2. Scroll to **Pull Requests**
3. Enable **Allow auto-merge**

Or go directly to: `https://github.com/{owner}/{repo}/settings`

### CI Failure Labels

The workflow will NOT merge if the PR has any of these labels:
- `ci-failed`
- `needs-rebase`
- `do-not-merge`
- `wip`

### Manual Override

If a Dependabot PR should NOT be auto-merged, simply add one of the labels above or convert it to a draft PR.

### Testing

To test the workflow:
1. Create a test Dependabot PR (e.g., by updating a dependency)
2. Watch the Actions tab for the workflow run
3. If all checks pass, the PR will be auto-merged

### Logs

Check the workflow run logs for:
- Whether checks completed
- PR mergeable status
- Check results
- Merge attempt results

## Alternative: GitHub Native Auto-Merge

Instead of using this custom workflow, you can enable GitHub's native Dependabot auto-merge:

1. Go to **Insights** → **Dependency graph**
2. Click **Dependabot** tab
3. Enable **Auto-merge for Dependabot version updates**

This uses GitHub's built-in auto-merge feature which is more robust.

## License

This workflow is provided as-is for the Bano Shopify Theme project.