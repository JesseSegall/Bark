const express = require("express");
const router = express.Router();
const data = require("../data/");
const reviewsData = data.reviews;

router.post("/", async (req, res) => {
    const ownerReviewData = req.body;

    try {
        console.log(req.body);

        const reviewText = ownerReviewData.text;
        const rating = ownerReviewData.rating;
        const posterId = ownerReviewData.posterId;
        const beingReviewedId = ownerReviewData.beingReviewedId;

        const ownerReviewInsert = await reviewsData.addReview(reviewText, rating, posterId,beingReviewedId);
        console.log(ownerReviewInsert);

    } catch(e) {
        return res.status(500).json({error: e});
    }
});

module.exports = router;