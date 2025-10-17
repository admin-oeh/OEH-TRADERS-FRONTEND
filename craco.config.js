const { when, whenDev, whenProd } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Remove React Refresh in production
      if (env === 'production') {
        // Remove React Refresh plugin
        webpackConfig.plugins = webpackConfig.plugins.filter(
          plugin => 
            !(plugin.constructor.name === 'ReactRefreshPlugin') &&
            !(plugin.constructor.name === 'InlineChunkHtmlPlugin' && 
              plugin.options && plugin.options.inlineChunks && 
              plugin.options.inlineChunks.includes('react-refresh'))
        );

        // Remove React Refresh from babel loader
        webpackConfig.module.rules.forEach(rule => {
          if (rule.oneOf) {
            rule.oneOf.forEach(oneOfRule => {
              if (oneOfRule.loader && oneOfRule.loader.includes('babel-loader')) {
                if (oneOfRule.options && oneOfRule.options.plugins) {
                  oneOfRule.options.plugins = oneOfRule.options.plugins.filter(
                    plugin => 
                      !(typeof plugin === 'string' && plugin.includes('react-refresh')) &&
                      !(Array.isArray(plugin) && plugin[0] && plugin[0].includes('react-refresh'))
                  );
                }
              }
            });
          }
        });
      }
      return webpackConfig;
    }
  },
  babel: {
    plugins: [
      ...whenDev(() => [['react-refresh/babel', { skipEnvCheck: true }]], [])
    ]
  }
};