const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require("dotenv").config();

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

// database
mongoose.connect(process.env.MONGODB)
.then(() => console.log("database connected"))
.catch((err) => console.log("database not connected", err))

// middleware
app.use('/', require('./routes/authRoutes'))

app.listen(3001, () => console.log("Server Running"))