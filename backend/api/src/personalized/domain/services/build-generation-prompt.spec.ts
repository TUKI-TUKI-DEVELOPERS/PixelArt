import {
  DEFAULT_SEPARATOR,
  SPREAD_SIZE,
  buildGenerationPrompt,
  BuildGenerationPromptInput,
  derivePrintedTitle,
  fillNamePlaceholders,
  fillPoemPlaceholders,
  needsDualIdentity,
  resolveAventuraEntrePatasNameValues,
  resolveFamilyGroupNameValues,
  resolveHermanosNameValues,
  resolveMemorialHermanosNameValues,
  resolveSeparator,
} from './build-generation-prompt';

describe('constants', () => {
  it('keeps the validated spread size and default separator', () => {
    expect(SPREAD_SIZE).toBe('2896x1024');
    expect(DEFAULT_SEPARATOR).toBe('un corazón pequeño');
  });
});

describe('resolveSeparator', () => {
  it('returns the default heart for undefined, null and empty category', () => {
    expect(resolveSeparator()).toBe('un corazón pequeño');
    expect(resolveSeparator(null)).toBe('un corazón pequeño');
    expect(resolveSeparator('')).toBe('un corazón pequeño');
  });

  it('returns the default heart for Amor and unknown categories', () => {
    expect(resolveSeparator('Amor')).toBe('un corazón pequeño');
    expect(resolveSeparator('Aventuras')).toBe('un corazón pequeño');
  });

  it('returns a house for Familia (case-insensitive)', () => {
    expect(resolveSeparator('Familia')).toBe('una pequeña casa estilizada');
    expect(resolveSeparator('FAMILIA')).toBe('una pequeña casa estilizada');
  });

  it('returns a paw print for Mascotas', () => {
    expect(resolveSeparator('Mascotas')).toBe('una pequeña huella de pata');
  });

  it('returns a dove for Memorias Familiares, taking precedence over the familia match', () => {
    // "memorias familiares" also contains "familia" — the memoria check must win.
    expect(resolveSeparator('Memorias Familiares')).toBe('una pequeña paloma');
  });
});

describe('needsDualIdentity', () => {
  it('flags the two dual-identity pet models', () => {
    expect(needsDualIdentity('Nuestro Angel de 4 patas')).toBe(true);
    expect(needsDualIdentity('Aventura entre patas')).toBe(true);
    expect(needsDualIdentity('Aventura Entre Patas Adulto')).toBe(true);
  });

  it('returns false for other models and for missing names', () => {
    expect(needsDualIdentity('Mi amigo Miauravilloso')).toBe(false);
    expect(needsDualIdentity(null)).toBe(false);
    expect(needsDualIdentity(undefined)).toBe(false);
    expect(needsDualIdentity('')).toBe(false);
  });
});

describe('fillNamePlaceholders', () => {
  it('replaces every placeholder with capitalized names', () => {
    const text = '{NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} {APELLIDO}, alias {APODO_DESTINATARIO}';
    const out = fillNamePlaceholders(text, {
      nombreDestinatario: 'zoe maría',
      apodoDestinatario: 'chiqui',
      nombreDedicante: 'JAVIER',
      apellido: 'pérez',
    });
    expect(out).toBe('Zoe María y Javier Pérez, alias Chiqui');
  });

  it('falls back to the recipient name when the nickname is missing', () => {
    const out = fillNamePlaceholders('Hola {APODO_DESTINATARIO}', { nombreDestinatario: 'diego' });
    expect(out).toBe('Hola Diego');
  });

  it('replaces missing values with empty strings', () => {
    const out = fillNamePlaceholders('[{NOMBRE_DESTINATARIO}|{NOMBRE_DEDICANTE}|{APELLIDO}]', {});
    expect(out).toBe('[||]');
  });

  it('replaces repeated occurrences of the same placeholder', () => {
    const out = fillNamePlaceholders('{NOMBRE_DESTINATARIO} ama a {NOMBRE_DESTINATARIO}', {
      nombreDestinatario: 'ana',
    });
    expect(out).toBe('Ana ama a Ana');
  });

  it('collapses the duplicated possessive when the nickname already starts with "mi"', () => {
    const out = fillNamePlaceholders('Mi {APODO_DESTINATARIO}, te quiero', {
      nombreDestinatario: 'diego',
      apodoDestinatario: 'mi amor',
    });
    // "Mi Mi Amor" → keeps the fixed-text "Mi" and drops the nickname's.
    expect(out).toBe('Mi Amor, te quiero');
  });

  it('keeps the fixed-text casing when collapsing mid-verse', () => {
    const out = fillNamePlaceholders('y mi {APODO_DESTINATARIO} brilla', {
      nombreDestinatario: 'diego',
      apodoDestinatario: 'Mi Cielo',
    });
    expect(out).toBe('y mi Cielo brilla');
  });

  it('does not touch a legitimate single "mi"', () => {
    const out = fillNamePlaceholders('mi {APODO_DESTINATARIO} querido', {
      nombreDestinatario: 'diego',
      apodoDestinatario: 'rey',
    });
    expect(out).toBe('mi Rey querido');
  });
});

describe('fillPoemPlaceholders', () => {
  it('prints the recipient nickname even when a legacy poem still uses NOMBRE_DESTINATARIO', () => {
    const out = fillPoemPlaceholders('Hola {NOMBRE_DESTINATARIO}, esta aventura es para {NOMBRE_DESTINATARIO}', {
      nombreDestinatario: 'tobías',
      apodoDestinatario: 'toby',
    });

    expect(out).toBe('Hola Toby, esta aventura es para Toby');
  });

  it('falls back to the recipient name when the book flow does not collect a nickname', () => {
    const out = fillPoemPlaceholders('Hola {NOMBRE_DESTINATARIO}', {
      nombreDestinatario: 'valentina',
    });

    expect(out).toBe('Hola Valentina');
  });

  it('adds a group nickname address when a collective poem has no name placeholder', () => {
    const out = fillPoemPlaceholders('Juntos nada puede detenerlos.', {
      apodoDestinatario: 'Los invencibles',
    });

    expect(out).toBe('Para Los Invencibles,\n\nJuntos nada puede detenerlos.');
  });
});

describe('derivePrintedTitle', () => {
  it('returns empty string for null', () => {
    expect(derivePrintedTitle(null)).toBe('');
  });

  it('uppercases a plain title', () => {
    expect(derivePrintedTitle('El Mejor Equipo')).toBe('EL MEJOR EQUIPO');
  });

  it('strips the "El a Ella" / "Ella a El" direction suffixes', () => {
    expect(derivePrintedTitle('Mi Amor El a Ella')).toBe('MI AMOR');
    expect(derivePrintedTitle('Mi Amor Ella a El')).toBe('MI AMOR');
  });

  it('strips generic "De <rol> a <rol>" suffixes including accented roles', () => {
    expect(derivePrintedTitle('Porque Te Amo De Hijo a Papá')).toBe('PORQUE TE AMO');
    expect(derivePrintedTitle('Te Quiero De Nieta a Abuela')).toBe('TE QUIERO');
    expect(derivePrintedTitle('Gracias De Hija a Mamá')).toBe('GRACIAS');
  });

  it('strips the Memorias Familiares collection prefix', () => {
    expect(derivePrintedTitle('Memoria Familiar Abuelo Porque Te Extraño')).toBe('ABUELO PORQUE TE EXTRAÑO');
    expect(derivePrintedTitle('Memorias Familiares Siempre Serás Parte de Mí')).toBe(
      'SIEMPRE SERÁS PARTE DE MÍ',
    );
  });

  it('strips prefix and suffix together', () => {
    expect(derivePrintedTitle('Memoria Familiar Gracias De Nieto a Abuelo')).toBe('GRACIAS');

      });

      it.each(['Hermano', 'Hermana', 'Madre', 'Padre', 'Abuela', 'Abuelo'])(
          'strips the leading %s role only for adult models',
          (role) => {
            expect(derivePrintedTitle(`${role} Compañero de Infinito Adulto`, 'Compañero Adulto')).toBe('COMPAÑERO DE INFINITO');
            expect(derivePrintedTitle(`${role} Compañero de Infinito`, 'Compañero')).toBe(`${role.toUpperCase()} COMPAÑERO DE INFINITO`);
          },
        );

        it('removes the terminal Adulto marker only for adult models', () => {
          expect(derivePrintedTitle('Siempre Serás Parte de Mí Adulto', 'Siempre Serás Parte de Mí Adulto')).toBe('SIEMPRE SERÁS PARTE DE MÍ');
          expect(derivePrintedTitle('Compañero de Infinito Adulto', 'Compañero Adulto')).toBe('COMPAÑERO DE INFINITO');
        });
  });

describe('resolveFamilyGroupNameValues', () => {
  it('returns null when characterMeta is missing or has no papa/mama', () => {
    expect(resolveFamilyGroupNameValues(null)).toBeNull();
    expect(resolveFamilyGroupNameValues(undefined)).toBeNull();
    expect(resolveFamilyGroupNameValues({})).toBeNull();
    expect(resolveFamilyGroupNameValues({ hermanos: [] })).toBeNull();
  });

  it('maps papa/mama/familyName onto the three existing placeholder slots', () => {
    expect(
      resolveFamilyGroupNameValues({
        familyName: 'Pérez',
        papa: { name: 'Juan' },
        mama: { name: 'Ana' },
      }),
    ).toEqual({ nombreDestinatario: 'Juan', nombreDedicante: 'Ana', apellido: 'Pérez' });
  });

  it('fills missing members with null', () => {
    expect(resolveFamilyGroupNameValues({ papa: { name: 'Juan' } })).toEqual({
      nombreDestinatario: 'Juan',
      nombreDedicante: null,
      apellido: null,
    });
  });
});

describe('resolveHermanosNameValues', () => {
  it('returns null for missing meta, non-array hermanos or no usable names', () => {
    expect(resolveHermanosNameValues(null)).toBeNull();
    expect(resolveHermanosNameValues({})).toBeNull();
    expect(resolveHermanosNameValues({ hermanos: 'nope' } as any)).toBeNull();
    expect(resolveHermanosNameValues({ hermanos: [] })).toBeNull();
    expect(resolveHermanosNameValues({ hermanos: [{ name: null }, null] })).toBeNull();
  });

  it('puts a single sibling in the dedicante slot with a null destinatario', () => {
    expect(resolveHermanosNameValues({ hermanos: [{ name: 'Valentina' }] })).toEqual({
      nombreDestinatario: null,
      nombreDedicante: 'Valentina',
    });
  });

  it('splits two siblings across the two slots', () => {
    expect(resolveHermanosNameValues({ hermanos: [{ name: 'Valentina' }, { name: 'Mateo' }] })).toEqual({
      nombreDestinatario: 'Valentina',
      nombreDedicante: 'Mateo',
    });
  });

  it('comma-joins all but the last sibling into the destinatario slot', () => {
    expect(
      resolveHermanosNameValues({
        hermanos: [{ name: 'Valentina' }, { name: 'Mateo' }, { name: 'Sofía' }],
      }),
    ).toEqual({ nombreDestinatario: 'Valentina, Mateo', nombreDedicante: 'Sofía' });
  });

  it('skips entries without a name', () => {
    expect(
      resolveHermanosNameValues({ hermanos: [{ name: 'Valentina' }, null, { name: '' }, { name: 'Mateo' }] }),
    ).toEqual({ nombreDestinatario: 'Valentina', nombreDedicante: 'Mateo' });
  });

  it('maps teamNickname to the recipient nickname slot for collective poems', () => {
    expect(
      resolveHermanosNameValues({
        teamNickname: 'Los invencibles',
        hermanos: [{ name: 'Valentina' }, { name: 'Mateo' }],
      }),
    ).toEqual({
      nombreDestinatario: 'Valentina',
      apodoDestinatario: 'Los invencibles',
      nombreDedicante: 'Mateo',
    });
  });
});

describe('resolveAventuraEntrePatasNameValues', () => {
  it('returns null for missing meta or a different mode', () => {
    expect(resolveAventuraEntrePatasNameValues(null)).toBeNull();
    expect(resolveAventuraEntrePatasNameValues({})).toBeNull();
    expect(resolveAventuraEntrePatasNameValues({ mode: 'familia-grupo' })).toBeNull();
  });

  it('returns null when there is neither pet name nor owners', () => {
    expect(resolveAventuraEntrePatasNameValues({ mode: 'mascotas-aventura', owners: [] })).toBeNull();
  });

  it('maps the pet to destinatario even without owners', () => {
    expect(
      resolveAventuraEntrePatasNameValues({ mode: 'mascotas-aventura', pet: { name: 'Toby' } }),
    ).toEqual({ nombreDestinatario: 'Toby', nombreDedicante: null });
  });

  it('joins owners with "&" (1, 2 and 3 owners)', () => {
    const base = { mode: 'mascotas-aventura', pet: { name: 'Toby' } };
    expect(
      resolveAventuraEntrePatasNameValues({ ...base, owners: [{ name: 'Mateo' }] }),
    ).toEqual({ nombreDestinatario: 'Toby', nombreDedicante: 'Mateo' });
    expect(
      resolveAventuraEntrePatasNameValues({ ...base, owners: [{ name: 'Mateo' }, { name: 'Sofía' }] }),
    ).toEqual({ nombreDestinatario: 'Toby', nombreDedicante: 'Mateo & Sofía' });
    expect(
      resolveAventuraEntrePatasNameValues({
        ...base,
        owners: [{ name: 'Mateo' }, { name: 'Sofía' }, { name: 'Lucía' }],
      }),
    ).toEqual({ nombreDestinatario: 'Toby', nombreDedicante: 'Mateo, Sofía & Lucía' });
  });
});

describe('resolveMemorialHermanosNameValues', () => {
  it('returns null for missing meta or a different mode', () => {
    expect(resolveMemorialHermanosNameValues(null)).toBeNull();
    expect(resolveMemorialHermanosNameValues({ mode: 'mascotas-aventura' })).toBeNull();
  });

  it('returns null when there is neither recipient nor living siblings', () => {
    expect(resolveMemorialHermanosNameValues({ mode: 'memorial-hermanos', livingSiblings: [] })).toBeNull();
  });

  it('maps the deceased sibling to destinatario even without living siblings', () => {
    expect(
      resolveMemorialHermanosNameValues({ mode: 'memorial-hermanos', recipient: { name: 'Andrés' } }),
    ).toEqual({ nombreDestinatario: 'Andrés', nombreDedicante: null });
  });

  it('joins all living siblings with "&" into the dedicante slot', () => {
    expect(
      resolveMemorialHermanosNameValues({
        mode: 'memorial-hermanos',
        recipient: { name: 'Andrés' },
        livingSiblings: [{ name: 'Carla' }, { name: 'Bruno' }],
      }),
    ).toEqual({ nombreDestinatario: 'Andrés', nombreDedicante: 'Carla & Bruno' });
  });
});

describe('buildGenerationPrompt', () => {
  const sharedBlocks = {
    imagen_base: 'BASE',
    identidad_mascota: 'ID-MASCOTA',
    identidad_humano: 'ID-HUMANO',
    composicion_reglas: 'COMP-WRAPPER',
    composicion_reglas_paginas: 'COMP-PAGINAS',
    diseno_editorial_wrapper: 'Editorial {TITULO} / {POEMA} con un corazón pequeño centrado en el medio',
    diseno_editorial_pagina_a: 'Pagina A {TITULO} / {POEMA}',
    diseno_editorial_pagina_b: 'Pagina B {TITULO} / {POEMA}',
    detalles_tecnicos: 'TECNICOS',
  };

  const baseInput: BuildGenerationPromptInput = {
    sharedBlocks,
    isPetCategory: false,
    sceneVisual: 'ESCENA',
    backgroundDetails: 'FONDO',
    magicEffects: 'MAGIA',
    lightingColor: 'LUZ',
    title: 'Mi Amor',
    poem: 'Verso uno',
  };

  it('assembles the sections in the validated order, joined by blank lines', () => {
    const prompt = buildGenerationPrompt(baseInput);
    const sections = prompt.split('\n\n');
    expect(sections[0]).toBe('[IMAGEN BASE]\nBASE');
    expect(sections[1]).toBe('[ESCENA VISUAL]\nESCENA');
    // The identity block is appended to the scene section with its own \n\n,
    // so after splitting it appears as the next chunk.
    expect(sections[2]).toBe('ID-HUMANO');
    expect(sections[3]).toBe('Fondo y Detalles\nFONDO');
    expect(sections[4]).toBe('Efectos Mágicos\nMAGIA');
    expect(sections[5]).toBe('[ILUMINACIÓN Y COLOR]\nLUZ');
    expect(sections[6]).toBe('[COMPOSICIÓN — REGLAS OBLIGATORIAS]\nCOMP-WRAPPER');
    expect(sections[7]).toBe(
      '[DISEÑO EDITORIAL]\nEditorial Mi Amor / Verso uno con un corazón pequeño centrado en el medio',
    );
    expect(sections[8]).toBe('[DETALLES TÉCNICOS]\nTECNICOS');
    expect(sections).toHaveLength(9);
  });

  it('uses the pet identity block for pet categories', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, isPetCategory: true });
    expect(prompt).toContain('ID-MASCOTA');
    expect(prompt).not.toContain('ID-HUMANO');
  });

  it('uses the human identity block for non-pet categories', () => {
    const prompt = buildGenerationPrompt(baseInput);
    expect(prompt).toContain('ID-HUMANO');
    expect(prompt).not.toContain('ID-MASCOTA');
  });

  it('stacks pet + human identity blocks when needsHumanIdentityToo is set', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, isPetCategory: true, needsHumanIdentityToo: true });
    expect(prompt).toContain('ID-MASCOTA\n\nID-HUMANO');
  });

  it('replaces {TITULO} and {POEMA} in the editorial block', () => {
    const prompt = buildGenerationPrompt(baseInput);
    expect(prompt).toContain('Editorial Mi Amor / Verso uno');
    expect(prompt).not.toContain('{TITULO}');
    expect(prompt).not.toContain('{POEMA}');
  });

  it('keeps the default heart separator phrase when no separator is given', () => {
    const prompt = buildGenerationPrompt(baseInput);
    expect(prompt).toContain('un corazón pequeño centrado en el medio');
  });

  it('keeps the heart phrase when the separator equals the default explicitly', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, separator: DEFAULT_SEPARATOR });
    expect(prompt).toContain('un corazón pequeño centrado en el medio');
  });

  it('swaps the heart phrase for a custom separator', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, separator: 'una pequeña huella de pata' });
    expect(prompt).toContain('una pequeña huella de pata en el centro');
    expect(prompt).not.toContain('un corazón pequeño centrado en el medio');
  });

  it('uses the page A editorial and page composition blocks when page is A', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, page: 'A' });
    expect(prompt).toContain('Pagina A Mi Amor / Verso uno');
    expect(prompt).toContain('[COMPOSICIÓN — REGLAS OBLIGATORIAS]\nCOMP-PAGINAS');
    expect(prompt).not.toContain('Editorial ');
  });

  it('uses the page B editorial block when page is B', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, page: 'B' });
    expect(prompt).toContain('Pagina B Mi Amor / Verso uno');
  });

  it('omits the admin refinement block when empty or whitespace', () => {
    expect(buildGenerationPrompt(baseInput)).not.toContain('[AJUSTE PRIORITARIO DEL EDITOR]');
    expect(buildGenerationPrompt({ ...baseInput, adminRefinement: '   ' })).not.toContain(
      '[AJUSTE PRIORITARIO DEL EDITOR]',
    );
  });

  it('appends the admin refinement as the final, highest-priority section', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, adminRefinement: 'cabeza más pequeña' });
    const sections = prompt.split('\n\n');
    const last = sections[sections.length - 1];
    expect(last.startsWith('[AJUSTE PRIORITARIO DEL EDITOR]')).toBe(true);
    expect(last).toContain('cabeza más pequeña');
    expect(last).toContain('MÁXIMA prioridad');
  });

  it('trims the admin refinement text', () => {
    const prompt = buildGenerationPrompt({ ...baseInput, adminRefinement: '  más luz cálida  ' });
    expect(prompt).toContain('Cambio solicitado:\nmás luz cálida');
  });
});
