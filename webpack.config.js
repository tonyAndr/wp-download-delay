const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const HookShellScriptPlugin = require('hook-shell-script-webpack-plugin');
const datejs = require('dayjs');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const current_date = datejs().format('DD-MM-YY-HHmmss');


module.exports = {
	mode: NODE_ENV,
    entry: {
        admin: './src/js/admin.js',
        post: './src/js/post.js',
        redirect: './src/js/redirect.js',
        block: './src/js/block.js'
    },
    resolve: {
        extensions: ['.js']
    },
	output: {
		path: __dirname + '/build',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /.js?$/,
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-transform-async-to-generator',
							'@babel/plugin-proposal-object-rest-spread',
							[
								'@babel/plugin-transform-react-jsx', {
									'pragma': 'wp.element.createElement'
								}
							]
						],
                        // comments: true,
                        // minified: false
					}
				}],
				exclude: /node_modules/
			},
			{
				test: /\.(css|scss)$/,
				use: [ {
                    loader: MiniCssExtractPlugin.loader,
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
                        postcssOptions: {
                            plugins: [
                                require( 'autoprefixer' )
                            ]
                        },
					},
				},
				'sass-loader' ]
            }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
        new DependencyExtractionWebpackPlugin(),
        // IF DEV -> update .pot file ELSE -> create zip for freemius
        new HookShellScriptPlugin({
            done: NODE_ENV === 'development' ? [
                'wp i18n make-pot . ./languages/dload-delay-td.pot --exclude="src,.vscode,freemius" & wp i18n make-json ./languages --no-purge'
            ] : [`"c:/program files/7-zip/7z.exe" a -tzip "c:/dev/freemius_deploy/files-download-delay-${current_date}.zip" * -x!.git* -x!.vscode -x!node_modules -x!package* -x!webpack* -x!*.md`]
            // ...
          })
	],
    optimization: {
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        //   `...`,
          new CssMinimizerPlugin(),
        ],
      },
    // externals: {
    //     '@wordpress/i18n': { this: [ 'wp', 'i18n' ] }
    // }
};
