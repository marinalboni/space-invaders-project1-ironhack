class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.levelIndex = 0;
    this.points = 0;
    this.levels = [
      {
        img: "./images/enemy1-cropped.png",
        background: "./images/BG1-small.png",
        strength: 10,
        canShoot: false,
        velocity: 15,
        columns: 1,
        rows: 2,
        color: "#04fc04",
      },
      {
        img: "./images/enemy2-cropped.png",
        background: "./images/BG2-small.png",
        strength: 10,
        canShoot: true,
        velocity: 1,
        columns: 4,
        rows: 8,
        color: "#00ccff",
      },
      {
        img: "./images/enemy3-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: 1.5,
        columns: 4,
        rows: 10,
        color: "#ff1cff",
      },
      {
        img: "./images/enemy4-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: 2,
        columns: 5,
        rows: 10,
        color: "#ff6b00",
      },
      {
        img: "./images/enemy5-cropped.png",
        background: "",
        strength: 30,
        canShoot: true,
        velocity: 2,
        columns: 6,
        rows: 12,
        color: "#ffeb00",
      },
    ];
    this.intervalId = null;
    this.background = new Background(this.ctx, this.levels[this.levelIndex]);
    this.player = new Player(this.ctx);
    this.grid = new Grid(this.ctx, this.levels[this.levelIndex]);
    this.barrier = new Barrier(this.ctx);
    this.explosions = [];
    this.deadSound = new Audio();
    this.deadSound.src = "./sounds/player-bullet.wav";
    this.menuSound = new Audio();
    this.menuSound.src = "./sounds/menu-song-jorge-hernandez-chopsticks.mp3";
    this.lostSound = new Audio();
    this.lostSound.src = "./sounds/lost-song.wav";
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.checkCollisions();
      this.move();
    }, 1000 / 60);
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.grid.draw();
    this.explosions.forEach((explosion) => explosion.draw());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // this.explosions.forEach((explosion, i) => LIMPAR O ARRAY DE EXPLOSIONES
    // )
  }

  move() {
    this.player.move();
    this.grid.move();
    this.explosions.forEach((explosion) => explosion.move());
  }

  checkCollisions() {
    const lifes = document.querySelectorAll(".life");
    const lifesLength = lifes.length;

    this.grid.enemies.forEach((enemy, enemyIndex) => {
      if (enemy.collideX(this.player)) {
        this.gameOver();
      }

      enemy.weapon.bullets.forEach((bull, bullIndex) => {
        if (bull.collide(this.player)) {
          this.player.strength -= 1;
          enemy.weapon.bullets.splice(bullIndex, 1);
          lifes[lifesLength - 1].remove();
        }
        if (this.player.strength <= 0) {
          this.gameOver();
        }
      });

      this.player.weapon.bullets.forEach((bull, bullIndex) => {
        if (enemy.collide(bull)) {
          this.grid.enemies[enemyIndex].strength -= 10;
          if (this.grid.enemies[enemyIndex].strength <= 0) {
            const pointsDOM = document.getElementById("points");
            if (this.levelIndex === 0) {
              this.points += 10;
              pointsDOM.textContent = this.points;
            } else if (this.levelIndex === 1) {
              this.points += 20;
              pointsDOM.textContent = this.points;
            } else if (this.levelIndex === 2) {
              this.points += 30;
              pointsDOM.textContent = this.points;
            } else if (this.levelIndex === 3) {
              this.points += 40;
              pointsDOM.textContent = this.points;
            } else if (this.levelIndex === 4) {
              this.points += 50;
              pointsDOM.textContent = this.points;
            }

            this.deadSound.play();
            this.explosions.push(
              new Explosion(
                this.grid.enemies[enemyIndex],
                this.levels[this.levelIndex]
              )
            );
            this.grid.enemies.splice(enemyIndex, 1);
            if (!this.grid.enemies.length) {
              this.levelIndex += 1;

              const fase = document.querySelector("#fase");
              const gameMenu = document.querySelector(".content");
              const pointsFase = document.getElementById("points-fase");
              const heartsFase = document.getElementById("hearts-fase");
              pointsFase.textContent = this.points;
              heartsFase.textContent = lifes.length;
              fase.classList.remove("invisible");
              gameMenu.classList.add("invisible");

              setTimeout(() => {
                this.grid = new Grid(this.ctx, this.levels[this.levelIndex]);
                this.background = new Background(
                  this.ctx,
                  this.levels[this.levelIndex]
                );
                fase.classList.add("invisible");
                gameMenu.classList.remove("invisible");
              }, 6000);
            }
          }
          this.player.weapon.bullets.splice(bullIndex, 1);
        }
      });
    });
  }

  playSong() {
    this.menuSound.play();
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  gameOver() {
    this.lostSound.play();
    clearInterval(this.intervalId);
    this.intervalId = null;

    setTimeout(() => {
      const gameOver = document.getElementById("game-over");
      gameOver.classList.remove("invisible");
      const gameMenu = document.querySelector(".content");
      gameMenu.classList.add("invisible");
    }, 1000);
  }
}
