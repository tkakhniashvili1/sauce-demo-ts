import { Page, Locator } from '@playwright/test';
import { BasePage } from './common/BasePage';

export class ProductsPage extends BasePage {
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItems = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
  }

  private productItem(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName });
  }

  async addProductToCart(productName: string) {
    await this.productItem(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProduct(productName: string) {
    await this.productItem(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }
}
