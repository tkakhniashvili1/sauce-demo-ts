import { BasePage } from './common/BasePage';

export class ProductDetailPage extends BasePage {
  async isDisplayed(): Promise<boolean> {
    return this.isPresent({ desc: 'test-BACK TO PRODUCTS' });
  }

  async isProductNameDisplayed(expectedName: string): Promise<boolean> {
    return this.isPresent({ desc: 'test-Description', hasChild: { selector: { text: expectedName } } }, 5_000);
  }

  async isImageDisplayed(): Promise<boolean> {
    return this.isPresent({ desc: 'test-Image Container' }, 5_000);
  }

  async isPriceDisplayed(): Promise<boolean> {
    return this.isPresent({ desc: 'test-Price' }, 5_000);
  }

  async isDescriptionDisplayed(): Promise<boolean> {
    return this.isPresent({ desc: 'test-Description' }, 5_000);
  }

  async backToProducts(): Promise<void> {
    await this.device.tap({ desc: 'test-BACK TO PRODUCTS' });
  }
}
