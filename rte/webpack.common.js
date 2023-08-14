const path = require("path");
const pkg = require("./package.json");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", pkg.entry + ".tsx"),
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "@contentstack/venus-components": "@contentstack/venus-components",
  },
  mode: "production",
  output: {
    filename: pkg.output,
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "system",
  },
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            iesafe: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/public", to: path.resolve(__dirname, "dist/public") },
      ],
    }),
  ],
};
