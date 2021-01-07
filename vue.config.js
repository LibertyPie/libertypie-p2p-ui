const fs = require('fs')
const webpack = require("webpack")
const CopyPlugin = require('copy-webpack-plugin');

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
    },
     { 
        test: /\.(json)$/,
        from: 'src/data/', 
        to: 'data/',
        force: true
    }
  ])

  //add plugins
  webpackPlugins.push(copyPlugin)
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