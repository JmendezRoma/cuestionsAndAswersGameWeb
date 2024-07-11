"use strict";

const url = "../JSON/quiz.json";

const finalData = [];

async function getAndParseJSON() {
  try{
    const response = await fetch(url);
    const data = await response.json();
    return data;
}catch(error) {
  console.error("error al obetner o parsear el JSON" , error)
}
}



 async function filterQuestions() {
  const finalData = await getAndParseJSON();
  if (finalData) {
    const questionsArray = finalData.map((pregunta) => pregunta.question);
    console.log(questionsArray);
    return questionsArray;
  }
}
const onlyQuestions = filterQuestions()

