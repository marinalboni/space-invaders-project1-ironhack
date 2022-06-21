class Weapon {
  constructor(shooter) {
    this.ctx = shooter.ctx;
    this.isReloading = false;
    this.shooter = shooter;
    this.bullets = [];
  }

  shoot() {
    if (!this.isReloading) {
      this.bullets.push(
        new Bullet(
          this.ctx,
          this.shooter.y + this.shooter.height / 2 - 3,
          this.shooter.x + this.shooter.width - 5
        )
      );

      this.isReloading = true;

      setTimeout(() => {
        this.isReloading = false;
      }, 500);
    }
  }

  draw() {
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  move() {
    this.bullets.forEach((bullet) => {
      bullet.move();
    });
  }

  clearBullets() {
    this.bullets = this.bullets.filter((obs) => obs.isVisible());
  }
}
