module.exports = {
  devServer: {
    proxy: {
      //代理标识
      '/api': {
        target: 'https://api.vvhan.com/api', //代理路径
        changeOrigin: true,
        pathRewrite: {
          // 标识替换
          // 原请求地址为 /api/todos 将'/api'替换''时，
          // 代理后的请求地址为： http://localhost:3000/api/todos
          // 若替换为'/other',则代理后的请求地址http://localhost:3000/api/other/todos
          '^/api': '',
        },
      },
    },
  },
};
