var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.schema;


// The user schema attributes

var UserSchema = new mongoose.schema({
	email: {
		type:String,
		unique: true,
		lowercase: true
	},
	password:{
		type:String
	},
	profile:{
		name:{
			type:String,
			default: ''
		},
		picture:{
			type: String,
			default: ''
		},
		address: {
			type:String
		},
		history:[{
			date: Date,
			paid: {
				type: Number,
				default: 0,
			}
			// item:{

			// }
		}]
	} 
});


// hash the password before saving it the database
UserSchema.pre('save',function(next){
	
});


// compare password in the database and the one that the user type in