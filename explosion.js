class Explosion {
  constructor(deadEnemy, level) {
    this.ctx = deadEnemy.ctx;
    this.y = deadEnemy.grid.y + deadEnemy.height * deadEnemy.j + 20; //enemy heigth/2
    this.x = deadEnemy.grid.x + deadEnemy.width * deadEnemy.i + 15; //enemy width/2
    this.particles = [];
    this.level = level;
    this.color = this.level.color;
    this.addParticles();
  }

  addParticles() {
    for (let i = 0; i < 15; i++) {
      this.particles.push(new Particle(this.ctx, this.y, this.x, this.color));
    }
  }

  draw() {
    this.particles.forEach((particle) => {
      particle.draw();
    });
  }

  move() {
    this.particles.forEach((particle, i) => {
      particle.move();

      if (particle.opacity <= 0) {
        this.particles.splice(i, 1);
      }
    });
  }
}
