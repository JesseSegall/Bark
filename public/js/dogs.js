(function ($) {

	var addDogForm = $('#dogForm');
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

		let reviewsText;
		let reviewsRating;
		let reviewsPoster;
		
		for(i = 0; i < res.length; i++) {

			reviewsText = res[i].text;
			//console.log("text: " + reviewsText);
			reviewsRating = res[i].rating;
			reviewsPoster = res[i].posterId;

			ownerReviewSection.append("<p>"+ reviewsText +"</p>")
			ownerReviewSection.append("<p>"+ reviewsRating +"</p>")
			ownerReviewSection.append("<p>"+ reviewsPoster +"</p>")
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
				dogPicture: dogPicture
			})

		};
	
		$.ajax(req).then(function (res) {
	
			//append owner reviews to section
	
			console.log("res: " + res);

		});

	});
	
})(window.jQuery);







