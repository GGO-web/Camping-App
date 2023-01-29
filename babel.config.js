module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      ['inline-dotenv'],
      'react-native-reanimated/plugin',
    ],
  };
};
