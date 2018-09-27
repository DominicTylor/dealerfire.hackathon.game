'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: 'project.bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			},
			{
				test: [/\.vert$/, /\.frag$/],
				use: 'raw-loader'
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'CANVAS_RENDERER': JSON.stringify(true),
			'WEBGL_RENDERER': JSON.stringify(true)
		})
	]
};
