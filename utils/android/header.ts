import type { AndroidDevice } from '@playwright/test';

export async function openCart(device: AndroidDevice): Promise<void> {
  await device.tap({ desc: 'test-Cart' });
}

export async function openMenu(device: AndroidDevice): Promise<void> {
  await device.tap({ desc: 'test-Menu' });
}

export async function getCartBadgeCount(device: AndroidDevice): Promise<number> {
  try {
    const info = await device.info({ clazz: 'android.widget.TextView', text: /^\d+$/ });
    return parseInt(info.text, 10);
  } catch {
    return 0;
  }
}

export async function isCartBadgeHidden(device: AndroidDevice): Promise<boolean> {
  try {
    await device.wait({ clazz: 'android.widget.TextView', text: /^\d+$/ }, { state: 'gone', timeout: 5_000 });
    return true;
  } catch {
    return false;
  }
}
