'use strict';
const Koa = require('koa')
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')

const app = new Koa();
const PORT = 3000

app.use(indexRoute.routes(), indexRoute.allowedMethods())
app.use(userRoute.routes(), userRoute.allowedMethods())

// app.listen(PORT)

//進行測試時需要export app, 所以利用此判斷式來判斷是否app是被export使用,若不是,代表是直接運行server
if (require.main === module) {
    app.listen(PORT)
    console.log(`app is listening port ${PORT}...`)
}

module.exports = app
