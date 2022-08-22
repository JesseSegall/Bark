
(function ($) {

	var ownerReviewSection = $('#ownerReviews');

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

	
})(window.jQuery);







