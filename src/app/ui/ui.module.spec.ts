import { CobranzaUIModule } from './ui.module';

describe('UiModule', () => {
  let uiModule: CobranzaUIModule;

  beforeEach(() => {
    uiModule = new CobranzaUIModule();
  });

  it('should create an instance', () => {
    expect(uiModule).toBeTruthy();
  });
});
