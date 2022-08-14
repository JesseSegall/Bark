( ($) => {
	
	//Ajax request for list of sitters 
	// let req = { method: 'GET', sittersCollection }; TODO FIGURE OUT HOW TO REQ SITTER DATA

	$.ajax(req).then( (res) => {
		$('#sitterList').empty();
		$('#backToRegistration').hide(); 
		$('#sitterList').hide(); 
		$('#sitter').hide(); 
		//Each item in the list is a link clickable to bring you to a new page with it's information.
		$.each(res, function () {
            sitterName = this.firstName + " " + this.lastName; 
			$('#sitterList').append(`<li><a class="linkClicked" href='${this._links.self.href}'>${this.sitterName}</a></li>`);
		});
		$('#sitterList').show();
		$('a.linkClicked').on('click', (event) => {
		event.preventDefault();
		$('#sitter').empty(); 
		$('#sitterList').hide();

		clickedOn(event.target.href);
		$('#backToRegistration').show();
		$('#sitter').show();
		});
	});


	//The search functionality 
	$('#sitterSearchForm').submit( (event) => {
		event.preventDefault();
	
		if ($('#sitter').val().trim() == ""){ alert("Error: The search you have made is invalid you must enter a search term");}
		if (!$('#sitter').val()) { alert("Error: The search you have made is invalid");}

		//if there are no errors with the search term, continue with the get request
		else {
			// let req = { method: 'GET', url: 'http://api.tvmaze.com/search/shows?q=' + $('#sitter').val() }; TODO FIGURING OUT HOW TO REQUEST SITTER DATA

			$.ajax(req).then( (res) => {
				$('#sitterList').empty();
				$('#backToRegistration').hide();
				$('#sitterList').hide();
				$('#sitter').hide();
				$.each(res, function () { $('#sitterList').append(`<li><a class="linkClicked" href='${this.sitter._links.self.href}'>${this.sitter.sitterName}</a></li>`); });
				$('#sitterList').show();
				$('#backToRegistration').show();

				$('a.linkClicked').on('click', (event) => {
					event.preventDefault();
					$('#sitterList').hide();
					$('#sitter').empty();
					clickedOn(event.target.href);
					$('#backToRegistration').show();
					$('#sitter').show();
					
				});
			});
		}
	});


	//When a sitter in the  list is clicked it will take us to another page showing information about the sitter.
	let clickedOn = (newSitter) => {

		// let req = { method: 'GET', newSitter}; TODO figuring out pulling the data list of sitters

		$.ajax(req).then( (res) => {
		
			if (!res.firstName || res.firstName.trim() == "") { res.firstName = "N/A"; }
            if (!res.lastName || res.lastName.trim() == "") { res.lastName = "N/A"; }
			if (res.picture) { if (!res.picture.medium) { res.picture.medium = "/public/image/no_image.jpeg"; }}
			if (!res.address || res.address.trim() == "") { res.address = "N/A"; }
            if (!res.email || res.email.trim() == "") { res.email = "N/A"; }
			if (res.idOfDogSat.length == 0) { res.idOfDogSat = ["N/A"]; }
            if (!res.price || res.price.trim() == "") { res.price = "N/A"; }
            if (!res.email || res.email.trim() == "") { res.email = "N/A"; }
            if (res.reviewsId.length == 0) { res.reviewsId = ["N/A"]; }
            if (res.requests.length == 0) { res.requests = ["N/A"]; }
			
			//showing the sitter details in a newly rendered page
			$('#sitter').append(`<h1>${res.firstName} + " " + ${res.lastName}<h1>

				<img src="${res.picture && res.picture.medium ? res.picture.medium : "/public/image/no_image.jpeg"}"/>

				<dl>
					<dt>First Name:</dt>
					<dd>${res.firstName}</dd>
					<dt>Last Name:</dt>
                    <dd>${res.lastName}</dd>
                    <dt>Address:</dt>
                    <dd>${res.address}</dd>
                    <dt>Dogs Sat:</dt>
					<ul>${res.idOfDogSat.map((dog) => `<li>${dog}</li>`)}</ul>
					<dt>Price</dt>
					<dd>${res.price}</dd>
                    <dt>Reviews:</dt>
					<ul>${res.reviewsId.map((review) => `<li>${review}</li>`)}</ul>
                    <dt>Requests:</dt>
					<ul>${res.requests.map((request) => `<li>${request}</li>`)}</ul>
				</dl>`
					);
					
		});

	}

})(window.jQuery);