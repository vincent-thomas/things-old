const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config) => {
  // e.g. `config.plugins.push(new MyPlugin())`
  config.externals = [];
  config.ignoreWarnings = [
    {
      module: /express|aws-crt/,
    },
  ];
  return config;
});
