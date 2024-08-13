let indexUsuarioSeleccionado;
let usuarios = [];

const moduloUsuario = {
    addUsuario,
    loadTabla,
    selectUsuario,
    clean,
    updateUsuario,
    deleteUsuario,
    searchUsuarios
};

function addUsuario() {
    let numero_unico_usuario = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let contraseña = document.getElementById("txtContraseña").value;

    let usuario = {
        numero_unico_usuario,
        nombre,
        contraseña,
        estatus: "Activo"
    };

    usuarios.push(usuario);
    loadTabla();
}

function loadTabla() {
    let cuerpo = "";
    usuarios.forEach(function (usuario, index) {
        let registro =
            `<tr onclick="moduloUsuario.selectUsuario(${index});">
                <td>${usuario.nombre}</td>
                <td>${usuario.contraseña}</td>
                <td>${usuario.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblUsuario").innerHTML = cuerpo;
}

function selectUsuario(index) {
    document.getElementById("txtNumUnico").value = usuarios[index].numero_unico_usuario;
    document.getElementById("txtNombre").value = usuarios[index].nombre;
    document.getElementById("txtContraseña").value = usuarios[index].contraseña;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexUsuarioSeleccionado = index;
}

function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtContraseña").value = "";
    document.getElementById("txtNombre").focus();
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexUsuarioSeleccionado = -1;
}

function updateUsuario() {
    let numero_unico_usuario = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let contraseña = document.getElementById("txtContraseña").value;

    let usuario = {
        numero_unico_usuario,
        nombre,
        contraseña,
        estatus: "Activo"
    };

    usuarios[indexUsuarioSeleccionado] = usuario;
    clean();
    loadTabla();
}

function deleteUsuario() {
    usuarios[indexUsuarioSeleccionado].estatus = "Inactivo";
    loadTabla();
    clean();
}

function searchUsuarios() {
    let filtro = document.getElementById("txtBusquedaUsuario").value.toLowerCase();
    let resultados = usuarios.filter(element => element.nombre.toLowerCase().includes(filtro));
    let cuerpo = "";
    resultados.forEach(function (usuario, index) {
        let registro =
            `<tr onclick="moduloUsuario.selectUsuario(${index});">
                <td>${usuario.nombre}</td>
                <td>${usuario.contraseña}</td>
                <td>${usuario.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblUsuario").innerHTML = cuerpo;
}

fetch("data_Usuario.json")
    .then(response => response.json())
    .then(jsondata => {
        usuarios = jsondata;
        loadTabla();
    })
    .catch(error => console.error('Error al cargar los datos:', error));
