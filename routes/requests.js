const express = require('express');
const router = express.Router();
const requests = require('../data/requests');
const dogs = require('../data/dogs');
const users = require('../data/users');

//TODO FIX THE BELOW ROUTE TO CREATE A NEW REQUEST ARRAY ELEMENT IN THE DATABASE
// adds request to the database. Used in form to submit a request
router.post('/', async (req, res) => {
	// Not sure if we should keep it this way so we can xss easily over each var or do it like registerSitter
	const currUser = req.session.user;
	const email = req.body.sitter_email;
	console.log(email);
	const foundSitter = await users.findSitterByEmail(email);
	const sitterID = foundSitter._id.toString();
	console.log(sitterID);
	const userId = currUser._id.toString();
	const requestText = req.body.requestText;
	const dogId = currUser.dogs[0];

	try {
		const requestId = await requests.addRequest(userId, sitterID, requestText, dogId);

		console.log('request Id: ' + requestID);
		res.json({ test: 'test' });
	} catch (error) {
		return res.status(401).render('partials/reqsubmitted', {
			errors: error,
			title: 'Error Submitting Sitter Request',
		});
	}

	return res.render('partials/reqsubmitted', { Title: 'Submit Sitter Request' });
});

router.get('/requestId', async (req, res) => {
	user = req.session.user;

	let reqArray = [];
	for (i = 0; i < user.requests.length; i++) {
		let ownerReq = await requests.getRequest(user.requests[i]);
		reqArray.push(ownerReq);
	}
	return res.json(reqArray);
});

router.post('/accept', async (req, res) => {
	console.log(req.body.reqId);
	const requestId = req.body.reqId;

	return requestId;
})

module.exports = router;
