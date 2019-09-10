module.exports = {
  devServer: {
    // host: 'localhost',
    host: "0.0.0.0",
    port: 8001, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        target: "http://localhost:9080",
        // target: "http://118.25.210.208:9080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/tx": {
        target: "http://video.kkboom.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/tx": ""
        }
      },
      "/kiwi": {
        target: "http://198.181.33.20",
        changeOrigin: true,
        pathRewrite: {
          "^/kiwi": ""
        }
      }
    }
  }
};
