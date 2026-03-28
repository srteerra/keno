import { test, expect, type Page } from "@playwright/test";

const gitTip = {
  title: "Use git stash to save work in progress",
  description: "Temporarily save uncommitted changes without a commit.",
  content_markdown:
    "Use `git stash` to temporarily shelve your changes.\n\n```bash\ngit stash\n```\n\nRun `git stash pop` to restore them.",
  category: "git_command",
  examples: [
    {
      explanation: "Stash with a descriptive message",
      details_markdown: "```bash\ngit stash save 'WIP: feature-x'\n```",
    },
    {
      explanation: "Apply the most recent stash",
      details_markdown: "```bash\ngit stash pop\n```",
    },
  ],
};

const reactTip = {
  title: "Use useCallback to memoize event handlers",
  description: "Prevent unnecessary re-renders by memoizing stable callbacks.",
  content_markdown:
    "Wrap event handlers with `useCallback` to keep their reference stable.\n\n```jsx\nconst handleClick = useCallback(() => {\n  doSomething();\n}, []);\n```",
  category: "react",
  examples: [
    {
      explanation: "Basic useCallback usage",
      details_markdown: "```jsx\nconst fn = useCallback(() => {}, [dep]);\n```",
    },
    {
      explanation: "Pass to a child component",
      details_markdown: "```jsx\n<Button onClick={fn} />\n```",
    },
  ],
};

async function mockTipsRoute(page: Page, fixture: typeof gitTip) {
  await page.route("**/api/tips", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(fixture),
    });
  });
}

test.describe("Home page", () => {
  test("automatically loads a Git tip on mount", async ({ page }) => {
    await mockTipsRoute(page, gitTip);
    await page.goto("/");

    await expect(page.getByTestId("tip-title")).toHaveText(
      "Use git stash to save work in progress"
    );
  });

  test("displays the tip category badge", async ({ page }) => {
    await mockTipsRoute(page, gitTip);
    await page.goto("/");

    await expect(page.getByTestId("tip-title")).toBeVisible();
    await expect(
      page.getByTestId("filter-badge-git_command").first()
    ).toBeVisible();
  });

  test("shows all five category filter badges", async ({ page }) => {
    await mockTipsRoute(page, gitTip);
    await page.goto("/");

    for (const category of [
      "git_command",
      "terminal",
      "editor",
      "react",
      "css",
    ]) {
      await expect(page.getByTestId(`filter-badge-${category}`)).toBeVisible();
    }
  });

  test("fetches a new tip when a category badge is clicked", async ({
    page,
  }) => {
    let callCount = 0;

    await page.route("**/api/tips", async (route) => {
      const fixture = callCount === 0 ? gitTip : reactTip;
      callCount++;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fixture),
      });
    });

    await page.goto("/");

    await expect(page.getByTestId("tip-title")).toHaveText(
      "Use git stash to save work in progress"
    );

    await page.getByTestId("filter-badge-react").click();

    await expect(page.getByTestId("tip-title")).toHaveText(
      "Use useCallback to memoize event handlers"
    );
  });

  test("examples toggle shows and hides examples", async ({ page }) => {
    await mockTipsRoute(page, gitTip);
    await page.goto("/");

    await expect(page.getByTestId("tip-title")).toBeVisible();

    await expect(page.getByTestId("examples-list")).not.toBeVisible();

    await page.getByTestId("examples-toggle").click();
    await expect(page.getByTestId("examples-list")).toBeVisible();
    await expect(page.getByTestId("example-explanation-0")).toContainText(
      "Stash with a descriptive message"
    );

    await page.getByTestId("examples-toggle").click();
    await expect(page.getByTestId("examples-list")).not.toBeVisible();
  });

  test("shows AI-generated content disclaimer", async ({ page }) => {
    await mockTipsRoute(page, gitTip);
    await page.goto("/");

    await expect(page.getByTestId("ai-disclaimer")).toBeVisible();
  });

  test("shows loading skeleton while tip is not yet loaded", async ({
    page,
  }) => {
    await page.route("**/api/tips", async (route) => {
      await new Promise((r) => setTimeout(r, 400));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(gitTip),
      });
    });

    await page.goto("/");

    await expect(page.getByTestId("tip-title")).not.toBeVisible();

    await expect(page.getByTestId("tip-title")).toBeVisible({ timeout: 5000 });
  });
});
