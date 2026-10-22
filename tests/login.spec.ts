import { test } from '../fixtures';
import { PASSWORD, USERS } from '../data/users';

test.describe('Login', { tag: '@module-login' }, () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC-LOGIN-01 standard_user logs in and lands on Products', { tag: '@smoke' }, async ({ loginPage, inventoryPage }) => {
        await loginPage.login(USERS.standard, PASSWORD);
        await inventoryPage.expectLoaded();
    });

    test('TC-LOGIN-02 wrong password shows an error', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.login(USERS.standard, 'wrong_password');
        await loginPage.expectError('Username and password do not match any user in this service');
    });

    test('TC-LOGIN-03 locked_out_user is blocked', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.login(USERS.lockedOut, PASSWORD);
        await loginPage.expectError('Sorry, this user has been locked out.');
    });

    test('TC-LOGIN-04 empty username shows a required error', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.login('', PASSWORD);
        await loginPage.expectError('Username is required');
    });
});
