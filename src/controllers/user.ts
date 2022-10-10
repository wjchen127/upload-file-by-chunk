import { Context } from "koa";

const index = (ctx: Context) => {
    ctx.body = "user index page"
}

module.exports = {
    index
}