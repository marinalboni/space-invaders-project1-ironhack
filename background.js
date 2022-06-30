class Background {
  constructor(ctx, level) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.vx = -0.8;
    this.level = level;
    this.img = new Image();
    this.img.src = this.level ? this.level.background : "./images/bg6.png";
    this.width = this.ctx.canvas.width * 2;
    this.height = this.ctx.canvas.height;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    this.move();
  }

  move() {
    this.x += this.vx;
    if (this.x + this.width <= 0) {
      this.x = 0;
    }
  }
}
