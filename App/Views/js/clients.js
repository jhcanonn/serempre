$(document).ready(function() {
    var clientDataTable = setDataTable();
    setListenerRowAction(clientDataTable);
    setListenerChangeCity();
    setListenerClickLogout();
    setListenerAddClient();
    setListenerSaveClientForm();
    setValidationClientForm(clientDataTable);
    setEventsCreateClientModal();
});

/**
* Funcion que se encarga de configurar DataTable de la tabla cliente
* @return Devuelve elemento datatable
*/
function setDataTable() {
    var dataTable = $("#clients").DataTable({
        scrollY: "40vh",
        scrollX: true,
        scrollCollapse: true,
        paging: true,
        columnDefs: [
            { targets: [0, 3], className: 'text-center', width: "10%" },
            { targets: [1, 2], width: "40%" }
        ]
    });
    $('.dataTables_length').addClass('bs-select');
    return dataTable;
}

/**
* Funcion que se encarga de configurar los listener de edit y delete de la fila
* @param dataTable Elemento DOM del datatable configurado
*/
function setListenerRowAction(dataTable) {
    var tableclientEl = $("#clients");

    // Se configura listener para click en eliminar
    tableclientEl.on('click', '.delete', function() {
        var currentRow = $(this).closest('tr');
        dataTable.row(currentRow).remove().draw();
        // Ajax para eliminar cliente de la base de datos
        $.ajax({
            type: "POST",
            url: "App/Controllers/HandlerController.php",
            data: $.param({method: 'delete_client', id: currentRow.data('clientId')}),
            success: function(response) {
                var obj = JSON.parse(response);
                if(obj.success) {
                    // Se muestra la notificacion de exito
                    showNotification(obj.msg);
                }
            }
        })
    });

    // Se configura listener para click en editar
    tableclientEl.on('click', '.edit', function() {
        var currentRow = $(this).closest('tr');
        var formClientEl = $("#form-client");
        $('#action-client').val('update_client');
        $('#addClient').modal('show');
        formClientEl.find('#id').val(currentRow.data('clientId'));
        formClientEl.find('#code').val(currentRow.data('code'));
        formClientEl.find('#name').val(currentRow.data('name'));
        formClientEl.find('#city').val(currentRow.data('city')).trigger('change');
    });
}

/**
* Funcion que se encarga de configurar listener para seleccionar ciudad
*/
function setListenerChangeCity() {
    $("#city").change(function() {
        var optionId = $(this).val();
        $("#city option").attr('selected', false);
        if(optionId) {
            $("#city option[value=" + optionId + "]").attr('selected', true); 
        } else {            
            $('#city option:contains("Select")').attr('selected', true); 
        }
    });
}

/**
* Funcion que se encarga de configurar listener para agregar cliente
*/
function setListenerAddClient() {
    $('#add-client').click(function() {
        $('#action-client').val('create_client');
    });
}

/**
* Funcion que se encarga de configurar listener para Logout
*/
function setListenerClickLogout() {
    $("a#logout").click(function() {
        $.ajax({
            type: "POST",
            url: "App/Controllers/HandlerController.php",
            data: $.param({method: 'logout'})
        })
    });
}

/**
* Funcion que se encarga de configurar listener para Save de crear cliente
*/
function setListenerSaveClientForm() {
    // Se dispara el submit del formulario cliente cuando se de click en Save
    var saveEl = $("#addClient .modal-footer .btn-primary");
    saveEl.click(function() {
        $("#form-client").submit();
    });
}

/**
* Funcion que se encarga de construir un objeto de los datos de un formulario
* @param dataTable Elemento DOM del datatable configurado
*/
function setValidationClientForm(dataTable) {
    // Validacion del formulario para crear Cliente
    $("#form-client").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            code: {
                feedbackIcons: true,
                validators: {
                    notEmpty: {
                        message: 'The code is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The code can only consist of numbers'
                    }
                }
            },
            name: {
                feedbackIcons: true,
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/,
                        message: 'The username can only consist of Fisrt name and Last name'
                    }
                }
            },
            city: {
                feedbackIcons: true,
                validators: {
                    notEmpty: {
                        message: 'Please select your city.'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serializa los datos del formulario
        var formData = $(this).serialize();
        // Se construye un objeto con los datos del formulario
        var formDataObj = getFormData($(this));

        // Ajax de agregar cliente
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: formData,
            success: function(response) {
                var obj = JSON.parse(response);
                if(obj.success) {
                    // Se oculta el formulario para agregar cliente
                    $('#addClient').modal('hide');
                    // Se muestra la notificacion de exito
                    showNotification(obj.msg);
                    // Si se va a actualizar registro se elimina para posteriormente agregarse
                    if(obj.update) {
                        var currentRow = $('#clients').find('tbody tr[data-client-id="' + obj.clientId + '"]');
                        dataTable.row(currentRow).remove().draw();
                    }
                    // Se agrega cliente a la tabla de clientes
                    var newRow = dataTable.row.add([
                        formDataObj.code,
                        formDataObj.name,
                        $("#city option[value=" + formDataObj.city + "]").text(),
                        $('<td><a class="edit"><i class="fas fa-lg fa-edit green-text"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="delete"><i class="fas fa-lg fa-trash-alt red-text"></i></a></td>').html()
                    ]).draw().node();
                    // Se configuran data-* sobre el elemento tr de la tabla clientes
                    $(newRow).attr('data-client-id', obj.clientId);
                    $(newRow).attr('data-code', formDataObj.code);
                    $(newRow).attr('data-name', formDataObj.name);
                    $(newRow).attr('data-city', formDataObj.city);
                }
            }
        })
    });
}

/**
* Funcion que se encarga de configurar eventos del Modal de creacion de cliente
*/
function setEventsCreateClientModal() {
    var addClientEl = $('#addClient');
    // Justo antes de que se cierra el modal
    addClientEl.on('hide.bs.modal', function() {
        // Resetea campos del formulario
        $(this).find('form').trigger("reset");
        $(this).find('form').find('#id').val('');
        // Resetea campo de city
        $("#city option").attr('selected', false);          
        $('#city option:contains("Select")').attr('selected', true);
        // Desmarca que fueron validados
        $(this).find('form').data('bootstrapValidator').resetForm();
    });

    // Despues de que se abre el modal
    addClientEl.on('shown.bs.modal', function() {
        $('#code').trigger('focus');
    });
}

/**
* Funcion que se encarga de construir un objeto de los datos de un formulario
* @param form Elemento DOM del formulario
* @return Objeto
*/
function getFormData(form){
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

/**
* Funcion que se encarga de mostrar notificacion
* @param msg Mensaje a mostrar en la notificacion
*/
function showNotification(msg) {
    $('.toast').children().text(msg);
    $('.toast').toast('show');
}