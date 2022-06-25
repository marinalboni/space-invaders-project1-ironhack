class Bullet {
  constructor(ctx, y, x, vx = 5) {
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.vx = vx;
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

  collide(el) {
    const collideX = el.x + el.width > this.x && el.x < this.x + this.width;
    const collideY = el.y < this.y + this.height && el.y + el.height > this.y;

    return collideX && collideY;
  }
}
