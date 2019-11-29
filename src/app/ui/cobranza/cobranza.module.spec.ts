import { CobranzaModule } from './cobranza.module';

describe('CobranzaModule', () => {
  let cobranzaModule: CobranzaModule;

  beforeEach(() => {
    cobranzaModule = new CobranzaModule();
  });

  it('should create an instance', () => {
    expect(cobranzaModule).toBeTruthy();
  });
});
