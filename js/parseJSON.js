"use strict";

const url = "../JSON/quiz.json";

function getAndParseJSON() {
  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
    });
}

getAndParseJSON();
