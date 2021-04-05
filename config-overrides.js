module.exports = function override(config, env) {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
  config.optimization.runtimeChunk = false;
    return config;
  }