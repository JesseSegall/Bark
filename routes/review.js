const express = require("express");
const { dogs } = require("../config/mongoCollections");
const router = express.Router();
const data = require("../data/");
const usersData = data.users;
const reviewsData = data.reviews;
const dogsData = data.dogs;

router.get("/", async (req, res) => {

    const userId = req.session.user._id;
    
    try {
        const sitter = await usersData.getSitter(userId);

        console.log("sitter: " + sitter.firstName);
        console.log("dogs: " + sitter.idOfDogSat);

        return res.json(sitter);

    } catch(e) {
        return res.status(500).json({error: e});
    }
});

router.get("/dog", async (req, res) => {
    
    console.log(req.body.dogId);
    //const dogId = req.body.dogId;

    try {
        //const owner = await reviewsData.getUser(dogId);
        return res.json(owner);

    } catch(e) {
        return res.status(500).json({error: e});
    }
});

router.post("/", async (req, res) => {
    //console.log("reqBody: " + req.body);
    const reqBody = req.body;

    const text = reqBody.reviewText;
    const rating = reqBody.rating;
    const posterId = req.session.user._id;
    const dogId = reqBody.dogId;

    const beingReviewedId = await reviewsData.getUser(dogId);

    console.log(beingReviewedId);

    try {
        //const sitter = await usersData.getSitter(userId);

        const insertReview = await reviewsData.addReview(text, rating, posterId, beingReviewedId);
        

    } catch(e) {
        return res.status(500).json({error: e});
    }

});

module.exports = router;