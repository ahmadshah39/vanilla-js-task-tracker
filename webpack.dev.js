// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Injecting styles to index.html
          "style-loader",
          // Translating css into commonJs
          "css-loader",
          // Compiling sass to css
          "sass-loader",
        ],
      },
    ],
  },
});
