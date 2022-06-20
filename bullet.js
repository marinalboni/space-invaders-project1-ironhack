class Bullet {
  constructor(ctx, y, x) {
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.vx = 5;
    this.img = new Image();
    this.img.src = "./images/bullet1.png";
    this.width = 18;
    this.height = 5;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.vx;
  }

  isVisible() {
    return this.x <= this.ctx.canvas.width;
  }
}
