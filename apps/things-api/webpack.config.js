const { composePlugins, withNx } = require("@nx/webpack");

module.exports = composePlugins(withNx(), (config) => {
  config.mode = "production";
  config.externals = [];
  config.ignoreWarnings = [
    {
      module: /express|aws-crt|@node-rs\/argon2/
    }
  ];

  config.module.rules.push({
    test: /\.node$/,
    use: "node-loader"
  });
  return config;
});
