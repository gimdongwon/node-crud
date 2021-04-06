var express =require('express');
var bodyParser = require('body-parser');

var app = express()

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(require("./movieRouter"))
app.use(handleError);

app.get("/", (req, res)=>{
    res.send("Hello Node.js")
})

function handleError(err, req, res, next){
    console.log('Error: ', err);
    res.status(err.code).send({msg: err.message});
}

app.listen(3000, ()=>{
    console.log(`server is listening at localhost:${port}`)
});