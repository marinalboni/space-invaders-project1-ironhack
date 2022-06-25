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
        canShoot: true,
        velocity: 1.5,
        columns: 4,
        rows: 10,
        color: "#04fc04",
      },
      {
        img: "./images/enemy2-cropped.png",
        background: "./images/BG2-small.png",
        strength: 20,
        canShoot: false,
        velocity: 2,
        columns: 2,
        rows: 2,
        color: "#00ccff",
      },
      {
        img: "./images/enemy3-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: 2,
        columns: 2,
        rows: 2,
        color: "#ff1cff",
      },
      {
        img: "./images/enemy4-cropped.png",
        background: "",
        strength: 30,
        canShoot: true,
        velocity: 2.5,
        columns: 6,
        rows: 10,
        color: "#ff6b00",
      },
      {
        img: "./images/enemy5-cropped.png",
        background: "",
        strength: 40,
        canShoot: true,
        velocity: 3,
        columns: 8,
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
    this.sound1 = new Audio();
    this.sound1.src = "./sounds/player-bullet.wav";
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
      if (enemy.collide(this.player)) {
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

            this.sound1.play();
            this.explosions.push(
              new Explosion(
                this.grid.enemies[enemyIndex],
                this.levels[this.levelIndex]
              )
            );
            this.grid.enemies.splice(enemyIndex, 1);
            if (!this.grid.enemies.length) {
              this.levelIndex += 1;

              setTimeout(() => {
                this.grid = new Grid(this.ctx, this.levels[this.levelIndex]);
                this.background = new Background(
                  this.ctx,
                  this.levels[this.levelIndex]
                );
              }, 1000);
            }
          }
          this.player.weapon.bullets.splice(bullIndex, 1);
        }
      });
    });
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.intervalId = null;

    this.ctx.font = "230px VT323";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER", this.ctx.canvas.width / 2, 350);
  }
}
