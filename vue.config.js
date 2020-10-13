module.exports = {
    publicPath:process.env.NODE_ENV === 'production'?'/production-sub-path/':'/',
    devServer:{
        proxy:{
            // 小葱api
            // '/get':{
            //     target:'http://api.xiaocongjisuan.com/enttra/drilicquestion/',
            //     changeOrigin: true
            // },

            '/g.asp':{
                target:'http://m.jxedt.com/mnksnew/',
                changeOrigin:true
            }
        }
    }
}