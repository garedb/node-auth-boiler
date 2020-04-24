// Require evironment variables
require('dotenv').config()

// Require node modules

let passport = require('passport')

// Reaquire any strategies (AKA types of auth that we want to use)
let LocalStrategy = require('passport-local').Strategy

// Import a refernce to our database
let db = require('../models')

// Serialization and deserialization functions
// These are for passport to use in order to store and lookup the user info
// SERIALIZE: Reduce a user object to just its ID field
passport.serializeUser((user, done) => {
	// Call the callback function with the user ID as an argument
	// done(err, id) - pass a null if no error
	done(null, user.id)
})

// DESERIALIZE: Reverse the process of the serialize function
// In other words, take a user's ID and return the full user object
passport.deserializeUser((id,  done) => {
	db.user.findByPk(id)
	.then(user => {
		done(null, user)
	})
	.catch(done)
})

// LOCAL STRATEGY: Using a database that we manage ourselves (not OAuth)
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, (email, password, done) => {
	// Try looking up the user by their email
	db.user.findOne({
		where: { email: email }
	})
	.then(foundUser => {
		// Check if there is a user; if yes, then check the password as well
		if (foundUser && foundUser.validPassword(password)) {
			// GOOD - provided correct credentials for logging in
			done(null, foundUser)
		}
		else {
			// BAD -- user does not exist or had bad password/username
			done(null, null)

		}
	})
	.catch(done)
}))

// Make sure to include this file into other files
module.exports = passport