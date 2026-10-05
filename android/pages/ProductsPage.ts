import type { AndroidElementInfo } from '@playwright/test';
import { getCartBadgeCount, isCartBadgeHidden, openCart, openMenu } from '../utils/header';
import { BasePage } from './common/BasePage';

const CARD_BUTTON_RATIO = { x: 0.5, y: 0.915 };
const CARD_TITLE_RATIO = { x: 0.5, y: 0.65 };

function ratioPoint(bounds: AndroidElementInfo['bounds'], ratio: { x: number; y: number }) {
  return {
    x: Math.round(bounds.x + bounds.width * ratio.x),
    y: Math.round(bounds.y + bounds.height * ratio.y),
  };
}

export class ProductsPage extends BasePage {
  async isDisplayed(): Promise<boolean> {
    return this.isPresent({ desc: 'test-Cart drop zone' });
  }

  async isProductDisplayed(productName: string): Promise<boolean> {
    return !!(await this.findItem(productName));
  }

  async isAddToCartButtonVisible(_productName: string): Promise<boolean> {
    return this.isPresent({ desc: 'test-ADD TO CART' }, 5_000);
  }

  async isRemoveButtonVisible(_productName: string): Promise<boolean> {
    return this.isPresent({ desc: 'test-REMOVE' }, 5_000);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.tapCardAt(productName, CARD_BUTTON_RATIO);
  }

  async removeProductFromList(productName: string): Promise<void> {
    await this.tapCardAt(productName, CARD_BUTTON_RATIO);
  }

  async openProductDetails(productName: string): Promise<void> {
    await this.tapCardAt(productName, CARD_TITLE_RATIO);
  }

  async getCartBadgeCount(): Promise<number> {
    return getCartBadgeCount(this.device);
  }

  async isCartBadgeCountDisplayed(expectedCount: number): Promise<boolean> {
    return (await this.getCartBadgeCount()) === expectedCount;
  }

  async isCartBadgeHidden(): Promise<boolean> {
    return isCartBadgeHidden(this.device);
  }

  async openCart(): Promise<void> {
    await openCart(this.device);
  }

  async openMenu(): Promise<void> {
    await openMenu(this.device);
  }

  private async findItem(productName: string): Promise<AndroidElementInfo | undefined> {
    try {
      return await this.device.info({ desc: 'test-Item', hasDescendant: { selector: { text: productName } } });
    } catch {
      return undefined;
    }
  }

  private async tapCardAt(productName: string, ratio: { x: number; y: number }): Promise<void> {
    const item = await this.findItem(productName);
    if (!item) throw new Error(`Product "${productName}" is not visible on the products page`);
    await this.device.input.tap(ratioPoint(item.bounds, ratio));
  }
}
