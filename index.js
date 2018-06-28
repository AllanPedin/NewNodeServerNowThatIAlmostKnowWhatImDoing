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
	   Name: String,
	   ID: Number,
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
	   //
	   var personInfo = req.body; //Get the parsed information
	   
	   if(!personInfo.Name || !personInfo.ID){
	      res.render('show_message', {
	         message: "Sorry, you provided worng info", type: "error"});
	   } else {
	      var newPerson = new Person({
	         Name: personInfo.name,
	         ID: personInfo.age
	      });
			
	      newPerson.save(function(err, Person){
	         if(err)
	            res.render('show_message', {message: "Database error", type: "error"});
	         else
	            res.render('show_message', {
	               message: "New person added", type: "success", person: personInfo});
	      });
	   }
	   //
	   
	   res.send("Created Your Person!(jk nothing happened)");
	});
///////////////////////
app.use(function(req, res){
	   console.log('Request dealt with at '+ Date.now());
	});

app.listen(8000);