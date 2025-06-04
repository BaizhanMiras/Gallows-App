"use strict";

import { nouns } from './words.js';

const letters = document.getElementById('letters');
const hintBtn = document.getElementById('hintBtn');
const wordBox = document.getElementById('wordBox');
const showHintWord = document.getElementById('hint');
const playGame = document.getElementById('playGame');
const counterWins = document.getElementById('counterWins').
querySelector('span');

let finishedGame = false;
let wrong = 0;

function createWord() {
  const randomWord = nouns
  [Math.floor(Math.random() * nouns.length)];

  let clue = document.createElement('h2');
  clue.innerHTML = randomWord.hint;
  showHintWord.appendChild(clue);
  for(let i = 0; i < randomWord.word.length; i++){
    let element = document.createElement('p');
    element.innerHTML = randomWord.word[i];
    wordBox.appendChild(element);
  }
}

playGame.addEventListener('click', () =>{
  document.querySelector('.start-game').style.display = 'none';
  document.querySelector('.container').style.display = 'flex';
})

function showHint(){
  showHintWord.style.display = 'block';
}

hintBtn.addEventListener("click",showHint);

letters.addEventListener('click', function(event) {
  if(event.target.tagName === 'BUTTON') {
    const value = event.target.textContent;
    let winner = false;
    let findLetter = false;
    const img = document.querySelector('img');
    if ( !event.target.hasAttribute('disabled') && !finishedGame ){
      for ( let i = 0; i < wordBox.children.length; i++ ){
        if ( value === wordBox.children[i].textContent ){
          wordBox.children[i].style.color = 'red';
          wordBox.children[i].style.userSelect = 'auto';
          findLetter = true;
        }
      }
      if ( !findLetter && wrong <= 5){
        wrong++;
        img.setAttribute("src", `images/`+ wrong +`.png`);
      }
      findLetter = false;
      if (wrong > 5) {
        for ( let i = 0; i < wordBox.children.length; i++ ){
          wordBox.children[i].style.color = 'red';
          wordBox.children[i].style.userSelect = 'auto';
        }
      }
      event.target.setAttribute('disabled', '');
      let counter = 0;
      for ( let i = 0; i < wordBox.children.length; i++) {
        counter = (wordBox.children[i].style.color
        === '')
        ?counter: ++counter;
      }
      if ( wordBox.children.length === counter ) {
        finishedGame = true;
        setTimeout(() => {
          if ( wrong  < 6 ) winner = true;
          let number = Number(counterWins.textContent);
          number = ( winner )?++number:0;
          counterWins.innerHTML = number;
          wordBox.innerHTML = '';
          showHintWord.innerHTML = '';
          showHintWord.style.display = '';
          for( let i = 0; i < letters.children.length; i++ ){
            letters.children[i].removeAttribute('disabled');
          }
          img.setAttribute("src", `images/0.png`);
          wrong = 0;
          finishedGame = false;
          createWord();
        }, 3500);
      }
    }
  }
})

createWord();
