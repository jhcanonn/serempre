$(document).ready(function() {

    // Get the form.
    var loginForm = $('#login');
    var elMsg = loginForm.find('#login-msg');
    // Se oculta inicialmente el elemento de notificaciones
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

	// Validacion del formulario de Login
    loginForm.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                feedbackIcons: true,
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 15,
                        message: 'The username must be more than 6 and less than 15 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The username can only consist of alphabetical, number and underscore'
                    }
                }
            },
            password: {
                feedbackIcons: true,
                validators: {
                    notEmpty: {
                        message: 'The code is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                }
            }
        }
    }).on('success.form.bv', function(e) {
        // Stop the browser from submitting the form.
	    event.preventDefault();

	    // Serialize the form data.
		var formData = $(this).serialize();

		// Submit the form using AJAX.
		$.ajax({
		    type: $(this).attr('method'),
		    url: $(this).attr('action'),
		    data: formData,
		    success: function(response) {
		    	var obj = JSON.parse(response);
		    	if(obj.success) {
		    		elMsg.addClass("alert-success");
		    		elMsg.removeClass("alert-danger");
		    		$.redirect(window.location.href);
		    	} else {
		    		elMsg.addClass("alert-danger");
		    		elMsg.removeClass("alert-success");
		    	}
		    	elMsg.text(obj.msg);
		    	elMsg.show();
		    }
		})
    });

});