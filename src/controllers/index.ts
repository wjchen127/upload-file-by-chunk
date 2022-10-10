import { Context } from "koa";

const hello = (ctx: Context) => {
    ctx.body = "hello index"
}

module.exports = {
    hello
}