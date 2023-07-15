var urlBaseCita= "/api/Cita";
var urlBasePaciente = "/api/Paciente";
var urlBaseDoctor = "/api/Doctor";
var urlBaseEspecialidad = "/api/Especialidad";


var consultarOrtesis = function (idortesis) {
    $.ajax({
        url: urlBaseProducto + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="ortesis">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#ortesis-select").html(select);
            
            if (idortesis!=='undefined' && idortesis!==null){
                $("#ortesis").val(idortesis);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var consultarCliente = function (idcliente) {
    $.ajax({
        url: urlBaseCliente + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="client">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].idClient}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#cliente-select").html(select);
            
            if (idcliente!=='undefined' && idcliente!==null){
                $("#cliente").val(idcliente);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}
var consultar = function () {
    $.ajax({
        url: urlBaseReserva + "/all",
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
                    <th>ID</th>
                    <th>FECHA INICIAL</th>
                    <th>FECHA FINAL </th>
                    <th>ESTADO</th>
                    <th>ORTESIS</th>
                    <th>CLIENTE</th>
                    <th>ACCIONES</th>
                   
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idReservation}</td>
                   <td>${items[i].startDate}</td>
                   <td>${items[i].devolutionDate}</td>
                   <td>${items[i].status}</td>
                   <td>${items[i].ortopedic.name}</td>
                   <td>${items[i].client.name}</td>
        
                   <td style="margin:0">
                    <button type="button" class="btn btn-sm btn-success" onclick="editar(${items[i].idReservation}, '${items[i].startDate}', '${items[i].devolutionDate}', '${items[i].status}', '${items[i].ortopedic.name}', '${items[i].client.name}')">
                        Editar
                    </button>

                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].idReservation})">
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
    consultar();
});

var nuevaReservacion = function () {
    consultarOrtesis(null);
    consultarCliente(null);
    $("#tituloModalReservacion").html('Nueva Reservacion');
    $("#id").val('');
    $("#fechaInicio").val('');
    $("#fechaFin").val('');
    $("#estado").val('');
    $('#modalReservacion').modal('show');
}

var cerrarModal = function () {
    $('#modalReservacion').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}

var guardarCambios = function () {  
    var payload;
    var method;
    var id = $("#id").val();
    var msg;
    var ruta;
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseReserva + "/update";
        payload = {
            idReservation: +$("#id").val(),
            startDate: $("#fechaInicio").val(),
            devolutionDate: $("#fechaFin").val(),
            status: $("#estado").val(),
            ortopedic: {
                id: +$("#ortesis").val()
            },
            client: {
                
                idClient: +$("#client").val()
            }
        };
        method = "PUT";
        msg = "Se ha actualizado la Reserva";
    } else {        
        ruta = urlBaseReserva + "/save";
        payload = {
            startDate: $("#fechaInicio").val(),
            devolutionDate: $("#fechaFin").val(),
            status: $("#estado").val(),
            
            ortopedic: {
                id: +$("#ortesis").val()
            },
            client: {
                idClient: +$("#client").val()
            }
        };
        method = "POST";
        msg = "Se ha creado la Reserva";
    }

    console.log("guardando ", payload)
    console.log("metodo ", method, "a", ruta)

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
                consultar();
            }
        },
    });
}

var editar = function (idReservation, startDate, devolutionDate, status , idortesis, idcliente) {
    console.log(startDate, devolutionDate, status, idortesis, idcliente);
    consultarOrtesis(idortesis);
    consultarCliente(idcliente);
    $("#tituloModalReservacion").html('Actualizar Reserva');
    $("#id").val(idReservation);
    $("#fechaInicio").val(startDate);
    $("#fechaFin").val(devolutionDate);
    $("#estado").val(status);
     
    $('#modalReservacion').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseReserva + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }, 
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado la Reserva');
                cerrarModal();
                consultar();
            }
        },
    });
}

