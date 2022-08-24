const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

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
		
		return res.render('partials/ownerProfile', { owner: ownerData });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;