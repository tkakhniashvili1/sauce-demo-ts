import type { AndroidDevice } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { isPresent } from '../../utils/android/elements';

export class LoginPage extends BasePage<AndroidDevice> {
  async isDisplayed(): Promise<boolean> {
    return isPresent(this.driver, { desc: 'test-LOGIN' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.driver.fill({ desc: 'test-Username' }, username);
    await this.driver.fill({ desc: 'test-Password' }, password);
    await this.driver.tap({ desc: 'test-LOGIN' });
  }

  async hasErrorMessage(expectedText: string): Promise<boolean> {
    return isPresent(this.driver, { desc: 'test-Error message', hasChild: { selector: { text: expectedText } } });
  }
}
