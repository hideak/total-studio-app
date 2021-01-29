/* eslint-disable @typescript-eslint/camelcase */

// Vue Configuration File
module.exports = {
  pwa: {
    name: 'Total Studio App',
    themeColor: '#fafafa',
    msTileColor: '#fafafa',
    manifestOptions: {
      short_name: 'Total Studio App',
      background_color: '#fafafa'
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
