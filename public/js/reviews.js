(function ($) {

	var ownerReviewSection = $('#ownerReviews');
	var postReviewForm = $('#postReview');
	var postReviewText = $('#reviewTextBox');
	var postReviewRating = $('#reviewRatingBox');
	var reviewList = $('#reviewList');

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

			reviewList.append("<dd>Review text: "+ reviewsText +"</dd>")
			reviewList.append("<dd>Rating: "+ reviewsRating +"</dd>")
			reviewList.append("<dd>Reviewed by: "+ reviewsPoster +"</dd>")
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

	//get Completed Requests
	const $revTable = $('#review-table');
	const url = 'http://localhost:3000/review';

	$.getJSON(url).then((owners) => {
		owners.idOfDogSat.forEach((res) => {
			const dogId = res;
			console.log("dogId: " + res)

			const $tr = $('<tr>');
			$tr.data('id', dogId); // store id in row
			$tr.html(`<td><a href="../owners/${dogId}">Owner Profile</a></td>
			  <td>${dogId}</td>
			  <td><input type="text"></input></td>
			  <td><button>Accept</button></td>`);
			$revTable.append($tr);
		});
		// assign click handler function to all buttons
		$revTable.find('button').on('click', btnClick);
	});

	function btnClick(e) {
		const reqId = $(this).closest('tr').data('id');
		alert(reqId);
		
		let req = {
			method: 'POST',
			url: 'http://localhost:3000/review/reviewpost',
			contentType: 'application/json',
			data: JSON.stringify({
				reqId: reqId,
			}),
		};
		$.ajax(req).then(function (res) {});
		
	}
	
})(window.jQuery);







