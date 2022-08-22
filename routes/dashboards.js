const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

router.get('/', (req, res) => {
	const sitterData = req.session.user;
	return res.render('partials/sitterDashboard', { title: 'Dashboard' });
});

module.exports = router;
