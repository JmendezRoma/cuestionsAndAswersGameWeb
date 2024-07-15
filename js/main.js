"use strict";
const url = "../JSON/quiz.json";

const finalData = [];

async function getAndParseJSON() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error al obetner o parsear el JSON", error);
  }
}

let cuestionsRamdonArray = [];

console.log(`estoo vale el array ,exclasdo ${cuestionsRamdonArray}`);
async function filterQuestions() {
  const finalData = await getAndParseJSON();
  if (finalData) {
    console.log("final data vale " + finalData);
    finalData.forEach((e) => {
      finalData.sort(() => Math.random() - 0.5);
      cuestionsRamdonArray.push(e);
      console.log(e); //array entero de manera random
    });
  }
}

async function insertRandomQuestion() {
  await filterQuestions();
  if (cuestionsRamdonArray != null) {
    cuestionsRamdonArray.forEach((element) => {
      console.log("esto vale elemente " + element);
      let arrayString = JSON.stringify(element.question);
      console.log("esto vale arrayString");
      const cuestionHtmlSelector = document.getElementById("sectionCuestions");
      cuestionHtmlSelector.innerHTML = `
        
        <p class="textAltered">${arrayString}</p>
        `;
    });
  } else {
    console.log("esto no funciona");
  }
}

const firstAnswerButton = document.getElementById("answerButton1");
const secondAnswerButton = document.getElementById("answerButton2");
const thirdAnswerButton = document.getElementById("answerButton3");
const fourthAnswerButton = document.getElementById("answerButton4");
async function insertAnswers() {
  await insertRandomQuestion();
  if (cuestionsRamdonArray != null) {
    cuestionsRamdonArray.forEach((element) => {
      const answerArray = element.answers;
      const correctAnswer = element.correct;

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
    });
  }
}

let numOfCorrectAnwers = 0;

function checkAnswers(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    console.log("correct");
    numOfCorrectAnwers = numOfCorrectAnwers++;
  } else {
    console.log("incorrect");
    numOfCorrectAnwers = numOfCorrectAnwers--;
  }
}

console.log(numOfCorrectAnwers);

insertAnswers();
//añadir eventos a los botones de las respuestas
