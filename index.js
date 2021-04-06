var express =require('express');
var fs = require('fs');

var initialData = fs.readFileSync('initialDB.json');
var movieList = JSON.parse(initialData);

var app = express()
const port = process.env.PORT || 3000;

app.get("/movies", showMovieList);
app.get("/movies/:movieId", showMovieDetail)

app.get("/", (req, res)=>{
    res.send("Hello Node.js")
})

function showMovieDetail(req, res){
    var movieId = req.params.movieId;
    var movie = null;
    for(let i=0; i<movieList.length; i++){
        var item = movieList[i];
        if (item.movieId == movieId){
            movie = item;
            break;
        }
    }
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