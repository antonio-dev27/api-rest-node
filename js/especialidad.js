var urlBaseEspecialidad = "/api/Especialidad";

var consultarEspecialidad = function(){
    $.ajax({
        url: urlBaseEspecialidad + "/all",
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
                    <th>ID ESPECIALIDAD</th>
                    <th>NOMBRE</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].nombre}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].id}, '${items[i].nombre})">
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
    consultarEspecialidad();
});

var nuevaEspecialidad = function () {
    $("#tituloModalEspecialidad").html('Nueva Especialidad');
    $("#id").val('');
    $("#nombre").val('');
    $('#modalEspecialidad').modal('show');
}

var cerrarModal = function () {
    $('#modalEspecialidad').modal('hide');
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
        ruta = urlBaseEspecialidad + "/update";
        payload = {
            id: +$("#id").val(),
            nombre: $("#nombre").val(),
        };
        method = "PUT";
        msg = "Se ha actualizado la Especialidad";
    } else {
        ruta = urlBaseEspecialidad + "/save";
        payload = {
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
        };
        method = "POST";
        msg = "Se ha creado la Especialidad";
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
                consultarEspecialidad();
            }
        },
    });
}

var editar = function (id, nombre) {
    $("#tituloModalEspecialidad").html('Actualizar Especialidad');
    $("#id").val(id);
    $("#nombre").val(nombre);
    $('#modalEspecialidad').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseEspecialidad + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado la Especialidad');
                cerrarModal();
                consultarEspecialidad();
            }
        },
    });
}