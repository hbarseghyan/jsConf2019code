const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  inject: "body"
});
process.env.CAM_ENV = process.env.CAM_ENV || "development";

module.exports = {
  entry: {
    app: ["./src/index.js"],
    vendor: ["react"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "/"),
    publicPath: "/"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, "./node_modules")]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },

  plugins: [HtmlWebpackPluginConfig]
};
