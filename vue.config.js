
const fs = require('fs')
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var ImageminPlugin = require('imagemin-webpack-plugin').default
const zopfli = require("@gfx/zopfli");


let webpackPlugins = []

if(process.env.NODE_ENV == "production"){

  const copyPlugin =  new CopyPlugin([
    { 
      test: /\.(json)$/,
      from: 'src/locales/', 
      to: 'locales/',
      force: true
    },
    { 
      test: /\.(json)$/,
      from: 'src/config/', 
      to: 'config/',
      force: true
    }
  ])

  const gzipCompress =     new CompressionPlugin({
    filename: "[path][base].br",
    algorithm: "brotliCompress",
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
    threshold: 10240,
    minRatio: 0.8,
  }),

     
  const compressBrotliPlugin = new CompressionPlugin({
    cache: true,
    filename: '[path].br[query]',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg|json|png|jpe?g|woff(2?)|ttf|eot)$/,
    compressionOptions: { level: 11 },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false
 }) 

  const imagemin = new ImageminPlugin()

  webpackPlugins.push(copyPlugin)
  webpackPlugins.push(imagemin)
  webpackPlugins.push(compressPlugin)

} else {
    webpackPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        plugins,
        optimization: {
            minimizer: [
              new TerserPlugin({
                test: /\.(js(\?.*)|json)?$/i,
                  parallel: true,
                  cache: true,
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
        }
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