const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new Game(ctx);
const songBtn = document.getElementById("play-music");
const songMenu = document.getElementById("start-song");
const startBtn = document.getElementById("start-btn");
const aboutBtn = document.getElementById("about-the-game");
const aboutMenu = document.querySelector("#about");
const goBackMenu = document.querySelector("#back-to-menu");
const howBtn = document.getElementById("how-to-play");
const howMenu = document.querySelector("#how");
const goBackMenu2 = document.querySelector("#back-to-menu2");
const playBtn = document.getElementById("play-game");
const startMenu = document.getElementById("inicio");
const gameMenu = document.querySelector(".content");
const allBtns = document.querySelectorAll("button");
//VIDA CHEFÃO
const bossLife = document.getElementById("boss-life");
//SPAN VIDA CHEFAO
const bossLifeSpan = document.querySelector("#boss-life span");

songBtn.addEventListener("click", () => {
  game.menuSound.play();
  songMenu.classList.add("invisible");
  startMenu.classList.remove("invisible");
});

allBtns.forEach((btn) => {
  btn.addEventListener("mouseover", () => game.hoverSound.play());
});

startBtn.addEventListener("click", () => {
  if (game.intervalId === null) {
    game.start();
    startBtn.textContent = "PAUSE";
  } else {
    game.stop();
    startBtn.textContent = "PLAY";
  }
});

playBtn.addEventListener("click", () => {
  game.start();
  startBtn.textContent = "PAUSE";
  game.menuSound.pause();
  game.menuSound.currentTime = 0;
  startMenu.classList.add("invisible");
  gameMenu.classList.remove("invisible");
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
