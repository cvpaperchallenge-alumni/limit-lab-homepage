import globals from "globals";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import * as eslintPluginImport from "eslint-plugin-import";
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginNext from '@next/eslint-plugin-next';
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss';

const eslintConfig = tseslint.config(
  {
    name: "limit-lab-homepage/ignore-globally",
    ignores: [
      'next-env.d.ts',
      'next.config.ts',
      'postcss.config.mjs',
      'tailwind.config.ts',
      'buils/',
      '.next/',
    ]
  },
  {
    name: "limit-lab-homepage/load-plugins",
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'import': eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
      'react': eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      '@next/next': eslintPluginNext,
      'tailwindcss': eslintPluginTailwindCSS,
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: './*',
      },
    },
  },
  {
    name: "limit-lab-homepage/global-tuning",
    extends: [eslint.configs.recommended],
    rules: {
      'import/order': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    name: "limit-lab-homepage/for-typescript",
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      tseslint.configs.strict,
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat['jsx-runtime'],
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': 'off',
      "react/prop-types": "off",
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  {
    name: "limit-lab-homepage/for-nextjs",
    files: ['**/*.jsx', '**/*.js', '**/*.tsx', '**/*.ts'],
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'error',
    },
  },
  {
    name: "limit-lab-homepage/for-tailwindcss",
    files: ['**/*.jsx', '**/*.js', '**/*.tsx', '**/*.ts'],
    extends: [eslintPluginTailwindCSS.configs['flat/recommended']],
    settings: {
      tailwindcss: {
        callees: ['cn'],
        config: './tailwind.config.ts',
      },
    },
  },
  {
    name: "limit-lab-homepage/for-prettier",
    ...eslintConfigPrettier,
  }
);

export default eslintConfig;
