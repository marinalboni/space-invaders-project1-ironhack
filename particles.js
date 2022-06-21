class Particle {
  constructor(ctx, y, x) {
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.vx = (Math.random() - 0.5) * 2; //para que sean negativas y positivas
    this.vy = (Math.random() - 0.5) * 2;
    this.radius = 10;
    this.color = "yellow"; //Math.floor(Math.random() * 16777215)
    //   .toString(16)
    //   .padStart(6, "0"); //random color
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    console.log(this.x, this.y);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
}
