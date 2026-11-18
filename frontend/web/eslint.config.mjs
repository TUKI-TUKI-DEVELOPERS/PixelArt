// @ts-check
import { FlatCompat } from '@eslint/eslintrc';

// eslint-config-next 15.x ships legacy (eslintrc) presets; FlatCompat adapts
// them to flat config. `next/core-web-vitals` already registers
// eslint-plugin-react-hooks (rules-of-hooks: error, exhaustive-deps: warn).
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

// Goal: catch likely bugs, not enforce style. Formatting is out of scope.
const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Quotes and apostrophes in JSX text render verbatim; only a stray `>` or
      // `}` signals a JSX typo.
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      // Visible but non-blocking: explicit `any` is a type-safety hole, not a defect.
      '@typescript-eslint/no-explicit-any': 'warn',
      // Extra correctness checks (not in the presets).
      'array-callback-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
    },
  },
];

export default eslintConfig;
