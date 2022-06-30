class Meteor {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 130;
    this.height = 50;
    this.x = this.ctx.canvas.width;
    this.y = Math.random() * (this.ctx.canvas.height - this.height);
    this.img = new Image();
    this.img.src = "./images/meteor.png";
    this.img.frames = 8;
    this.img.frameIndex = 0;
    this.tick = 0;

    this.vx = -7;
  }

  move() {
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
    this.ctx.drawImage(
      this.img,
      0,
      (this.img.frameIndex * this.img.height) / this.img.frames,
      this.img.width,
      this.img.height / this.img.frames,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.animate();
  }

  animate() {
    this.tick++;

    if (this.tick > 8) {
      this.tick = 0;
      this.img.frameIndex++;
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
    }
  }
}
