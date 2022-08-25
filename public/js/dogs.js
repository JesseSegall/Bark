(function ($) {

	var addDogForm = $('#add-dog-form');
	var dogName = $('#dog-name');
	var dogBreed = $('#dog-breed');
	var dogWeight = $('#dog-weight');
	var dogAge = $('#dog-age');
	var dogDifficulty = $('#dog-difficulty');
	var dogPicture = $('#dog-photo');

	let req = {
		method: 'GET',
		url: '/dogs',
		//contentType: "application/json",
	};

	$.ajax(req).then( (res) => {

		console.log("res: " + res);
		console.log("test");
		let dogName;
		let dogBreed;
		let dogWeight;
		let dogAge;
		let dogDifficulty;
		let dogPicture;
		
		for(i = 0; i < res.length; i++) {

			dogName = res[i].dogName;
			dogBreed = res[i].dogBreed;
			dogWeight = res[i].dogWeight;
			dogAge = res[i].dogAge;
			dogDifficulty = res[i].dogDifficulty;
			dogPicture = res[i].dogPicture;

			console.log(dogName);

/* 			dogSection.append("<p>"+ dogName +"</p>")
			dogSection.append("<p>"+ dogBreed +"</p>")
			dogSection.append("<p>"+ dogWeight +"</p>")
			dogSection.append("<p>"+ dogAge +"</p>")
			dogSection.append("<p>"+ dogDifficulty +"</p>")
			dogSection.append("<p>"+ dogPicture +"</p>") */
		}
	});

	addDogForm.submit(function (event) {
		event.preventDefault();
		console.log("submited");

		let req = {
			method: 'POST',
			url: '/dogs',
			contentType: "application/json",
			data: JSON.stringify({
				dogName: dogName.val(),
				dogBreed: dogBreed.val(),
				dogWeight: dogWeight.val(),
				dogAge: dogAge.val(),
				dogDifficulty: dogDifficulty.val(),
				dogPicture: dogPicture.val()
			})

		};
	
		$.ajax(req).then(function (res) {
	
			//append owner reviews to section
	
			console.log("res: " + res);

		});

	});
	
})(window.jQuery);







