var mongoose = require('mongoose');
var url = 'mongodb://localhost/Moviest';
mongoose.connect(url);
var conn = mongoose.connection;

conn.on('error', function(err){
    console.error('Error: ', err);
});

conn.on('open', function(){
    console.log('Connect');
});

var MovieSchema = mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    reviews: [String]
});

MovieSchema.methods.addReview = function(review) {
    this.reviews.push(review);
    return this.save();
 }
 

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;

// 초기 데이터 생성이라 주석 처리

// // 모델 생성하는 방법

// // 1. 객체로 만드는 방법
// var movie1 = new Movie({title: '어벤져스 ', director: '루소형제', year: 2019});
// movie1.save(function(err, result, rows){
//     if (err){
//         console.error('Error: ', err);
//     }else{
//         console.log("Success");
//     }
// })

// // 2. promise 이용
// Movie.create({title: '아이언맨', director: '오베디아', year: 2008}).then(function fulfilled(result){
//     console.log('Succenss: ',result);
// }, function rejected(err){
//     console.error('Error: ', err);
// });

// // 3. 콜백을 이용하는 방법
// Movie.create({title: '캡틴 아메리카', director:'크리스', year: 2011}, function(err, result){
//     if (err){
//         console.error('Error: ', err);
//     }else{
//         console.log("Success: ", result)
//     }
// })
