class Weapon {
  constructor(shooter, enemy) {
    this.ctx = shooter.ctx;
    this.isReloading = false;
    this.shooter = shooter;
    this.bullets = [];
    this.isSpecialBullet = false;
    this.sound = new Audio();
    this.sound.src = "./sounds/shooting.wav";
    this.enemy = enemy;
  }

  shoot() {
    if (!this.isReloading) {
      this.sound.play();

      if (this.shooter.grid) {
        this.bullets.push(
          new Bullet(
            this.ctx,
            this.shooter.y + this.shooter.height / 2,
            this.shooter.x - 30,
            this.shooter.grid ? -5 : 5,
            0,
            "./images/enemy-bullet.png",
            25,
            15
          )
        );
      } else if (this.shooter.isBoss) {
        this.bullets.push(
          new Bullet(
            this.ctx,
            this.shooter.y + this.shooter.height / 2,
            this.shooter.x - 10,
            -6,
            Math.random() < 0.5 ? -4 : 4,
            "./images/bala-chefao2.png",
            40,
            40,
            2,
            true
          )
        );
      } else {
        if (!this.isSpecialBullet) {
          this.bullets.push(
            new Bullet(
              this.ctx,
              this.shooter.y + this.shooter.height / 2 - 3,
              this.shooter.x + this.shooter.width - 5
            )
          );
        } else {
          this.bullets.push(
            new Bullet(
              this.ctx,
              this.shooter.y + this.shooter.height / 2 - 3,
              this.shooter.x + this.shooter.width - 5,
              7,
              0.5,
              "./images/triple-bullet.png",
              15,
              15
            ),
            new Bullet(
              this.ctx,
              this.shooter.y + this.shooter.height / 2 - 3,
              this.shooter.x + this.shooter.width - 5,
              7,
              0,
              "./images/triple-bullet.png",
              15,
              15
            ),
            new Bullet(
              this.ctx,
              this.shooter.y + this.shooter.height / 2 - 3,
              this.shooter.x + this.shooter.width - 5,
              7,
              -0.5,
              "./images/triple-bullet.png",
              15,
              15
            )
          );
        }
      }
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
