class Bonus {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 20;
    this.height = 20;
    this.x = Math.random() * 300;
    this.y = 0 - this.height;
    this.img = new Image();
    this.img.src = "./images/life.png";

    this.vy = 1.5;
    this.vx = 1;
    this.tick = 0;
  }

  move() {
    this.tick++;
    let random = Math.floor(Math.random() * 150) + 50;
    if (this.tick % random === 0) {
      this.vx *= -1;
      this.tick = 0;
    }
    this.y += this.vy;
    this.x += this.vx;
  }

  collide(player) {
    const collideX =
      player.x + player.width > this.x && player.x < this.x + this.width;
    const collideY =
      player.y < this.y + this.height && player.y + player.height > this.y;

    return collideX && collideY;
  }

  isVisible() {
    return this.x + this.width >= 0;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
