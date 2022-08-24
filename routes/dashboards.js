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

router.post('/profileEdit', async (req, res) => {
	const userEditProfile = req.body;
	const userData = req.session.user;

/* 	console.log("profile Edit route");
	console.log(userEditProfile); */
	try {

        const userId = req.session.user._id;
        const firstName = userEditProfile.firstName;
		const lastName = userEditProfile.lastName;
		const address = userEditProfile.address;
		const price = userEditProfile.price;

		//console.log("sitter: " + userData.sitter);
		if(userData.sitter) {
			//console.log("price: " + price);
			const userProfileInsert = await users.updateSitterProfile(userId, firstName, lastName, address, price);
		}
		else {
			const userProfileInsert = await users.updateOwnerProfile(userId, firstName, lastName, address);
		}

    } catch(e) {
        return res.status(500).json({error: e});
    }

	return;
});

router.get('/profileEdit', async (req, res) => {
	const userEditProfile = req.body;
	const userData = req.session.user;

	//console.log("profile Edit route");
	try {
		//console.log("in try/catch block");

		if(userData.owner) {
			const owner = await users.getOwner(userData._id);
			return res.json({user: owner});
		}
		else {
			const sitter = await users.getSitter(userData._id);
			return res.json({user: sitter});
		}


		

    } catch(e) {
        return res.status(500).json({error: e});
    }

});

module.exports = router;
