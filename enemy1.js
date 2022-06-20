class EnemyOne {
  constructor(ctx, i, j, x, y) {
    this.ctx = ctx;
    this.width = 30;
    this.height = 40;
    this.x = x + this.width * i;
    this.y = y + this.height * j;
    this.img = new Image();
    this.img.src = "./images/enemy1-cropped.png";
    this.img.frames = 2;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.strength = 10;
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

    if (this.tick > 20) {
      this.tick = 0;
      this.img.frameIndex++;
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
    }
  }
}
