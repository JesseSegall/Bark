(function ($) {
	//TODO: Hide everything unless they hit update profile button
	var sitterProfileForm = $('#sitter-profile-update-form');
	var ownerProfileForm = $('#owner-profile-update-form');
	var firstName = $('#first_name');
	var lastName = $('#last_name');
	var street = $('#inputStreet');
	var city = $('#inputCity');
	var state = $('#inputState');
	var zip = $('#inputZip');
	var country = $('#inputCountry');

	if (sitterProfileForm.length > 0) {
		var smallDog = $('#small-dog-input');
		var mediumDog = $('#medium-dog-input');
		var largeDog = $('#large-dog-input');
		var difficultDog = $('#difficult-dog-input');
	}

	let req = {
		method: 'GET',
		url: '/dashboards/profileEdit',
		//contentType: "application/json",
	};

	$.ajax(req).then((res) => {
		console.log(res);
		//TO done: Error handling for all user inputs make sure they are strings etc
		if (!res.user.firstName || typeof(res.user.firstName) != 'string') throw "bad input!"
		firstName.val(res.user.firstName);
		if (!res.user.lastName || typeof(res.user.lastName) != 'string') throw "bad input!"
		lastName.val(res.user.lastName);
		if (!res.user.address.street || typeof(res.user.address.street) != 'string') throw "bad input!"
		street.val(res.user.address.street);
		if (!res.user.address.city || typeof(res.user.address.city) != 'string') throw "bad input!"
		city.val(res.user.address.city);
		if (!res.user.address.state || typeof(res.user.address.state) != 'string') throw "bad input!"
		state.val(res.user.address.state);
		if (!res.user.address.zip || typeof(res.user.address.zip) != 'string') throw "bad input!"
		zip.val(res.user.address.zip);
		country.val(res.user.address.country);
		if (!res.user.address.country || typeof(res.user.address.country) != 'string') throw "bad input!"
		if (sitterProfileForm.length > 0) {
			smallDog.val(res.user.price.smallDog);
			mediumDog.val(res.user.price.mediumDog);
			largeDog.val(res.user.price.largeDog);
			difficultDog.val(res.user.price.difficultDog);
		}

		/*         for(i = 0; i < res.length; i++) {
            
        } */
	});
	// Don't touch this
	sitterProfileForm.submit(function (event) {
		event.preventDefault();
		console.log('submited');

		let req = {
			method: 'POST',
			url: '/dashboards/profileEdit',
			contentType: 'application/json',
			data: JSON.stringify({
				firstName: firstName.val(),
				lastName: lastName.val(),
				address: {
					street: street.val(),
					city: city.val(),
					state: state.val(),
					zip: zip.val(),
					country: country.val(),
				},
				price: {
					smallDog: smallDog.val(),
					mediumDog: mediumDog.val(),
					largeDog: largeDog.val(),
					difficultDog: difficultDog.val(),
				},
			}),
		};

		$.ajax(req).then(function (res) {
			//append owner reviews to section

			console.log('res: ' + res);
		});
	});
	// Don't touch this
	ownerProfileForm.submit(function (event) {
		event.preventDefault();
		console.log('submited');

		let req = {
			method: 'POST',
			url: '/dashboards/profileEdit',
			contentType: 'application/json',
			data: JSON.stringify({
				firstName: firstName.val(),
				lastName: lastName.val(),
				address: {
					street: street.val(),
					city: city.val(),
					state: state.val(),
					zip: zip.val(),
					country: country.val(),
				},
			}),
		};

		$.ajax(req).then(function (res) {
			//append owner reviews to section

			console.log('res: ' + res);
		});
	});
})(window.jQuery);
