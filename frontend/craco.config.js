// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const rules = webpackConfig.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
      const sourceMapLoader = rules.find(
        rule =>
          rule.use &&
          rule.use.loader &&
          rule.use.loader.includes('source-map-loader')
      );

      // Exclude html5-qrcode from source map loader
      if (sourceMapLoader) {
        sourceMapLoader.exclude = /node_modules\/html5-qrcode/;
      }

      return webpackConfig;
    }
  }
};
