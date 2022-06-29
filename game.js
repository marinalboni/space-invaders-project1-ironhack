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
        velocity: 1,
        columns: 1,
        rows: 1,
        color: "#04fc04",
      },
      {
        img: "./images/enemy2-cropped.png",
        background: "./images/BG2-small.png",
        strength: 10,
        canShoot: true,
        velocity: 1,
        columns: 1,
        rows: 1,
        color: "#00ccff",
        tickMax: 225,
      },
      {
        img: "./images/enemy3-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: 1.5,
        columns: 1,
        rows: 1,
        color: "#ff1cff",
        tickMax: 200,
      },
      {
        img: "./images/enemy4-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: 2,
        columns: 1,
        rows: 1,
        color: "#ff6b00",
        tickMax: 175,
      },
      {
        img: "./images/enemy5-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: 2,
        columns: 1,
        rows: 1,
        color: "#ff6b00",
        tickMax: 175,
      },
    ];
    this.intervalId = null;
    this.background = new Background(this.ctx, this.levels[this.levelIndex]);
    this.player = new Player(this.ctx);
    this.grid = new Grid(this.ctx, this.levels[this.levelIndex]);
    this.explosions = [];
    this.meteors = [];
    this.bonusArr = [];
    this.bulletBonusArr = [];
    this.tickMeteor = 0;
    this.tickBonus = 0;
    this.tickBulletBonus = 1250;
    this.deadSound = new Audio();
    this.deadSound.src = "./sounds/player-bullet.wav";
    this.menuSound = new Audio();
    this.menuSound.src = "./sounds/menu-song-jorge-hernandez-chopsticks.mp3";
    this.lostSound = new Audio();
    this.lostSound.src = "./sounds/lost-song.wav";
    this.gameSound = new Audio();
    this.gameSound.src = "./sounds/fase-2.wav";
    this.winSound = new Audio();
    this.winSound.src = "./sounds/win.wav";
    this.hoverSound = new Audio();
    this.hoverSound.src = "./sounds/hover.wav";
    this.damageSound = new Audio();
    this.damageSound.src = "./sounds/damage.wav";
    this.song = new Song(this.levelIndex);
    this.boss1 = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.checkCollisions();
      this.move();

      let randomTickM = Math.floor(Math.random() * 200) + 500;
      this.tickMeteor++;
      if (this.tickMeteor >= randomTickM) {
        this.tickMeteor = 0;
        this.addMeteor();
        this.meteors = this.meteors.filter((meteor) => meteor.isVisible());
      }

      let randomTickB = Math.floor(Math.random() * 1000) + 2500;
      this.tickBonus++;
      if (this.tickBonus >= randomTickB) {
        this.tickBonus = 0;
        this.addBonus();
        this.bonusArr = this.bonusArr.filter((bonus) => bonus.isVisible());
      }

      this.tickBulletBonus++;
      if (this.tickBulletBonus >= randomTickB) {
        this.tickBulletBonus = 0;
        this.addBulletBonus();
        this.bulletBonusArr = this.bulletBonusArr.filter((bullBonus) =>
          bullBonus.isVisible()
        );
      }
    }, 1000 / 60);
    this.song.play();
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.grid.draw();
    this.explosions.forEach((explosion) => explosion.draw());
    this.meteors.forEach((meteor) => meteor.draw());
    this.bonusArr.forEach((bonus) => bonus.draw());
    this.bulletBonusArr.forEach((bullBonus) => bullBonus.draw());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  move() {
    this.player.move();
    this.grid.move();
    this.explosions.forEach((explosion) => explosion.move());
    this.grid.shoot();
    this.meteors.forEach((meteor) => meteor.move());
    this.bonusArr.forEach((bonus) => bonus.move());
    this.bulletBonusArr.forEach((bullBonus) => bullBonus.move());

    if (this.boss1) {
      this.boss1.move();
      this.boss1.draw();
      this.boss1.shoot();
    }
  }

  addMeteor() {
    this.meteors.push(new Meteor(this.ctx));
  }

  addBonus() {
    this.bonusArr.push(new Bonus(this.ctx));
  }

  addBulletBonus() {
    this.bulletBonusArr.push(new BulletBonus(this.ctx));
  }

  checkCollisions() {
    //CONSTANTES PARA ADICIONAR/REMOVER CORAÇÕES
    const lifes = document.querySelectorAll(".life");
    const lifesLength = lifes.length;
    const lifesFather = document.getElementById("hearts");
    const newHeart = document.createElement("img");
    newHeart.classList.add("life");
    newHeart.src = "./images/life.png";
    newHeart.alt = "life";

    //BONUS CORAÇÃO + PLAYER
    this.bonusArr.forEach((bonus, bonusIndex) => {
      if (bonus.collide(this.player) && this.player.strength < 5) {
        this.player.strength += 1;
        this.bonusArr.splice(bonusIndex, 1);
        lifesFather.appendChild(newHeart);
      }
    });

    //BONUS ARMA ESPECIAL + PLAYER
    this.bulletBonusArr.forEach((bullBonus, bonusIndex) => {
      if (bullBonus.collide(this.player)) {
        this.bulletBonusArr.splice(bonusIndex, 1);
        this.player.weapon.isSpecialBullet = true;
        setTimeout(() => {
          this.player.weapon.isSpecialBullet = false;
        }, 8000);
      }
    });

    //METEORO + PLAYER
    this.meteors.forEach((meteor, metIndex) => {
      if (meteor.collide(this.player)) {
        this.meteors.splice(metIndex, 1);
        this.gameOver();
      }
    });

    //GRID INIMIGOS + PLAYER
    this.grid.enemies.forEach((enemy, enemyIndex) => {
      if (enemy.collideX(this.player)) {
        this.gameOver();
      }

      //GRID INIMIGOS (BALA INIMIGOS + PLAYER)
      enemy.weapon.bullets.forEach((bull, bullIndex) => {
        if (bull.collide(this.player)) {
          this.damageSound.play();
          lifes[lifesLength - 1].remove();
          this.player.strength -= 1;
          enemy.weapon.bullets.splice(bullIndex, 1);
          if (this.player.strength <= 0) {
            this.gameOver();
          }
        }
      });

      //BALA + INIMIGO - ADICIONAR PONTOS
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

            //EXPLOSÃO
            this.deadSound.play();
            this.explosions.push(
              new Explosion(
                this.grid.enemies[enemyIndex],
                this.levels[this.levelIndex]
              )
            );
            this.grid.enemies.splice(enemyIndex, 1);

            //DIVS PARA MUDAR DE FASE
            if (this.levelIndex < 4) {
              if (!this.grid.enemies.length) {
                this.levelIndex += 1;
                const fase = document.querySelector("#fase");
                const level = document.getElementById("level-fase");
                const gameMenu = document.querySelector(".content");
                const pointsFase = document.getElementById("points-fase");
                const heartsFase = document.getElementById("hearts-fase");
                pointsFase.textContent = this.points;
                heartsFase.textContent = lifes.length;
                level.textContent = this.levelIndex;

                //LIMPA A TELA E TOCA O SOM DA VITÓRIA
                setTimeout(() => {
                  this.stop();
                  this.meteors = [];
                  this.player.weapon.bullets = [];
                  fase.classList.remove("invisible");
                  gameMenu.classList.add("invisible");
                  this.winSound.play();
                }, 1000);

                //ADICIONA NOVO GRID DE INIMIGOS
                setTimeout(() => {
                  this.background = new Background(
                    this.ctx,
                    this.levels[this.levelIndex]
                  );
                  this.grid = new Grid(this.ctx, this.levels[this.levelIndex]);
                  this.song = new Song(this.levelIndex);
                  fase.classList.add("invisible");
                  gameMenu.classList.remove("invisible");
                  this.start();
                }, 6000);
              }
            } else {
              setTimeout(() => {
                this.stop();
                this.meteors = [];
                this.player.weapon.bullets = [];
                fase.classList.remove("invisible");
                gameMenu.classList.add("invisible");
                this.winSound.play();
              }, 1000);

              //ADICIONA CHEFAO
              setTimeout(() => {
                this.background = new Background(
                  this.ctx,
                  this.levels[this.levelIndex]
                );
                this.boss1 = new Boss1(this.ctx);
                this.song = new Song(this.levelIndex);
                fase.classList.add("invisible");
                gameMenu.classList.remove("invisible");
                this.start();
              }, 6000);
            }
            this.player.weapon.bullets.splice(bullIndex, 1);
          }
        }
      });
    });

    //COLISÃO BALAS CHEFÃO 1 + PLAYER
    if (this.boss1) {
      this.boss1.weapon.bullets.forEach((bull, bullIndex) => {
        if (bull.collide(this.player)) {
          this.damageSound.play();
          lifes[lifesLength - 1].remove();
          this.player.strength -= 1;
          this.boss1.weapon.bullets.splice(bullIndex, 1);
          if (this.player.strength <= 0) {
            this.gameOver();
          }
        }
      });

      //COLISÃO BALAS PLAYER + CHEFÃO 1
      this.player.weapon.bullets.forEach((bull, bullIndex) => {
        const pointsDOM = document.getElementById("points");
        if (this.boss1.collide(bull)) {
          this.player.weapon.bullets.splice(bullIndex, 1);
          this.boss1.strength -= 10;
          if (this.boss1.strength <= 0) {
            this.points += 150;
            pointsDOM.textContent = this.points;
            this.boss1 = null;
            this.stop();
          }
        }
      });
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.song.pause();
    this.song.currentTime = 0;
  }

  gameOver() {
    const pointsFinalPage = document.getElementById("points-game-over");
    pointsFinalPage.textContent = this.points;

    this.song.pause();
    this.song.currentTime = 0;

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
