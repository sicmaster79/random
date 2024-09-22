const titulo = document.getElementById("Titulo");
const cardTitulo = document.getElementById("cardTitulo");
const cantidadInput = document.getElementById("cantidadSalidas");
const botonGenerar = document.getElementById("generateButton");
const resultadosContenedor = document.getElementById("output");
const resultadosContenedorTabla = document.getElementById("output-table");
botonGenerar.addEventListener("click", generarListaAleatoria);

// Inicializa el editor de CodeMirror
var editor = CodeMirror.fromTextArea(document.getElementById("listTextArea"), {
    lineNumbers: true,
});

// Función para capturar el contenido y mostrarlo en la tabla
function mostrarEnTabla(contenido) {
    var lineas = contenido.split('\n');  // Divide el contenido en líneas

    console.log(lineas)

    var tbody = document.querySelector('#table tbody');
    tbody.innerHTML = '';  // Limpia la tabla antes de mostrar nuevos datos

    // Itera sobre cada línea y la agrega a la tabla
    lineas.forEach((linea, index) => {
        var fila = document.createElement('tr');
        var celdaNumero = document.createElement('td');
        var celdaContenido = document.createElement('td');

        celdaNumero.textContent = index + 1;  // Número de línea (empezando en 1)
        celdaContenido.textContent = linea;  // Contenido de la línea

        fila.appendChild(celdaNumero);
        fila.appendChild(celdaContenido);
        tbody.appendChild(fila);
    });
}


function generarListaAleatoria() {
    if (!generateButton.disabled) {
        cardTitulo.innerHTML = titulo.value.replace(/\n/g, "<br>");;

        generateButton.disabled = true;
        resultadosContenedor.classList.remove("animate__pulse");

        const listaTextArea = editor.getValue();     // Captura el contenido del editor

        const listaTexto = listaTextArea.trim();
        const elementosLista = listaTexto.split("\n");
        if (!elementosLista.length) {
            alert("Ingrese al menos un elemento en la lista");
            generateButton.disabled = false;
            return;
        }
        const cantidadSalidas = parseInt(cantidadInput.value);
        if (cantidadSalidas <= 0 || cantidadSalidas > elementosLista.length) {
            alert(
                "La cantidad de salidas debe ser mayor que 0 y menor o igual que la cantidad de elementos en la lista"
            );
            generateButton.disabled = false;
            return;
        }
        resultadosContenedorTabla.innerHTML = "";

        mostrarEnTabla(listaTextArea)

        function generarElementoAleatorio() {
            const elementosGenerados = [];
            const elementosLista = listaTexto.split("\n");

            for (let i = 0; i < cantidadSalidas; i++) {
                const indiceAleatorio = Math.floor(
                    Math.random() * elementosLista.length
                );
                const elementoAleatorio = elementosLista.splice(indiceAleatorio, 1)[0];
                elementosGenerados.push(elementoAleatorio);
            }
            return elementosGenerados;
        }
        let intervaloId;
        let elementoActual = "";
        let html = "";
        let contador = 0;
        intervaloId = setInterval(() => {
            contador++;

            if (contador === 50) {
                clearInterval(intervaloId);
                mostrarElementoFinal();
                return;
            }
            html = "";
            elementoActual = generarElementoAleatorio();
            for (let i = 0; i < elementoActual.length; i++) {
                const element = elementoActual[i];
                html += "<tr><td style='width:20px'>" + (i + 1) + ".</td><td>" + element + "</td></tr>";
            }
            resultadosContenedorTabla.innerHTML = `${html}`;
        }, 100);

        function mostrarElementoFinal() {
            resultadosContenedorTabla.innerHTML = `${html}`;
            resultadosContenedor.classList.add("animate__pulse");
            setTimeout(() => {
                generateButton.disabled = false;
            }, 5000);
        }
    }
}
