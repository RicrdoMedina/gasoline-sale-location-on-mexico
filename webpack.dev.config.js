const path = require('path')
const webpack = require('webpack')

// Para usar el HotModuleReplacement agregar el src que apunte al server <script src="http://localhost:8080/js/bundle.js"></script>

module.exports = {
  entry: path.resolve(__dirname,'src/js/index.js'),
  output: {
    filename: 'js/bundle.js'
  },
  devServer:{
    //Indicamos al dev server que use el HotModuleReplacement
    port: 8080,
    hot: true, // Para usar el HotModuleReplacement agregar el src que apunte al server <script src="http://localhost:8080/js/bundle.js"></script>
    open: true
  },
  module:{
    rules: [
      {
        test:/\.css$/,
        //Indicamos los loaders que se van a extraer
        use:['style-loader', 'css-loader','postcss-loader'] // Style loader agregara el css en el head
      },
      {
        test:/\.(jpg|png|gif|woff|eot|ttf|svg)$/,
        use:{
          loader: 'url-loader',
          options: {
            limit: 1,
          }
        }
      },
      {
        test:/\.js$/,
        use:{
          loader: 'babel-loader',
          //Agregar configuracion especial para agregar los preset con las versiones ecmascript que le daremos soporte
          options: {
            presets: ['es2015']
          }
        }
      },
    ]
  },
  plugins: [
    //Activar HotModuleReplacement
    new webpack.HotModuleReplacementPlugin()
  ]
}