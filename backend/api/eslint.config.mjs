// @ts-check
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Goal: catch likely bugs, not enforce style. Formatting is out of scope.
export default defineConfig(
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,mjs,ts}'],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // The tsconfig allows implicit `any` (noImplicitAny: false) and raw query
      // results are untyped, so these flag hundreds of `any` usages that are
      // type hygiene, not defects. Revisit once the codebase tightens its types.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      // `async` without `await` is valid (it still returns a promise); removing
      // `async` would turn rejections into synchronous throws.
      '@typescript-eslint/require-await': 'off',
      // Redundant assertions are harmless; with strictNullChecks off every `!`
      // is reported, and those would be needed again if it is ever enabled.
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      // Empty domain interfaces are intentional placeholders; keep flagging `{}`.
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
      // Static mapper methods are passed as callbacks (`rows.map(Mapper.toDomain)`)
      // and do not use `this`.
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      // `_`-prefixed names are the existing convention for intentionally unused.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // Extra correctness checks (not in the presets).
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      'array-callback-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      // `expect(mock.method)` is the Jest idiom and triggers false positives.
      '@typescript-eslint/unbound-method': 'off',
      // Inline `require()` is the idiomatic way to load modules inside Jest tests.
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Config files are plain JS outside the TS project: lint them without types.
    files: ['**/*.{js,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
);
