$(document).ready(function() {
	// Pagination Table
    $('#clients').DataTable({
    	scrollY: '45vh',
        scrollCollapse: true,
        paging: true,
        responsive: true
    });

    var citiesEl = $("#city");
    citiesEl.change(function(event) {
    	var optionId = $(this).val();
    	$("#city option").attr('selected', false);
    	$("#city option[value=" + optionId + "]").attr('selected', true);
    });

    var formClientEl = $("#form-client");
    var saveEl = $("#addClient .modal-footer .btn-primary");
    saveEl.click(function() {
    	formClientEl.submit();
    });

    // Set up an event listener for the add Client.
    formClientEl.submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();

	    // Serialize the form data.
		var formData = $(this).serialize();

		console.log(formData);

		// Submit the form using AJAX.
		$.ajax({
		    type: $(this).attr('method'),
		    url: $(this).attr('action'),
		    data: formData,
		    success: function(response) {
		    	console.log(response);
		    }
		})
	});

});