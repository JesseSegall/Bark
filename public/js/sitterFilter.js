(function ($) {
	var unorderedSitters = $('#unordered-sitters');
	var price = $('#price');
	let exp = $('#ajax-card');

	// When page loads pulls all sitters in no order
	let req = {
		method: 'GET',
		url: 'http://localhost:3000/sitters/filterPriceHigh',
		contentType: 'json',
	};

	$.ajax(req).then((res) => {
		console.log(res);
		unorderedSitters.attr('hidden', true);

		console.log(res[0].firstName);
		unorderedSitters.attr('hidden', false);
		for (i = 0; i < res.length; i++) {
			exp.append(
				`
			<div id="card-data" class="col-auto mb-3">
			<div class="card" style="width: 300px;">
				<img src="public/image/no_image.jpeg" class="card-img-top" alt="Profile Picture" />
				<div class="card-body text-center">
					<h5 class="card-title">${res[i].firstName}</h5>
					<p class="card-text">${res[i].price}</p>
					<p class="card-text">${res[i].rating}</p>
					<a href="/searchSitter/${res[i]._id}" class="btn btn-primary">View Profile</a>
				</div>
			</div>
		</div>`
			);
		}
	});

	// To sort by Price High to Low
	price.on('click', function (e) {
		e.preventDefault();
		console.log('I have been clicked');
		let req = {
			method: 'GET',
			url: 'http://localhost:3000/sitters/filterPriceHigh',
			contentType: 'json',
		};

		$.ajax(req).then((res) => {
			console.log(res);
			unorderedSitters.attr('hidden', true);

			console.log(res[0].firstName);
			unorderedSitters.attr('hidden', false);
			for (i = 0; i < res.length; i++) {
				exp.append(
					`
					<div id="card-data" class="col-auto mb-3">
					<div class="card" style="width: 300px;">
						<img src="public/image/no_image.jpeg" class="card-img-top" alt="Profile Picture" />
						<div class="card-body text-center">
							<h5 class="card-title">${res[i].firstName}</h5>
							<p class="card-text">${res[i].price}</p>
							<p class="card-text">${res[i].rating}</p>
							<a href="/searchSitter/${res[i]._id}" class="btn btn-primary">View Profile</a>
						</div>
					</div>
				</div>`
				);
			}
		});
	});
})(window.jQuery);
