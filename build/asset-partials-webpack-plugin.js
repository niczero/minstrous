// asset-partials-webpack-plugin.js

const fs = require('fs')
const toposort = require('toposort')

function AssetPartialsPlugin (options) {}

AssetPartialsPlugin.prototype.apply = function (compiler) {

  compiler.plugin('after-emit', function (compilation, callback) {
    let stats = compilation.getStats().toJson()

    // Record dependency graph
    let nodes = []
    let edges = []
    stats.chunks.forEach(chunk => {
      nodes.push(chunk.id)
      chunk.parents.forEach(parent => {
        edges.push([parent, chunk.id])
      })
    })
    // Sort chunk ids by dependency
    const sorted = toposort.array(nodes, edges)
    // Invert into dependency metric
    let index = {}
    let len = sorted.length
    for (let i = 0; i < len; ++i) {
      index[sorted[i]] = i
    }

    let scripts = ''
    let styles = ''
    // Sort assets according to dependencies
    stats.assets.filter(asset => {
      // Ignore assets not generated
      return asset.emitted
    }).sort((a, b) => {
      if (!a.chunks || !b.chunks) {
        return 0
      }
      // Use dependency metric
      return index[a.chunks[0]] - index[b.chunks[0]]
    }).forEach(asset => {
      let name = asset.name
      if (name.length >= 3 && name.slice(-3) === '.js') {
        scripts += '<script src="/' + name + '"></script>\n'
      }
      else if (name.length >= 4 && name.slice(-4) === '.css') {
        styles += '<link rel="stylesheet" href="/' + name + '">\n'
      }
    })

    fs.writeFile('templates/_styles.html.ep', styles, callback)
    fs.writeFile('templates/_scripts.html.ep', scripts, callback)
  })
}

module.exports = AssetPartialsPlugin
