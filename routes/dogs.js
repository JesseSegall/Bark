const { response } = require("express");
const express = require("express");
const router = express.Router();
const data = require("../data/");
const dogsData = data.dogs;

router.post("/", async (req, res) => {
    const dogData = req.body;

    try {

        const ownerId = req.session.user._id;
        const dogName = dogData.dogName;
        const dogBreed = dogData.dogBreed;
        const dogWeight = dogData.dogWeight;
        const dogAge = dogData.dogAge;
        const dogDifficulty = dogData.dogDifficulty;
        const dogPic = dogData.picture;

        const dogDataInsert = await dogsData.addDog(ownerId, dogName, dogBreed, dogWeight, dogAge, dogDifficulty, dogPic);
        const dogId = dogDataInsert.insertedId.toString();

        console.log("DogId: " + dogId);

        return;


    } catch(e) {
        return res.status(500).json({error: e});
    }
});

router.get("/", async (req, res) => {

    const ownerId = req.session.user._id;
    
    try {

        const dogData = await dogsData.getDog(ownerId);

        return res.json(dogData);

    } catch(e) {
        return res.status(500).json({error: e});
    }
});

module.exports = router;