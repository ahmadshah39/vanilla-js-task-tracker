const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // creating css file
          MiniCssExtractPlugin.loader,
          // Translating css into commonJs
          "css-loader",
          // Compiling sass to css
          "sass-loader",
        ],
      },
    ],
  },
});
