const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundle.js'
      },

    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 8080,
        historyApiFallback: true
      },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [ "babel-loader","source-map-loader"]
        },
        {
          test:/\.css$/,
          use:['style-loader','css-loader']
        }  
      ]
    }  
};

