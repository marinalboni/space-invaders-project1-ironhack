class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.levelIndex = 0;
    this.points = 0;
    this.levels = [
      {
        img: "./images/enemy1-cropped.png",
        background: "./images/bg1.png",
        strength: 10,
        canShoot: false,
        velocity: 3,
        columns: 8,
        rows: 10,
        color: "#04fc04",
      },
      {
        img: "./images/enemy2-cropped.png",
        background: "./images/bg2.png",
        strength: 10,
        canShoot: true,
        velocity: 3,
        columns: 8,
        rows: 10,
        color: "#00ccff",
        tickMax: 150,
      },
      {
        img: "./images/enemy3-cropped.png",
        background: "./images/bg3.png",
        strength: 20,
        canShoot: true,
        velocity: 2,
        columns: 6,
        rows: 10,
        color: "#ff1cff",
        tickMax: 125,
      },
      {
        img: "./images/enemy4-cropped.png",
        background: "./images/bg4.png",
        strength: 20,
        canShoot: true,
        velocity: 1.5,
        columns: 7,
        rows: 10,
        color: "#ff6b00",
        tickMax: 100,
      },
      {
        img: "./images/enemy5-cropped.png",
        background: "./images/bg5.png",
        strength: 20,
        canShoot: true,
        velocity: 1.5,
        columns: 6,
        rows: 10,
        color: "yellow",
        tickMax: 75,
      },
    ];
    this.intervalId = null;
    this.background = new Background(this.ctx, this.levels[this.levelIndex]);
    this.player = new Player(this.ctx, this);
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
    this.explosionSound = new Audio();
    this.explosionSound.src = "./sounds/explosion.wav";
    this.winningSong = new Audio();
    this.winningSong.src = "./sounds/final-song.mp3";
    this.song = new Song(this.levelIndex);
    this.boss1 = null;
    this.explode = null;
    this.isHit = false;
    this.isPlayerHit = false;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.checkCollisions();
      this.move();

      let randomTickM = Math.floor(Math.random() * 200) + 500;
      this.tickMeteor++;
      if (this.tickMeteor >= randomTickM && !this.boss1 && !this.explode) {
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
    this.grid.draw();
    this.explosions.forEach((explosion) => explosion.draw());
    this.meteors.forEach((meteor) => meteor.draw());
    this.bonusArr.forEach((bonus) => bonus.draw());
    this.bulletBonusArr.forEach((bullBonus) => bullBonus.draw());
    this.player.draw();

    if (this.boss1) {
      this.boss1.draw();
    }

    if (this.explode) {
      this.explode.draw();
    }
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

    if (this.boss1 && !this.explode) {
      this.boss1.move();
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
        this.player.strength = 0;
        this.isPlayerHit = true;
        lifes.forEach((life) => life.remove());
        this.meteors.splice(metIndex, 1);
        this.explode = new Explode(this.player);
        this.explosionSound.play();
        setTimeout(() => {
          this.gameOver();
        }, 5000);
      }
    });

    //GRID INIMIGOS + PLAYER
    this.grid.enemies.forEach((enemy, enemyIndex) => {
      if (enemy.collideX(this.player)) {
        this.player.strength = 0;
        this.isPlayerHit = true;
        this.grid.enemies = [];
        this.explode = new Explode(this.player);
        this.explosionSound.play();
        setTimeout(() => {
          this.gameOver();
        }, 5000);
      }

      //GRID INIMIGOS (BALA INIMIGOS + PLAYER)
      enemy.weapon.bullets.forEach((bull, bullIndex) => {
        if (bull.collide(this.player)) {
          this.isPlayerHit = true;
          this.damageSound.play();
          lifes[lifesLength - 1].remove();
          this.player.strength -= 1;
          enemy.weapon.bullets.splice(bullIndex, 1);
          if (this.player.strength <= 0) {
            this.isPlayerHit = true;
            this.song.pause();
            this.song.currentTime = 0;
            this.explode = new Explode(this.player);
            this.explosionSound.play();
            setTimeout(() => {
              this.gameOver();
            }, 5000);
          }
        }
      });

      //BALA PLAYER + INIMIGO - ADICIONAR PONTOS
      this.player.weapon.bullets.forEach((bull, bullIndex) => {
        if (enemy.collide(bull)) {
          this.player.weapon.bullets.splice(bullIndex, 1);
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
              if (!this.grid.enemies.length) {
                const chefao = document.querySelector("#chefao");

                setTimeout(() => {
                  this.stop();
                  this.meteors = [];
                  this.player.weapon.bullets = [];
                  chefao.classList.remove("invisible");
                  gameMenu.classList.add("invisible");
                  this.winSound.play();
                }, 1000);

                //ADICIONA CHEFAO
                setTimeout(() => {
                  this.background = new Background(this.ctx);
                  this.boss1 = new Boss1(this.ctx, this);
                  this.song = new Song(5);
                  bossLife.classList.remove("invisible");
                  chefao.classList.add("invisible");
                  gameMenu.classList.remove("invisible");
                  this.start();
                }, 6000);
              }
            }
          }
        }
      });
    });

    //COLISÃO BALAS CHEFÃO 1 + PLAYER
    if (this.boss1) {
      this.boss1.weapon.bullets.forEach((bull, bullIndex) => {
        if (bull.collide(this.player)) {
          this.isPlayerHit = true;
          this.damageSound.play();
          lifes[lifesLength - 1].remove();
          this.player.strength -= 1;
          this.boss1.weapon.bullets.splice(bullIndex, 1);
          if (this.player.strength <= 0) {
            this.isPlayerHit = true;
            this.explode = new Explode(this.player);
            this.song.pause();
            this.song.currentTime = 0;
            this.explosionSound.play();
            setTimeout(() => {
              bossLife.classList.add("invisible");
              this.gameOver();
            }, 5000);
          }
        }

        //COLISÃO BALA CHEFÃO + BALA DO PLAYER
        this.player.weapon.bullets.forEach((playerbull, playerbullIndex) => {
          if (playerbull.collide(bull)) {
            this.player.weapon.bullets.splice(playerbullIndex, 1);
          }
        });
      });

      //COLISÃO BALAS PLAYER + CHEFÃO 1
      this.player.weapon.bullets.forEach((bull, bullIndex) => {
        const pointsDOM = document.getElementById("points");
        const wonPage = document.getElementById("you-won");
        const pointsWon = document.getElementById("points-you-won");
        if (this.boss1.collide(bull)) {
          this.isHit = true;
          this.player.weapon.bullets.splice(bullIndex, 1);
          if (this.boss1.strength > 5) {
            this.boss1.strength -= 10;
          }
          bossLifeSpan.textContent = this.boss1.strength;
          new Explode(bull);
          if (this.boss1.strength <= 0) {
            this.explode = new Explode(this.boss1);
            this.song.pause();
            this.song.currentTime = 0;
            this.explosionSound.play();
            this.points += 150;
            pointsDOM.textContent = this.points;
            pointsWon.textContent = this.points;
            setTimeout(() => {
              this.boss1 = null;
            }, 300);
            setTimeout(() => {
              bossLife.classList.add("invisible");
              this.stop();
              this.winningSong.play();
              gameMenu.classList.add("invisible");
              wonPage.classList.remove("invisible");
            }, 5000);
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
