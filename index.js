var express =require('express');
var fs = require('fs');

var initialData = fs.readFileSync('initialDB.json');
var movieList = JSON.parse(initialData);

var app = express()
const port = process.env.PORT || 3000;

app.get("movies", showMovieList);

app.get("/", (req, res)=>{
    res.send("Hello Node.js")
})

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
    console.log("asdf")
}

app.listen(3000, ()=>{
    console.log(`server is listening at localhost:${port}`)
});