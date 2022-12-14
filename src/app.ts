'use strict';
const Koa = require('koa')
const koaBody = require('koa-body')
import typeKoaBody from 'koa-body/index'
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const views = require('koa-views')
const path = require('path')
const getRawBody = require('raw-body')

const app = new Koa();
const PORT = 3000


app.use(views(path.resolve(__dirname,'views'),{
    extension: "pug",
    map: {
        pug: 'pug',                     // 映射.pug檔到pug模板引擎
    }
}))
// app.use(koaBody())
app.use(
    async (ctx, next) => {
        if (!ctx.request.body && ctx.request.headers['content-type'] === "application/octet-stream"){
            ctx.request.body = await getRawBody(ctx.req,{
                encoding: true
            })
        }else{
            app.use(koaBody())
        }
        await next()
    })

app.use(indexRoute.routes(), indexRoute.allowedMethods())
app.use(userRoute.routes(), userRoute.allowedMethods())


// app.listen(PORT)

//進行測試時需要export app, 所以利用此判斷式來判斷是否app是被export使用,若不是,代表是直接運行server
if (require.main === module) {
    app.listen(PORT)
    console.log(`app is listening port ${PORT}...`)
}

module.exports = app
