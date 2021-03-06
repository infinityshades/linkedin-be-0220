const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./src/routes/users/index');
const passport = require('passport');
const auth = require('./src/utils/auth');

mongoose.connect(process.env.MONGODBURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
})
.then(db => console.log(`connected to mongoDB`), err => console.log(`Error connecting to mongoDB`, err));

const port = process.env.PORT || 8181;

app.listen(port,() =>{
    console.log(`Server is launched at launchpad ${port}`);
});

app.use(express.json());
app.use(passport.initialize());
app.use('/users', userRoute);
