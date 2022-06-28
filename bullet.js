class Bullet {
  constructor(
    ctx,
    y,
    x,
    vx = 5,
    vy = 0,
    img = "./images/bullet1.png",
    width = 18,
    height = 5,
    frames = 1,
    isBoss = false
  ) {
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.vx = vx;
    this.vy = vy;
    this.img = new Image();
    this.img.src = img;
    this.width = width;
    this.height = height;
    this.img.frames = frames;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.isBoss = isBoss;
    this.vyTick = 0;
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

    if (this.tick > 3) {
      this.tick = 0;
      this.img.frameIndex++;
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.isBoss) {
      this.vyTick++;
      if (this.vyTick > 40) {
        this.vy *= -1;
        this.vyTick = 0;
      }
    }
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
