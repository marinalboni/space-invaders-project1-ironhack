class Grid {
  constructor(ctx) {
    this.ctx = ctx;
    this.enemies = [];
    this.columns = 5;
    this.rows = 10;
    this.x = 700;
    this.y = 0;
    this.vy = 3;
    this.createEnemies();
  }

  createEnemies() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.enemies.push(new EnemyOne(this, i, j));
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
}
