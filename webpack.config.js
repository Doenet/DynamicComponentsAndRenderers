const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path')
// const glob = require('glob');

// const componentsPaths = glob.sync('./src/components/*.js');

// const entryObject = componentsPaths.reduce((acc, item) => {
//   const name = item.replace('./src/', '');
//   acc[name] = item;
//   return acc;
// }, {});

// console.log(entryObject);


// entryObject["index.js"] = "./src/index.js";
// entryObject["sw.js"] = "./src/sw.js";
// console.log(entryObject);
   

module.exports = {

    // devtool: 'source-map',

    // entry: entryObject,

     entry: {
      // "components/First.js" : "./src/components/First.js",
      // "components/Second.js" : "./src/components/Second.js",
      // "components/Third.js" : "./src/components/Third.js",
      // "components/Fourth.js" : "./src/components/Fourth.js",
      "index.js" : "./src/index.js",
      "sw.js" : "./src/sw.js",
    },

    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name]',
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: {
                loader: "html-loader",
                options: { minimize: true }
            }
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
          chunks:['index.js','sw.js'],
          template: "./src/index.html",
          filename: "./index.html",
          // favicon: "",
      }),
      new MiniCssExtractPlugin({
          filename: "[name].css",
          // filename: "main.css",
          chunkFilename: "[id].css"
      })
  ],
    devServer: {
      port: 3000,
      // openPage: "protected",
    }
  };