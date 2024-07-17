"use strict";

//se guarda en una variable el JSON
const url = "../JSON/quiz.json";

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
const finalData = [];

let cuestionsRamdonArray = [];

//mezclar el array obtenido
async function filterQuestions() {
  const finalData = await getAndParseJSON();
  if (finalData) {
    finalData.sort(() => Math.floor(Math.random() - 0.5));
    cuestionsRamdonArray = finalData;
  }
}


const cuestionHtmlSelector = document.getElementById("sectionCuestions");
const selectorNumeroPregunta = document.getElementById("numeroPregunta");

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

    selectorNumeroPregunta.innerHTML = `
    <p class="textAltered">
    Question number: ${numOfCuestion}
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
let numOfCuestion = 1;

//guardarmos la etiqueta score
const selectorNumOfCorrectAnwers = document.getElementById("score");

//funcion que se encarga de comparar la seleccion del usuario, comprobando si es correcta o incorrecta
async function checkAnswers(selectedAnswer, correctAnswer) {
  disableEnableButtons(true);
  if (selectedAnswer === correctAnswer) {
    numOfCorrectAnwers += 1;
    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">
    Has acertado, PUNTUACION: ${numOfCorrectAnwers}
    
    </p>
    `;
    numOfCuestion++;
  } else {
    numOfIncorrectAnwers += 1;
    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">
    Has fallado, PUNTUACION: ${numOfIncorrectAnwers}
    
    </p>
    `;
    numOfCuestion++;
  }

  if (numOfCorrectAnwers === 10) {
    //se llama a la funcion
    disableEnableButtons(true);

    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">
    Has ganado, PUNTUACION: ${numOfCorrectAnwers}
    
    </p>
    `;
    numOfCuestion++;

    return;
  }
  if (numOfIncorrectAnwers === 3) {
    //se llama a la funcion
    disableEnableButtons(true);

    selectorNumOfCorrectAnwers.innerHTML = `
    <p class = "textAltered">Has perdido, PUNTUACION: ${numOfIncorrectAnwers}
    
    </p> 
    
    <button type="submit" id="loadBtn">Reiniciar</button>
    `;

    //se crea evento de boton de reinicio del juego
    const selectorLoad = document.getElementById("loadBtn");
    selectorLoad.addEventListener("click", () => {
      location.reload();
    });
    numOfCuestion++;

    return;
  }
  setTimeout(() => {
    disableEnableButtons(false);
    insertRandomQuestion();
    insertAnswers();
  }, 1000);
}

//se crea funcion  para ser llamada dentro de las condiciones
function disableEnableButtons(status) {
  firstAnswerButton.disabled = status;
  secondAnswerButton.disabled = status;
  thirdAnswerButton.disabled = status;
  fourthAnswerButton.disabled = status;
}

insertRandomQuestion();
insertAnswers();

