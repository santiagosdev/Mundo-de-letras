/* =====================================================
   PREGUNTAS DE LA EVALUACIÓN  (aquí cambias las preguntas)
   Formato: ["pregunta", ["opción A", "opción B", "opción C", "opción D"], número de la correcta]
   El número de la correcta empieza en 0: 0 = A, 1 = B, 2 = C, 3 = D
===================================================== */
const PREGUNTAS = [
  ["¿Cuántos años tiene Camila?", ["6 años", "10 años", "15 años", "8 años"], 1],
  ["¿En qué ciudad vive Camila?", ["Medellín", "Bogotá", "Cali", "Santa Marta"], 0],
  ["¿En qué colegio estudia Camila?", ["Colegio San José", "Colegio El Poblado", "Colegio San Rafael", "Colegio Nuevo Mundo"], 2],
  ["¿Cuánto duró el viaje de ida a Santa Marta?", ["10 horas", "15 horas", "6 horas", "20 horas"], 1],
  ["¿A qué hora partió la familia hacia Santa Marta?", ["6 de la mañana", "8 de la mañana", "4 de la tarde", "10 de la noche"], 0],
  ["¿Cómo se llama la mamá de Camila?", ["María", "Sofía", "Lucía", "Patricia"], 2],
  ["¿Cómo se llama el papá de Camila?", ["Roberto", "Carlos", "Juan", "Miguel"], 0],
  ["¿Cuántos años tiene el hermano de Camila?", ["4 años", "6 años", "8 años", "10 años"], 1],
  ["¿Qué hizo Andrés durante el viaje en carro?", ["Durmió todo el camino", "Jugó videojuegos", "Leyó un libro", "Escuchó música"], 3],
  ["¿Cuántos caracoles encontró Camila en la orilla?", ["5 caracoles", "3 caracoles", "10 caracoles", "8 caracoles"], 0],
  ["¿En qué hotel se hospedó la familia?", ["Hotel Playa Azul", "Hotel del Mar", "Hotel Santa Marta", "Hotel El Caribe"], 1],
  ["¿Cuántos días se hospedó la familia en el hotel?", ["3 días", "7 días", "5 días", "10 días"], 2],
  ["¿Qué desayunaban todas las mañanas en el hotel?", ["Arepas con queso y jugo de naranja", "Huevos y café con leche", "Frutas y cereal", "Pan con mantequilla"], 0],
  ["¿De qué color era el salvavidas de Camila?", ["Rojo", "Amarillo", "Azul", "Verde"], 1],
  ["¿Cuál era la temperatura del agua del mar?", ["20 grados", "25 grados", "28 grados", "32 grados"], 2],
  ["¿Qué lugar visitaron el tercer día?", ["Parque Nacional Tayrona", "Parque de los Flamencos", "Parque Bolívar", "Parque del Café"], 0],
  ["¿Cómo se llamaba el guía del parque?", ["Carlos", "Juan", "Roberto", "Marcos"], 3],
  ["¿Cómo se llamaba la tienda donde compraron recuerdos?", ["Tienda La Playa", "Regalos del Mar", "El Recuerdo", "Mar y Sol"], 1],
  ["¿Cuánto costó la pulsera que eligió Camila?", ["$15.000 pesos", "$8.000 pesos", "$20.000 pesos", "$10.000 pesos"], 0],
  ["¿Cuánto duró el viaje de regreso a Medellín?", ["15 horas", "12 horas", "16 horas", "20 horas"], 2]
];

/* =====================================================
   MENSAJES SEGÚN EL PORCENTAJE (puedes cambiar los textos)
===================================================== */
function mensajeFinal(porcentaje) {
  if (porcentaje === 100) return ["🏆 ¡Perfecto!", "¡Dominas la información explícita al 100%! Eres un experto lector."];
  if (porcentaje >= 80)  return ["🌟 ¡Excelente!", "Tienes un dominio sobresaliente del tema. ¡Sigue así!"];
  if (porcentaje >= 60)  return ["🎉 ¡Muy bien!", "Vas por muy buen camino. Un poco más de práctica y serás experto."];
  if (porcentaje >= 40)  return ["👍 ¡Buen trabajo!", "Estás progresando. Revisa el texto y vuelve a intentarlo."];
  return ["💪 ¡Sigue intentando!", "Lee el texto con calma y busca la información explícita."];
}

/* =====================================================
   CÓDIGO DE LA EVALUACIÓN (no hace falta cambiarlo)
===================================================== */
const respuestas = [];                       // opción elegida en cada pregunta
const LETRAS = ["A", "B", "C", "D"];
const contenedor = document.getElementById("preguntas");
const botonEnviar = document.getElementById("enviar");
const contador = document.getElementById("contador");

// Dibujar las preguntas
PREGUNTAS.forEach(([texto, opciones], i) => {
  const caja = document.createElement("div");
  caja.className = "item";
  caja.innerHTML = `<p><strong>${i + 1}. ${texto}</strong></p>` +
    opciones.map((o, j) => `<button class="op" data-j="${j}">${LETRAS[j]}. ${o}</button>`).join("");
  caja.querySelectorAll("button").forEach(b => b.onclick = () => {
    respuestas[i] = Number(b.dataset.j);
    caja.querySelectorAll("button").forEach(x => x.classList.remove("elegida"));
    b.classList.add("elegida");
    actualizarContador();
  });
  contenedor.appendChild(caja);
});

// Mostrar cuántas preguntas faltan y activar el botón al terminar
function actualizarContador() {
  const hechas = respuestas.filter(r => r !== undefined).length;
  contador.textContent = `${hechas} / ${PREGUNTAS.length} respondidas`;
  botonEnviar.disabled = hechas < PREGUNTAS.length;
}
actualizarContador();

// Enviar y mostrar el resultado
botonEnviar.onclick = () => {
  const puntos = PREGUNTAS.filter((p, i) => respuestas[i] === p[2]).length;
  const porcentaje = Math.round(puntos / PREGUNTAS.length * 100);
  const [titulo, texto] = mensajeFinal(porcentaje);
  const revision = PREGUNTAS.map((p, i) => {
    const bien = respuestas[i] === p[2];
    return `<div class="item ${bien ? "ok" : "mal"}">${i + 1}. ` +
      (bien ? "Correcta ✓" : `Incorrecta. Correcta: <strong>${p[1][p[2]]}</strong>`) + `</div>`;
  }).join("");
  document.getElementById("evaluacion").style.display = "none";
  const res = document.getElementById("resultado");
  res.style.display = "block";
  res.innerHTML = `<h2>${titulo}</h2><p style="text-align:center">${texto}</p>
    <p class="puntaje" style="text-align:center;font-size:40px">${puntos} / ${PREGUNTAS.length} (${porcentaje}%)</p>
    <p style="text-align:center"><a class="boton" href="Evaluate.html">Repetir evaluación</a>
    <a class="boton" href="index.html">Volver al inicio</a></p><h3>Revisión de respuestas</h3>${revision}`;
  window.scrollTo(0, 0);
};
