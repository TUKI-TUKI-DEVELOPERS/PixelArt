import { derivePrintedTitle } from './build-generation-prompt';

describe('derivePrintedTitle adult-model cleanup', () => {
  it('removes the leading family role and terminal Adulto marker only for adult models', () => {
    expect(derivePrintedTitle('Madre Siempre Serás Parte de Mí Adulto', 'Madre Adulto'))
      .toBe('SIEMPRE SERÁS PARTE DE MÍ');
  });

  it('preserves the same title output for non-adult models', () => {
    expect(derivePrintedTitle('Madre Siempre Serás Parte de Mí Adulto', 'Madre'))
      .toBe('MADRE SIEMPRE SERÁS PARTE DE MÍ ADULTO');
  });

  it('continues removing directional suffixes without altering poem content', () => {
    expect(derivePrintedTitle('Memorias Familiares Abuelo Porque Te Quiero De Nieta a Abuelo', 'Abuelo Adulto'))
      .toBe('PORQUE TE QUIERO');
  });
});
