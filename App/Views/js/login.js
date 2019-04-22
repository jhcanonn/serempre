$(document).ready(function() {

    // Get the form.
    var loginForm = $('#login');
    var elMsg = loginForm.find('#login-msg');
    elMsg.hide();

    // Set up an event listener Click for Singin
	loginForm.find("#singin").click(function() {
		loginForm.find('input[name="method"]').val("singin");
	  	loginForm.submit();
	});

	// Set up an event listener Click for Singup
	loginForm.find("#singup").click(function() {
		loginForm.find('input[name="method"]').val("singup");
	  	loginForm.submit();
	});

    // Set up an event listener for the contact form.
    loginForm.submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();

	    // Serialize the form data.
		var formData = $(this).serialize();

		// Submit the form using AJAX.
		$.ajax({
		    type: $(this).attr('method'),
		    url: $(this).attr('action'),
		    data: formData,
		    success: function(data) {
		    	var obj = JSON.parse(data);
		    	if(obj.success) {
		    		elMsg.addClass("alert-success");
		    		elMsg.removeClass("alert-danger");
		    		$.redirect(window.location.href + 'index.php', {
				    	page: 'clients.twig'
				    });
		    	} else {
		    		elMsg.addClass("alert-danger");
		    		elMsg.removeClass("alert-success");
		    	}
		    	elMsg.text(obj.msg);
		    	elMsg.show();
		    	console.log(obj);
		    }
		})
	});

});