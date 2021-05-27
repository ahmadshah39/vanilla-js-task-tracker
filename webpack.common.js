const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    main: "./src/js/main.js",
    vendor: "./src/js/vendor/vendor.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /.(jpg|jpeg|png|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  devtool: "source-map",
};
