// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  stream: require.resolve('stream-browserify'),
  events: require.resolve('events/'),
  buffer: require.resolve('buffer/'),
  process: require.resolve('process/browser'),
  util: require.resolve('util/'),
};

module.exports = config;
