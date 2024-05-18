import path from "path";
import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import TerserPlugin from "terser-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import localPostcssOptions from "./postcss.config.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";

export default (env) => {
	const isDevelopmentMode = env.WEBPACK_SERVE?.toString() === "true";

	return {
		entry: path.resolve("./src/js/main.js"),
		output: {
			clean: true,
			filename: "module.js",
			libraryTarget: "umd",
			path: path.resolve("./build"),
		},
		devServer: {
			hot: true,
			port: 8200,
			open: false,
			compress: true,
			host: "127.0.0.1",
			static: [path.resolve("./public")],
			client: {
				overlay: false,
			},
		},
		module: {
			rules: [
				{
					test: /\.(css|less)$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
						"less-loader",
					],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					type: "asset/resource",
					generator: {
						filename: "assets/fonts/[name][ext]",
					},
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
				},
				{
					test: /\.vue$/,
					loader: "vue-loader",
				},
			],
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new VueLoaderPlugin(),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: isDevelopmentMode,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve("./public"),
						to: path.resolve("./build"),
					},
				],
			}),
			new MiniCssExtractPlugin({
				filename: "style.css",
			}),
			new HtmlWebpackPlugin({
				template: path.resolve("./template/index.html"),
				publicPath: "/",
			}),
		],
		optimization: {
			minimize: isDevelopmentMode ? false : true,
			minimizer: [
				new TerserPlugin(),
				new JsonMinimizerPlugin(),
				new HtmlMinimizerPlugin(),
				new CssMinimizerPlugin(),
			],
		},
		devtool: isDevelopmentMode ? "source-map" : false,
	};
};
