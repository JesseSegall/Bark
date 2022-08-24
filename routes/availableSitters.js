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

router.get('/allSitters', async (req, res) => {
	const sitters = await users.getAllSitters();
	return res.json(sitters);
});

router.get('/filterPriceHigh', async (req, res) => {
	const sitters = await users.filterPriceHighToLow();
	return res.json(sitters);
});

router.get('/filterPriceLow', async (req, res) => {
	const sitters = await users.filterPriceLowToHigh();
	return res.json(sitters);
});

router.get('/filterDogsSmall', async (req, res) => {
	const sitters = await users.filterDogSizeSmall();
	return res.json(sitters);
});
router.get('/filterDogsMedium', async (req, res) => {
	const sitters = await users.filterDogSizeMedium();
	return res.json(sitters);
});
router.get('/filterDogsLarge', async (req, res) => {
	const sitters = await users.filterDogSizeLarge();
	return res.json(sitters);
});
router.get('/filterDogsDifficult', async (req, res) => {
	const sitters = await users.filterDogDifficult();
	return res.json(sitters);
});

module.exports = router;
