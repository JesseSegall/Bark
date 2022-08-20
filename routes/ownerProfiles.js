const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/", async (req, res) => {
	try {
		const owners = await users.getAllUsers();
		//console.log(owners[0].firstName);

		return res.render("partials/owners", { owner: owners });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;