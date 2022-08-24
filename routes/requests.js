const express = require('express');
const router = express.Router();
const requests = require('../data/requests');
const { MongoUnexpectedServerResponseError } = require('mongodb');
const users = require('../data/users');


//TODO FIX THE BELOW ROUTE TO CREATE A NEW REQUEST ARRAY ELEMENT IN THE DATABASE
// adds request to the database. Used in form to submit a request
router.post('/', async (req, res) => {
	// Not sure if we should keep it this way so we can xss easily over each var or do it like registerSitter

	const ownerID = req.body.ownerID;
	const foundSitter = await users.findSitterByEmail(req.body.email); 
    const sitterID = foundSitter._id; 
    console.log(sitterID); 
    const requestText = req.body.requestText;
	const dogId = req.body.dogId;
	
    try {
    const requestID = await requests.addRequest(ownerID, sitterID, requestText, dogId);

    console.log("request Id: " + requestID);
    res.json({test: "test"});

	} catch (error) {
		return res.status(401).render('partials/reqsubmitted', {
			errors: error,
			title: 'Error Submitting Sitter Request',
		});
	}
	return res.render('partials/reqsubmitted', {Title: 'Submit Sitter Request'});
});



module.exports = router; 