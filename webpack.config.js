var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: './client/main.js',
	output: {
		filename: 'dist/bundle.js'
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js',
			vueRouter: 'vue-router/dist/vue.js'
		},
		extensions: ['.js', '.vue', '.json']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: true
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("./dist/styles.css"),
		new webpack.DefinePlugin({
			//'process.env': {
				//NODE_ENV: '"production"'
			//}
		}),
		//new UglifyJsPlugin()		
	]
}
