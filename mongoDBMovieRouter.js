var express = require('express');
const Movie = require('./movieModel');
var router = express.Router();

router.get('/movies', showMovieList);
router.get('/movies/:movieId', showMovieDetail);

function showMovieList (req, res, next){
    Movie.find({}, {_id:1, title:1}).then(function fulfilled(docs){
        console.log("Success:  ");
        var result = {
            count: docs.length,
            data: docs
        }
        res.send(result);
    }, function rejected(err){
        err.code = 500;
        next(err);
    })
}

function showMovieDetail(req, res, next){
    var movieId = req.params.movieId;
    Movie.findById(movieId).exec(function(err, doc){
        if (err){
            err.code = 500;
            next(err);
        }
        res.send(doc);
    })
}

module.exports = router;