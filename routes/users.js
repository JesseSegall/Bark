const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require('../data');
const { requests } = require('../data');
const { MongoUnexpectedServerResponseError } = require('mongodb');
const { partials } = require('handlebars');
const xss = require('xss');

const salt = 8;

const users = data.users;
//TODO: On all try catches add error res to a code like 404, 401, etc

router.get('/', async (req, res) => {
	if (req.session.user) {
		res.redirect('/dashboards');
	} else {
		return res.render('partials/landingPage', {});
	}
});

router.get('/userChoice', async (req, res) => {
	return res.render('partials/userChoice', {});
});

router.get('/About', async (req, res) => {
	return res.render('partials/about', {});
});

router.get('/signin', async (req, res) => {
	return res.render('partials/signin', { title: 'Signin' });
});

router.post('/signin', async (req, res) => {
	const username = req.body.user_name.trim();
	const password = req.body.password;
	try {
		const user = await users.findUser(username);
		console.log(user);

		let passwordCheck = await bcrypt.compare(password, user.password);
		console.log(passwordCheck);
		// Passwords match set the current user to session and send them to their dashboard
		if (!passwordCheck) {
			return res.render(
				'partials/signin',
				{ errors: 'Incorrect username or password' },
				{ title: 'Sign in' }
			);
		}
		req.session.user = user;
		console.log('This below is the cookie ');
		console.log(req.session.user);
		return res.redirect('/dashboards');
	} catch (error) {
		return res.render('partials/signin', { title: 'Sign in', errors: error });
	}
});

router.get('/registerOwner', async (req, res) => {
	return res.render('partials/ownerReg', { title: 'Owner Registration' });
});

router.post('/registerOwner', async (req, res) => {
	// TODO: Add error handling here, make sure string and not empty etc

	const firstName = xss(req.body.first_name);
	const lastName = xss(req.body.last_name);
	const email = xss(req.body.email);
	const userName = xss(req.body.user_name);
	const password = xss(req.body.password);
	const gender = xss(req.body.gender);
	try {
		const hash = await bcrypt.hash(password, salt);
		const newOwner = await users.addOwner(firstName, lastName, email, userName, hash, gender);
		
		//input not be blank and must be a string 
		if(firstName == "" || typeof firstName !== 'string') throw (error); 
		if(lastName == "" || typeof lastName !== 'string') throw (error); 
		if(email == "" || typeof email !== 'string') throw (error); 
		if(userName == "" || typeof userName !== 'string') throw (error); 
		if(password == "" || typeof password !== 'string') throw (error);
		if(gender == "" || typeof gender !== 'string') throw (error); 


		req.session.user = newOwner;
	} catch (error) {
		//TODO: whenever a req.session.user is assigned, if auth fails we need to add isAuth false like I did below
		return res.status(401).render('partials/ownerReg', {
			errors: error,
			title: 'Owner Registration',
			isAuth: false,
		});
	}

	return res.redirect('/');
});

router.get('/registerSitter', async (req, res) => {
	res.render('partials/sitterReg', { title: 'Sitter Registration' });
});

router.post('/registerSitter', async (req, res) => {
	// TODO: Add error handling here, make sure string and not empty etc
	const user_name = xss(req.body.user_name);
	const first_name = xss(req.body.first_name);
	const last_name = xss(req.body.last_name);
	const email = xss(req.body.email);
	const password = xss(req.body.password);
	const small_dog = xss(req.body.small_dog);
	const medium_dog = xss(req.body.medium_dog);
	const large_dog = xss(req.body.large_dog);
	const difficult_dog = xss(req.body.difficult_dog);

	let dogSize = [];
	let diffDog;
	if (small_dog) {
		dogSize.push('Small');
	}
	if (medium_dog) {
		dogSize.push('Medium');
	}
	if (large_dog) {
		dogSize.push('Large');
	}
	if (difficult_dog) {
		diffDog = true;
	} else {
		diffDog = false;
	}

	try {

	if(user_name == "" || typeof user_name !== 'string') throw (error); 
	if(first_name == "" || typeof first_name !== 'string') throw (error); 
	if(last_name == "" || typeof last_name !== 'string') throw (error); 
	if(email == "" || typeof email !== 'string') throw (error); 
	if(password == "" || typeof password !== 'string') throw (error); 

		const hash = await bcrypt.hash(password, salt);
		const newSitter = await users.addSitter(
			first_name,
			last_name,
			email,
			user_name,
			hash,
			dogSize,
			diffDog
		);
		req.session.user = newSitter;
	} catch (error) {
		return res.status(401).render('partials/sitterReg', {
			errors: error,
			title: 'Sitter Registration',
			isAuth: false,
		});
	}

	return res.redirect('/'); // Should redirect to either home page or straight to their dashboard after registration
});

router.get('/searchSitter/:id', async (req, res) => {
	const sitterData = await users.getSitter(req.params.id);
	res.render('partials/sitterProfile', {
		sitter: sitterData,
		title: 'Sitter Profile',
	});
});

router.get('/searchSitter/', async (req, res) => {
	try{
		if (!req.session.user.owner || req.session.user.sitter) {
			return res.render('partials/signin', {
				title: 'Sign In',
				errors: 'Please log into your owner account to access the Sitter Search',
			});
		}
		return res.render('partials/sitterList', { title: 'Search for a sitter' });
	}
	catch(e){
		res.render(`partials/signin`, {title: `Sign In`, errors: `Please log in to owner account to access sitter search`});
		console.log(e)
	}
	
	
});

// Helper function for search to see if it contains sections of letters
function filter(array, string) {
	return array.filter(RegExp.prototype.test, new RegExp([...string].join('.*'), 'i'));
}

// TODO: Error handling
router.post('/searchSitter', async (req, res) => {
	try {
		// REGEX to get rid of whitespace between first and last name in search

		const searchTermFull = xss(req.body.search_term.toLowerCase().replace(/\s/g, ''));

		let nameArray = [];
		let sitterArray = [];

		const sitterList = await users.getAllSitters();
		let currentUser;

		// Push each first and last name into new array so it can work with the helper
		for (i = 0; i < sitterList.length; i++) {
			nameArray.push(sitterList[i].firstName + sitterList[i].lastName);
		}

		// Store all names that matched
		currentUser = filter(nameArray, searchTermFull);

		// Find each sitter that matched the search term and push into an array
		for (i = 0; i < sitterList.length; i++) {
			for (j = 0; j < currentUser.length; j++) {
				if (
					sitterList[i].firstName.toLowerCase() + sitterList[i].lastName.toLowerCase() ==
					currentUser[j].toLowerCase()
				) {
					sitterArray.push(sitterList[i]);
				}
			}
		}

		if (!currentUser) {
			return res.render('partials/sitterList', {
				errors: 'No sitter matched that name.',
			});
		}

		return res.render('partials/sitterList', {
			data: sitterArray,
			title: 'Search for a Sitter',
		});
	} catch (error) {
		return res.render('partials/sitterList', {
			errors: error,
			title: 'Search for a Sitter',
		});
	}
});

router.get('/logout', async (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
