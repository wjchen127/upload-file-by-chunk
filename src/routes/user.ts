const userRouter = require('@koa/router')()
const userController = require('../controllers/user')

userRouter.prefix('/user')
userRouter.get('/', userController.index)

module.exports = userRouter