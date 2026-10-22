import { Page, Locator, expect } from '@playwright/test';

/** Order confirmation (`/checkout-complete.html`). */
export class CheckoutCompletePage {
    readonly page: Page;
    readonly header: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByTestId('complete-header');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    async expectOrderComplete(): Promise<void> {
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
        await expect(this.header).toHaveText('Thank you for your order!');
        // A completed order empties the cart
        await expect(this.cartBadge).toHaveCount(0);
    }
}
