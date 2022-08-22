
(($) => {

	var ownerReviewSection = $('ownerReviews');

	let req = {
		method: 'GET',
		url: '/ownerReview',
		// contentType: "application/json",
	};

	$.ajax(req).then( (res) => {

        //append owner reviews to section

		let reviewsText = res[0].text;
		let reviewsRating = res[0].rating;
		let reviewsPoster = res[0].posterId;

		ownerReviewSection.append("<p>"+ reviewsText +"</p>")
		ownerReviewSection.append("<p>"+ reviewsRating +"</p>")
		ownerReviewSection.append("<p>"+ reviewsPoster +"</p>")



	});

	
})(window.jQuery);







