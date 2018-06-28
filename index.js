/**
 * 
 */
var express = require('express');
var bodyParser =require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/my_db');
var upload = multer();
var app = express();

//
var personSchema = mongoose.Schema({
	   name: String,
	   age: Number,
	   nationality: String
	});
var Person = mongoose.model("Person", personSchema);
//

//app.get('/SkillsFramework', function(req, res){
//	   res.render('SkillsFrameWorkLandingPage');
//	});

app.set('view engine', 'jade');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static('public'));

app.use(function(req, res, next){
	   console.log("A new request received at " + Date.now());
	   next();
});

//////////////////////
app.get('/SkillsFramework', function(req, res){
	   res.render('SkillsFrameWorkLandingPage');
	});

app.post('/SkillsFramework', function(req, res){
	   console.log(req.body);
	   
	   res.send("Created Your Person!(jk nothing happened)");
	});
///////////////////////
app.use(function(req, res){
	   console.log('Request dealt with at '+ Date.now());
	});

app.listen(8000);