(function ($) {
	// HTML grabs
	let reqTable = $('#request-table');
	let req = {
		method: 'GET',
		url: 'http://localhost:3000/requests/requestId',
		//contentType: "application/json",
	};

	$.ajax(req).then((res) => {
		let requestText;

		let ownerId;
		let dogId;

		for (i = 0; i < res.length; i++) {
			requestText = res[i].requestText;
			ownerId = res[i].ownerId;
			dogId = res[i].dogId;

			reqTable.append(`<tr >
            <td>${ownerId}</td>
            <td>${requestText}</td>
            <td>${dogId}</td>
            
        </tr>`);
		}
	});
})(window.jQuery);
