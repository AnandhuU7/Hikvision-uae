module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Allow unused vars with underscore prefix
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
    
    // Set any to warning instead of error
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Allow require imports (though using import is preferred)
    '@typescript-eslint/no-require-imports': 'warn',
    
    // Allow img elements (though using next/image is preferred)
    '@next/next/no-img-element': 'warn',
    
    // Allow unescaped entities
    'react/no-unescaped-entities': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
  ],
} 