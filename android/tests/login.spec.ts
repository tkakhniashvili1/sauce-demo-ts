import { test, expect } from '../fixtures';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { MenuComponent } from '../components/MenuComponent';
import { androidUsers, androidCatalog, androidErrors } from '../test-data/catalog';

test.describe('Android Login', () => {
  test('standard user can log in and see the products screen', async ({ device }) => {
    const loginPage = new LoginPage(device);
    const productsPage = new ProductsPage(device);

    await loginPage.login(androidUsers.standard.username, androidUsers.standard.password);

    expect(await productsPage.isDisplayed()).toBe(true);
  });

  const invalidLoginCases = [
    {
      name: 'wrong password',
      username: androidUsers.standard.username,
      password: 'wrong_password',
      expectedError: androidErrors.invalidCredentials,
    },
    {
      name: 'empty username',
      username: '',
      password: androidUsers.standard.password,
      expectedError: androidErrors.usernameRequired,
    },
    {
      name: 'empty password',
      username: androidUsers.standard.username,
      password: '',
      expectedError: androidErrors.passwordRequired,
    },
  ];

  for (const { name, username, password, expectedError } of invalidLoginCases) {
    test(`invalid login (${name}) keeps the user on the login screen`, async ({ device }) => {
      const loginPage = new LoginPage(device);

      await loginPage.login(username, password);

      expect(await loginPage.isDisplayed()).toBe(true);
      expect(await loginPage.hasErrorMessage(expectedError)).toBe(true);
    });
  }

  test('products are displayed after login', async ({ device }) => {
    const loginPage = new LoginPage(device);
    const productsPage = new ProductsPage(device);

    await loginPage.login(androidUsers.standard.username, androidUsers.standard.password);

    expect(await productsPage.isProductDisplayed(androidCatalog.backpack.name)).toBe(true);
    expect(await productsPage.isProductDisplayed(androidCatalog.bikeLight.name)).toBe(true);
  });

  test('user can log out from the application', async ({ device }) => {
    const loginPage = new LoginPage(device);
    const productsPage = new ProductsPage(device);
    const menu = new MenuComponent(device);

    await loginPage.login(androidUsers.standard.username, androidUsers.standard.password);
    await productsPage.openMenu();
    await menu.logout();

    expect(await loginPage.isDisplayed()).toBe(true);
  });
});
