class Barrier {
  constructor(ctx, num) {
    this.ctx = ctx;
    this.width = 100;
    this.height = 140;
    this.x = 200;
    this.y = this.ctx.canvas.height / 2 - this.height / 2;
    this.img = new Image();
    this.img.src = "./images/barrier.png";
    this.redImg = new Image();
    this.redImg.src = "./images/barrier-red.png";
    this.strength = 50;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
