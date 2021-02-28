const mongoose = require('mongoose')

let date = new Date()

const add_code = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	title:{
type:String,
		required:true
	},
	html_code:{
type:String
		
	},
	css_code:{
		type:String
		
	},
	js_code:{
		type:String
		
	},
	date:{
		type:String,
		default:date.toDateString()
	}

})




module.exports = new mongoose.model('codeData',add_code)













































