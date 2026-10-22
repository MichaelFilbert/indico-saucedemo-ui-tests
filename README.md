# Saucedemo UI automation tests

Take-home test for INDICO (QA Engineer), **Task 3**.
Automated UI tests for [saucedemo.com](https://www.saucedemo.com): login, and an end-to-end checkout of **Sauce Labs Onesie**.

Stack: **Playwright Test + TypeScript**, Page Object Model with fixtures, Chromium.

## Run the tests

Requires Node.js 18 or newer.

```bash
npm install
npx playwright install chromium   # first time only
npm test                          # all tests, headless
npm run test:smoke                # only the @smoke tests (login + E2E checkout)
npm run test:headed               # watch it run in a browser
npm run report                    # open the HTML report
```

The tests also run on every push with GitHub Actions (`.github/workflows/tests.yml`). The HTML report is saved as a build artifact.

## Coverage

| ID | Scenario | Tag | What it checks |
|---|---|---|---|
| TC-LOGIN-01 | Login with `standard_user` | @smoke | Lands on `/inventory.html`, title "Products" |
| TC-LOGIN-02 | Wrong password | @regression | Error "Username and password do not match..." |
| TC-LOGIN-03 | `locked_out_user` | @regression | Error "Sorry, this user has been locked out." |
| TC-LOGIN-04 | Empty username | @regression | Error "Username is required" |
| TC-CHECKOUT-01 | **E2E checkout of Sauce Labs Onesie** | @smoke | Add to cart (badge = 1) → cart has only the Onesie at $7.99 → buyer info → overview item total $7.99 → Finish → "Thank you for your order!" and the cart is empty |
| TC-CHECKOUT-02 | Checkout without first name | @regression | Error "First Name is required", order not placed |

The checkout test is split into `test.step`s, so the HTML report shows exactly which step failed.

## Structure

```
pages/                      one module per area, like the app itself
  auth/LoginPage.ts
  inventory/InventoryPage.ts
  cart/CartPage.ts
  checkout/CheckoutInformationPage.ts, CheckoutOverviewPage.ts, CheckoutCompletePage.ts
fixtures/index.ts           injects page objects into tests, plus a `loggedIn` fixture
data/users.ts               demo users, product and buyer data in one place
tests/                      login.spec.ts, checkout.spec.ts
docs/last-run.txt           console output of the latest run
playwright-report/          HTML report of the latest run (open index.html)
```

## Decisions

- **Page objects keep locators as `readonly` fields** and expose actions plus assertions (`expectLoaded`, `expectOrderComplete`), so specs read like the scenario.
- **Fixtures inject the page objects**, and `loggedIn` does the login once per test. Checkout tests don't repeat login steps, and each test still starts from a clean session.
- **Selectors use the site's `data-test` attributes** (`testIdAttribute: 'data-test'`), which don't change when styling changes. The product is found by its visible name inside its own card, so the test still works if the product order changes.
- **No fixed waits.** Every check uses Playwright's auto-retrying `expect`.
- I made sure the E2E test can actually fail: changing the expected price to $9.99 makes it fail at the cart step ("Expected $9.99, received $7.99").

## Assumptions and limits

- Uses the public demo accounts shown on the login page (`standard_user` / `secret_sauce`).
- Runs on Chromium only, to keep the run fast. Firefox and WebKit would be one line each in `playwright.config.ts`.
- Saucedemo resets its state on login, so tests don't need data cleanup.

## Next steps (in a real sprint)

- Run the same suite on Firefox and WebKit.
- Cover the other demo users that have known UI defects (`problem_user`, `performance_glitch_user`).
- Add checkout with several items and check the tax and total maths.

## Latest result

6 passed. See `docs/last-run.txt` and `playwright-report/index.html`.
