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
	   Skillset: new Array(),
	});
var Person = mongoose.model("Person", personSchema);
var skillSchema = mongoose.Schema({
	   Name: String,
	   ID: Number,
	   Description: String,
	});
var Skill = mongoose.model("Skill", skillSchema);



app.set('view engine', 'jade');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static('public'));


//////////////////////
app.get('/AddSkillToPerson', function(req,res){
	console.log("Add skill to person page requested");
	res.render('Skill-PersonPage')
})
app.post('/AddSkillToPerson', function(req,res){
	Person.update({req.params.ID},)
	res.render('SkillAddedToPerson')
	console.log("add skill to person requested(POST)");
})

app.get('/AddPeople', function(req, res){
	   res.render('SkillsFrameWorkLandingPage');
	   console.log("addPeoplePage requested");
	});
app.get('/AddSkills', function(req, res){
	   res.render('FrameworkSkills');
	   console.log("addSkillsPAge requested");
	});
app.post('/AddSkills', function(req, res){
	   console.log(req.body);
	   //
	   var skillInfo = req.body; //Get the parsed information
	   
	   if(!skillInfo.Name || !skillInfo.ID){
	      res.render('show_message', {
	         message: "Sorry, you provided worng info", type: "error"});
	   } else {
	      var newSkill = new Skill({
	         Name: skillInfo.Name,
	         ID: skillInfo.ID
	      });
			
	      newSkill.save(function(err, Skill){
	         if(err)
	            res.render('show_message_skill', {message: "Database error", type: "error"});
	         else
	            res.render('show_message_skill', {
	               message: "New Skill added", type: "success", skill: skillInfo});
	      });
	   }
	   //
	   console.log("Skill ADD requested(POST)");
	   
	});

app.post('/AddPeople', function(req, res){
	   console.log(req.body);
	   //
	   var personInfo = req.body; //Get the parsed information
	   
	   if(!personInfo.Name || !personInfo.ID){
	      res.render('show_message', {
	         message: "Sorry, you provided worng info", type: "error"});
	   } else {
	      var newPerson = new Person({
	         Name: personInfo.Name,
	         ID: personInfo.ID
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
	   console.log("Person ADD requested(POST)");
	   
	});
//lists all people
app.get('/SkillsFramework/People', function(req, res){
	   Person.find(function(err, response){
	      res.json(response);
	   });
	   console.log("People requested");
	});
app.get('/SkillsFramework/Skills', function(req, res){
	   Skill.find(function(err, response){
	      res.json(response);
	   });
	   console.log("Skills requested");
	});
//route for looking people up
app.get('/SkillsFrameWork/:name/:id',function(req,res){
	Person.findOneAndUpdate({Name: req.params.name}, {ID: req.params.id}, function(err, response) {
		   console.log(response);
		   res.json(response);
		});
	console.log("person requested");
})

app.get('/*',function(req,res){
	res.send("404 error page DNE")
})
///////////////////////

app.listen(8000);