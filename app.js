var morgan = require('morgan'); // log을 위한 미들웨어
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(require('./mongoDBMovieRouter'));
app.use(handleError);

app.listen(3000);

function handleError(err, req, res, next){
    res.status(err.code).send({msg: err.messages});
}

