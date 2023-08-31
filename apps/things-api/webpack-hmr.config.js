const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const { composePlugins, withNx } = require("@nx/webpack");
const { resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = composePlugins((config, wp) => {
  config.context = __dirname;
  config.mode = "development";
  config.watch = true;
  config.entry = ["webpack/hot/poll?100", "./src/main.ts"];
  config.target = "node";
  config.node = false;
  config.externals = [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"]
    })
  ];

  config.module = {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_module|e2e/
      }
    ]
  };
  config.resolve = {
    extensions: [".ts", ".mjs", ".js"],
    alias: {},
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, "./tsconfig.app.json")
      })
    ],
    mainFields: ["module", "main"]
  };
  config.stats = "minimal";
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/]
    })
  ];
  console.log(config);
  return config;
});

/*

{
  context: 'C:\\Users\\vincent\\P\\apps\\things\\apps\\things-api',
  target: 'node',
  node: false,
  mode: 'development',
  devtool: false,
  entry: [
    'webpack/hot/poll?100',
    'C:\\Users\\vincent\\P\\apps\\things\\apps\\things-api\\src\\main.ts'
  ],
  output: {
    libraryTarget: 'commonjs',
    path: 'C:\\Users\\vincent\\P\\apps\\things\\dist\\apps\\things-api',
    filename: '[name].js',
    chunkFilename: '[name].js',
    hashFunction: 'xxhash64',
    pathinfo: false,
    scriptType: undefined
  },
  watch: true,
  watchOptions: { poll: undefined },
  profile: false,
  resolve: {
    extensions: [ '.ts', '.tsx', '.mjs', '.js', '.jsx' ],
    alias: {},
    plugins: [ [TsconfigPathsPlugin] ],
    mainFields: [ 'module', 'main' ]
  },
  externals: [ [Function (anonymous)] ],
  optimization: {
    sideEffects: true,
    minimize: false,
    minimizer: [ [TerserPlugin] ],
    runtimeChunk: false,
    concatenateModules: true
  },
  performance: { hints: false },
  experiments: { cacheUnaffected: true },
  ignoreWarnings: [ [Function (anonymous)] ],
  module: { unsafeCache: true, rules: [ [Object], [Object], [Object] ] },
  plugins: [
    ForkTsCheckerWebpackPlugin { options: [Object] },
    HotModuleReplacementPlugin { options: {} },
    WatchIgnorePlugin { paths: [Array] }
  ],
  stats: 'summary'
}
*/
