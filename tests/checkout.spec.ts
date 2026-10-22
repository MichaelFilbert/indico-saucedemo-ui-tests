import { test } from '../fixtures';
import { BUYER, ONESIE } from '../data/users';

test.describe('Checkout', { tag: '@module-checkout' }, () => {
    test('TC-CHECKOUT-01 E2E: buy Sauce Labs Onesie from login to order complete', { tag: '@smoke' }, async ({
        loggedIn, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage,
    }) => {
        await test.step(`Add "${ONESIE.name}" to cart`, async () => {
            await loggedIn.addToCart(ONESIE.name);
            await loggedIn.expectCartCount(1);
        });

        await test.step('Go to cart', async () => {
            await loggedIn.openCart();
            await cartPage.expectOnlyItem(ONESIE.name, ONESIE.price);
        });

        await test.step('Proceed to checkout and fill in buyer information', async () => {
            await cartPage.checkout();
            await checkoutInformationPage.fill(BUYER);
            await checkoutOverviewPage.expectOrder(ONESIE.name, ONESIE.price);
        });

        await test.step('Finish and confirm the order is complete', async () => {
            await checkoutOverviewPage.finish();
            await checkoutCompletePage.expectOrderComplete();
        });
    });

    test('TC-CHECKOUT-02 checkout without a first name is blocked', { tag: '@regression' }, async ({
        loggedIn, cartPage, checkoutInformationPage,
    }) => {
        await loggedIn.addToCart(ONESIE.name);
        await loggedIn.openCart();
        await cartPage.checkout();
        await checkoutInformationPage.fill({ ...BUYER, firstName: '' });
        await checkoutInformationPage.expectError('First Name is required');
    });
});
