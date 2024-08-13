let indexAlimentoSeleccionado = -1;
let alimentos = [];

const moduloAlimento = {
    addAlimento,
    loadTabla,
    selectAlimento,
    clean,
    updateAlimento,
    deleteAlimento,
    searchAlimentos
};

function addAlimento() {
    let numeroUnicoAlimento = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let categoria = document.getElementById("txtCategoria").value;


    let alimento = {
        numeroUnicoAlimento,
        nombre,
        precio,
        descripcion,
        categoria,
        estatus: "Activo"
    };

    alimentos.push(alimento);
    loadTabla();
    clean();
}

function loadTabla() {
    let cuerpo = "";
    alimentos.forEach(function (alimento, index) {
        let registro =
                `<tr onclick="moduloAlimento.selectAlimento(${index});">
                <td>${alimento.nombre}</td>
                <td>${alimento.precio}</td>
                <td>${alimento.descripcion}</td>
                <td>${alimento.categoria}</td>
                <td>${alimento.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblAlimento").innerHTML = cuerpo;
}

function selectAlimento(index) {
    document.getElementById("txtNumUnico").value = alimentos[index].numeroUnicoAlimento;
    document.getElementById("txtNombre").value = alimentos[index].nombre;
    document.getElementById("txtPrecio").value = alimentos[index].precio;
    document.getElementById("txtDescripcion").value = alimentos[index].descripcion;
    document.getElementById("txtCategoria").value = alimentos[index].categoria;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");

    indexAlimentoSeleccionado = index;
}

function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtCategoria").value = "";
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexAlimentoSeleccionado = -1;
}

function updateAlimento() {
    if (indexAlimentoSeleccionado !== -1) {
        alimentos[indexAlimentoSeleccionado].numeroUnicoAlimento = document.getElementById("txtNumUnico").value;
        alimentos[indexAlimentoSeleccionado].nombre = document.getElementById("txtNombre").value;
        alimentos[indexAlimentoSeleccionado].precio = document.getElementById("txtPrecio").value;
        alimentos[indexAlimentoSeleccionado].descripcion = document.getElementById("txtDescripcion").value;
        alimentos[indexAlimentoSeleccionado].categoria = document.getElementById("txtCategoria").value;

        // Toggle the status
        alimentos[indexAlimentoSeleccionado].estatus = alimentos[indexAlimentoSeleccionado].estatus === "Activo" ? "Inactivo" : "Activo";

        loadTabla();
        clean();
    }
}

function deleteAlimento() {
        alimentos[indexAlimentoSeleccionado].estatus = "Inactivo";
        loadTabla();
        clean();
    }


function searchAlimentos() {
    let filtro = document.getElementById("txtBusquedaAlimento").value.toLowerCase();
    let resultados = alimentos.filter(alimento => alimento.nombre.toLowerCase().includes(filtro));
    let cuerpo = "";
    resultados.forEach(function (alimento, index) {
        let registro =
                `<tr onclick="moduloAlimento.selectAlimento(${index});">
                <td>${alimento.nombre}</td>
                <td>${alimento.precio}</td>
                <td>${alimento.descripcion}</td>
                <td>${alimento.categoria}</td>
                <td>${alimento.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblAlimento").innerHTML = cuerpo;
}

fetch("data_Alimento.json")
        .then(response => response.json())
        .then(jsondata => {
            alimentos = jsondata;
            loadTabla();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
