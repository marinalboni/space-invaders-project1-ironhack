class Grid {
  constructor(ctx) {
    this.ctx = ctx;
    this.enemies = [];
    this.createEnemies();
    this.x = 700;
    this.y = 60;
    this.vy = 0;
  }

  createEnemies() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 12; j++) {
        this.enemies.push(new EnemyOne(this.ctx, i, j, 700, 60)); //No coge 'this.x' ni 'this.y', hay que poner numeros enteros
      }
    }
  }

  draw() {
    this.enemies.forEach((enemy) => enemy.draw());
  }

  move() {
    if (this.height + this.y >= this.ctx.canvas.height || this.x <= 0) {
      //para poder moverse, necesito que el create enemies utilize this.x y this.y
      this.x -= 30;
    }
  }
}
