const express = require("express");
const { dogs } = require("../config/mongoCollections");
const router = express.Router();
const data = require("../data/");
const usersData = data.users;
const reviewsData = data.reviews;
const requestsData = data.requests;
const dogsData = data.dogs;

router.get("/", async (req, res) => {

    const userId = req.session.user._id;
    
    try {
        const sitter = await usersData.getSitter(userId);
        
        const requestsInfo = await requestsData.getAllRequests();
        console.log("requestsInfo:" + requestsInfo);
        let dataArray = [];

        for(i=0; i < sitter.savedRequests.length; i++) {
            console.log("inside i loop");
            for(j=0; j < requestsInfo.length; j++) {
                console.log("inside j loop");
                console.log(requestsInfo[j]._id.toString())
                console.log(sitter.savedRequests[i]);
                if(sitter.savedRequests[i] == requestsInfo[j]._id) {
                    dataArray.push(requestsInfo[j].dogId, requestsInfo[j].ownerId)
                    console.log(requestsInfo[j].dogId);
                    console.log(requestsInfo[j].ownerId);
                    i++;
                }
            }
        }

        console.log(dataArray);

        //get owner name using owner id from array

        //get dog name using dog id from array


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