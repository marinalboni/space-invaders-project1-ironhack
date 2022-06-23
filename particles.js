class Particle {
  constructor(ctx, y, x, color) {
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.vx = (Math.random() - 0.5) * 2; //para que sean negativas y positivas
    this.vy = (Math.random() - 0.5) * 2;
    this.radius = Math.random() * 3;
    this.color = color;
    this.opacity = 1;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.01;
  }
}
