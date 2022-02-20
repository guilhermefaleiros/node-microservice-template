module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@infrastructure': './src/infrastructure',
          '@domain': './src/domain',
          '@presentation': './src/presentation',
          '@application': './src/application',
          '@shared': './src/shared',
          '@main': './src/main'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
