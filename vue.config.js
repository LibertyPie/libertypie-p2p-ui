const fs = require('fs')
const webpack = require("webpack")
const purgecss = require("@fullhuman/postcss-purgecss");
//const autoprefixer = require("autoprefixer")
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default
const zlib = require("zlib");
const zopfli = require("@gfx/zopfli");
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

let webpackPlugins = []

if(process.env.NODE_ENV == "production"){
    
   const _copyPlugin =  new CopyPlugin({
        patterns: [
           /* { 
                from: 'src/locales/*.json', 
                to: 'locales/',
                force: true
            },*/
            { 
                from: 'src/abi/*.json', 
                to: 'abi/',
                force: true
            }
        ]
    })
    
    let typeToCompress = /\.(js|css|html|svg|json|png|jpe?g|woff(2?)|ttf|eot|map)$/;

     webpackPlugins.push(  new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: typeToCompress,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 0,
        minRatio: 0.8,
      }))

     webpackPlugins.push(new CompressionPlugin({
        filename: "[path][base].gz",
        test: typeToCompress,
        compressionOptions: {
          numiterations: 15,
        },
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback);
        },
         threshold: 0,
         minRatio: 0.8,
      }))
    
    webpackPlugins.push( new ImageminPlugin());
    webpackPlugins.push(_copyPlugin);

} else {
    webpackPlugins.push( new BundleAnalyzerPlugin())
    webpackPlugins.push(new DuplicatePackageCheckerPlugin())
}

webpackPlugins.push(
    new webpack.ProvidePlugin({ 
           Swal:   "sweetalert2"
    })
)


module.exports = {
    lintOnSave: false,
    
    configureWebpack: {
        
        mode: process.env.NODE_ENV,

        plugins: webpackPlugins,

        optimization: {
   
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    terserOptions: {
                        mangle: true,
                        ie8: false,
                        safari10: false,
                        output: {
                            comments: false,
                        },
                        compress: true
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ],

            mangleWasmImports: true,
            removeAvailableModules: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            flagIncludedChunks: true,
            runtimeChunk: true,

            splitChunks: {
              cacheGroups: {
                styles: {
                  name: 'styles',
                  test: /\.css$/,
                  chunks: 'all',
                  enforce: true
                },
                scripts: {
                  name: 'scripts',
                  test: /\.js$/,
                  chunks: 'all',
                  enforce: true
                }
              }
            }
        },
      },
      css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-preset-env')({
                        browsers: 'last 2 versions',
                    }),
                    purgecss({
                        content: [
                          "./src/**/*.vue"
                        ],
                        whitelist: ["html", "body"],
                    }),
                    require('cssnano'),
                ],
            },
        },
    },

    devServer: {
        host: 'libertypie-dev.com',
        disableHostCheck: true,
        port: 8080,
        https: true,
        key: fs.readFileSync(__dirname+'/certs/libertypie-dev.com-key.pem'),
        cert: fs.readFileSync(__dirname+'/certs/libertypie-dev.com.pem'),
    }
}