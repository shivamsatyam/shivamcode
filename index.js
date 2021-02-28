const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const passport = require('passport')
const post_code_schema = require('./post_code_schema')

require('./passport_setup');

app.use(cookieSession({
	
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
const static_path = path.join(__dirname,'public')
app.use(express.static(static_path))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
	
mongoose.connect('mongodb+srv://shivamsatyam:shivamsatyam123@cluster0.hrigk.mongodb.net/shivamcode?retryWrites=true&m=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
	console.log('the connect is succesfully established')
}).catch(()=>{
	console.log('the connection is not succesfully established')
})

app.use(passport.initialize());
app.use(passport.session());



app.get('/',(req,res)=>{
	console.log(req.user)
	res.render('index')
})


app.get('/google',passport.authenticate('google',{scope:['profile','email']}))

app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/failed'}),
function (req,res) {
	res.redirect('/')
})

app.get('/failed',(req,res)=>{
	res.send('failed')
})


app.get('/code',(req,res)=>{
	res.render('code')
})

app.post('/addpost',(req,res)=>{
	if (req.user) {
		
	title = req.body[0]
	html_code = req.body[1]
	css_code = req.body[2]
	js_code = req.body[3]

	post_code_schema({
		name:req.user.name,
		email:req.user.email,
		image:req.user.email,
		title:title,
		html_code:html_code,
		css_code:css_code,
		js_code:js_code
	}).save((err)=>{
		if (err) {
			throw err;
		}else{
			res.status(200)
		}
	})


	}

})


app.get('/other',(req,res)=>{
	res.render('other')
})


app.get('/your',(req,res)=>{
	if(req.user){
		post_code_schema.find({email:req.user.email}).then((data)=>{
			res.render('your',{data:data})
		

		})
	}else{
		res.redirect('/')
	}
})


app.get('/show/:id',(req,res)=>{
	post_code_schema.find({_id:req.params.id}).then((data)=>{
		let show_data = data[0];

		res.render('show',{data:show_data})
	})
})


app.get('/delete/:id/:other',(req,res)=>{
	post_code_schema.deleteOne({_id:req.params.id}).then((err)=>{
		res.redirect('/your')
	})
})


app.get('/logout',(req,res)=>{
	req.logout()
	res.redirect('/')
})


app.listen(port,()=>{
	console.log('the app is started')
})