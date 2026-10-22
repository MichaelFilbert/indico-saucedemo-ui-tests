import { Page, Locator, expect } from '@playwright/test';

/** Shopping cart (`/cart.html`). */
export class CartPage {
    readonly page: Page;
    readonly items: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.items = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async expectOnlyItem(name: string, price: string): Promise<void> {
        await expect(this.page).toHaveURL(/cart\.html/);
        await expect(this.items).toHaveCount(1);
        await expect(this.items.getByTestId('inventory-item-name')).toHaveText(name);
        await expect(this.items.getByTestId('inventory-item-price')).toHaveText(price);
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
