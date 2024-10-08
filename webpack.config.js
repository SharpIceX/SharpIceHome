import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import { EsbuildPlugin } from 'esbuild-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import localPostcssOptions from './postcss.config.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';

/** @type {import("esbuild-loader").LoaderOptions}*/
const esbuildOption = {
	loader: 'js',
	format: 'esm',
	target: 'es6',

	logLevel: 'info', // 设置了这个才有日志输出

	color: true,
	treeShaking: true,
	sourcemap: 'external',
	legalComments: 'eof', // 法律文本注释写入文件末尾
};

export default env => {
	const isDevelopmentMode = env.WEBPACK_SERVE?.toString() === 'true';

	/** @type {import("webpack").Configuration} */
	const config = {
		entry: path.resolve('./src/js/main.js'),
		output: {
			clean: true,
			filename: '__SharpIce__/assets/js/[name].[contenthash].js',
			path: path.resolve('./build'),
		},
		devServer: {
			hot: true,
			port: 8200,
			open: false,
			compress: true,
			host: '127.0.0.1',
			static: [path.resolve('./public')],
			client: {
				overlay: false,
			},
		},
		experiments: {
			outputModule: isDevelopmentMode ? false : true,
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
					],
				},
				{
					test: /\.less$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
						'less-loader',
					],
				},
				{
					test: /\.(woff|woff2)$/,
					type: 'asset/resource',
					generator: {
						filename: '__SharpIce__/assets/fonts/[name].[contenthash].[ext]',
					},
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'esbuild-loader',
					options: esbuildOption,
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
				{
					test: /\.svg$/,
					use: ['vue-loader', './tools/svg-vue-loader/main.js'],
				},
			],
		},
		plugins: [
			new VueLoaderPlugin(),
			new webpack.ProgressPlugin(),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: isDevelopmentMode,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve('./public'),
						to: path.resolve('./build'),
					},
				],
			}),
			new MiniCssExtractPlugin({
				filename: '__SharpIce__/assets/css/[name].[contenthash].css',
			}),
			new HtmlWebpackPlugin({
				publicPath: '/',
				scriptLoading: 'module',
				template: path.resolve('./template/index.html'),
			}),
			env.analyze && new BundleAnalyzerPlugin(),
		],
		optimization: {
			minimize: isDevelopmentMode ? false : true,
			minimizer: [
				new HtmlMinimizerPlugin(),
				new EsbuildPlugin({
					...esbuildOption,
					css: true,
					minify: true,
					minifySyntax: true,
					minifyWhitespace: true,
					minifyIdentifiers: true,
				}),
			],
		},
		devtool: 'source-map',
	};

	return config;
};
