import mist from '@mistjs/eslint-config'

export default mist({
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'ts/ban-ts-comment': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/multi-word-component-names': 'off',
  },
})
