const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const cors= require('cors')
const authController = require('./controllers/authController')
const uploadController = require('./controllers/uploadController')
const propertyController = require('./controllers/propertyController')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');

//MongoDB connect
mongoose.connect(process.env.MONGO_URL, ()=> console.log('MONGODB has been started'))


// routes and middlewares
app.use('/public/images', express.static('public/images'));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth", authController)
app.use("/property", propertyController)
app.use("/upload", uploadController)


//starting server

//npm run start
app.listen(process.env.PORT, ()=> console.log('Server has been started '))