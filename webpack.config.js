const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteWebPackPlugin = require('write-file-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { NODE_ENV } = process.env;

const plugins = [
	// Ignore all locale files of moment.js
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	new CleanWebpackPlugin({
		cleanOnceBeforeBuildPatterns: ['dist/app'],
	}),
	new HtmlWebpackPlugin({
		template: './public/index.html',
		alwaysWriteToDisk: true,
	}),
	new HtmlWebpackHarddiskPlugin(),
	new CopyWebpackPlugin(['./public/favicon.ico', './public/manifest.json']),
	new WriteWebPackPlugin(),
	new Dotenv(),
];

const isDevelopment = NODE_ENV === 'development';

module.exports = {
	mode: NODE_ENV || isDevelopment,
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: isDevelopment ? '[name].js' : '[name].[chunkhash:8].js',
	},
	optimization: {
		splitChunks: {
			chunks: 'initial',
		},
	},
	plugins,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							insertAt: 'top',
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.svg$/,
				use: [
					'@svgr/webpack',
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
		],
	},
};
