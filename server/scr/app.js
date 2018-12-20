const express = require('express');
const mongoose = require('mongoose');
const app = express();
const logger = require('morgan');
const bodyParer = require('body-parser');
const v1 = require('./routes/v1');
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
app.use('/api/v1',v1);

// ------------------- Error ------------//
app.use((req, res, next) => { // 404 Not Found
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use ((err, req, res, next) => { // 4 param that's mean Error handline here
    const status = err.status || 500; //internal server err
    const error = err.message || 'Error procssing your request';

    res.status(status).send({
        error
    })

});
module.exports = app; 