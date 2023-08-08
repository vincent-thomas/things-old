const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");

const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config, wp) => {
  config.mode = "development";
  config.entry = ['webpack/hot/poll?100', ...config.entry.main];
  config.target ="node";
  config.externals = [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
  ]
  return config;
});
