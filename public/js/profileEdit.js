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

    console.log(sitterProfileForm.length);
    console.log(ownerProfileForm.length);

    if(sitterProfileForm.length > 0) { 
        var smallDog = $('#small-dog-input');
        var mediumDog = $('#medium-dog-input');
        var largeDog = $('#large-dog-input');
    }

	let req = {
		method: 'GET',
		url: '/dashboards/profileEdit',
		//contentType: "application/json",
	};

	$.ajax(req).then( (res) => {

        console.log(res);

        firstName.val(res.user.firstName);
        lastName.val(res.user.lastName);
        street.val(res.user.address.street);
        city.val(res.user.address.city);
        state.val(res.user.address.state);
        zip.val(res.user.address.zip);
        country.val(res.user.address.country);
        smallDog.val(res.user.price.small);
        mediumDog.val(res.user.price.medium);
        largeDog.val(res.user.price.large);


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







