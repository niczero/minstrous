const AssetPartialsPlugin = require('./build/asset-partials-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

let plugins = [
  new AssetPartialsPlugin([{
    to: '../templates/_styles.html.ep',
    types: ['css']
  }, {
    to: '../templates/_scripts.html.ep',
    types: ['js']
  }])
]
if (process.env.RELEASE && process.env.RELEASE > 0) {
  const compressionTest = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
  plugins.push(
    new CompressionPlugin({
      algorithm (input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback)
      },
      compressionOptions: {
        numiterations: 15
      },
      minRatio: 0.9,
      test: compressionTest
    }),
    new BrotliPlugin({
      test: compressionTest,
      minRatio: 0.9
    })
  )
}

module.exports = {
  baseUrl: process.env.RELEASE && process.env.RELEASE > 0 ? '/minstrous' : '/',
  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      return [[
        './src/favicon.ico', {
          from: './static/img',
          to: 'img'
        }
      ]]
    })
    config.plugin('html').tap(args => {
      if (args.length > 0) {
        args[0].template = './src/index.html'
        args[0].title = 'Minstrous'
      }
      return args
    })
  },
  configureWebpack: {
    plugins
  },
  indexPath: 'index.html',
  outputDir: 'public',
  productionSourceMap: false,
  runtimeCompiler: true
}
