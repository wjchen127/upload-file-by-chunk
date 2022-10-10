const indexRouter = require('@koa/router')()
const indexController = require('../controllers/index')

indexRouter.get('/', indexController.hello)

module.exports = indexRouter