const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// On web, replace react-native-maps with a stub that does nothing
const reactNativeMapsStub = path.resolve(__dirname, 'src/mocks/react-native-maps.js');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'react-native-maps') {
    return {
      filePath: reactNativeMapsStub,
      type: 'sourceFile',
    };
  }
  // Fall back to default resolver for everything else
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
