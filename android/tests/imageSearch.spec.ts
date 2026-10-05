import { test, expect } from '../fixtures';
import { LoginPage } from '../pages/LoginPage';
import { DrawingPage } from '../pages/DrawingPage';
import { androidUsers } from '../test-data/catalog';

test.describe('Android Drawing', () => {
  test('drawn circle is visible on the canvas', async ({ device }) => {
    await new LoginPage(device).login(androidUsers.standard.username, androidUsers.standard.password);

    const drawingPage = new DrawingPage(device);
    await drawingPage.open();
    await drawingPage.drawCircle();

    expect(await drawingPage.isCircleVisible()).toBe(true);
  });
});
