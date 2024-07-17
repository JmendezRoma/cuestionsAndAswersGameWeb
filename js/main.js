"use strict";

//se guarda en una variable el JSON
const url = "../JSON/quiz.json";

const finalData = [];

//se captura y parsea el JSON a objeto literal de js
async function getAndParseJSON() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error al obetner o parsear el JSON", error);
  }
}

let cuestionsRamdonArray = [];

//mezclar el array obtenido
async function filterQuestions() {
  const finalData = await getAndParseJSON();
  if (finalData) {
    finalData.sort(() => Math.random() - 0.5);
    cuestionsRamdonArray = finalData;
  }
}

const cuestionHtmlSelector = document.getElementById("sectionCuestions");
const selectorNumeroPregunta = document.getElementById("numeroPregunta");

let numOfCuestion = 0;

//inserta en el DOM el la pregunta random y luego la pasa a string con stringiy
async function insertRandomQuestion() {
  await filterQuestions();

  if (cuestionsRamdonArray != null) {
    cuestionsRamdonArray.forEach((element) => {
      let arrayString = JSON.stringify(element.question);
      cuestionHtmlSelector.innerHTML = `
      
      <p class="textAltered">${arrayString}</p>
      `;
    });
    numOfCuestion++;

    selectorNumeroPregunta.innerHTML = `
    <p class="textAltered">
    Pregunta numero: ${numOfCuestion}
    </p>
    `;
  } else {
    console.log(
      "Error : esto no funciona, no se ha podido acceder a los datos"
    );
  }
}

//se guardan los botones en variables
const firstAnswerButton = document.getElementById("answerButton1");
const secondAnswerButton = document.getElementById("answerButton2");
const thirdAnswerButton = document.getElementById("answerButton3");
const fourthAnswerButton = document.getElementById("answerButton4");

let answerArray;
let correctAnswer;

//inserta en el DOM las respuestas
async function insertAnswers() {
  await insertRandomQuestion();
  if (cuestionsRamdonArray != null) {
    cuestionsRamdonArray.forEach((element) => {
      answerArray = element.answers;
      correctAnswer = element.correct;

      firstAnswerButton.innerHTML = `
      
      ${answerArray[0]}
      `;
      secondAnswerButton.innerHTML = `
      
      ${answerArray[1]}
      `;
      thirdAnswerButton.innerHTML = `
      
      ${answerArray[2]}
      `;
      fourthAnswerButton.innerHTML = `
      
      ${answerArray[3]}
      `;
    });
  }
}

//se llaman los botones colocandoles un evento donde se llama checkAnswers como callback
firstAnswerButton.addEventListener("click", () =>
  checkAnswers(answerArray[0], correctAnswer)
);
secondAnswerButton.addEventListener("click", () =>
  checkAnswers(answerArray[1], correctAnswer)
);
thirdAnswerButton.addEventListener("click", () =>
  checkAnswers(answerArray[2], correctAnswer)
);
fourthAnswerButton.addEventListener("click", () =>
  checkAnswers(answerArray[3], correctAnswer)
);

let numOfCorrectAnwers = 0;
let numOfIncorrectAnwers = 0;

//guardarmos la etiqueta score
const selectorNumOfCorrectAnwers = document.getElementById("score");

//funcion que se encarga de comparar la seleccion del usuario, comprobando si es correcta o incorrecta
async function checkAnswers(selectedAnswer, correctAnswer) {
  
  disableEnableButtons(true)
  if (selectedAnswer === correctAnswer) {
    numOfCorrectAnwers += 1;
    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">
    PUNTUACION:${numOfCorrectAnwers}
    has acertado
    </p>
    `;
    
  } else {
    numOfIncorrectAnwers += 1;
    numOfCorrectAnwers -= 1;
    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">
    PUNTUACION:${numOfCorrectAnwers}
    has fallado
    </p>
    `;
    
  }
  
  
  if (numOfCorrectAnwers === 10) {
    //se llama a la funcion
    disableEnableButtons(true)
    
    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">
    PUNTUACION:${numOfCorrectAnwers}
    has ganado
    </p>
    `;
    return;
  }
  if (numOfIncorrectAnwers === 3) {
    //se llama a la funcion
    disableEnableButtons(true)
    
    
    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">PUNTUACION:${numOfCorrectAnwers}
    has perdido
    </p> 
    
    <button type="submit" id="loadBtn">Reiniciar</button>
    `;
    
    //se crea evento de boton de reinicio del juego
    const selectorLoad = document.getElementById("loadBtn");
    selectorLoad.addEventListener("click", () => {
      location.reload();
    });
    return;
  }
  setTimeout(() => {
    disableEnableButtons(false);
    insertRandomQuestion();
    insertAnswers();
  
  }, 1000);
}

//se crea funcion  para se llamada dentro de las condiciones
function disableEnableButtons(status) {
  firstAnswerButton.disabled = status;
  secondAnswerButton.disabled = status;
  thirdAnswerButton.disabled = status;
  fourthAnswerButton.disabled = status;
}


insertRandomQuestion();
insertAnswers();

//TAREAS: 1/solucionar problema de contador de preguntas(bucle for each afecta al contador.)2/problema de despliegue en git hub pages. 3/estructurar y estilizar el Css. 4/MediasQuerys movil, corregir funcion de preguntas ramdon

//MEJORAS: animaciones, pagina de empezar el juego con boton start, comodines, musica, fuentes, modularizar el codigo y refactorizar, mejorar funcion randon()
