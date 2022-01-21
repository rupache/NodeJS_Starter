const express = require('express');
const app = express();

const mongoose = require('mongoose')
mongoose.connect('<<ADD HERE>>')
mongoose.connection.on('error', error => {
    console.log("Connection Failed.")
})

mongoose.connection.on('connected', success => {
    console.log("Connection Success.")
})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles: true
}));

const studentRoute = require('./api/routes/student');
app.use('/student', studentRoute);

const facultyRoute = require('./api/routes/faculty');
app.use('/faculty', facultyRoute);

const userRoute = require('./api/routes/user')
app.use('/user', userRoute);



app.use((req, res, next) => {
    res.status(404).json({
        error: 'bad request'
    })
})

module.exports = app;

// Install Node JS on windows
// npm init
// npm install express
// npm install -g nodemon
// create app folder => inside that create routes folder => create route for student.js
// create route for faculty.js
// create mondouser - 6q4gRO0gZzyQ7uWU
// npm install mongoose
// create a cluster in mongo atlas db and create a username and password
// use the same in the connction string above
// DEBUG - CHECK IP in Mongo DB
// npm install body-parser
// create model folder and create student.js
// create user.js
// npm install bcrypt for password encryption
// npm install jsonwebtoken
// JWT Token Decoder - https://jwt.io/
// npm install express-fileupload
// npm install cloudinary