const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require('../data');
const requests = require('../data/requests');
const { MongoUnexpectedServerResponseError } = require('mongodb');
const { partials } = require('handlebars');
const users = require('../data/users');


//TODO FIX THE BELOW ROUTE TO CREATE A NEW REQUEST ARRAY ELEMENT IN THE DATABASE
// adds request to the database. Used in form to submit a request
router.post('/requestSitter', async (req, res) => {
	// Not sure if we should keep it this way so we can xss easily over each var or do it like registerSitter

	const ownerID = req.body.ownerID;
	const sitterId = await users.findSitterByEmail(req.body.email)
    console.log(sitterId); 
	const dogId = req.body.dogId;
	const requestText = req.body.requestText;

	try {
		const newRequest = await requests.addRequest(ownerID, sitterId, dogId, requestText);

	} catch (error) {
		return res.status(401).render('partials/reqsubmitted', {
			errors: error,
			title: 'Error Submitting Sitter Request',
		});
	}
	return res.render('partials/reqsubmitted', 'Submit Sitter Request');
});

modules.export = router;