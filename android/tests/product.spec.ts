import { test, expect } from '../fixtures';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { androidUsers, androidCatalog } from '../test-data/catalog';

test.describe('Android Product', () => {
  test.beforeEach(async ({ device }) => {
    await new LoginPage(device).login(androidUsers.standard.username, androidUsers.standard.password);
  });

  test('product details page opens from the product list', async ({ device }) => {
    const productsPage = new ProductsPage(device);
    const detailPage = new ProductDetailPage(device);
    const product = androidCatalog.backpack;

    await productsPage.openProductDetails(product.name);

    expect(await detailPage.isDisplayed()).toBe(true);
    expect(await detailPage.isProductNameDisplayed(product.name)).toBe(true);
    expect(await detailPage.isImageDisplayed()).toBe(true);
    expect(await detailPage.isPriceDisplayed()).toBe(true);
    expect(await detailPage.isDescriptionDisplayed()).toBe(true);
  });

  test('product can be added to cart from the product list', async ({ device }) => {
    const productsPage = new ProductsPage(device);
    const cartPage = new CartPage(device);
    const product = androidCatalog.backpack;

    await productsPage.addProductToCart(product.name);

    expect(await productsPage.isCartBadgeCountDisplayed(1)).toBe(true);
    expect(await productsPage.isRemoveButtonVisible(product.name)).toBe(true);

    await productsPage.openCart();

    expect(await cartPage.isDisplayed()).toBe(true);
    expect(await cartPage.isProductDisplayed(product.name)).toBe(true);
  });
});
