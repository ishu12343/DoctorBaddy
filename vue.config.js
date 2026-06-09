const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:8080', //  target: 'http://127.0.0.1:5000',Java backend API
        changeOrigin: true,
      },
    },
  },
})
