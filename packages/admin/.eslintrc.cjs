module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    '@typescript-eslint/consistent-type-imports': 'warn',
    'no-console': ['warn', { allow: ['info', 'warn', 'error', 'debug'] }],
    'no-plusplus': 0,
    'prefer-destructuring': ['warn', { object: true, array: false }],
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    radix: 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/media-has-caption': 0,
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'memo'] }],
    'react/require-default-props': 0,
    'no-nested-ternary': 0,
    'max-classes-per-file': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/constants',
            group: 'internal',
          },
          {
            pattern: '@/constants/**',
            group: 'internal',
          },
          {
            pattern: '@/renderer',
            group: 'internal',
          },
          {
            pattern: '@/renderer/**',
            group: 'internal',
          },
          {
            pattern: '@/libs',
            group: 'internal',
          },
          {
            pattern: '@/libs/**',
            group: 'internal',
          },
          {
            pattern: '@/utils',
            group: 'internal',
          },
          {
            pattern: '@/utils/**',
            group: 'internal',
          },
          {
            pattern: '@/stores',
            group: 'internal',
          },
          {
            pattern: '@/stores/**',
            group: 'internal',
          },
          {
            pattern: '@/services',
            group: 'internal',
          },
          {
            pattern: '@/services/**',
            group: 'internal',
          },
          {
            pattern: '@/providers',
            group: 'internal',
          },
          {
            pattern: '@/providers/**',
            group: 'internal',
          },
          {
            pattern: '@/layouts/**',
            group: 'internal',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
          },
          {
            pattern: '@/pages/**',
            group: 'internal',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
          },
          {
            pattern: '@/assets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/styles/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          // order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/export': 0,
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-types': 0,
  },
}
