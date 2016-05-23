var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var User = require('./models/user');


var app = express();
var PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://root:abc123@ds011943.mlab.com:11943/ecommercenode',function(err){
	if(err) {
		console.log(err);
	}else{
		console.log('Connected to the database');
	}

})
//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.render('main/home');
});

app.get('/about',function(req,res){
	res.render('main/about');
})

app.post('/users',function(req,res,next){

	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;


	user.save(function(err){
		if(err){
			return next(err);
		}else{
			res.json('Succesfully created a new user');
		}
	});
});

app.listen(PORT, function(err){
	if(err) throw err;
	console.log("Server is Running on port 3000")
});