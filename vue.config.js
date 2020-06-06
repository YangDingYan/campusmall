module.exports = {
  lintOnSave:false, // 关闭eslint检查
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
