const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:5000', // Your backend API
        changeOrigin: true,
      },
    },
  },
})
