class Background {
  constructor(ctx, level) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.level = level;
    this.img = new Image();
    this.img.src = this.level.background;
    this.img.frames = 10;
    this.img.frameIndex = 0;
    this.tick = 0;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
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
