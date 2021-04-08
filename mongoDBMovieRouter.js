var express = require('express');
const Movie = require('./movieModel');
var router = express.Router();

router.get('/movies', showMovieList);
router.get('/movies/:movieId', showMovieDetail);
router.post('/movies', addMovie);
router.delete('/movies/:movieId', deleteMovie);
router.put('/movies/:movieId', editMovie);
router.post('/movies/:movieId', addReview);

function addReview(req, res, next) {
    var movieId = req.params.movieId;
    var review = req.body.review;
    
    Movie.findById(movieId, function(err, doc) {
       if ( err ) {
          err.code = 500;
          return next(err);
       }  
       
       doc.addReview(review).then(function fulfilled(result) {
          res.send({msg:'success', result:result});
       }, function rejected(err) {
          err.code = 500;
          next(err);
       });  
       
       // doc.reviews.push(review);
       // doc.save().then(function fulfilled(result){
       //    res.send({msg:'success', result:result});
       // }, function rejected(err) {
       //    err.code = 500;
       //    next(err);
       // });        
    });
 }

function editMovie(req, res, next) {
    var movieId = req.params.movieId;
    var title = req.body.title;
    var director = req.body.director;
    var year = parseInt(req.body.year);
    
    Movie.findById(movieId, function(err, doc) {
       if ( err ) {
          err.code = 500;
          return next(err);
       }      
       
       if ( title )      
          doc.title = title;
       if ( director )
          doc.director = director;
       if ( year )
          doc.year = year;
       
       doc.save().then(function fulfilled(result){
          res.send({msg:'success', result:result});
       }, function rejected(err) {
          err.code = 500;
          next(err);
       });      
    });
 }

function deleteMovie(req, res, next){
    var movieId = req.params.movieId;
    Movie.findByIdAndRemove({_id: movieId}).then(function fulfilled(result){
        console.log("Success: ", result);
        res.send({msg: 'success deleted'});
    }, function rejected(err){
        err.code = 500;
        next(err);
    })

}

function addMovie(req, res, next){
    var title = req.body.title;
    var director = req.body.director;
    var year = parseInt(req.body.year);

    var movie = new Movie({title, director, year});
    movie.save().then(function fulfilled(result){
        console.log("Success: ", result);
        res.send({msg: 'success', id: result._id});
    }, function rejected(err){
        err.code = 500;
        next(err);
    })
}


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
    });
}

module.exports = router;