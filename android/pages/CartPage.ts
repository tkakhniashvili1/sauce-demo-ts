import type { AndroidElementInfo } from '@playwright/test';
import { isCartBadgeHidden } from '../utils/header';
import { BasePage } from './common/BasePage';

const REMOVE_BUTTON_RATIO = { x: 0.577, y: 0.839 };

function ratioPoint(bounds: AndroidElementInfo['bounds'], ratio: { x: number; y: number }) {
  return {
    x: Math.round(bounds.x + bounds.width * ratio.x),
    y: Math.round(bounds.y + bounds.height * ratio.y),
  };
}

export class CartPage extends BasePage {
  async isDisplayed(): Promise<boolean> {
    return this.isPresent({ desc: 'test-CONTINUE SHOPPING' });
  }

  async isProductDisplayed(productName: string): Promise<boolean> {
    return !!(await this.findItem(productName));
  }

  async isPriceDisplayed(_productName: string, expectedPrice: string): Promise<boolean> {
    return !!(await this.findItem(expectedPrice));
  }

  async removeProduct(productName: string): Promise<void> {
    const item = await this.findItem(productName);
    if (!item) throw new Error(`"${productName}" is not in the cart`);
    await this.device.input.tap(ratioPoint(item.bounds, REMOVE_BUTTON_RATIO));
  }

  async isCartBadgeHidden(): Promise<boolean> {
    return isCartBadgeHidden(this.device);
  }

  async proceedToCheckout(): Promise<void> {
    await this.device.tap({ desc: 'test-CHECKOUT' });
  }

  async continueShopping(): Promise<void> {
    await this.device.tap({ desc: 'test-CONTINUE SHOPPING' });
  }

  private async findItem(descendantText: string): Promise<AndroidElementInfo | undefined> {
    try {
      return await this.device.info({ desc: 'test-Item', hasDescendant: { selector: { text: descendantText } } });
    } catch {
      return undefined;
    }
  }
}
