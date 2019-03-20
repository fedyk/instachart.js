const path = require("path");

module.exports = {
  mode: "development",
  devtool: "none",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  output: {
    filename: "index.js",
    library: "library",
    libraryTarget: "var",
    path: path.resolve(__dirname, "dist")
  }
};
