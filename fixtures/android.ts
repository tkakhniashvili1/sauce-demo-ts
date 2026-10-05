import { test as base, expect, _android, type AndroidDevice } from '@playwright/test';

export const APP_PACKAGE = 'com.swaglabsmobileapp';
const MAIN_ACTIVITY = `${APP_PACKAGE}/com.swaglabsmobileapp.MainActivity`;

type Fixtures = {
  resetApp: void;
};

type WorkerFixtures = {
  device: AndroidDevice;
};

export const test = base.extend<Fixtures, WorkerFixtures>({
  device: [
    async ({}, use) => {
      const omitDriverInstall = process.env.PW_ANDROID_OMIT_DRIVER_INSTALL === '1';
      const devices = await _android.devices({ omitDriverInstall });
      if (devices.length === 0) {
        throw new Error(
          'No Android device/emulator detected by adb. Start an emulator (or connect a device) before running this suite.'
        );
      }
      const device = devices[0];
      await use(device);
      await device.close();
    },
    { scope: 'worker' },
  ],

  resetApp: [
    async ({ device }, use) => {
      await device.shell(`am force-stop ${APP_PACKAGE}`);
      await device.shell(`am start -n ${MAIN_ACTIVITY}`);
      await device.wait({ desc: 'test-Username' }, { timeout: 30_000 });
      await use();
    },
    { auto: true },
  ],
});

export { expect };
