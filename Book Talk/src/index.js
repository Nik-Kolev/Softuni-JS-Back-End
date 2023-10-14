const express = require('express')
const mongooseConfig = require('./config/dbConfig')
const expressConfig = require('./config/expressConfig')
const hbsConfig = require('./config/hbsConfig')
const router = require('./router')

const app = express()

expressConfig(app)
mongooseConfig()
hbsConfig(app)

app.use(router)