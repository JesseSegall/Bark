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
})(window.jQuery);
