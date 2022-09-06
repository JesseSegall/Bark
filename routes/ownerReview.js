const { response } = require("express");
const express = require("express");
const router = express.Router();
const data = require("../data/");
const reviewsData = data.reviews;

router.post("/", async (req, res) => {
    const ownerReviewData = req.body;

    try {

        const reviewText = ownerReviewData.text;
        const rating = ownerReviewData.rating;
        const posterId = req.session.user._id;
        const beingReviewedId = ownerReviewData.beingReviewedId;

        const ownerReviewInsert = await reviewsData.addReview(reviewText, rating, posterId, beingReviewedId);

        return;


    } catch(e) {
        return res.status(500).json({error: e});
    }
});

router.get("/", async (req, res) => {

    const ownerId = req.session.user._id;
    
    try {

        const ownerReviewData = await reviewsData.getReview(ownerId);

        for(i in ownerReviewData) {
            //console.log(ownerReviewData[i]);
        }

        return res.json(ownerReviewData);

    } catch(e) {
        return res.status(500).json({error: e});
    }
});

module.exports = router;