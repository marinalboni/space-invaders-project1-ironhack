class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.grid = new Grid(this.ctx);
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
    }, 1000 / 60);
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.grid.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  move() {
    this.player.move();
  }

  checkCollisions() {}

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
