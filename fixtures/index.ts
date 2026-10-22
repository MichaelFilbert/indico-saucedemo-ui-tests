import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { InventoryPage } from '../pages/inventory/InventoryPage';
import { CartPage } from '../pages/cart/CartPage';
import { CheckoutInformationPage } from '../pages/checkout/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkout/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkout/CheckoutCompletePage';
import { PASSWORD, USERS } from '../data/users';

type Pages = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutInformationPage: CheckoutInformationPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
    /** Already logged in as standard_user and on the Products page. */
    loggedIn: InventoryPage;
};

/**
 * Page objects are injected as fixtures, so specs ask for what they need
 * (`async ({ cartPage }) => ...`) instead of building them by hand.
 */
export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
    cartPage: async ({ page }, use) => use(new CartPage(page)),
    checkoutInformationPage: async ({ page }, use) => use(new CheckoutInformationPage(page)),
    checkoutOverviewPage: async ({ page }, use) => use(new CheckoutOverviewPage(page)),
    checkoutCompletePage: async ({ page }, use) => use(new CheckoutCompletePage(page)),

    loggedIn: async ({ loginPage, inventoryPage }, use) => {
        await loginPage.goto();
        await loginPage.login(USERS.standard, PASSWORD);
        await inventoryPage.expectLoaded();
        await use(inventoryPage);
    },
});

export { expect };
