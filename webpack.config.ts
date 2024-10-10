import path from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { VueLoaderPlugin } from 'vue-loader';
import TerserPlugin from 'terser-webpack-plugin';
import localPostcssOptions from './postcss.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { WebpackConfiguration } from 'webpack-dev-server';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';

export default (env: Record<string, unknown>) => {
	const isDevelopmentMode = env.WEBPACK_SERVE?.toString() === 'true';

	return {
		entry: path.resolve('./src/main.ts'),
		output: {
			clean: true,
			path: path.resolve('./dist'),
			filename: '__SharpIce__/js/[name].[contenthash].js',
			library: {
				type: 'umd2',
			},
		},
		cache: {
			type: 'filesystem',
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
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							},
						},
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
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
							},
						},
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
						filename: '__SharpIce__/fonts/[name].[contenthash].[ext]',
					},
				},
				{
					test: /\.ts$/,
					loader: 'ts-loader',
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
				{
					test: /\.svg$/,
					use: ['vue-loader', 'svg-to-vue-loader'],
				},
			],
		},
		plugins: [
			new VueLoaderPlugin(),
			new WebpackBar({
				color: '#72C9FF',
				name: 'SharpIce Home',
				profile: isDevelopmentMode ? false : true,
			}),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: isDevelopmentMode,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve('./public'),
						to: path.resolve('./dist'),
					},
				],
			}),
			new HtmlWebpackPlugin({
				publicPath: '/',
				scriptLoading: 'module',
				template: path.resolve('./template/index.html'),
			}),
			new MiniCssExtractPlugin({
				filename: '__SharpIce__/css/[name].[contenthash].css',
			}),
			env.analyze ? new BundleAnalyzerPlugin() : undefined,
		],
		optimization: {
			minimize: isDevelopmentMode ? false : true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: 2020,
						compress: {
							drop_console: true,
							dead_code: true,
						},
						mangle: {
							keep_fnames: false,
						},
						output: {
							comments: false,
						},
					},
				}),
				new CssMinimizerPlugin({
					minimizerOptions: {
						preset: [
							'default',
							{
								discardDuplicates: true,
								mergeRules: true,
								mergeMedia: true,
								level: {
									1: {
										specialComments: 'none',
									},
									2: {
										removeUnused: true,
									},
								},
							},
						],
					},
				}),
				new HtmlMinimizerPlugin({
					minimizerOptions: {
						caseSensitive: false,
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						minifyCSS: true,
						minifyJS: true,
						removeComments: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
					},
				}),
			],
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 20000,
				maxSize: 250000,
				minChunks: 1,
				maxAsyncRequests: 30,
				automaticNameDelimiter: '~',
				cacheGroups: {
					vendors: {
						name: 'vendors',
						test: /[\\/]node_modules[\\/]/,
						minSize: 0,
						priority: -10,
						reuseExistingChunk: true,
					},
					default: {
						name: 'common',
						minSize: 0,
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
		},
		devtool: isDevelopmentMode ? 'eval-cheap-module-source-map' : false,
	} satisfies WebpackConfiguration;
};
