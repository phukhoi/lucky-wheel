const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const bundleOutputDir = "public/js";

module.exports = (env) => {
  const isDevBuild = !(env && env.prod) || env.NODE_ENV === "local";

  return {
    devtool: "cheap-module-eval-source-map",
    mode: isDevBuild ? "development" : "production",
    stats: { modules: false },
    entry: { app: "./resources/js/app.js" },
    resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "happypack/loader?id=jsx"
        },
        {
          test: /\.tsx?$/,
          use: "happypack/loader?id=tsx",
        },
        {
          test: /\.css$/,
          use: isDevBuild
            ? ["style-loader", "css-loader"]
            : [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: isDevBuild
            ? ["style-loader", "css-loader", "sass-loader"]
            : [
                { loader: MiniCssExtractPlugin.loader },
                "css-loader",
                "sass-loader",
              ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: "happypack/loader?id=image",
        },
        {
          test: /\.(woff|woff2|ttf)(\?v=\d+\.\d+\.\d+)?$/,
          use: "happypack/loader?id=font",
        },
      ],
    },
    plugins: [
      new HappyPack({
        id: "jsx",
        threadPool: happyThreadPool,
        loaders: [
          {
            path: "babel-loader"
          },
        ],
      }),
      new HappyPack({
        id: "tsx",
        threadPool: happyThreadPool,
        loaders: [
          {
            path: "ts-loader",
            query: {
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
      }),
      new HappyPack({
        id: "image",
        threadPool: happyThreadPool,
        loaders: [
          {
            path: "url-loader",
            query: {
              limit: 25000,
            },
          },
        ],
      }),
      new HappyPack({
        id: "font",
        threadPool: happyThreadPool,
        loaders: [
          {
            path: "file-loader",
            query: {
              limit: 150000,
              mimetype: "application/font-woff",
              name: "[name].[hash].[ext]",
              outputPath: "fonts/",
              publicPath: (url) => "../fonts/" + url,
            },
          },
        ],
      }),
    ].concat(
      isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin({
              filename: "[file].map",
              moduleFilenameTemplate: path.relative(
                bundleOutputDir,
                "[resourcePath]"
              ),
            }),
          ]
        : [new MiniCssExtractPlugin({ filename: "site.css" })]
    ),
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      minimizer: isDevBuild
        ? []
        : [
            new UglifyJsPlugin({ parallel: true }),
            new OptimizeCssAssetsPlugin({}),
          ],
    },
  };
};
