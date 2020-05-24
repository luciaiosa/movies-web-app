const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    devServer: {
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    entry: {
        app: ["./src/index.tsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: devMode
            ? "js/[name].bundle.js"
            : "js/[name].[hash].bundle.js",
        publicPath: "/",
    },
    node: { fs: "empty" },
    devtool: "cheap-module-eval-source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(svg|png)$/,
                loader: "url-loader",
            },
            {
                test: /\.(ttf|eot|svg|png|ico|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            favicon: path.resolve(__dirname, "src", "favicon.ico"),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[hash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
        }),
    ],
};
