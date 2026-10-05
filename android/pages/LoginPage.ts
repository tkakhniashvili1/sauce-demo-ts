import { BasePage } from './common/BasePage';

export class LoginPage extends BasePage {
  async isDisplayed(): Promise<boolean> {
    return this.isPresent({ desc: 'test-LOGIN' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.device.fill({ desc: 'test-Username' }, username);
    await this.device.fill({ desc: 'test-Password' }, password);
    await this.device.tap({ desc: 'test-LOGIN' });
  }

  async hasErrorMessage(expectedText: string): Promise<boolean> {
    return this.isPresent({ desc: 'test-Error message', hasChild: { selector: { text: expectedText } } });
  }
}
