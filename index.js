/**
 * 
 */
var express = require('express');

var app = express();


app.use(function(req, res, next){
	   console.log("A new request received at " + Date.now());
	   next();
});
//routes
app.get('/SkillsFramework', function(req, res){
	   res.send('Things');
	});
//routes

app.use(function(req, res){
	   console.log('Request dealt with at '+ Date.now());
	});

app.listen(8000);