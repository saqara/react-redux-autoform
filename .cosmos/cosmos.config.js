module.exports = {
  globalImports: [],
  hostname: 'localhost',
  port: 8989,
  proxiesPath: '.cosmos/cosmos.proxies',
  publicPath: 'public',
  publicUrl: '/',
  rootPath: '../',
  webpack: (config, { env }) => {
    config.module.rules.push({
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel-loader'],
      test: /\.(js|jsx)$/
    }, {
      loaders: ['file-loader'],
      test: /\.(jpg|png|svg)$/
    })
    return config
  },
  watchDirs: ['src']
}
