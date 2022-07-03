const canvas = document.querySelector("canvas"); //CANVAS
const ctx = canvas.getContext("2d"); //CONTEXT

const songBtn = document.getElementById("play-music"); //FIRST BUTTON - ADDED TO PLAY THE MENU-MUSIC
const allBtns = document.querySelectorAll("button"); //HOVER SOUND IN ALL BUTTONS

const hoverSound = new Audio(); //HOVER SOUND
hoverSound.src = "./sounds/hover.wav";
const menuSound = new Audio(); //MENU SONG
menuSound.src = "./sounds/menu-song-jorge-hernandez-chopsticks.mp3";

const songMenu = document.getElementById("start-song");
const startBtn = document.getElementById("start-btn");
const aboutBtn = document.getElementById("about-the-game");
const aboutMenu = document.querySelector("#about");
const goBackMenu = document.querySelector("#back-to-menu");
const howBtn = document.getElementById("how-to-play");
const howMenu = document.querySelector("#how");
const goBackMenu2 = document.querySelector("#back-to-menu2");

const levelsBtn = document.getElementById("levels-mode"); //START GAME - LEVEL MODE BUTTON
const infiniteBtn = document.getElementById("infinite-mode"); ////START GAME -INFINITE MODE BUTTON

const startMenu = document.getElementById("inicio");
const gameMenu = document.querySelector(".content");

const bossLife = document.getElementById("boss-life"); //BOSS LIFE - IT APPEARS WHEN PLAYER REACH BOSS-LEVEL
const bossLifeSpan = document.querySelector("#boss-life span"); //BOSS LIFE SPAN - TO CHANGE NUMBER WHEN IT LOSES STRENGHT

//GAME 1
levelsBtn.addEventListener("click", () => {
  const game = new Game(ctx); //GAME 1 - LEVELS-MODE
  game.start();
  startBtn.textContent = "PAUSE";
  menuSound.pause();
  menuSound.currentTime = 0;
  startMenu.classList.add("invisible");
  gameMenu.classList.remove("invisible");

  startBtn.addEventListener("click", () => {
    if (game.intervalId === null) {
      game.start();
      startBtn.textContent = "PAUSE";
    } else {
      game.stop();
      startBtn.textContent = "PLAY";
    }
  });
});

//GAME2
infiniteBtn.addEventListener("click", () => {
  const game2 = new Game2(ctx); //GAME 2 - INFINITE MODE
  game2.start();
  startBtn.textContent = "PAUSE";
  menuSound.pause();
  menuSound.currentTime = 0;
  startMenu.classList.add("invisible");
  gameMenu.classList.remove("invisible");

  startBtn.addEventListener("click", () => {
    if (game2.intervalId === null) {
      game2.start();
      startBtn.textContent = "PAUSE";
    } else {
      game2.stop();
      startBtn.textContent = "PLAY";
    }
  });
});

//MENU BUTTONS
songBtn.addEventListener("click", () => {
  menuSound.play();
  songMenu.classList.add("invisible");
  startMenu.classList.remove("invisible");
});

allBtns.forEach((btn) => {
  btn.addEventListener("mouseover", () => hoverSound.play());
});

aboutBtn.addEventListener("click", () => {
  aboutMenu.classList.remove("invisible");
});

goBackMenu.addEventListener("click", () => {
  aboutMenu.classList.add("invisible");
});

howBtn.addEventListener("click", () => {
  howMenu.classList.remove("invisible");
});

goBackMenu2.addEventListener("click", () => {
  howMenu.classList.add("invisible");
});
