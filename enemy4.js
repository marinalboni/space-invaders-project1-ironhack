class EnemyFour extends EnemyOne {
  constructor(grid, i, j) {
    super(grid, i, j);
    this.ctx = grid.ctx;
    this.width = 30;
    this.height = 40;
    this.img = new Image();
    this.img.src = "./images/enemy2-cropped.png";
    this.img.frames = 2;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.strength = 30;
    this.weapon = new Weapon(this);
  }

  shoot() {}
}
