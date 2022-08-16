(($) => {

  let req = {
    method: 'GET',
    url: '/searchSitter',
    contentType: 'application/json',
    data: JSON.stringify({
      firstName: firstName,
      lastName: lastName
    })
  };

  $.ajax(req).then((res) => {
    $("#sitterList").empty();
    $("#backToRegistration").hide();
    $("#sitterList").hide();
    $("#sitter").hide();
    $.each(res, function () {
      $("#sitterList").append(
        `<li><a class="linkClicked" href='${this._links.self.href}'>${this.firstName}</a></li>`
      );
    });
    $("#sitterList").show();
    $("a.linkClicked").on("click", (event) => {
      event.preventDefault();
      $("#sitter").empty();
      $("#sitterList").hide();

      clickedOn(event.target.href);
      $("#backToRegistration").show();
      $("#sitter").show();
    });
  });

  // //The search functionality
  // $("#sitterSearchForm").submit((event) => {
  //   event.preventDefault();

  //   if ($('#search_term').val().trim() == "") { alert("Error: The search you have made is invalid you must enter a search term"); }
  //   if (!$('#search_term').val()) { alert("Error: The search you have made is invalid"); }

  //   else {
  //     let req = {
  //       method: 'GET',
  //       url: '/searchSitter?search_term=' + $('#search_term').val()
  //     };
  //     $.ajax(req).then((res) => {
  //       $("#sitterList").empty();
  //       $("#backToRegistration").hide();
  //       $("#sitterList").hide();
  //       $("#sitter").hide();
  //       $.each(res, function () { $('#sitterList').append(`<li><a class="linkClicked" href='${this.sitter._links.self.href}'>${this.sitter.firstName}</a></li>`); });

  //       $("#sitterList").show();
  //       $("#backToRegistration").show();

  //       $("a.linkClicked").on("click", (event) => {
  //         event.preventDefault();
  //         $("#sitterList").hide();
  //         $("#sitter").empty();
  //         clickedOn(event.target.href);
  //         $("#backToRegistration").show();
  //         $("#sitter").show();
  //       });
  //     });
  //   }
  // });


  // //When a sitter in the  list is clicked it will take us to another page showing information about the sitter.
  // let clickedOn = (clickedSitter) => {
  //   let req = {
  //     method: 'GET',
  //     url: clickedSitter
  //   };

  //   $.ajax(req).then((res) => {
  //     if (!res.lastName || res.lastName.trim() == "") { res.lastName = "N/A"; }
  //     if (res.picture) { if (!res.picture.medium) { res.picture.medium = "/public/image/no_image.jpeg"; } }
  //     if (!res.address || res.address.trim() == "") { res.address = "N/A"; }
  //     if (!res.email || res.email.trim() == "") { res.email = "N/A"; }
  //     if (!res.price || res.price.trim() == "") { res.price = "N/A"; }
  //     if (!res.email || res.email.trim() == "") { res.email = "N/A"; }
  //     if (res.reviewsId.length == 0) { res.reviewsId = ["N/A"]; }
  //     if (res.requests.length == 0) { res.requests = ["N/A"]; }

  //     $('#sitter').append(`<h1>${res.firstName}<h1>
  //     <img src="${res.image && res.image.medium ? res.image.medium : "/public/image/no_image.jpeg"}"/>

	// 			<dl>
	// 				<dt>First Name:</dt>
	// 				<dd>${res.firstName}</dd>
	// 				<dt>Last Name:</dt>
  //         <dd>${res.lastName}</dd>
  //         <dt>Address:</dt>
  //         <dd>${res.address}</dd>
  //         <dt>Dogs Sat:</dt>
	// 				<ul>${res.idOfDogSat.map((dog) => `<li>${dog}</li>`)}</ul>
	// 				<dt>Price</dt>
	// 				<dd>${res.price}</dd>
  //         <dt>Reviews:</dt>
	// 				<ul>${res.reviewsId.map((review) => `<li>${review}</li>`)}</ul>
  //       <dt>Requests:</dt>
	// 				<ul>${res.requests.map((request) => `<li>${request}</li>`)}</ul>
	// 			</dl>`);
  //   });
  // };
})(window.jQuery);
