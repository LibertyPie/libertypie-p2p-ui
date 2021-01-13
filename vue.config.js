const fs = require('fs')
const webpack = require("webpack")
const purgecss = require("@fullhuman/postcss-purgecss");
//const autoprefixer = require("autoprefixer")
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require("@gfx/zopfli");

let webpackPlugins = []

if(process.env.NODE_ENV == "production"){

   const _copyPlugin =  new CopyPlugin({
        patterns: [
            { 
                from: 'src/locales/*.json', 
                to: 'locales/',
                force: true
            },
            { 
                from: 'src/abi/*.json', 
                to: 'abi/',
                force: true
            }
        ]
    })
    
    let typeToCompress = /\.(js|css|html|svg|json|png|jpe?g|woff(2?)|ttf|eot|map)$/

    webpackPlugins.push(new CompressionPlugin({
        cache: true,
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: typeToCompress,
        compressionOptions: { level: 11 },
        //threshold: 20480,
        minRatio: 0.8,
        deleteOriginalAssets: false
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
         //threshold: 20480,
         minRatio: 0.8,
      }))

    webpackPlugins.push(_copyPlugin);

} else {
    webpackPlugins.push( new BundleAnalyzerPlugin())
}

webpackPlugins.push(
    new webpack.ProvidePlugin({ 
           //Swal:   "sweetalert2"
       })
)


module.exports = {
    lintOnSave: false,

    configureWebpack: {
        plugins: webpackPlugins,

        optimization: {
            mangleWasmImports: true,
            removeAvailableModules: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            flagIncludedChunks: true,
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
                })
            ],
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