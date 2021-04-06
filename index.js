var express =require('express');
var bodyParser = require('body-parser');

var app = express()

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(require("./movieRouter"))

app.get("/", (req, res)=>{
    res.send("Hello Node.js")
})

app.use(handleError);

function handleError(err, req, res, next){
    console.log('Error: ', err);
    res.status(err.code).send({msg: err.message});
}

app.listen(3000, ()=>{
    console.log(`server is listening at localhost:${port}`)
});