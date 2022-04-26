var path = require('path');
module.exports = {
    entry: './www/release/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
   };
   
