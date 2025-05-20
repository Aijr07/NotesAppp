// const { merge } = require('webpack-merge');
// const path = require('path');
// const common = require('./webpack.common');

// module.exports = merge(common, {
//   mode: 'development',
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'dist'),
//     },
//     watchFiles: ['index.html', 'javascript/**/*', 'css/**/*'],
//     open: true,
//     client: {
//       overlay: {
//         errors: true,
//         warnings: false,
//       },
//     },
//   },
// });
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    proxy: [
      {
        context: ['/v2/notes'],
        target: 'http://notes-api.dicoding.dev',  // Target API
        secure: false,  // Jika Anda menggunakan HTTPS dan ada masalah sertifikat
      }
    ],
    watchFiles: ['index.html', 'javascript/**/*', 'css/**/*'],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
