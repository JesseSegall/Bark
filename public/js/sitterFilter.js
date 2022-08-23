(function ($) {
	var unorderedSitters = $('#unordered-sitters');
	var price = $('#price');

	let req = {
		method: 'GET',
		url: 'http://localhost:3000/sitters/filterPriceHigh',
		contentType: 'json',
	};

	$.ajax(req).then((res) => {
		console.log(res);
		unorderedSitters.attr('hidden', true);
		price.on('click', function (e) {
			e.preventDefault();
			console.log('I have been clicked');
			unorderedSitters.attr('hidden', false);
		});
	});

	//TODO: Need to add 4 more jQuery routes. Each route will get JSON data that has been already sorted. It will then render and show the card view:
	<div class='card' style='width: 300px;'>
		<img src='public/image/no_image.jpeg' class='card-img-top' alt='Profile Picture' />
		<div class='card-body text-center'>
			<h5 class='card-title'>{{ firstName }}</h5>
			<p class='card-text'>Sitter price will go here.</p>
			<p class='card-text'>Rating Will Go Here</p>
			<a href='/searchSitter/{{_id}}' class='btn btn-primary'>
				View Profile
			</a>
		</div>
	</div>;
})(window.jQuery);
