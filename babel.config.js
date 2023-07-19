module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@apis": "./src/apis",
            "@zustand": "./src/zustand",
            "@types": "./src/types",
            "@styles": "./src/styles",
            "@assets": "./assets",
            "@utils": "./src/utils",
            "@src": "./src",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
    ],
    env: {
      production: {
        plugins: ["transform-remove-console", "react-native-paper/babel"],
      },
    },
  };
};
