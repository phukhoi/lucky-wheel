const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

module.exports = (env) => {
  const isDevBuild = !(env && env.prod) || env.NODE_ENV === "local";

  return {
    devtool: "cheap-module-eval-source-map",
    mode: isDevBuild ? "development" : "production",
    stats: { modules: false },
    resolve: {
      extensions: [".js"],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: "happypack/loader?id=image",
        },
        {
          test: /\.(woff|woff2|ttf)(\?v=\d+\.\d+\.\d+)?$/,
          use: "happypack/loader?id=font",
        },
        {
          test: /\.css(\?|$)/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: isDevBuild ? "css-loader" : "css-loader?minimize",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    entry: {
      vendor: [
        "event-source-polyfill",
        "isomorphic-fetch",
        "react",
        "react-dom",
        "react-router-dom",
      ],
    },
    output: {
      path: path.join(__dirname, "wwwroot", "dist"),
      publicPath: "/dist/",
      filename: "[name].js",
      library: "[name]_[hash]",
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "vendor.css" }),
      new HappyPack({
        id: "image",
        threadPool: happyThreadPool,
        loaders: [
          {
            path: "url-loader",
            query: {
              limit: 100000,
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
      new webpack.DllPlugin({
        path: path.join(__dirname, "wwwroot", "dist", "[name]-manifest.json"),
        name: "[name]_[hash]",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isDevBuild ? '"development"' : '"production"',
      }),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ parallel: true }),
        new OptimizeCssAssetsPlugin({}),
      ],
    },
  };
};
