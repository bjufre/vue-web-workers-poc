module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: "./server"
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: {
            loader: "worker-loader",
            options: {
            }
          }
        }
      ]
    }
  }
};
