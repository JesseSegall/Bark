
(($) => {

	let req = {
		method: 'GET',
		url: '/searchSitter',
		// contentType: "application/json",
	};

	$.ajax(req).then( (res) => {
		$('#sitterList').empty();
		$('#sitterList').hide(); 
		$('#sitter').hide(); 
		$.each(res, function () {
			// $('#sitterList').append(`<li><a class="linkClicked" href='${this._links.self.href}'>${this.name}</a></li>`);
			$('#sitterList').append(`<li><a class="linkClicked" href='${this.sitters.self.href}'>${this.firstName}</a></li>`);
		});
		$('#sitterList').show();

		$('a.linkClicked').on('click', (event) => {
		event.preventDefault();
		$('#sitter').empty(); 
		$('#sitterList').hide();
		clickedOn(event.target.href);
		$('#sitter').show();
		});
	});

	$('#sitterSearchForm').submit((event) => {
		event.preventDefault();
		if ($('#search_term').val().trim() == "") { alert("Error: The search you have made is invalid you must enter a search term"); }
		if (!$('#search_term').val()) { alert("Error: The search you have made is invalid"); }
		else {
			let req = {
				method: 'GET',
				url: 'http://localhost:3000/searchSitter?search_term=' + $('#search_term').val(),
				contentType: "application/json"
			};

			$.ajax(req).then((res) => {
				$('#sitterList').empty();
				$('#sitterList').hide();
				$('#sitter').hide();
				$.each(res, function () { $('#sitterList').append(`<li><a class="linkClicked" href='${this._links.self.href}'>${this.name}</a></li>`); });
				$('#sitterList').show();

				$('a.linkClicked').on('click', (event) => {
					event.preventDefault();
					$('#sitterList').hide();
					$('#sitter').empty();
					clickedOn(event.target.href);
					$('#sitter').show();
				});
			});
		}
	});
})(window.jQuery);







