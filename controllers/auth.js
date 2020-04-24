//Node Modules / Variables
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')

// Routes
// GET /auth/login - this is a page that renders the login form
router.get('/login', (req, res) => {
	res.render('auth/login')
})

// Post /auth/login - this is a place for login form to post to
router.post('/login', passport.authenticate('local', {
	successFlash: 'Successful Login - Welcome Back!',
	successRedirect: '/profile/user',
	failureFlash: 'Invalid Credentials',
	failureRedirect: '/auth/login'
}))

// GET /auth/signup - this is a page that renders the signup form
router.get('/signup', (req, res) => {
	res.render('auth/signup', { data: {} })
})

// POST /auth/signup
router.post('/signup', (req, res, next) => {
	if (req.body.password !== req.body.password_verify) {
		// Send a message on why things didnt work
		req.flash('error', 'Passwords do not match!')
		// Put the user back onto the signup form to try again
		res.render('auth/signup', { data: req.body, alerts: req.flash() })
	}
	else {
		// Passwords matched, now we'll find/create by the users email
		db.user.findOrCreate({
			where: { email: req.body.email },
			defaults: req.body
		})
		.then(([user, wasCreated]) => {
			if(wasCreated) {
				// Good - this was expected, they are actually new
				// AUTO LOGIN with passport
				passport.authenticate('local', {
					successFlash: 'Successful Login - Welcome!',
					successRedirect: '/profile/user',
					failureFlash: 'Invalid Credentials',
					failureRedirect: '/auth/login'
				})(req, res, next)
			}
			else {
				// Bad - this person actually already had an account (redirect to login)
				req.flash('error', 'Account already exists!')
				res.redirect('/auth/login')
			}
		})
		.catch(err => {
			// Print the whole error to the terminal
			console.log('Error creating a user', err)

			// CHeck for Sequelize validation errors (and make flash messages for them)
			if(err.errors) {
				err.errors.forEach(e => {
					if (e.type == 'Validation error') {
						req.flash('error', e.message)
					}
				})
				res.render('auth/signup', { data: req.body, alerts: req.flash() })
			}
			else {
				// Generic message for any other errors
				req.flash('error', 'Server Error')
			}

			// Redirect back to sign up
			res.redirect('/auth/signup')

		})
	}
	
})

router.get('/logout', (req, res) => {
	// Remove user data from the session
	req.logout()
	// Tell them good bye and redirect to Home
	req.flash('success', 'See you next time!')
	res.redirect('/')
})

// Export (allow me to include this in another page)
module.exports = router