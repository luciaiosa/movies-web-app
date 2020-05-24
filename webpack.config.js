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
        alias: {
            "@components": path.resolve(__dirname, "src", "components"),
            "@config": path.resolve(__dirname, "src", "config"),
            "@containers": path.resolve(__dirname, "src", "containers"),
            "@hooks": path.resolve(__dirname, "src", "hooks"),
            "@services": path.resolve(__dirname, "src", "services"),
            "@stores": path.resolve(__dirname, "src", "store")
        },
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
