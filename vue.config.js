module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8443',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pages: {
    index: 'src/main.js',
    admin: 'src/admin.js'
  }
}
