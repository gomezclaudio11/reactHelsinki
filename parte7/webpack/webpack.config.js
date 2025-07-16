const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv.mode:', argv.mode)
//Define si es desarrollo o producción dinamicamente
   const backend_url = argv.mode === 'production'    
   ? 'https://notes2023.fly.dev/api/notes'    
   : 'http://localhost:3001/api/notes'
  
 return {
  entry: './src/index.js', //Archivo inicial desde donde 
  // Webpack empieza a construir el grafo de dependencias.
  output: { //Dónde y cómo guardar el archivo empaquetado.
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devServer: {//Sirve tu aplicación en localhost:3000,
  //  con compresión activada para que cargue más rápido.
      static: {        
        directory: path.resolve(__dirname, 'build'),
          },
        compress: true,
        port: 3000,  
  },
  //Esto permite ver el código original en las herramientas 
  // del navegador (útil para debuggear en desarrollo).
  devtool: 'source-map',
  module: {   //loaders Transforman archivos (JSX, CSS, imágenes, etc.).  
    rules: [        
      {          
        test: /\.js$/,          
        loader: 'babel-loader',          
        options: {            
          presets: ['@babel/preset-env', '@babel/preset-react'],          
        },        
      },
      {
        test: /\.css$/,      
        use: ['style-loader', 'css-loader'],    
      },      
    ],    
},
  plugins: [ //Tareas más amplias como minificar, generar HTML, limpiar carpetas.   
    new webpack.DefinePlugin({
      //inyecta la url backend directamente en el codigo        
      BACKEND_URL: JSON.stringify(backend_url)      
    })    
  ]
}
}
module.exports = config