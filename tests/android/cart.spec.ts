import { test, expect } from '../../fixtures/android';
import { LoginPage } from '../../pages/android/LoginPage';
import { ProductsPage } from '../../pages/android/ProductsPage';
import { CartPage } from '../../pages/android/CartPage';
import { androidUsers, androidCatalog } from '../../test-data/android/catalog';

test.describe('Android Cart', () => {
  test.beforeEach(async ({ device }) => {
    await new LoginPage(device).login(androidUsers.standard.username, androidUsers.standard.password);
  });

  test('added product is shown in the cart', async ({ device }) => {
    const productsPage = new ProductsPage(device);
    const cartPage = new CartPage(device);
    const product = androidCatalog.backpack;

    await productsPage.addProductToCart(product.name);
    await productsPage.openCart();

    expect(await cartPage.isDisplayed()).toBe(true);
    expect(await cartPage.isProductDisplayed(product.name)).toBe(true);
    expect(await cartPage.isPriceDisplayed(product.name, product.price)).toBe(true);
  });

  test('product can be removed from the cart', async ({ device }) => {
    const productsPage = new ProductsPage(device);
    const cartPage = new CartPage(device);
    const product = androidCatalog.backpack;

    await productsPage.addProductToCart(product.name);
    await productsPage.openCart();

    expect(await cartPage.isDisplayed()).toBe(true);

    await cartPage.removeProduct(product.name);

    expect(await cartPage.isCartBadgeHidden()).toBe(true);
    expect(await cartPage.isProductDisplayed(product.name)).toBe(false);
  });
});
