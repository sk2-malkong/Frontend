module.exports = {
    parser: '@typescript-eslint/parser', // 타입스크립트 파싱
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true // JSX 문법 사용 가능
        }
    },
    settings: {
        react: {
            version: 'detect' // 리액트 버전 자동 감지
        }
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        // 너가 원하는 규칙 추가 가능 (예: 세미콜론 금지, 따옴표 통일 등)
        // "semi": ["error", "always"],
        // "quotes": ["error", "single"]
    }
};
