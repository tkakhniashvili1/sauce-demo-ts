import type { AndroidDevice } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { isPresent } from '../../utils/android/elements';

export class ProductDetailPage extends BasePage<AndroidDevice> {
  async isDisplayed(): Promise<boolean> {
    return isPresent(this.driver, { desc: 'test-BACK TO PRODUCTS' });
  }

  async isProductNameDisplayed(expectedName: string): Promise<boolean> {
    return isPresent(this.driver, { desc: 'test-Description', hasChild: { selector: { text: expectedName } } }, 5_000);
  }

  async isImageDisplayed(): Promise<boolean> {
    return isPresent(this.driver, { desc: 'test-Image Container' }, 5_000);
  }

  async isPriceDisplayed(): Promise<boolean> {
    return isPresent(this.driver, { desc: 'test-Price' }, 5_000);
  }

  async isDescriptionDisplayed(): Promise<boolean> {
    return isPresent(this.driver, { desc: 'test-Description' }, 5_000);
  }

  async backToProducts(): Promise<void> {
    await this.driver.tap({ desc: 'test-BACK TO PRODUCTS' });
  }
}
