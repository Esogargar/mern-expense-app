const express = require('express');
const mongoose = require('mongoose');
const app = express();
const logger = require('morgan');
const bodyParer = require('body-parser');

// ------------------- DB Config ------------//
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
    console.log(`Faild to connect to DB ${err}`);
});

// ------------------- Middleware ---------//

app.use(logger('dev'));
app.use(bodyParer.json());
app.use(bodyParer.urlencoded({extended: true}));


// ------------------- Routes ------------//
app.post('/hello', (req,res) => {
    const name = req.body.name;
    res.send({
        massage: `welcom ${name}`
    })
});


module.exports = app; 