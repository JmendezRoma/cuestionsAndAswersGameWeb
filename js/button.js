"use strict";

let count = 0;

const nextButton = document.getElementById("cuestionButton");
let counterButton = nextButton.addEventListener("click", () => {
  count++;
  console.log("contador", count);
  if (count >= 5) {
    location.reload();
  }
  const selectorScore = document.getElementById("score");

  selectorScore.innerHTML = `
      
  
      ${count}
  
  `;
});

console.log(count);
