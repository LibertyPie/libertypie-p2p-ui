const fs = require('fs')
const webpack = require("webpack")
//const CopyPlugin = require('copy-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const PurgecssPlugin = require('purgecss-webpack-plugin')
//const glob = require("glob")
//const path = require("path")

//const PATHS = {
//    src: path.join(__dirname, 'src')
//}

let webpackPlugins = []

if(process.env.NODE_ENV == "production"){

  /*const copyPlugin =  new CopyPlugin({
        patterns: [
            { 
                from: 'src/locales/*.json', 
                to: 'locales/',
                force: true
            },
            { 
                from: 'src/config/*.json', 
                to: 'config/',
                force: true
            },
            { 
                from: 'src/data/*.json', 
                to: 'data/',
                force: true
            }
        ]
    })
    */

  //add plugins

  webpackPlugins.push(new PurgecssPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
  }))

}

webpackPlugins.push(
    new webpack.ProvidePlugin({ 
           Swal:   "sweetalert2"
       })
)

module.exports = {
    lintOnSave: false,

    configureWebpack: {
        plugins: webpackPlugins
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