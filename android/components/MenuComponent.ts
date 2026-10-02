import type { AndroidDevice } from '@playwright/test';

export class MenuComponent {
  constructor(private readonly device: AndroidDevice) {}

  async logout(): Promise<void> {
    await this.device.tap({ desc: 'test-LOGOUT' });
  }
}
