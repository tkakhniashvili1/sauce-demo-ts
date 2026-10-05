import type { AndroidDevice } from '@playwright/test';

export async function isPresent(
  device: AndroidDevice,
  selector: Parameters<AndroidDevice['wait']>[0],
  timeout = 10_000
): Promise<boolean> {
  try {
    await device.wait(selector, { timeout });
    return true;
  } catch {
    return false;
  }
}
