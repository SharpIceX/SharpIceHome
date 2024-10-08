import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import { EsbuildPlugin } from 'esbuild-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import localPostcssOptions from './postcss.config.js';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';

export default env => {
	const isDevelopmentMode = env.WEBPACK_SERVE?.toString() === 'true';

	/** @type {import("esbuild-loader").LoaderOptions}*/
	const esbuildOption = {
		loader: 'js',
		format: 'esm',
		target: 'es2020',

		logLevel: 'info',

		color: true,
		treeShaking: true,
		legalComments: 'eof', // 法律文本注释写入文件末尾
		sourcemap: isDevelopmentMode ? 'inline' : false,
	};

	/** @type {import("webpack").Configuration} */
	const config = {
		entry: path.resolve('./src/js/main.js'),
		output: {
			clean: true,
			path: path.resolve('./build'),
			filename: '__SharpIce__/assets/js/[name].[contenthash].js',
			library: {
				type: isDevelopmentMode ? 'umd2' : 'module',
			},
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
						'style-loader',
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
						'style-loader',
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
					test: /\.woff2$/,
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
		devtool: isDevelopmentMode ? 'eval-cheap-module-source-map' : 'source-map',
	};

	return config;
};
