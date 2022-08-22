$(function () {
	let sitterList = $('#sitterList');

	$.ajax({
		type: 'GET',
		url: 'http://localhost3000:/sitters',
		success: function (sitters) {
			$.each(sitters, function (i, sitter) {
				$sitterList.append(`<li>${sitter.firstName}</li>`);
			});
		},
	});
});
