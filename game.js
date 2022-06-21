class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.grid = new Grid(this.ctx);
    this.barrier = new Barrier(this.ctx);
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
    //this.barrier.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  move() {
    this.player.move();
    this.grid.move();
  }

  checkCollisions() {
    this.grid.enemies.forEach((enemy, enemyIndex) => {
      if (enemy.collide(this.player)) {
        this.gameOver();
      }
      // if (enemy.collide(this.barrier)) {
      //   this.barrier.clear();
      // }

      this.player.weapon.bullets.forEach((bull, bullIndex) => {
        if (enemy.collide(bull)) {
          this.grid.enemies[enemyIndex].strength -= 10;
          if (this.grid.enemies[enemyIndex].strength <= 0) {
            this.grid.enemies.splice(enemyIndex, 1);
            this.explosion = new Explosion(this.grid.enemies[enemyIndex]);
            this.explosion.draw();
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
