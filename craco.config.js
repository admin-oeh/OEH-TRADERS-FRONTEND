const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // Remove React Refresh in production
      if (env === 'production') {
        // Remove HotModuleReplacementPlugin
        webpackConfig.plugins = webpackConfig.plugins.filter(
          plugin => plugin.constructor.name !== 'HotModuleReplacementPlugin'
        );
        
        // Remove React Refresh plugin and related loaders
        webpackConfig.plugins = webpackConfig.plugins.filter(
          plugin => !(plugin.constructor.name === 'ReactRefreshPlugin')
        );

        // Remove React Refresh from babel loader
        if (webpackConfig.module && webpackConfig.module.rules) {
          webpackConfig.module.rules.forEach(rule => {
            if (rule.oneOf) {
              rule.oneOf.forEach(oneOfRule => {
                if (oneOfRule.loader && oneOfRule.loader.includes('babel-loader')) {
                  if (oneOfRule.options && oneOfRule.options.plugins) {
                    oneOfRule.options.plugins = oneOfRule.options.plugins.filter(
                      plugin => 
                        !(typeof plugin === 'string' && plugin.includes('react-refresh'))
                    );
                  }
                }
              });
            }
          });
        }
      }

      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths }) => {
    // Disable hot reload in production-like environments
    if (process.env.DISABLE_HOT_RELOAD === 'true' || env === 'production') {
      devServerConfig.hot = false;
      devServerConfig.liveReload = false;
    }
    return devServerConfig;
  }
};