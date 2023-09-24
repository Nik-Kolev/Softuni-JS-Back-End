const express = require('express')
const dbConnect = require('./configurations/dbConfig')
const app = express()

const expressConfig = require('./configurations/expressConfig')
const hbsConfig = require('./configurations/hbsConfig')
const router = require('./router')


expressConfig(app)
hbsConfig(app)
dbConnect().then(() => console.log('Database is connected successfully!')).catch(err => { console.log(err) })

app.use(router)
