"use strict";
import {  } from "./main.js";
let count = 0;

const nextButton = document.getElementById("cuestionButton");
nextButton.addEventListener("click", () => {
  ++count;

  if (count >= 10) {
    location.reload();
  }
  const selectorScore = document.getElementById("numeroPregunta");

  selectorScore.innerHTML = `
    <p class="textAltered">Pregunta numero: ${count} </p>
    `;
});



