class EnemyTwo extends EnemyOne {
  constructor(ctx, i, j, x, y) {
    super(ctx, i, j, x, y);
    this.img = new Image();
    this.img.src = "./images/enemy2-cropped.png";
    this.img.frames = 2;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.strength = 20;
  }
}
