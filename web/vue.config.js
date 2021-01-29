/* eslint-disable @typescript-eslint/camelcase */

// Vue Configuration File
module.exports = {
  pwa: {
    name: 'Total Studio App',
    themeColor: '#ea0070',
    msTileColor: '#ea0070',
    manifestOptions: {
      short_name: 'Total Studio App',
      background_color: '#ea0070'
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
