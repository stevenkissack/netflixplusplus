'use strict';
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: {
		content: './src/content',
		background: './src/background',
		options: './src/options'
	},
	plugins: [
		new webpack.DefinePlugin({
			process: '0'
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyWebpackPlugin([
					{ from: 'static', force: true }
			])
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new UglifyJSPlugin({
			sourceMap: true,
			uglifyOptions: {
				mangle: false,
				output: {
					beautify: true
				}
			}
		})
	);
}
