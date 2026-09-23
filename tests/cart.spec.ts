import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('adding products updates the cart badge and shows them in the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
  });

  test('removing a product from the cart updates the badge and contents', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.openCart();

    await cartPage.removeProduct('Sauce Labs Backpack');

    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Bike Light']);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('products can be sorted from lowest to highest price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.itemPrices.allTextContents();
    const numericPrices = prices.map((price) => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
  });
});
