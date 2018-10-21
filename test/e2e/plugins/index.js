// https://docs.cypress.io/guides/guides/plugins-guide.html
/* eslint-disable import/no-extraneous-dependencies global-require */
const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', webpack({
    webpackOptions: require('@vue/cli-service/webpack.config'),
    watchOptions: {}
  }))

  return Object.assign({}, config, {
    fixturesFolder: 'test/e2e/fixtures',
    integrationFolder: 'test/e2e/specs',
    screenshotsFolder: 'test/e2e/screenshots',
    supportFile: 'test/e2e/support/index.js',
    videosFolder: 'test/e2e/videos'
  })
}
