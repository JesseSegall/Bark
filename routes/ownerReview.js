const { response } = require("express");
const express = require("express");
const router = express.Router();
const data = require("../data/");
const reviewsData = data.reviews;

router.post("/", async (req, res) => {
    const ownerReviewData = req.body;
    //console.log("test: " + req.body);
    /* console.log("reqBody: " + ownerReviewData);
    console.log(ownerReviewData); */

    try {
        //console.log(req.body);
        console.log("sessionID: " + req.session.user._id);

        const reviewText = ownerReviewData.text;
        const rating = ownerReviewData.rating;
        //const posterId = ownerReviewData.posterId;
        const posterId = req.session.user._id;
        const beingReviewedId = ownerReviewData.beingReviewedId;

        //console.log(posterId);

        const ownerReviewInsert = await reviewsData.addReview(reviewText, rating, posterId, beingReviewedId);
        //console.log(ownerReviewInsert);

        return;


    } catch(e) {
        return res.status(500).json({error: e});
    }
});

router.get("/", async (req, res) => {

    //console.log(req.body);
    const ownerId = req.session.user._id;
    console.log(ownerId);
    
    try {

        const ownerReviewData = await reviewsData.getReview(ownerId);
        //console.log("ownerReviewData: " + ownerReviewData);

        for(i in ownerReviewData) {
            //console.log(ownerReviewData[i]);
        }

        return res.json(ownerReviewData);

    } catch(e) {
        return res.status(500).json({error: e});
    }
});

module.exports = router;