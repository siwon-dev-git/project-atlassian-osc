const path = require("path");
const { CompiledExtractPlugin } = require("@compiled/webpack-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          {
            loader: "@compiled/webpack-loader",
            options: {
              transformerBabelPlugins: ["@atlaskit/tokens/babel-plugin"],
              extract: true,
              inlineCss: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /\.compiled\.css$/,
      },
      {
        test: /\.compiled\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CompiledExtractPlugin({ sortShorthand: true }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            passes: 2, // More passes for better compression
            drop_console: true, // Remove console logs
          },
          mangle: true, // Mangle variable names
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serve static files from here
    },
    port: 3000, // Port number for the dev server
    historyApiFallback: true, // Enable support for React Router
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
  },
};
