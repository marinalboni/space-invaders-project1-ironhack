class Game2 {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(this.ctx, this);
    this.levelIndex = 0;
    this.points = 0;
    this.intervalId = null;
    this.background = new Background(this.ctx);
    this.grids = [];
    this.velocity = 1.5;
    this.tick = 0;
    this.levels = [
      {
        img: "./images/enemy1-cropped.png",
        background: "",
        strength: 10,
        canShoot: false,
        velocity: this.velocity,
        columns: Math.floor(Math.random() * 2) + 3,
        rows: Math.floor(Math.random() * 3) + 5,
        color: "#04fc04",
      },
      {
        img: "./images/enemy2-cropped.png",
        background: "",
        strength: 10,
        canShoot: true,
        velocity: this.velocity,
        columns: Math.floor(Math.random() * 2) + 3,
        rows: Math.floor(Math.random() * 3) + 5,
        color: "#00ccff",
        tickMax: 75,
      },
      {
        img: "./images/enemy3-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: this.velocity,
        columns: Math.floor(Math.random() * 2) + 3,
        rows: Math.floor(Math.random() * 3) + 5,
        color: "#ff1cff",
        tickMax: 75,
      },
      {
        img: "./images/enemy4-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: this.velocity,
        columns: Math.floor(Math.random() * 2) + 3,
        rows: Math.floor(Math.random() * 3) + 5,
        color: "#ff6b00",
        tickMax: 75,
      },
      {
        img: "./images/enemy5-cropped.png",
        background: "",
        strength: 20,
        canShoot: true,
        velocity: this.velocity,
        columns: Math.floor(Math.random() * 2) + 3,
        rows: Math.floor(Math.random() * 3) + 5,
        color: "yellow",
        tickMax: 75,
      },
    ];
    this.explosions = [];
    this.meteors = [];
    this.bonusArr = [];
    this.bulletBonusArr = [];
    this.tickMeteor = 0;
    this.tickBonus = 0;
    this.tickBulletBonus = 1250;
    this.tickAddEnemies = 1000;

    this.explode = null;

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
    this.song = new Audio();
    this.song.src = "./sounds/infinite-song.mp3";
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.checkCollisions();
      this.move();

      let randomTickE = Math.floor(Math.random() * 200) + 1000;
      this.tickAddEnemies++;
      if (this.tickAddEnemies >= randomTickE) {
        this.tickAddEnemies = 0;
        this.addGrid();
        this.velocity += 0.5;
      }

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
    this.meteors.forEach((meteor) => meteor.draw());
    this.bonusArr.forEach((bonus) => bonus.draw());
    this.bulletBonusArr.forEach((bullBonus) => bullBonus.draw());
    this.player.draw();
    this.grids.forEach((grid) => grid.draw());
    this.explosions.forEach((explosion) => explosion.draw());
    if (this.explode) {
      this.explode.draw();
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  move() {
    this.player.move();
    this.meteors.forEach((meteor) => meteor.move());
    this.bonusArr.forEach((bonus) => bonus.move());
    this.bulletBonusArr.forEach((bullBonus) => bullBonus.move());
    this.grids.forEach((grid) => grid.move());
    this.background.move();
    this.explosions.forEach((explosion) => explosion.move());
    this.grids.forEach((grid) => {
      grid.shoot();
    });
  }

  addGrid() {
    this.levelIndex = Math.floor(Math.random() * 4);
    this.levels[this.levelIndex].velocity = this.velocity;
    this.grids.push(new Grid(this.ctx, this.levels[this.levelIndex]));
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
        }, 3000);
      }
    });

    //GRID INIMIGOS + PLAYER
    this.grids.forEach((grid) =>
      grid.enemies.forEach((enemy, enemyIndex) => {
        if (enemy.collideX(this.player)) {
          this.player.strength = 0;
          this.isPlayerHit = true;
          grid.enemies = [];
          this.explode = new Explode(this.player);
          this.explosionSound.play();
          setTimeout(() => {
            this.gameOver();
          }, 3000);
        }

        //GRID INIMIGOS (BALA INIMIGOS + PLAYER)
        enemy.weapon.bullets.forEach((bull, bullIndex) => {
          if (bull.collide(this.player)) {
            enemy.weapon.bullets.splice(bullIndex, 1);
            this.isPlayerHit = true;
            this.damageSound.play();
            this.player.strength -= 1;
            lifes[lifesLength - 1].remove();
            if (this.player.strength <= 0) {
              this.isPlayerHit = true;
              this.song.pause();
              this.song.currentTime = 0;
              this.explode = new Explode(this.player);
              this.explosionSound.play();
              setTimeout(() => {
                this.gameOver();
              }, 3000);
            }
          }
        });

        //BALA PLAYER + INIMIGO - ADICIONAR PONTOS
        this.player.weapon.bullets.forEach((bull, bullIndex) => {
          if (enemy.collide(bull)) {
            this.player.weapon.bullets.splice(bullIndex, 1);
            grid.enemies[enemyIndex].strength -= 10;
            if (grid.enemies[enemyIndex].strength <= 0) {
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
                  grid.enemies[enemyIndex],
                  this.levels[this.levelIndex]
                )
              );
              grid.enemies.splice(enemyIndex, 1);
            }
          }
        });
      })
    );
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    // this.song.pause();
    // this.song.currentTime = 0;
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
