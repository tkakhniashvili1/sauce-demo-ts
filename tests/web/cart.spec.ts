import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/web/LoginPage';
import { ProductsPage } from '../../pages/web/ProductsPage';
import { CartPage } from '../../pages/web/CartPage';
import { users } from '../../test-data/web/users';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('adding products updates the cart badge and shows them in the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await expect(productsPage.cartBadge).toHaveText('2');

    await productsPage.openCart();
    await expect(cartPage.itemNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
  });

  test('removing a product from the cart updates the badge and contents', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.openCart();

    await cartPage.removeProduct('Sauce Labs Backpack');

    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Bike Light']);
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('products can be sorted from lowest to highest price', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');

    const prices = await productsPage.itemPrices.allTextContents();
    const numericPrices = prices.map((price) => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
  });
});
