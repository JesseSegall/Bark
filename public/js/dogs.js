(function ($) {

	var addDogForm = $('#dogForm');
	var dogSection = $('#dogSection');
	var dogName = $('#dogName');
	var dogBreed = $('#dogBreed');
	var dogWeight = $('#dogWeight');
	var dogAge = $('#dogAge');
	var dogDifficulty = $('#dogDifficulty');
	var dogPicture = $('#dogPicture');

	let req = {
		method: 'GET',
		url: 'http://localhost:3000/dogs',
		//contentType: "application/json",
	};

	$.ajax(req).then( (res) => {

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

			dogSection.append("<p>"+ dogName +"</p>")
			dogSection.append("<p>"+ dogBreed +"</p>")
			dogSection.append("<p>"+ dogWeight +"</p>")
			dogSection.append("<p>"+ dogAge +"</p>")
			dogSection.append("<p>"+ dogDifficulty +"</p>")
			dogSection.append("<p>"+ dogPicture +"</p>")
		}
	});

	addDogForm.submit(function (event) {
		event.preventDefault();
		console.log("submited");

		let req = {
			method: 'POST',
			url: 'http://localhost:3000/dogs',
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







