import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, checkoutInfo } from '../test-data/users';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('user can enter checkout information and see the product in the overview', async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutInformation(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.overviewItemNames).toHaveText(['Sauce Labs Backpack']);
  });

  test('user can finish the order and see the success message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutInformation(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.finishOrder();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
