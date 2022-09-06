(function ($) {
	// Buttons
	let priceHigh = $('#price-high');
	let priceLow = $('#price-low');
	let dogSmall = $('#dog-small');
	let dogMedium = $('#dog-medium');
	let dogLarge = $('#dog-large');
	let difficultDog = $('#dog-difficult');
	let removeFilters = $('#remove-filters');

	// Main Divs
	let unorderedSittersDiv = $('#unordered-sitters');
	let priceHighDiv = $('#price-high-low');
	let priceLowDiv = $('#price-high-low');
	let dogSmallDiv = $('#dog-small-sitters');
	let dogMediumDiv = $('#dog-medium-sitters');
	let dogLargeDiv = $('#dog-large-sitters');
	let dogDifficultDiv = $('#dog-difficult-sitters');

	// Cards
	let unorderedCard = $('#ajax-card');
	let priceHighCard = $('#ajax-card-price-high');
	let priceLowCard = $('#ajax-card-price-low');
	let dogSmCard = $('#ajax-card-dog-sm');
	let dogMdCard = $('#ajax-card-dog-md');
	let dogLgCard = $('#ajax-card-dog-lg');
	let dogDiffCard = $('#ajax-card-dog-diff');

	removeFilters.on('click', function (e) {
		e.preventDefault();
		unorderedSittersDiv.attr('hidden', false);
		priceHighDiv.attr('hidden', true);
		priceLowDiv.attr('hidden', true);
		dogSmallDiv.attr('hidden', true);
		dogMediumDiv.attr('hidden', true);
		dogLargeDiv.attr('hidden', true);
		dogDifficultDiv.attr('hidden', true);
	});

	// When page loads pulls all sitters in no order
	let req = {
		method: 'GET',
		url: 'http://localhost:3000/sitters/allSitters',
		contentType: 'json',
	};

	$.ajax(req).then((res) => {
		unorderedSittersDiv.attr('hidden', false);
		priceHighDiv.attr('hidden', true);
		priceLowDiv.attr('hidden', true);
		dogSmallDiv.attr('hidden', true);
		dogMediumDiv.attr('hidden', true);
		dogLargeDiv.attr('hidden', true);
		dogDifficultDiv.attr('hidden', true);

		for (i = 0; i < res.length; i++) {
			unorderedCard.append(
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
	priceHigh.on('click', function (e) {
		e.preventDefault();
		unorderedSittersDiv.attr('hidden', true);
		priceLowDiv.attr('hidden', true);
		dogSmallDiv.attr('hidden', true);
		dogMediumDiv.attr('hidden', true);
		dogLargeDiv.attr('hidden', true);
		dogDifficultDiv.attr('hidden', true);

		let req = {
			method: 'GET',
			url: 'http://localhost:3000/sitters/filterPriceHigh',
			contentType: 'json',
		};

		$.ajax(req).then((res) => {
			for (i = 0; i < res.length; i++) {
				priceHighCard.append(
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
				priceHighDiv.attr('hidden', false);
			}
		});
	});

	priceLow.on('click', function (e) {
		e.preventDefault();
		unorderedSittersDiv.attr('hidden', true);
		priceHighDiv.attr('hidden', true);
		dogSmallDiv.attr('hidden', true);
		dogMediumDiv.attr('hidden', true);
		dogLargeDiv.attr('hidden', true);
		dogDifficultDiv.attr('hidden', true);
		let req = {
			method: 'GET',
			url: 'http://localhost:3000/sitters/filterPriceLow',
			contentType: 'json',
		};

		$.ajax(req).then((res) => {
			for (i = 0; i < res.length; i++) {
				priceLowCard.append(
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
			priceLowDiv.attr('hidden', false);
		});
	});

	dogSmall.on('click', function (e) {
		e.preventDefault();
		unorderedSittersDiv.attr('hidden', true);
		priceHighDiv.attr('hidden', true);
		priceLowDiv.attr('hidden', true);
		dogMediumDiv.attr('hidden', true);
		dogLargeDiv.attr('hidden', true);
		dogDifficultDiv.attr('hidden', true);

		let req = {
			method: 'GET',
			url: 'http://localhost:3000/sitters/filterDogsSmall',
			contentType: 'json',
		};

		$.ajax(req).then((res) => {
			for (i = 0; i < res.length; i++) {
				dogSmCard.append(
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
			dogSmallDiv.attr('hidden', false);
		});
	});

	dogMedium.on('click', function (e) {
		e.preventDefault();
		console.log('Medium Click');
		unorderedSittersDiv.attr('hidden', true);
		priceHighDiv.attr('hidden', true);
		priceLowDiv.attr('hidden', true);
		dogSmallDiv.attr('hidden', true);

		dogLargeDiv.attr('hidden', true);
		dogDifficultDiv.attr('hidden', true);

		let req = {
			method: 'GET',
			url: 'http://localhost:3000/sitters/filterDogsMedium',
			contentType: 'json',
		};

		$.ajax(req).then((res) => {
			for (i = 0; i < res.length; i++) {
				dogMdCard.append(
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
			dogMediumDiv.attr('hidden', false);
		});
	});

	dogLarge.on('click', function (e) {
		e.preventDefault();
		console.log('I clicked Large');
		unorderedSittersDiv.attr('hidden', true);
		priceHighDiv.attr('hidden', true);
		priceLowDiv.attr('hidden', true);
		dogSmallDiv.attr('hidden', true);
		dogMediumDiv.attr('hidden', true);

		dogDifficultDiv.attr('hidden', true);

		let req = {
			method: 'GET',
			url: 'http://localhost:3000/sitters/filterDogsLarge',
			contentType: 'json',
		};

		$.ajax(req).then((res) => {
			for (i = 0; i < res.length; i++) {
				dogLgCard.append(
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
			dogLargeDiv.attr('hidden', false);
		});
	});

	difficultDog.on('click', function (e) {
		e.preventDefault();
		console.log('difficult: I have been clicked');
		unorderedSittersDiv.attr('hidden', true);
		priceHighDiv.attr('hidden', true);
		priceLowDiv.attr('hidden', true);
		dogSmallDiv.attr('hidden', true);
		dogMediumDiv.attr('hidden', true);
		dogLargeDiv.attr('hidden', true);

		let req = {
			method: 'GET',
			url: 'http://localhost:3000/sitters/filterDogsDifficult',
			contentType: 'json',
		};

		$.ajax(req).then((res) => {
			console.log(res);
			for (i = 0; i < res.length; i++) {
				dogDiffCard.append(
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
			dogDifficultDiv.attr('hidden', false);
		});
	});
})(window.jQuery);
