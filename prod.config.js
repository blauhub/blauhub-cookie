const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bhcookie.min.js",
    library: {
      name: "bhcookie",
      type: "umd",
    },
    // publicPath: "/",
  },
  devtool: "source-map",
  mode: "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: { react: "React", "react-dom": "ReactDOM" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};

module.exports = config;
