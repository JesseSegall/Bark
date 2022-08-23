(function ($) {

    var sitterProfileForm = $('#sitter-profile-update-form');
    var ownerProfileForm = $('#owner-profile-update-form');
    var firstName = $('#first_name');
    var lastName = $('#last_name');
    var street = $('#inputStreet');
    var city = $('#inputCity');
    var state = $('#inputState');
    var zip = $('#inputZip');
    var country = $('#inputCountry');

	let req = {
		method: 'GET',
		url: '/dashboards/profileEdit',
		//contentType: "application/json",
	};

	$.ajax(req).then( (res) => {

        console.log(res);
        console.log(res.owner.firstName);
        console.log(firstName.val());
        console.log(res.owner.address);

        firstName.val(res.owner.firstName);
        lastName.val(res.owner.lastName);
        street.val(res.owner.address.street);
        city.val(res.owner.address.city);
        state.val(res.owner.address.state);
        zip.val(res.owner.address.zip);
        country.val(res.owner.address.country);


/*         for(i = 0; i < res.length; i++) {
            
        } */


	});

	sitterProfileForm.submit(function (event) {
		event.preventDefault();
		console.log("submited");

		let req = {
			method: 'POST',
			url: 'http://localhost:3000/dashboards/profileEdit',
			contentType: "application/json",
			data: JSON.stringify({
				firstName: firstName.val(),
				lastName: lastName.val(),
				address: {
                    street: street.val(),
                    city: city.val(),
                    state: state.val(),
                    zip: zip.val(),
                    country: country.val()
                },
                price: {
                    smallDog: smallDog,
                    mediumDog: mediumDog,
                    largeDog: largeDog
                }
			})
		};
	
		$.ajax(req).then(function (res) {
	
			//append owner reviews to section
	
			console.log("res: " + res);

		});

	});

    ownerProfileForm.submit(function (event) {
		event.preventDefault();
		console.log("submited");

		let req = {
			method: 'POST',
			url: 'http://localhost:3000/dashboards/profileEdit',
			contentType: "application/json",
			data: JSON.stringify({
				firstName: firstName.val(),
				lastName: lastName.val(),
				address: {
                    street: street.val(),
                    city: city.val(),
                    state: state.val(),
                    zip: zip.val(),
                    country: country.val()
                }
			})
		};
	
		$.ajax(req).then(function (res) {
	
			//append owner reviews to section
	
			console.log("res: " + res);

		});

	});
	
})(window.jQuery);







