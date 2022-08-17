const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/", async (req, res) => {
	try {
		const sitters = await users.getAllSitters();

		console.log("hello");

		return res.render("partials/sitters", { sitter: sitters });
	} catch (error) {
		res.status(500).json({ error: error });
	}

	// res.render("partials/sitters", {});
});

module.exports = router;
