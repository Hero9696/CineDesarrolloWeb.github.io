// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let nombres=[];
let amigo=document.getElementById("amigo");
let boton=document.getElementById("botonagregar");

function agregarAmigo() {
    if (amigo.value.trim() !== "") {
        nombres.push(amigo.value.trim());
        amigo.value = "";
        mostrarAmigos();
    } else {
        alert("Por favor, ingresa un nombre válido.");
    }
}

function mostrarAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpiar la lista antes de mostrar los amigos

    nombres.forEach((nombre, index) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        li.setAttribute("data-index", index); // Añadir un atributo para identificar el índice
        listaAmigos.appendChild(li);
    });
}

function sortearAmigos() {
    if (nombres.length < 2) {
        alert("Necesitas al menos dos amigos para realizar el sorteo.");
        return;
    }

    let resultados = {};
    let intentos = 0;
    const maxIntentos = 100;

    while (intentos < maxIntentos) {
        intentos++;
        resultados = {};
        const disponibles = [...nombres];
        let falló = false;

        for (const amigo of nombres) {
            // Filtramos opciones válidas: no puede ser él mismo ni alguien ya asignado
            const posibles = disponibles.filter(nombre => nombre !== amigo);

            if (posibles.length === 0) {
                // No hay forma de asignar sin repetir, reiniciamos
                falló = true;
                break;
            }

            // Elegimos aleatoriamente de los posibles
            const index = Math.floor(Math.random() * posibles.length);
            const elegido = posibles[index];

            resultados[amigo] = elegido;

            // Quitamos el elegido de disponibles
            const eliminarIndex = disponibles.indexOf(elegido);
            disponibles.splice(eliminarIndex, 1);
        }

        if (!falló) {
            mostrarResultados(resultados);
            return;
        }
    }

    alert("No se pudo generar una combinación válida después de varios intentos. Intenta de nuevo.");
}


function mostrarResultados(resultados) {
    const listaResultados = document.getElementById("resultado");
    listaResultados.innerHTML = ""; // Limpiar antes de mostrar los resultados

    const resultado = document.createElement("ul");

    for (const [amigo, amigoSorteado] of Object.entries(resultados)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} -> ${amigoSorteado}`;
        resultado.appendChild(li);
    }

    listaResultados.appendChild(resultado); // 🔴 Esto es lo que faltaba
}
