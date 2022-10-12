const indexRouter = require('@koa/router')()
const indexController = require('../controllers/index')

indexRouter.get('/', indexController.hello)
indexRouter.get('/upload', indexController.uploadGET)
indexRouter.post('/upload', indexController.uploadPOST)

module.exports = indexRouter