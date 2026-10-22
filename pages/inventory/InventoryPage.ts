import { Page, Locator, expect } from '@playwright/test';

/** Product list after login (`/inventory.html`). */
export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    /** One product card, found by its visible name so product order doesn't matter. */
    productCard(name: string): Locator {
        return this.page.getByTestId('inventory-item').filter({ hasText: name });
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory\.html/);
        await expect(this.title).toHaveText('Products');
    }

    async addToCart(name: string): Promise<void> {
        await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
    }

    async expectCartCount(count: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(String(count));
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}
