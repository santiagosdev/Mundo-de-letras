/* =====================================================
   DATOS DE LAS ACTIVIDADES  (aquí cambias textos y respuestas)
===================================================== */

// 1) VERDADERO O FALSO: ["afirmación", true o false]
const VERDADERO_FALSO = [
  ["La selva amazónica es el bosque tropical más grande del planeta.", true],
  ["La selva amazónica está ubicada principalmente en Colombia.", false],
  ["El río Amazonas es el más caudaloso del mundo.", true],
  ["Los científicos ya conocen todas las especies que viven en la selva.", false],
  ["La tala de árboles y la contaminación amenazan el ecosistema amazónico.", true]
];

// 2) COMPLETAR ORACIONES: ["texto antes", "respuesta correcta", "texto después"]
const COMPLETAR = [
  ["Colombia es famosa en el mundo por su", "café", "."],
  ["El café se cultiva en las montañas del", "Eje Cafetero", "."],
  ["Los frutos del cafeto se llaman", "cerezas", "."],
  ["Cuando están maduras, las cerezas se ponen de color", "rojo", "."],
  ["Los campesinos recogen las cerezas a", "mano", "."]
];
const PALABRAS_EXTRA = ["verde", "máquina", "chocolate"];   // palabras que confunden (no son respuesta)

// 3) SOPA DE LETRAS: cuadrícula cuadrada (10x10) y las palabras escondidas
const SOPA = [
  "JAAPELSLUM",
  "URLLTEAAAR",
  "PRSAESTNNN",
  "IEANTTUIVE",
  "TITERRRLBA",
  "ETETAENLIU",
  "RRLAMLOODU",
  "GLISALPSPV",
  "SOTOSAOGLR",
  "CSELAANULP"
];
const PALABRAS_SOPA = ["SOL", "ESTRELLA", "PLANETAS", "TIERRA", "LUNA", "MARTE", "JUPITER", "SATURNO", "ANILLOS", "SATELITE"];

// 4) CRUCIGRAMA: ["PALABRA", fila, columna, "H" horizontal o "V" vertical, "pista"]
//    Las filas y columnas empiezan en 0. Las palabras que se cruzan deben compartir la letra.
const CRUCIGRAMA = [
  ["RIO", 0, 4, "V", "Corriente de agua que desemboca en el mar"],
  ["LLUVIA", 0, 6, "V", "Agua que cae de las nubes"],
  ["LAGOS", 0, 11, "V", "Grandes depósitos de agua rodeados de tierra"],
  ["CIELO", 1, 3, "H", "Lugar hacia donde sube el vapor"],
  ["MAR", 1, 10, "H", "Gran extensión de agua salada"],
  ["NUBES", 2, 0, "V", "Se forman cuando el vapor se enfría"],
  ["GOTAS", 2, 2, "V", "Pequeñas porciones de agua que forman la lluvia"],
  ["CALOR", 2, 9, "V", "Lo que da el Sol y hace evaporar el agua"],
  ["VAPOR", 3, 8, "H", "Agua en forma de gas que sube al cielo"],
  ["SOL", 4, 4, "V", "Estrella que calienta el agua de la Tierra"],
  ["EVAPORACION", 5, 0, "H", "Proceso en que el agua se convierte en vapor"]
];

/* =====================================================
   PESTAÑAS: mostrar una actividad y ocultar las demás
===================================================== */
document.querySelectorAll(".pestanas button").forEach(boton => {
  boton.onclick = () => {
    document.querySelectorAll(".pestanas button").forEach(b => b.classList.remove("activa"));
    document.querySelectorAll(".actividad").forEach(a => a.classList.remove("visible"));
    boton.classList.add("activa");
    document.getElementById(boton.dataset.ir).classList.add("visible");
  };
});

// Mensaje según el puntaje
function mensaje(puntos, total) {
  return puntos === total ? "¡Perfecto! 🌟" : puntos >= total / 2 ? "¡Muy bien! 🎉" : "¡Sigue practicando! 💪";
}

/* =====================================================
   ACTIVIDAD 1: VERDADERO O FALSO
===================================================== */
const respuestasVF = [];
const itemsVF = VERDADERO_FALSO.map(([texto], i) => {
  const caja = document.createElement("div");
  caja.className = "item";
  caja.innerHTML = `<p>${i + 1}. ${texto}</p>
    <button class="op" data-v="true">✓ Verdadero</button>
    <button class="op" data-v="false">✗ Falso</button>`;
  caja.querySelectorAll("button").forEach(b => b.onclick = () => {
    respuestasVF[i] = b.dataset.v === "true";
    caja.querySelectorAll("button").forEach(x => x.classList.remove("elegida"));
    b.classList.add("elegida");
  });
  document.getElementById("vf-lista").appendChild(caja);
  return caja;
});
document.getElementById("vf-btn").onclick = () => {
  let puntos = 0;
  itemsVF.forEach((caja, i) => {
    const bien = respuestasVF[i] === VERDADERO_FALSO[i][1];
    if (bien) puntos++;
    caja.classList.toggle("ok", bien);
    caja.classList.toggle("mal", !bien);
  });
  document.getElementById("vf-puntaje").textContent =
    `Puntaje: ${puntos} / ${VERDADERO_FALSO.length}  ${mensaje(puntos, VERDADERO_FALSO.length)}`;
};

/* =====================================================
   ACTIVIDAD 2: COMPLETAR ORACIONES
===================================================== */
const banco = COMPLETAR.map(f => f[1]).concat(PALABRAS_EXTRA).sort();
const listasCompletar = COMPLETAR.map(([antes, , despues], i) => {
  const caja = document.createElement("div");
  caja.className = "item";
  caja.innerHTML = `<span>${i + 1}. ${antes} </span>
    <select><option value="">elige...</option>${banco.map(p => `<option>${p}</option>`).join("")}</select>
    <span> ${despues}</span>`;
  document.getElementById("completar-lista").appendChild(caja);
  return caja;
});
document.getElementById("completar-btn").onclick = () => {
  let puntos = 0;
  listasCompletar.forEach((caja, i) => {
    const bien = caja.querySelector("select").value === COMPLETAR[i][1];
    if (bien) puntos++;
    caja.classList.toggle("ok", bien);
    caja.classList.toggle("mal", !bien);
  });
  document.getElementById("completar-puntaje").textContent =
    `Puntaje: ${puntos} / ${COMPLETAR.length}  ${mensaje(puntos, COMPLETAR.length)}`;
};

/* =====================================================
   ACTIVIDAD 3: SOPA DE LETRAS
   El jugador pulsa la primera y la última letra de una palabra.
===================================================== */
const COLS = SOPA[0].length;      // ancho de la cuadrícula (se calcula solo)
document.getElementById("sopa").style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
const celdas = [];
let inicio = null, encontradas = [];
const msg = document.getElementById("sopa-msg");

SOPA.forEach((fila, r) => fila.split("").forEach((letra, c) => {
  const b = document.createElement("button");
  b.textContent = letra;
  b.onclick = () => pulsarLetra(r, c);
  document.getElementById("sopa").appendChild(b);
  celdas.push(b);
}));
PALABRAS_SOPA.forEach(p => {
  const s = document.createElement("span");
  s.id = "p-" + p; s.textContent = p;
  document.getElementById("palabras").appendChild(s);
});

function pulsarLetra(r, c) {
  if (!inicio) {                       // primer clic: guardar el inicio
    inicio = [r, c];
    celdas[r * COLS + c].classList.add("inicio-sel");
    msg.textContent = "¡Bien! Ahora haz clic en la última letra.";
    return;
  }
  const [r0, c0] = inicio;
  celdas[r0 * COLS + c0].classList.remove("inicio-sel");
  inicio = null;
  const dr = r - r0, dc = c - c0;
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) { msg.textContent = "Las letras deben estar en línea recta."; return; }
  const largo = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
  const pasoR = Math.sign(dr), pasoC = Math.sign(dc), posiciones = [];
  let texto = "";
  for (let i = 0; i < largo; i++) {
    posiciones.push((r0 + i * pasoR) * COLS + (c0 + i * pasoC));
    texto += SOPA[r0 + i * pasoR][c0 + i * pasoC];
  }
  const alReves = texto.split("").reverse().join("");
  const palabra = PALABRAS_SOPA.find(p => !encontradas.includes(p) && (p === texto || p === alReves));
  if (!palabra) { msg.textContent = "Esa no es una de las palabras. ¡Intenta de nuevo!"; return; }
  const color = `hsl(${(PALABRAS_SOPA.indexOf(palabra) * 47) % 360} 65% 38%)`;   // un color distinto por palabra
  posiciones.forEach(i => { celdas[i].style.background = color; celdas[i].style.color = "#fff"; });
  const etiqueta = document.getElementById("p-" + palabra);
  etiqueta.classList.add("hallada"); etiqueta.style.background = color;
  encontradas.push(palabra);
  msg.textContent = encontradas.length === PALABRAS_SOPA.length
    ? "¡Encontraste todas las palabras! 🏆" : `¡Encontraste "${palabra}"! Busca otra palabra.`;
}

/* =====================================================
   ACTIVIDAD 4: CRUCIGRAMA
   Las casillas se calculan solas a partir de la lista CRUCIGRAMA.
===================================================== */
const mapa = {};            // "fila-columna" -> {letra, numero}
const casillasPalabra = []; // casillas de cada palabra
CRUCIGRAMA.forEach(([palabra, f, c, dir], n) => {
  const lista = palabra.split("").map((letra, i) => {
    const fila = dir === "V" ? f + i : f, col = dir === "H" ? c + i : c;
    const clave = fila + "-" + col;
    mapa[clave] = mapa[clave] || { letra, fila, col };
    if (i === 0) mapa[clave].numero = n + 1;
    return clave;
  });
  casillasPalabra.push(lista);
});
const filas = Math.max(...Object.values(mapa).map(x => x.fila)) + 1;
const cols = Math.max(...Object.values(mapa).map(x => x.col)) + 1;
const tabla = document.getElementById("cruci");
for (let f = 0; f < filas; f++) {
  const tr = tabla.insertRow();
  for (let c = 0; c < cols; c++) {
    const td = tr.insertCell(), dato = mapa[f + "-" + c];
    if (!dato) { td.className = "negra"; continue; }
    td.innerHTML = (dato.numero ? `<small>${dato.numero}</small>` : "") + `<input maxlength="1" data-k="${f}-${c}">`;
  }
}
const pistas = document.getElementById("pistas");
[["H", "→ Horizontales"], ["V", "↓ Verticales"]].forEach(([d, titulo]) => {
  pistas.innerHTML += `<h3>${titulo}</h3>` + CRUCIGRAMA.map((p, n) =>
    p[3] === d ? `<p>${n + 1}. ${p[4]}</p>` : "").join("");
});
document.getElementById("cruci-btn").onclick = () => {
  let puntos = 0;
  casillasPalabra.forEach(lista => {
    if (lista.every(k => document.querySelector(`[data-k="${k}"]`).value.toUpperCase() === mapa[k].letra)) puntos++;
  });
  document.querySelectorAll("#cruci input").forEach(inp => {
    const bien = inp.value.toUpperCase() === mapa[inp.dataset.k].letra;
    inp.classList.toggle("ok", bien);
    inp.classList.toggle("mal", !bien && inp.value !== "");
  });
  document.getElementById("cruci-puntaje").textContent =
    `Palabras correctas: ${puntos} / ${CRUCIGRAMA.length}  ${mensaje(puntos, CRUCIGRAMA.length)}`;
};
