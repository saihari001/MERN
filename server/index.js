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
mongoose.connect("mongodb+srv://hariprasanth3196:hari2002@cluster0.gtsfys8.mongodb.net/auth")
.then(() => console.log("database connected"))
.catch((err) => console.log("database not connected", err))

// middleware
app.use('/', require('./routes/authRoutes'))

app.listen(process.env.PORT, () => console.log("Server Running"))