import { Page, Locator, expect } from '@playwright/test';

/** Checkout step one: buyer information (`/checkout-step-one.html`). */
export class CheckoutInformationPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.errorMessage = page.getByTestId('error');
    }

    async fill(info: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
        await this.firstNameInput.fill(info.firstName);
        await this.lastNameInput.fill(info.lastName);
        await this.postalCodeInput.fill(info.postalCode);
        await this.continueButton.click();
    }

    async expectError(text: string): Promise<void> {
        await expect(this.errorMessage).toContainText(text);
    }
}
