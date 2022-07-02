class Player {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.width = 50;
    this.height = 70;
    this.x = 50;
    this.y = this.ctx.canvas.height / 2 - this.height / 2;
    this.img = new Image();
    this.img.src = "./images/spaceship.png";
    this.img2 = new Image();
    this.img2.src = "./images/spaceship-red.png";
    this.vx = 0;
    this.vy = 0;
    this.strength = 5;

    this.setListeners();

    this.actions = {
      up: false,
      down: false,
      right: false,
      left: false,
      shoot: false,
    };

    this.weapon = new Weapon(this);
  }

  draw() {
    this.weapon.draw();
    this.weapon.clearBullets();
    if (this.strength > 0) {
      if (this.game.isPlayerHit) {
        this.ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
        setTimeout(() => (this.game.isPlayerHit = false), 180);
      } else {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
    }
  }

  move() {
    this.applyActions();
    this.x += this.vx;
    this.y += this.vy;
    this.weapon.move();
  }

  setListeners() {
    document.onkeydown = (e) => this.switchAction(e.keyCode, true);
    document.onkeyup = (e) => this.switchAction(e.keyCode, false);
  }

  applyActions() {
    if (this.actions.right && this.x <= 450 - this.width) {
      this.vx = 3;
    } else if (this.actions.left && this.x >= 0) {
      this.vx = -3;
    } else {
      this.vx = 0;
    }

    if (this.actions.up && this.y >= 0) {
      this.vy = -3;
    } else if (
      this.actions.down &&
      this.y + this.height <= this.ctx.canvas.height
    ) {
      this.vy = 3;
    } else {
      this.vy = 0;
    }

    if (this.actions.shoot) {
      this.weapon.shoot();
    }
  }

  switchAction(key, apply) {
    switch (key) {
      case LEFT:
        this.actions.left = apply;
        break;
      case RIGHT:
        this.actions.right = apply;
        break;
      case UP:
        this.actions.up = apply;
        break;
      case DOWN:
        this.actions.down = apply;
        break;
      case SHOOT:
        this.actions.shoot = apply;
        break;
    }
  }
}
