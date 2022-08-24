const express = require("express");
const router = express.Router();
const data = require("../data/");
const usersData = data.users;

router.get("/", async (req, res) => {

    const userId = req.session.user._id;
    
    try {
        const sitter = await usersData.getSitter(userId);
        return res.json(sitter);

    } catch(e) {
        return res.status(500).json({error: e});
    }
});

module.exports = router;