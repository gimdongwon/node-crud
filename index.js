var express =require('express');
var fs = require('fs');

var initialData = fs.readFileSync('initialDB.json');
var movieList = JSON.parse(initialData);

var app = express()

app.get("/", (req, res)=>{
    res.send("Hello Node.js")
})

app.listen(3000);