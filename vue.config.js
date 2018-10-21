module.exports = {
  assetsDir: 'dist',
  baseUrl: '/sampler/',
  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      return [['./src/favicon.ico']]
    })
    config.plugin('html').tap(args => {
      args[0].template = './src/index.html'
      args[0].title = 'Mojo-Vue Sampler'
      return args
    })
  },
  indexPath: 'index.html',
  outputDir: 'public',
  productionSourceMap: false,
  runtimeCompiler: false
}
