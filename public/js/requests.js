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
            <td><button  onclick="btnClick('${ownerId}')">Accept</button>
            </td>
            
        </tr>`);
		}
	});
})(window.jQuery);
function btnClick(id) {
	console.log(id);
}
