import {describe, expect, test, afterAll, it} from '@jest/globals'
const app = require('../app')
const request = require('supertest')
const server = app.listen(3000)
const indexTest = require('../controllers/index')

afterAll(()=>{
    server.close()
})

describe('GET /',()=>{
    it('回傳string', (done)=>{
        request(server)
        .get('/')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.text).toMatch('hello index')
            done()
        })
    })
})

