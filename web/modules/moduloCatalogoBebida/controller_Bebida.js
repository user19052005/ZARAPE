let indexBebidaSeleccionada = -1;
let bebidas = [];

const moduloBebida = {
    addBebida,
    loadTabla,
    selectBebida,
    clean,
    updateBebida,
    deleteBebida,
    searchBebidas
};

function addBebida() {
    let numeroUnicoBebida = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let categoria = document.getElementById("txtCategoria").value;

    if (!numeroUnicoBebida || !nombre || !precio || !descripcion || !categoria) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let bebida = {
        numeroUnicoBebida,
        nombre,
        precio,
        descripcion,
        categoria,
        estatus: "Activo"
    };

    bebidas.push(bebida);
    loadTabla();
    clean();
}

function loadTabla() {
    let cuerpo = "";
    bebidas.forEach(function (bebida, index) {
        let registro =
                `<tr onclick="moduloBebida.selectBebida(${index});">
                <td>${bebida.nombre}</td>
                <td>${bebida.precio}</td>
                <td>${bebida.descripcion}</td>
                <td>${bebida.categoria}</td>
                <td>${bebida.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblBebida").innerHTML = cuerpo;
}

function selectBebida(index) {
    document.getElementById("txtnumeroUnicoBebida").value = bebidas[index].numeroUnicoBebida;
    document.getElementById("txtNombre").value = bebidas[index].nombre;
    document.getElementById("txtPrecio").value = bebidas[index].precio;
    document.getElementById("txtDescripcion").value = bebidas[index].descripcion;
    document.getElementById("txtCategoria").value = bebidas[index].categoria;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");

    indexBebidaSeleccionada = index;
}

function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtCategoria").value = "";
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    indexBebidaSeleccionada = -1;
}

function updateBebida() {
    if (indexBebidaSeleccionada !== -1) {
        bebidas[indexBebidaSeleccionada].numeroUnicoBebida = document.getElementById("txtNumUnico").value;
        bebidas[indexBebidaSeleccionada].nombre = document.getElementById("txtNombre").value;
        bebidas[indexBebidaSeleccionada].precio = document.getElementById("txtPrecio").value;
        bebidas[indexBebidaSeleccionada].descripcion = document.getElementById("txtDescripcion").value;
        bebidas[indexBebidaSeleccionada].categoria = document.getElementById("txtCategoria").value;

        bebidas[indexBebidaSeleccionada].estatus = bebidas[indexBebidaSeleccionada].estatus === "Activo" ? "Inactivo" : "Activo";

        loadTabla();
        clean();
    }
}

function deleteBebida() {
    if (indexBebidaSeleccionada !== -1) {
        bebidas[indexBebidaSeleccionada].estatus = "Inactivo";
        loadTabla();
        clean();
    }
}

function searchBebidas() {
    let filtro = document.getElementById("txtBusquedaBebida").value.toLowerCase();
    let resultados = bebidas
            .map((bebida, index) => ({bebida, index}))
            .filter(item => item.bebida.nombre.toLowerCase().includes(filtro));

    let cuerpo = "";
    resultados.forEach(function (item) {
        let registro =
                `<tr onclick="moduloBebida.selectBebida(${item.index});">
                <td>${item.bebida.nombre}</td>
                <td>${item.bebida.precio}</td>
                <td>${item.bebida.descripcion}</td>
                <td>${item.bebida.categoria}</td>
                <td>${item.bebida.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });

    document.getElementById("tblBebida").innerHTML = cuerpo;
}
document.getElementById("txtBusquedaBebida").addEventListener("input", searchBebidas);

fetch("data_Bebida.json")
        .then(response => response.json())
        .then(jsondata => {
            bebidas = jsondata;
            loadTabla();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
