class Explosion {
  constructor(deadEnemy) {
    this.ctx = deadEnemy.ctx;
    this.y =
      deadEnemy.grid.x + deadEnemy.width * deadEnemy.i + deadEnemy.height / 2;
    this.x = deadEnemy.grid.x + deadEnemy.width / 2;
    this.particles = [];
    this.addParticles();
  }

  addParticles() {
    for (let i = 0; i < 15; i++) {
      this.particles.push(new Particle(this.ctx, this.y, this.x));
    }
  }

  draw() {
    this.particles.forEach((particle) => {
      particle.draw();
    });

    this.move();

    //this.clearBullets();
  }

  move() {
    this.particles.forEach((particle) => {
      particle.move();
    });
  }

  clearParticles() {
    //this.bullets = this.bullets.filter((obs) => obs.isVisible());
  }
}
