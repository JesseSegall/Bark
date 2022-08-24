(function ($) {
	// HTML grabs
	const $reqTable = $('#request-table');
	const url = 'http://localhost:3000/requests/requestId';

	$.getJSON(url).then((owners) => {
		owners.forEach((res) => {
			const requestText = res.requestText;
			const ownerId = res.ownerId._id;
			const requestId = res._id;

			const $tr = $('<tr>');
			$tr.data('id', requestId); // store id in row
			$tr.html(`<td><a href="../owners/${ownerId}">Owner Profile</a></td>
			  <td>${requestText}</td>
			  <td><button>Accept</button></td>`);
			$reqTable.append($tr);
		});
		// assign click handler function to all buttons
		$reqTable.find('button').on('click', btnClick);
	});

	function btnClick(e) {
		const reqId = $(this).closest('tr').data('id');
		alert(reqId);

		let req = {
			method: 'POST',
			url: 'http://localhost:3000/requests/accept',
			contentType: 'application/json',
			data: JSON.stringify({
				reqId: reqId,
			}),
		};
		$.ajax(req).then(function (res) {});
	}
})(window.jQuery);
