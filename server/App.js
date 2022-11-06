const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const signUp = require("./router/signUp.js");
const signIn = require("./router/signIn.js");
const upload = require("./router/upload.js");
const app = express();

const checkAuth = require("./middlewares/check-auth");

// mongoose.connect('')
mongoose.connect('mongodb://localhost:27017/videoServer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("Connected to MongoDB")})
.catch((err) => console.log(err));;

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/videos', express.static('media/uploads'));

// Routes:
app.use('/api/signUp', signUp);
app.use('/api/signIn', signIn);
app.use('/api/upload', upload)

module.exports = app;