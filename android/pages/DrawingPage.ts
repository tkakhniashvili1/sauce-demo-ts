import type { AndroidDevice } from '@playwright/test';
import { PNG } from 'pngjs';

const CENTER_X_RATIO = 0.5;
const CENTER_Y_RATIO = 0.58;
const RADIUS_RATIO = 0.18;
const SEGMENTS = 24;
const STEPS_PER_SEGMENT = 8;

export class DrawingPage {
  constructor(private readonly device: AndroidDevice) {}

  async open(): Promise<void> {
    await this.device.tap({ desc: 'test-Menu' });
    await this.device.tap({ desc: 'test-DRAWING' });
    await this.device.wait({ desc: 'test-DRAWING-SCREEN' }, { timeout: 10_000 });
  }

  async drawCircle(): Promise<void> {
    const points = await this.circlePoints();
    const [from, ...rest] = points;
    await this.device.input.swipe(from, [...rest, from], STEPS_PER_SEGMENT);
  }

  async isCircleVisible(): Promise<boolean> {
    const points = await this.circlePoints();
    const screenshot = await this.device.screenshot();
    const png = PNG.sync.read(screenshot);

    let inkedCount = 0;
    for (const { x, y } of points) {
      if (x < 0 || y < 0 || x >= png.width || y >= png.height) continue;
      const idx = (png.width * y + x) << 2;
      const isNearWhite = png.data[idx] > 240 && png.data[idx + 1] > 240 && png.data[idx + 2] > 240;
      if (!isNearWhite) inkedCount++;
    }

    return inkedCount / points.length > 0.5;
  }

  private async circlePoints(): Promise<{ x: number; y: number }[]> {
    const { x, y, width, height } = (await this.device.info({ desc: 'test-DRAWING-SCREEN' })).bounds;
    const centerX = Math.round(x + width * CENTER_X_RATIO);
    const centerY = Math.round(y + height * CENTER_Y_RATIO);
    const radius = Math.round(Math.min(width, height) * RADIUS_RATIO);

    return Array.from({ length: SEGMENTS }, (_, i) => {
      const angle = (2 * Math.PI * i) / SEGMENTS;
      return {
        x: centerX + Math.round(radius * Math.cos(angle)),
        y: centerY + Math.round(radius * Math.sin(angle)),
      };
    });
  }
}
