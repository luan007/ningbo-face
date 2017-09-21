var path = require("path");
var webpack = require("webpack");
var HOST = "http://cdn.circuitpot.com/faceningbo";
var loaders = [
  {
    test: /\.js$/,
    loader: "string-replace-loader",
    query: {
      search: "/assets/",
      replace: HOST + "/assets/",
      flags: "g"
    }
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    query: {
      presets: ["babel-preset-env"],
      plugins: []
    }
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: "style-loader" // creates style nodes from JS strings
      },
      {
        loader: "css-loader", // translates CSS into CommonJS
        options: {
          url: false
        }
      },
      {
        loader: "less-loader" // compiles Less to CSS
      },
      {
        loader: "string-replace-loader",
        query: {
          search: "/assets/",
          replace: HOST + "/assets/",
          flags: "g"
        }
      }
    ]
  }
];

module.exports = {
  devtool: "eval-source-map",
  entry: path.resolve("src", "main.js"),
  output: {
    path: path.resolve("dist"),
    filename: "out.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [],
  module: {
    loaders: loaders
  }
};
