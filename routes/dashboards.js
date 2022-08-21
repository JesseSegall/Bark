const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

router.get('/', (req, res) => {
	return res.render('partials/sitterDashboard', {});
});

module.exports = router;
