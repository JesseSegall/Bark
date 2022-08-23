const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

router.get('/', (req, res) => {
	const userData = req.session.user;

	return res.render('partials/tempDash', {
		title: 'Dashboard',
		user: userData,
	});
});

module.exports = router;
