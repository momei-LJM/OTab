import antfu from '@antfu/eslint-config';

export default antfu({
  vue: false,
  react: true,
  rules: {
    'no-console': 'off',
    'antfu/top-level-function': 'off',
    'ts/no-use-before-define': 'off',
  },
});
