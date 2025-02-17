const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        clean: true,
        publicPath: '/',
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
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
                use: [MiniCssExtractPlugin.loader, "css-loader"],
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
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 75,
                            },
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ],
                generator: {
                    filename: 'assets/[name].[hash:8][ext]'
                }
            }
        ],
    },
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin(
                {
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single',
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            title: "Świeży Poranek - Catering w Poznaniu",
            favicon: "./public/favicon.ico",
            scriptLoading: 'defer',
            preload: ['main.js'],
            prefetch: ['vendors~main.js'],
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
            insert: (linkTag) => document.head.appendChild(linkTag),
        }),
        new webpack.DefinePlugin({
            "BASE_URL": JSON.stringify("https://swiezy-poranek.vercel.app"),
            "VUE_APP_API_URL": JSON.stringify("https://swiezy-api.vercel.app/api"),
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/robots.txt', to: '.' },
                { from: 'public/sitemap.xml', to: '.' }
            ],
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '/',
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 8000,
        historyApiFallback: true,
        hot: true,
    },
};
