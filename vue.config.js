module.exports = {
  assetsDir: 'dist',
  baseUrl: process.env.NODE_ENV === 'production' ? '/sampler/' : '/',
  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      return [[
        './src/favicon.ico',
        {
          from: './src/img',
          to: 'img'
        }
      ]]
    })
    config.plugin('html').tap(args => {
      args[0].template = './src/index.html'
      args[0].title = 'Mojo-Vue Sampler'
      return args
    })
  },
  configureWebpack: {},
  indexPath: 'index.html',
  outputDir: 'public',
  productionSourceMap: false,
  runtimeCompiler: true
}
