(function ($) {

	var ownerReviewSection = $('#ownerReviews');
	var postReviewForm = $('#postReview');
	var postReviewText = $('#reviewTextBox');
	var postReviewRating = $('#reviewRatingBox');

	let req = {
		method: 'GET',
		url: 'http://localhost:3000/ownerReview',
		//contentType: "application/json",
	};

	$.ajax(req).then( (res) => {

        //append owner reviews to section

		//console.log("res: " + res);

		let reviewsText;
		//console.log("text: " + reviewsText);
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

	postReviewForm.submit(function (event) {
		event.preventDefault();
		console.log("submited");
		console.log(postReviewText.val())
		console.log(postReviewRating.val())

		let reviewText = postReviewText.val();
		let reviewRating = postReviewRating.val();

		reviewText = reviewText.trim();
		
		if(reviewText === "") {
			alert("reviewText is empty");
			return;
		}

		
		

		console.log("continued");
		//let reviewTextInput = $('#reviewTextInput');
		//let reviewRatingInput = $('#reviewRatingInput');

		//need to see actual dashboard
		//let beingReviewedId = $('#profileID');

		let req = {
			method: 'POST',
			url: 'http://localhost:3000/ownerReview',
			contentType: "application/json",
			data: JSON.stringify({
				text: postReviewText.val(),
				rating: postReviewRating.val(),
				beingReviewedId: "62fea5057ce30273374c2aa7"
			})

		};
	
		$.ajax(req).then(function (res) {
	
			//append owner reviews to section
	
			console.log("res: " + res);
	



		});

	});
	
})(window.jQuery);







