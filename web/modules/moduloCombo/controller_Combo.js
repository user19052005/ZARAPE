let indexComboSeleccionado = -1;
let combos = [];

const moduloCombo = {
    addCombo,
    loadTabla,
    selectCombo,
    clean,
    updateCombo,
    deleteCombo,
    searchCombos
};

function addCombo() {
    let numeroUnicoCombo = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let categoria = document.getElementById("txtCategoria").value;

    if (!numeroUnicoCombo || !nombre || !precio || !descripcion || !categoria) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let combo = {
        numeroUnicoCombo,
        nombre,
        precio,
        descripcion,
        categoria,
        estatus: "Activo"
    };

    combos.push(combo);
    loadTabla();
    clean();
}

function loadTabla() {
    let cuerpo = "";
    combos.forEach(function (combo, index) {
        let registro =
                `<tr onclick="moduloCombo.selectCombo(${index});">
                <td>${combo.nombre}</td>
                <td>${combo.precio}</td>
                <td>${combo.descripcion}</td>
                <td>${combo.categoria}</td>
                <td>${combo.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblCombo").innerHTML = cuerpo;
}

function selectCombo(index) {
    document.getElementById("txtNumUnico").value = combos[index].numeroUnicoCombo;
    document.getElementById("txtNombre").value = combos[index].nombre;
    document.getElementById("txtPrecio").value = combos[index].precio;
    document.getElementById("txtDescripcion").value = combos[index].descripcion;
    document.getElementById("txtCategoria").value = combos[index].categoria;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");

    indexComboSeleccionado = index;
}

function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtCategoria").value = "";
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    indexComboSeleccionado = -1;
}

function updateCombo() {
    if (indexComboSeleccionado !== -1) {
        combos[indexComboSeleccionado].numeroUnicoCombo = document.getElementById("txtNumUnico").value;
        combos[indexComboSeleccionado].nombre = document.getElementById("txtNombre").value;
        combos[indexComboSeleccionado].precio = document.getElementById("txtPrecio").value;
        combos[indexComboSeleccionado].descripcion = document.getElementById("txtDescripcion").value;
        combos[indexComboSeleccionado].categoria = document.getElementById("txtCategoria").value;

        combos[indexComboSeleccionado].estatus = combos[indexComboSeleccionado].estatus === "Activo" ? "Inactivo" : "Activo";

        loadTabla();
        clean();
    }
}

function deleteCombo() {
    if (indexComboSeleccionado !== -1) {
        combos[indexComboSeleccionado].estatus = "Inactivo";
        loadTabla();
        clean();
    }
}

function searchCombos() {
    let filtro = document.getElementById("txtBusquedaCombo").value.toLowerCase();
    let resultados = combos
            .map((combo, index) => ({combo, index}))
            .filter(item => item.combo.nombre.toLowerCase().includes(filtro));

    let cuerpo = "";
    resultados.forEach(function (item) {
        let registro =
                `<tr onclick="moduloCombo.selectCombo(${item.index});">
                <td>${item.combo.nombre}</td>
                <td>${item.combo.precio}</td>
                <td>${item.combo.descripcion}</td>
                <td>${item.combo.categoria}</td>
                <td>${item.combo.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });

    document.getElementById("tblCombo").innerHTML = cuerpo;
}
document.getElementById("txtBusquedaCombo").addEventListener("input", searchCombos);

fetch("data_Combo.json")
        .then(response => response.json())
        .then(jsondata => {
            combos = jsondata;
            loadTabla();
        })
        .catch(error => console.error('Error al cargar los datos:', error));