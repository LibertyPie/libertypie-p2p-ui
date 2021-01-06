const fs = require('fs')
const webpack = require("webpack")

module.exports = {
    lintOnSave: false,

    configureWebpack: {
        plugins: [new webpack.ProvidePlugin({ 
         //   $:                'jquery-slim',
         //   jQuesry:          'jquery-slim',
         //   'window.jQuery':  "jquery-slim",
            Swal:             "sweetalert2"
        
        })]
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