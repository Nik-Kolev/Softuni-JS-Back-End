const mongooseConfig = require('./config/dbConfig')
mongooseConfig()

const express = require('express')
const app = express()

const expressConfig = require('./config/expressConfig')
const hbsConfig = require('./config/hbsConfig')
const router = require('./router')

expressConfig(app)
hbsConfig(app)

app.use(router)