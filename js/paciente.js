var urlBasePaciente = "/api/Paciente";

var consultarPaciente = function(){
    $.ajax({
        url: urlBasePaciente + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTabla(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var actualizarTabla = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID PACIENTE</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>CEDULA</th>
                    <th>EDAD</th>
                    <th>TELEFONO</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].nombre}</td>
                   <td>${items[i].apellido}</td>
                   <td>${items[i].cedula}</td>
                   <td>${items[i].edad}</td>
                   <td>${items[i].telefono}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].id}, '${items[i].nombre}', '${items[i].apellido}', '${items[i].cedula}','${items[i].edad} ${items[i].telefono})">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].id})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarPaciente();
});

var nuevoPaciente = function () {
    $("#tituloModalPaciente").html('Nuevo Paciente');
    $("#id").val('');
    $("#nombre").val('');
    $("#apellido").val('');
    $("#cedula").val('');
    $("#edad").val('');
    $("#telefono").val('')
    $('#modalPaciente').modal('show');
}

var cerrarModal = function () {
    $('#modalPaciente').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}

var guardarCambios = function () {
    var payload;
    var method;
    var id = $("#id").val();
    var msg;
    var ruta;
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBasePaciente + "/update";
        payload = {
            id: +$("#id").val(),
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            cedula: $("#cedula").val(),
            edad: +$("#edad").val(),
            telefono: $("#telefono").val(),
        };
        method = "PUT";
        msg = "Se ha actualizado el Paciente";
    } else {
        ruta = urlBasePaciente + "/save";
        payload = {
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            cedula: $("#cedula").val(),
            edad: +$("#edad").val(),
            telefono: +$("#telefono").val(),
        };
        method = "POST";
        msg = "Se ha creado el Paciente";
    }

    console.log("guardando ", payload)
    console.log("ruta ", ruta)
    console.log("method ", method)

    $.ajax({
        url: ruta,
        type: method,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        statusCode: {
            201: function () {
                mostrarMensaje(msg);
                cerrarModal();
                consultarPaciente();
            }
        },
    });
}

var editar = function (id, name, dni, cell, email, address ) {
    $("#tituloModalPaciente").html('Actualizar Paciente');
    $("#id").val(id);
    $("#nombre").val(nombre);
    $("#apellido").val(apellido);
    $("#cedula").val(cedula);
    $("#edad").val(edad);
    $("#telefono").val(telefono);
    $('#modalPaciente').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBasePaciente + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el Paciente');
                cerrarModal();
                consultarPaciente();
            }
        },
    });
}