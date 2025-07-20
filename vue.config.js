const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/doctor-dashboard': {
        target: 'http://localhost:8080', // or your backend port
        changeOrigin: true,
      },
    },
  },
})
