module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [2, "never"],
    quotes: [0, "single", "avoid-escape"],
    "no-var": 0,
    'linebreak-style': 'off',
    "one-var": [0, "never"],
    "max-len": "off",
    "eol-last": "off",
    "import/extensions": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-unused-expressions": "off",
    indent: [0, 2],
    "no-new": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
