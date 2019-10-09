module.exports ={
   chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
          item
            .use(['style-loader',
            'css-loader',
            'sass-loader'])
            .loader('sass-resources-loader')
            .options({
              // Or array of paths
              resources: ['./src/static/scss/_minix.scss', './src/static/scss/common.scss']
            })
            .end()
        })
    }, 
    devServer: {
      // open: process.platform === 'darwin',
      // host: 'localhost',
      // open: true, //配置自动启动浏览器
      proxy: {
        '/api': {
          target: 'http://169.254.25.25:7002', //对应自己的接口
          pathRewrite:{
            "^/api":""
          }
        }
      }
     },
}