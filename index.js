var express =require('express');
var fs = require('fs');
var bodyParser = require('body-parser');



var initialData = fs.readFileSync('initialDB.json');
var movieList = JSON.parse(initialData);

var app = express()
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.get("/movies", showMovieList);
app.get("/movies/:movieId", showMovieDetail);
app.post("/movies/:movieId", addReview);

app.get("/", (req, res)=>{
    res.send("Hello Node.js")
})

function addReview(req, res, next){
    var movieId = req.params.movieId;
    var movie = findMovie(movieId);
    if (!movie){
        var error = new Error('Not Found')
        error.code = 404
        // res.status(404).send({msg: "Not Found"})
        return next(error);
    }
    var review = req.body.review;
    console.log(review, movie)
    movie.reviews.push(review);
    res.send({msg: "success"});
}

function findMovie(movieId){
    for(let i=0; i<movieList.length; i++){
        var item = movieList[i];
        if (item.movieId == movieId){
            return item
        }
    }
    return null
}

function showMovieDetail(req, res){
    var movieId = req.params.movieId;
    var movie = findMovie(movieId);
    if (!movie){
        res.status(404).send({msg: "Not Found"})
        return;
    }
    res.send(movie)
}

function showMovieList(req, res){
    var data = [];
    movieList.forEach(movie => {
        var info ={
            movieId: movie.movieId,
            title: movie.title
        };
        data.push(info)
    });
    var result = {
        count: data.length,
        data,
    }
    res.send(result)
}

app.listen(3000, ()=>{
    console.log(`server is listening at localhost:${port}`)
});