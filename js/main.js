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
    ${numOfCuestion}
    `;
  } else {
    console.log("esto no funciona");
  }
}

const firstAnswerButton = document.getElementById("answerButton1");
const secondAnswerButton = document.getElementById("answerButton2");
const thirdAnswerButton = document.getElementById("answerButton3");
const fourthAnswerButton = document.getElementById("answerButton4");

let answerArray;
let correctAnswer;

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

const selectorNumOfCorrectAnwers = document.getElementById("score");

function checkAnswers(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    console.log("correct");
    numOfCorrectAnwers += 10;
    console.log(numOfCorrectAnwers);
    selectorNumOfCorrectAnwers.innerHTML = `
    ${numOfCorrectAnwers}
    `;
    insertRandomQuestion();
    insertAnswers();
  } else if (numOfCorrectAnwers === 50) {
    location.reload();
  } else {
    console.log("incorrect");

    console.log(numOfCorrectAnwers);

    selectorNumOfCorrectAnwers.innerHTML = `
    has fallado
    `;
  }
}

insertAnswers();
