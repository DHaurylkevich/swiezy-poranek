const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        clean: true,
        publicPath: '/',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.vue', '.json', '.css']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[hash:8][ext]'
                }
            }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            title: "Świeży Poranek",
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "BASE_URL": JSON.stringify("https://swiezy-poranek.vercel.app" || "http://localhost:8080"),
            "VUE_APP_API_URL": JSON.stringify("https://swiezy-api.vercel.app/api" || "http://localhost:8080"),
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 8000,
        historyApiFallback: true,
        hot: true,
    },
    devtool: 'source-map',
};