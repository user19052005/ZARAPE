let indexSucursalSeleccionado;
let sucursales = [];

// Métodos de módulo
const moduloSucursal = {
    addSucursal,
    loadTabla,
    selectSucursal,
    clean,
    updateSucursal,
    deleteSucursal,
    searchSucursal
};

function addSucursal() {
    let numero_unico_sucursal = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let calleYNum = document.getElementById("txtCalleYNum").value;
    let colonia = document.getElementById("txtColonia").value;
    let GPS = document.getElementById("txtGPS").value;
    let telefono = document.getElementById("txtTelefono").value;
    let horario = document.getElementById("txtHorario").value;
    let pagWeb = document.getElementById("txtPagWeb").value;

    let sucursal = {
        numero_unico_sucursal,
        nombre,
        calleYNum,
        colonia,
        GPS,
        telefono,
        horario,
        pagWeb,
        estatus: "Activo"
    };

    sucursales.push(sucursal);
    loadTabla();
}

function loadTabla() {
    let cuerpo = "";
    sucursales.forEach(function (sucursal) {
        let registro =
                '<tr onclick="moduloSucursal.selectSucursal(' + sucursales.indexOf(sucursal) + ');">' +
                '<td>' + sucursal.nombre + '</td>' +
                '<td>' + sucursal.calleYNum + '</td>' +
                '<td>' + sucursal.colonia + '</td>' +
                '<td>' + sucursal.GPS + '</td>' +
                '<td>' + sucursal.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}

function selectSucursal(index) {
    document.getElementById("txtNumUnico").value = sucursales[index].numero_unico_sucursal;
    document.getElementById("txtNombre").value = sucursales[index].nombre;
    document.getElementById("txtCalleYNum").value = sucursales[index].calleYNum;
    document.getElementById("txtColonia").value = sucursales[index].colonia;
    document.getElementById("txtTelefono").value = sucursales[index].telefono;
    document.getElementById("txtGPS").value = sucursales[index].GPS;
    document.getElementById("txtHorario").value = sucursales[index].horario;
    document.getElementById("txtPagWeb").value = sucursales[index].pagWeb;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexSucursalSeleccionado = index;
}

function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtCalleYNum").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtGPS").value = "";
    document.getElementById("txtHorario").value = "";
    document.getElementById("txtPagWeb").value = "";
    document.getElementById("txtNombre").focus();
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexSucursalSeleccionado = -1;
}

function updateSucursal() {
    let numero_unico_sucursal = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let calleYNum = document.getElementById("txtCalleYNum").value;
    let colonia = document.getElementById("txtColonia").value;
    let telefono = document.getElementById("txtTelefono").value;
    let GPS = document.getElementById("txtGPS").value;
    let horario = document.getElementById("txtHorario").value;
    let pagWeb = document.getElementById("txtPagWeb").value;

    let sucursal = {
        numero_unico_sucursal,
        nombre,
        calleYNum,
        colonia,
        GPS,
        telefono,
        horario,
        pagWeb,
        estatus: "Activo"
    };

    sucursales[indexSucursalSeleccionado] = sucursal;
    clean();
    loadTabla();
}

function deleteSucursal() {
    sucursales[indexSucursalSeleccionado].estatus = "Inactivo";
    loadTabla();
    clean();
}

function searchSucursal() {
    let filtro = document.getElementById("txtBusquedaSucursal").value.toLowerCase();
    let resultados = sucursales.filter(element => element.nombre.toLowerCase().includes(filtro));
    let cuerpo = "";
    resultados.forEach(function (sucursal) {
        let registro =
                '<tr onclick="moduloSucursal.selectSucursal(' + sucursales.indexOf(sucursal) + ');">' +
                '<td>' + sucursal.nombre + '</td>' +
                '<td>' + sucursal.calleYNum + ' ' + sucursal.colonia + '</td>' +
                '<td>' + sucursal.GPS + '</td>' +
                '<td>' + sucursal.telefono + '</td>' +
                '<td>' + sucursal.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}

// Cargar los datos al iniciar
fetch("data_Sucursal.json")
        .then(response => response.json())
        .then(jsondata => {
            sucursales = jsondata;
            loadTabla();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
