var express = require('express');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var options = {format:'A4'};
const ejs = require('ejs');
var fs = require('fs');
var options = {format:'A4'};

// init App

var app = express();
//Set Template Engine
app.set('view engine', 'ejs');

// fetch data from request
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
res.render('home')
});

app.post('/',(req,res)=>{
    res.render('demopdf',{data:req.body.article},function(err,html){
        pdf.create(html, options).toFile('./public/uploads/demopdf.pdf', function(err, results) {
        if (err){
         return console.log(err);
        }
        else{
            console.log(res);
            var datafile = fs.readFileSync('./public/uploads/demopdf.pdf');
            res.header('content-type','application/pdf');
            res.send(datafile);
    }
          });
    })
})

//assign port 

app.listen(5005,()=>{
console.log('server started on port 5005');
    })