const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const reviewsData = data.reviews;

router.get("/", async (req, res) => {
	try {
		const owners = await users.getAllUsers();

		return res.render("partials/owners", { owner: owners });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const ownerData = await users.getOwner(req.params.id);
		console.log("ownerdata: " + ownerData);

		const reviewsAll = await reviewsData.getAllReviews();
		console.log("reviewsAll " + reviewsAll);
		let reviewArray = [];

		console.log("inhere");
		for(i=0; i < ownerData.reviews.length; i++) {

			for(j=0; j < reviewsAll.length; j++) {
				console.log(ownerData.reviews[i]);
				console.log(reviewsAll[j]._id.toString());
				if(ownerData.reviews[i] == reviewsAll[j]._id.toString()) {
					console.log("found");
					reviewArray.push(reviewsAll[i]);
				}
			}

		}

		console.log(reviewArray);
		
		return res.render('partials/ownerProfile', { owner: ownerData, reviews: reviewArray });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;