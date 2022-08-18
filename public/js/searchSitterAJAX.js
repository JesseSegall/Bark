const { json } = require("express");

( ($) => {
	
	//Ajax request for list of shows 
	let req = { method: 'GET', url: '/partials/sitterList'};

	$.ajax(req).then( (res) => {
		$('#sitterList').empty();
		$('#sitterList').hide(); 
		$('#sitter').hide(); 

		$.each(res, function () {
			$('#sitterList').append(`<li><a class="linkClicked" href='${this._links.self.href}'>${this._links}</a></li>`);
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

	$('#sitterSearchForm').submit( (event) => {
		event.preventDefault();
	
		if ($('#search_term').val().trim() == ""){ alert("Error: The search you have made is invalid you must enter a search term");}
		if (!$('#search_term').val()) { alert("Error: The search you have made is invalid");}

		//if there are no errors with the search term, continue with the get request
		else {
			let req = { method: 'GET', url: '/searchSitter?search_term=' + $('#search_term').val()}

			$.ajax(req).then( (res) => { 
				if($('#search_term').val() == $('#sitter').val()){ 
					clickedOn(event.target.href);
					$('#sitter').show();
        } else{ 
          clickedOn(event.target.href);
					$('#sitter').hide();
        }
				});
      }
    }); 


})(window.jQuery);







