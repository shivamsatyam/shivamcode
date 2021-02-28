const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./user_schema.js')
const mongoose = require('mongoose')



passport.serializeUser((user,done)=>{
	done(null,user.id)
})


passport.deserializeUser((id,done)=>{
	User.findById(id).then((user)=>{
		done(null,user)
	}).catch(()=>{
		console.log('the error occured in the google strategy')
	})
})


passport.use(new GoogleStrategy({
	clientID:'835547610495-nl6uqnv85i1ah0lm58m75gl005ptr380.apps.googleusercontent.com',
    clientSecret:'DMypJoooEzAVt_-48y4lOzWM',
    callbackURL:'http://localhost:3000/google/callback',
    passReqToCallback:true
},function (request,accessToken,refreshToken,profile,done) {
	console.log(profile)
	User.findOne({googleId:profile.id}).then((currentUser)=>{
		if (currentUser) {
			done(null,currentUser)
		}else{
			new User({
				googleId:profile.id,
				name:profile.displayName,
				email:profile.emails[0].value,
				image:profile.picture
			}).save().then((newUser)=>{
				done(null,newUser)
			})
		}
	})
}))






























