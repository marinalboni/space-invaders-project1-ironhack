class Enemy {
  constructor(grid, i, j, img, strength, canShoot) {
    this.grid = grid;
    this.ctx = grid.ctx;
    this.i = i;
    this.j = j;
    this.width = 30;
    this.height = 40;
    this.img = new Image();
    this.img.src = img;
    this.img.frames = 2;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.strength = strength;
    this.canShoot = canShoot;
    this.x = this.grid.x + this.width * this.i;
    this.y = this.grid.y + this.height * this.j;
    this.weapon = new Weapon(this);
  }

  draw() {
    this.x = this.grid.x + this.width * this.i;
    this.y = this.grid.y + this.height * this.j;

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

  collide(el) {
    const x = this.grid.x + this.width * this.i;
    const y = this.grid.y + this.height * this.j;

    const collideX = el.x + el.width > x && el.x < x + this.width;
    const collideY = el.y < y + this.height && el.y + el.height > y;

    return collideX && collideY;
  }

  collideX(el) {
    const x = this.grid.x + this.width * this.i;

    const collideX = el.x + el.width > x && el.x < x + this.width;

    return collideX;
  }
}
