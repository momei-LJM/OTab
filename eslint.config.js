import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  stylistic: false,
  rules: {
    'no-console': 'off',
    'antfu/top-level-function': 'off',
    'ts/no-use-before-define': 'off',
    'react-refresh/only-export-components': 'off',
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
  },
})
