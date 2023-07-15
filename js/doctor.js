var urlBaseDoctor = "/api/Doctor";
var urlBaseEspecialidad = "/api/Especialidad";

var consultarEspecialidad  = function (idespecialidad) {
    $.ajax({
        url: urlBaseEspecialidad + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="especialidad">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].nombre}</option>`;
            }
            select += `</select>`;
            $("#especialidad-select").html(select);
            
            if (idespecialidad!=='undefined' && idespecialidad!==null){
                $("#especialidad").val(idespecialidad);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var consultarEspecialidad = function (idespecialidad) {
    $.ajax({
        url: urlBaseEspecialidad + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="especialidad">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].nombre}</option>`;
            }
            select += `</select>`;
            $("#especialidad-select").html(select);

            if (idespecialidad !== undefined && idespecialidad !== null) {
                $("#especialidad").val(idespecialidad);
            }
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha sucedido un problema');
        }
    });
}


var consultarDoctor = function(){
    $.ajax({
        url: urlBaseDoctor + "/all",
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
                    <th>ID DOCTOR</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>CONSULTORIO</th>
                    <th>EMAIL</th>
                    <th>ESPECIALIDAD</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].nombre}</td>
                   <td>${items[i].apellido}</td>
                   <td>${items[i].consultorio}</td>
                   <td>${items[i].email}</td>
                   <td>${items[i].especialidad}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].id}, '${items[i].nombre}', '${items[i].apellido}', '${items[i].consultorio}','${items[i].email} ${items[i].especialidad})">
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
    consultarDoctor();
});

var nuevoDoctor = function () {
    $("#tituloModalDoctor").html('Nuevo Doctor');
    $("#id").val('');
    $("#nombre").val('');
    $("#apellido").val('');
    $("#consultorio").val('');
    $("#email").val('');
    $("#especialidad").val('')
    $('#modalDoctor').modal('show');
}

var cerrarModal = function () {
    $('#modalDoctor').modal('hide');
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
        ruta = urlBaseDoctor + "/update";
        payload = {
            id: +$("#id").val(),
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            consultorio: $("#consultorio").val(),
            email: +$("#email").val(),
            especialidad: $("#especialidad").val(),
        };
        method = "PUT";
        msg = "Se ha actualizado el Doctor";
    } else {
        ruta = urlBaseDoctor + "/save";
        payload = {
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            consultorio: $("#consultorio").val(),
            email: +$("#email").val(),
            especialidad: +$("#especialidad").val(),
        };
        method = "POST";
        msg = "Se ha creado el Doctor";
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
                consultarDoctor();
            }
        },
    });
}

var editar = function (id, name, dni, cell, email, address ) {
    $("#tituloModalPaciente").html('Actualizar Paciente');
    $("#id").val(id);
    $("#nombre").val(nombre);
    $("#apellido").val(apellido);
    $("#consultorio").val(consultorio);
    $("#email").val(email);
    $("#especialidad").val(especialidad);
    $('#modalDoctor').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseDoctor + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el Doctor');
                cerrarModal();
                consultarDoctor();
            }
        },
    });
}