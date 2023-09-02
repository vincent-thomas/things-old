const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const { resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");

module.exports = {
  context: __dirname,
  mode: "development",
  watch: true,
  watchOptions: {
    poll: undefined
  },
  entry: ["./src/main.ts"],
  target: "node",
  devtool: false,
  node: false,
  externals: [
    nodeExternals({
      allowlist: ["@things/format", "@things/crypto"]
    })
  ],
  output: {
    libraryTarget: "commonjs",

    path: resolve("../../.things/things-api"),
    filename: "[name].dev.js",
    pathinfo: false,
    scriptType: undefined
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_module|e2e/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js"],
    alias: {},
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, "./tsconfig.app.json")
      })
    ],
    mainFields: ["module", "main"]
  },
  stats: "minimal",
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/]
    }),
    new RunScriptWebpackPlugin({
      cwd: resolve("../../"),
      autoRestart: true
    })
  ]
};
