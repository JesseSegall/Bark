const express = require('express');
const router = express.Router();
const requests = require('../data/requests');
const dogs = require('../data/dogs');
const users = require('../data/users');
const xss = require('xss');

router.post('/', async (req, res) => {
	const currUser = req.session.user;
	const email = xss(req.body.sitter_email);

	const foundSitter = await users.findSitterByEmail(email);
	const sitterID = foundSitter._id.toString();

	const userId = currUser._id.toString();
	const requestText = xss(req.body.requestText);
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
	const requestId = req.body.reqId;
	const reqAccept = await requests.completeRequest(requestId);

	return res.json(requestId);
});

module.exports = router;
