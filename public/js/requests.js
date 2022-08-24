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
            <td><a href="../owners/${ownerId}">Owner Profile</a></td>
            <td>${requestText}</td>
            <td><button   onclick="btnClick("63050f76051c081fa0fe0970")">Accept</button></td>
            
        </tr>`);
		}
	});

	$(document).ready(function () {
		function btnClick(id) {
			console.log(id);
		}
	});
})(window.jQuery);
