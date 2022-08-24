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

	$.ajax(req).then((res) => {
		//append owner reviews to section

		//console.log("res: " + res);

		let reviewsText;
		//console.log("text: " + reviewsText);
		let reviewsRating;
		let reviewsPoster;

		for (i = 0; i < res.length; i++) {
			reviewsText = res[i].text;
			//console.log("text: " + reviewsText);
			reviewsRating = res[i].rating;
			reviewsPoster = res[i].posterId;

			reviewList.append('<dd>Review text: ' + reviewsText + '</dd>');
			reviewList.append('<dd>Rating: ' + reviewsRating + '</dd>');
			reviewList.append('<dd>Reviewed by: ' + reviewsPoster + '</dd>');
		}
	});

	postReviewForm.submit(function (event) {
		event.preventDefault();
		console.log('submited');
		console.log(postReviewText.val());
		console.log(postReviewRating.val());
		//TODO: make sure they actually enter something and it can't be empty
		let reviewText = postReviewText.val();
		let reviewRating = postReviewRating.val();

		reviewText = reviewText.trim();

		if (reviewText === '') {
			alert('reviewText is empty');
			return;
		}

		console.log('continued');
		//let reviewTextInput = $('#reviewTextInput');
		//let reviewRatingInput = $('#reviewRatingInput');

		//need to see actual dashboard
		//let beingReviewedId = $('#profileID');

		let req = {
			method: 'POST',
			url: 'http://localhost:3000/ownerReview',
			contentType: 'application/json',
			data: JSON.stringify({
				text: postReviewText.val(),
				rating: postReviewRating.val(),
				beingReviewedId: '62fea5057ce30273374c2aa7',
			}),
		};

		$.ajax(req).then(function (res) {
			//append owner reviews to section
	
			console.log("res: " + res);
	



		});
	});

	//get Completed Requests
	const $revTable = $('#review-table');
	const url = 'http://localhost:3000/review';

	$.getJSON(url).then((dataObj) => {
		console.log("test: " + dataObj);
		console.log(dataObj.dogObject[0].dogName);
		console.log(dataObj.ownerObject[0].firstName);


		for(i=0; i < dataObj.dogObject.length; i++) {
			const dogName = dataObj.dogObject[i].dogName;
			const ownerName = dataObj.ownerObject[i].firstName + dataObj.ownerObject[i].lastName;

			const $tr = $('<tr>');
			$tr.data('id', dataObj.dogObject[i]._id); // store id in row
			$tr.html(`<td>${dogName}</td>
			<td><input id="reviewDogText" type="text"></input></td>
			<td><input id="reviewDogRatingText" type="text"></input></td>  
			<td><a href="../owners/${dataObj.ownerObject[i]._id}">${ownerName}</a></td>
			  

			  <td><input id="reviewOwnerText" type="text"></input></td>
			  <td><input id="reviewOwnerRatingText" type="text"></input></td>
			  <td><button>Accept</button></td>`);
			$revTable.append($tr);

		}
		$revTable.find('button').on('click', btnClick);
	});

	function btnClick(e) {
		const dogId = $(this).closest('tr').data('id');

		const reviewDogText = $("#reviewDogText");
		const reviewDogRating = $("#reviewDogRatingText");
		const reviewOwnerText = $("#reviewDogText");
		const reviewOwnerRating = $("#reviewOwnerRatingText");

		console.log(reviewDogText.val());
		alert(dogId);

		let req = {
			method: 'POST',
			url: 'http://localhost:3000/review',
			contentType: 'application/json',
			data: JSON.stringify({
				dogId: dogId,
				reviewText: reviewOwnerText.val(),
				rating: reviewOwnerRating.val()
			}),
		};
		$.ajax(req).then(function (res) {

		});

		console.log("completed first post");

		let req2 = {
			method: 'POST',
			url: 'http://localhost:3000/review',
			contentType: 'application/json',
			data: JSON.stringify({
				dogId: dogId,
				reviewText: reviewDogText.val(),
				rating: reviewDogRating.val(),
				beingReviewedId: dogId,
			}),
		};
		$.ajax(req2).then(function (res) {

		});
		
		console.log("completed second post");
	}
})(window.jQuery);
