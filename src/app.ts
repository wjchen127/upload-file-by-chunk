'use strict';
const Koa = require('koa')
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')

const app = new Koa();
const PORT = 3000

app.use(indexRoute.routes(), indexRoute.allowedMethods())
app.use(userRoute.routes(), userRoute.allowedMethods())

app.listen(PORT)
console.log(`app is listening port ${PORT}...`)