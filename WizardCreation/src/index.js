const express = require('express')
const app = express()

const expressConfig = require('./configurations/expressConfig')
const hbsConfig = require('./configurations/hbsConfig')
const router = require('./router')


expressConfig(app)
hbsConfig(app)
app.use(router)
