class Grid {
  constructor(ctx, level) {
    this.ctx = ctx;
    this.enemies = [];
    this.level = level;
    this.columns = this.level.columns;
    this.rows = this.level.rows;
    this.x = 700;
    this.y = 0;
    this.vy = this.level.velocity;
    this.createEnemies();
    this.tick = 0;
    this.tickMax = level.tickMax;
  }

  createEnemies() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.enemies.push(
          new Enemy(
            this,
            i,
            j,
            this.level.img,
            this.level.strength,
            this.level.canShoot
          )
        );
      }
    }
  }

  draw() {
    this.enemies.forEach((enemy) => enemy.draw());
  }

  move() {
    this.y += this.vy;

    if (
      this.enemies.length > 0 &&
      this.enemies[0].height * this.rows + this.y >= this.ctx.canvas.height
    ) {
      this.vy *= -1;
      this.x -= 15;
    }
    if (this.y <= 0) {
      this.vy *= -1;
      this.x -= 15;
    }
  }

  shoot() {
    this.tick++;
    this.enemies.forEach((enemy) => {
      enemy.weapon.draw();
      enemy.weapon.move();
      enemy.weapon.clearBullets();
    });

    if (this.tick >= this.tickMax) {
      if (this.level.canShoot) {
        this.enemies.forEach((enemy, index) => {
          if (index === Math.floor(Math.random() * this.enemies.length)) {
            enemy.weapon.shoot();
          }
        });
      }
      this.tick = 0;
    }
  }
}
