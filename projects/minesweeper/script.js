const FILAS = 10;
const COLUMNAS = 8;
const MINAS = 15;

let tablero = [];
let tableroSolucion = [];
let juegoTerminado = false;
let banderasRestantes = MINAS+1;

document.getElementById("reset-button").addEventListener("click", reiniciarJuego);

function inicializarJuego() {
    tablero = asignarMinas();
    tableroSolucion = generarTablero();
    juegoTerminado = false;
    banderasRestantes = MINAS; // Reiniciar el contador de banderas
    document.getElementById("remaining-flags").textContent = banderasRestantes;
    document.getElementById("game-status").textContent = ""; // Limpiar mensaje de estado
    renderizarTablero();
}

function asignarMinas() {
    let tablero = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));
    let minasColocadas = 0;
    while (minasColocadas < MINAS) {
        let fila = Math.floor(Math.random() * FILAS);
        let col = Math.floor(Math.random() * COLUMNAS);
        if (tablero[fila][col] === 0) {
            tablero[fila][col] = 1;
            minasColocadas++;
        }
    }
    return tablero;
}

function contarMinasAlrededor(tablero, fila, col) {
    let contador = 0;
    for (let i = fila - 1; i <= fila + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < FILAS && j >= 0 && j < COLUMNAS && tablero[i][j] === 1) {
                contador++;
            }
        }
    }
    return contador;
}

function generarTablero() {
    const arrayMinas = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));
    for (let i = 0; i < FILAS; i++) {
        for (let j = 0; j < COLUMNAS; j++) {
            arrayMinas[i][j] = tablero[i][j] === 1 ? -1 : contarMinasAlrededor(tablero, i, j);
        }
    }
    return arrayMinas;
}

function renderizarTablero() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Limpiar el tablero
    gameBoard.style.gridTemplateColumns = `repeat(${COLUMNAS}, 30px)`;
    
    for (let i = 0; i < FILAS; i++) {
        for (let j = 0; j < COLUMNAS; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.fila = i;
            cell.dataset.col = j;
            cell.addEventListener("click", (e) => revelarCelda(e.target));
            cell.addEventListener("contextmenu", (e) => marcarCelda(e, cell)); // Agregar evento de clic derecho
            gameBoard.appendChild(cell);
        }
    }
}

function revelarCelda(cell) {
    if (juegoTerminado) return;

    const fila = parseInt(cell.dataset.fila);
    const col = parseInt(cell.dataset.col);
    const valor = tableroSolucion[fila][col];

    if (cell.classList.contains("revealed")) return;

    if (valor === -1) {
        cell.classList.add("mine");
        cell.textContent = "💣";
        terminarJuego(false);
        return;
    }

    cell.textContent = valor > 0 ? valor : "";
    cell.dataset.value = valor; // Asignar data-value para el estilo
    cell.classList.add("revealed");

    if (valor === 0) {
        revelarCeldasVacias(fila, col);
    }
    comprobarVictoria();
}

function revelarCeldasVacias(fila, col) {
    for (let i = fila - 1; i <= fila + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < FILAS && j >= 0 && j < COLUMNAS) {
                const cell = document.querySelector(`.cell[data-fila="${i}"][data-col="${j}"]`);
                if (cell && !cell.classList.contains("revealed")) {
                    revelarCelda(cell);
                }
            }
        }
    }
}

// Función para marcar una celda con una bandera
function marcarCelda(event, cell) {
    event.preventDefault(); // Evitar el menú contextual del navegador
    if (juegoTerminado) return;

    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
        cell.textContent = ""; // Limpiar texto de la celda
        banderasRestantes++; // Aumentar contador de banderas
    } else if (banderasRestantes > 0) {
        cell.classList.add("flag");
        cell.textContent = "🚩"; // Mostrar la bandera
        banderasRestantes--; // Disminuir contador de banderas
    }
    
    document.getElementById("remaining-flags").textContent = banderasRestantes; // Actualizar el contador
}

function terminarJuego(victoria) {
    juegoTerminado = true;
    const mensaje = victoria ? "¡Has ganado!" : "Game Over";
    document.getElementById("game-status").textContent = mensaje;

    if (!victoria) {
        // Revelar todas las bombas al final del juego si no es victoria
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            const fila = parseInt(cell.dataset.fila);
            const col = parseInt(cell.dataset.col);
            if (tableroSolucion[fila][col] === -1) {  // Si es una bomba
                cell.classList.add("mine");
                cell.textContent = "💣";
            }
        });
    }
}

function comprobarVictoria() {
    const cells = document.querySelectorAll(".cell");
    let celdasSinMina = 0;
    
    cells.forEach(cell => {
        const fila = parseInt(cell.dataset.fila);
        const col = parseInt(cell.dataset.col);
        if (cell.classList.contains("revealed") || tablero[fila][col] === 1) {
            celdasSinMina++;
        }
    });

    if (celdasSinMina === FILAS * COLUMNAS) {
        terminarJuego(true);
    }
}

function reiniciarJuego() {
    inicializarJuego();
}

window.onload = inicializarJuego;
