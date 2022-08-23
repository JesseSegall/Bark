const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

router.get('/', async (req, res) => {
	try {
		const sitters = await users.getAllSitters();

		return res.render('partials/sitters', { sitter: sitters, title: 'Available Sitters' });
	} catch (error) {
		return res.status(500).json({ error: error });
	}

	// res.render("partials/sitters", {});
});
router.get('/filterPriceHigh', async (req, res) => {
	const sitters = await users.filterPriceHighToLow();
	return res.json(sitters);
});
router.get('/test1', async (req, res) => {
	return res.render('partials/test');
});
module.exports = router;
