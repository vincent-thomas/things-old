const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config, webpack) => {
  config.mode = "production"
  config.externals = [];
  config.ignoreWarnings = [
    {
      module: /express|aws-crt/,
    },
  ];
  return config;
});
