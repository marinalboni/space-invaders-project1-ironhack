class Explode {
  constructor(
    loser,
    img = "./images/explosion.png",
    frames = 20,
    distance = 100
  ) {
    this.ctx = loser.ctx;
    this.distance = distance;
    this.width = loser.width + this.distance;
    this.height = loser.height + this.distance;
    this.x = loser.x - 50;
    this.y = loser.y - 50;
    this.img = new Image();
    this.img.src = img;
    this.img.frames = frames;
    this.img.frameIndex = 0;
    this.tick = 0;
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

    if (this.tick > 10) {
      this.tick = 0;
      this.img.frameIndex++;
    }
  }
}
