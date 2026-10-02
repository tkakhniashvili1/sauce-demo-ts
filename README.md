# sauce-demo-ts

## Android suite

`android/` ports the Java/Carina native Android suite (login, product, cart, drawing) from
`mobile-automation-native` to TypeScript, driving the real Swag Labs app (`com.swaglabsmobileapp`)
via Playwright's native Android automation (no Appium/Carina involved).

Setup:
1. `npx playwright install android` (once, downloads Playwright's on-device driver).
2. Start an Android emulator or connect a device (`adb devices` should list it).
3. Install the app under test: `adb install -r /path/to/Android.SauceLabs.Mobile.Sample.app.apk`.
4. `npm run test:android`.

After the first run, set `PW_ANDROID_OMIT_DRIVER_INSTALL=1` to skip reinstalling Playwright's
driver APK on every run (it otherwise reinstalls on every `devices()` call, which is slow).

Note: the product/cart screens reuse the same content-desc (e.g. `test-ADD TO CART`) on every
product card, so `android/pages/ProductsPage.ts` and `CartPage.ts` locate a specific card via a
`hasDescendant` match on its product name and tap a fixed offset within that card's own bounds
(measured against the real app) rather than a nested element lookup, which Playwright's Android
selectors don't support. The drawing/image-search test approximates Carina's image-template
matching with pixel sampling, since Playwright has no equivalent primitive.
