export abstract class BasePage<TDriver> {
  constructor(protected readonly driver: TDriver) {}
}
