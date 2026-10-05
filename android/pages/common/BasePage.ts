import type { AndroidDevice } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly device: AndroidDevice) {}

  protected async isPresent(
    selector: Parameters<AndroidDevice['wait']>[0],
    timeout = 10_000
  ): Promise<boolean> {
    try {
      await this.device.wait(selector, { timeout });
      return true;
    } catch {
      return false;
    }
  }
}
