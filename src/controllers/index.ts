import { Context } from "koa";
const path = require('path')
const fs = require('fs-extra')


const hello = (ctx: Context) => {
    ctx.body = "hello index"
}

const uploadGET = async (ctx: Context) => {
    await ctx.render('upload')
}

const uploadPOST = async (ctx: Context) => {
    const { name , size, currentChunkIndex, totalChunks } = ctx.request.query
    const isFirstChunk = parseInt(currentChunkIndex as string) === 0
    const isLastChunk = parseInt(currentChunkIndex as string) === parseInt(totalChunks as string)-1
    const data = ctx.request.body.split(",")[1]
    const buffer = Buffer.from(data,'base64')
    const ext = (name as string).split('.').pop()
    const tempFileName = 'temp_' + "." + ext
    
    if(isFirstChunk && fs.existsSync(path.join(__dirname,`../public/${tempFileName}`))){
        fs.unlinkSync(path.join(__dirname,`../public/${tempFileName}`))
    }
    fs.appendFileSync(path.join(__dirname,`../public/${tempFileName}`), buffer)
    if(isLastChunk){
        const finalFileName = name
        fs.renameSync(path.join(__dirname,`../public/${tempFileName}`), path.join(__dirname,`../public/${name}`))
        ctx.body = { msg:`uploaded:(${parseInt(currentChunkIndex as string)+1}/${totalChunks})` }
    }else{
        ctx.body = {msg:`uploaded:(${parseInt(currentChunkIndex as string)+1}/${totalChunks})`}
    }
}

function uid() {
    return Math.random().toString(36).slice(2);
}

module.exports = {
    hello,
    uploadGET,
    uploadPOST
}