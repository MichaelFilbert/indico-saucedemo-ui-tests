import { Page, Locator, expect } from '@playwright/test';

/** Checkout step two: order overview (`/checkout-step-two.html`). */
export class CheckoutOverviewPage {
    readonly page: Page;
    readonly itemNames: Locator;
    readonly subtotal: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemNames = page.getByTestId('inventory-item-name');
        this.subtotal = page.getByTestId('subtotal-label');
        this.finishButton = page.getByTestId('finish');
    }

    async expectOrder(name: string, itemTotal: string): Promise<void> {
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
        await expect(this.itemNames).toHaveText([name]);
        await expect(this.subtotal).toHaveText(`Item total: ${itemTotal}`);
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }
}
