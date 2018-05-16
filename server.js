const next = require('next')
const express = require('express')
const routes = require('./src/routes')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const dev = process.env.NODE_ENV !== 'production'
// eslint-disable-next-line
console.log(`NODE_ENV=${process.env.NODE_ENV}`)

const app = next({ dev })
const handler = routes.getRequestHandler(app)

app
  .prepare()
  .then(() => {
    express().use(handler).listen(process.env.PORT || 3001)
  })
