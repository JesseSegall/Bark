const express = require('express');
const { dogs } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data/');
const usersData = data.users;
const reviewsData = data.reviews;
const requestsData = data.requests;
const dogsData = data.dogs;

router.get('/', async (req, res) => {
	const userId = req.session.user._id;

	try {
		const sitter = await usersData.getSitter(userId);

		const requestsInfo = await requestsData.getAllRequests();

		let dataArray = [];

		for (i = 0; i < sitter.savedRequests.length; i++) {
			for (j = 0; j < requestsInfo.length; j++) {
				if (sitter.savedRequests[i] == requestsInfo[j]._id) {
					dataArray.push(requestsInfo[j].ownerId);

					i++;
				}
			}
		}

		console.log(dataArray);

		let dataObject = [];

		//get owner name using owner id from array
		for (i = 0; i < dataArray.length; i++) {
			const owner = await usersData.getOwner(dataArray[i]);

			dataObject.push(owner);
		}

		let dogObject = [];
		for (i = 0; i < dataObject.length; i++) {
			const dog = await dogsData.getDogName(dataObject[i].dogs[0]);

			dogObject.push(dog);
		}

		let passThru = {
			dogObject: dogObject,
			ownerObject: dataObject,
		};

		console.log(passThru);

		return res.json(passThru);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.get('/dog', async (req, res) => {
	console.log(req.body.dogId);

	try {
		return res.json(owner);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.post('/', async (req, res) => {
	//console.log("reqBody: " + req.body);
	const reqBody = req.body;

	const text = reqBody.reviewText;
	let rating = reqBody.rating;
	const posterId = req.session.user._id;
	const dogId = reqBody.dogId;
	let beingReviewedId;
	if (reqBody.beingReviewedId) {
		beingReviewedId = reqBody.beingReviewedId;
	} else {
		beingReviewedId = await reviewsData.getUser(dogId);
	}

    if (reqBody.sitter_email_review) {
        const sitter = await usersData.getUserByEmail(req.body.sitter_email_review);
        beingReviewedId = sitter._id.toString();
        rating = reqBody.sitter_rating_review;
    }

	console.log(beingReviewedId);

	try {
		//const sitter = await usersData.getSitter(userId);

		const insertReview = await reviewsData.addReview(text, rating, posterId, beingReviewedId);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

module.exports = router;
