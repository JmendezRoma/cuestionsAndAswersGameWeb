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
      console.log(e);
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

async function insertAnswers() {
  await insertRandomQuestion();
  if (cuestionsRamdonArray != null) {
    cuestionsRamdonArray.forEach((element) => {
      let answerString = element.answers;
     console.log(answerString);
      const answersSelector = document.getElementById("answersList");
      answersSelector.innerHTML = `
    <button class="textAltered">
    ${element.answers[0]} </button>
    <button class="textAltered">
    ${element.answers[1]} </button>
    <button class="textAltered">
    ${element.answers[2]} </button>
    <button class="textAltered">
    ${element.answers[3]} </button>
`;
    });
  }
  console.log("esto vale insertAnswer" + insertAnswers);
}

insertRandomQuestion();
insertAnswers();
