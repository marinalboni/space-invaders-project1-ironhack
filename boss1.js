class Boss1 {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 207;
    this.height = 177;
    this.x = 600;
    this.y = this.ctx.canvas.height / 2 - this.height / 2;
    this.img = new Image();
    this.img.src = "./images/chefao2.png";
    this.img.frames = 9;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.shootingTick = 0;
    this.tickMax = Math.floor(Math.random() * 100) + 50;
    this.vx = 3;
    this.vy = 3;
    this.strength = 350;
    this.isBoss = true;

    this.weapon = new Weapon(this);
  }

  move() {
    this.x += this.vx;
    if (this.x + this.width >= this.ctx.canvas.width) {
      this.vx *= -1;
    }
    if (this.x <= 400) {
      this.vx *= -1;
    }

    this.y += this.vy;
    if (this.y + this.height >= this.ctx.canvas.height) {
      this.vy *= -1;
    }
    if (this.y <= 0) {
      this.vy *= -1;
    }
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

    if (this.tick > 5) {
      this.tick = 0;
      this.img.frameIndex++;
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
    }
  }

  shoot() {
    this.shootingTick++;
    this.weapon.draw();
    this.weapon.move();
    this.weapon.clearBullets();

    if (this.shootingTick >= this.tickMax) {
      this.weapon.shoot();
      this.shootingTick = 0;
    }
  }

  collide(el) {
    const collideX = el.x + el.width > this.x && el.x < this.x + this.width;
    const collideY = el.y < this.y + this.height && el.y + el.height > this.y;

    return collideX && collideY;
  }
}
