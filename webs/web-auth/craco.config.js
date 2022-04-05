const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;
const federationConfig = require('./federation.config.json');

module.exports = {
  webpack: {
    configure: (config, { paths }) => {
      paths.appBuild = config.output.path = path.resolve(__dirname, 'dist');

      config.output.publicPath = 'auto';

      if (!config.plugins) {
        config.plugins = [];
      }

      config.plugins.unshift(
        new NodePolyfillPlugin(),
        new ModuleFederationPlugin({
          ...federationConfig,
          filename: 'remoteEntry.js',
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: deps['react-dom'],
            },
          },
        }),
      );
      return config;
    },
  },
};
