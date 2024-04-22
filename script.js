const listaTextArea = document.getElementById("listTextArea");
const cantidadInput = document.getElementById("cantidadSalidas");
const botonGenerar = document.getElementById("generateButton");
const resultadosContenedor = document.getElementById("output");
const resultadosContenedorTabla = document.getElementById("output-table");
botonGenerar.addEventListener("click", generarListaAleatoria);

function generarListaAleatoria() {
    if (!generateButton.disabled) {
        generateButton.disabled = true;
        resultadosContenedor.classList.remove("animate__pulse");
        const listaTexto = listaTextArea.value.trim();
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
                html += "<tr><td>" + (i + 1) + "</td><td>" + element + "</td></tr>";
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