const AssetPartialsPlugin = require('./build/asset-partials-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

let plugins = []
if (process.env.NODE_ENV === "production") {
  const compressionTest = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
  plugins = [
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
    }),
    new AssetPartialsPlugin([{
      to: '../templates/styles.html.ep',
      types: ['css']
    }, {
      to: '../templates/scripts.html.ep',
      types: ['js']
    }])
  ]
}

module.exports = {
  assetsDir: 'dist',
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
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
  configureWebpack: {
		plugins
	},
  indexPath: 'index.html',
  outputDir: 'public',
  productionSourceMap: false,
  runtimeCompiler: true
}
