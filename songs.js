class Song {
  constructor(levelIndex) {
    this.levelIndex = levelIndex;
    this.song1 = new Audio();
    this.song2 = new Audio();
    this.song3 = new Audio();
    this.song1.src = "./sounds/jogo-nina.wav";
    this.song2.src = "./sounds/fase-2.wav";
    this.song3.src = "./sounds/musica-chefao.mp3";
  }

  play() {
    if (
      this.levelIndex === 0 ||
      this.levelIndex === 2 ||
      this.levelIndex === 4
    ) {
      this.song1.play();
    } else if (this.levelIndex === 1 || this.levelIndex === 3) {
      this.song2.play();
    } else {
      this.song3.play();
    }
  }

  pause() {
    this.song1.pause();
    this.song1.currentTime = 0;
    this.song2.pause();
    this.song2.currentTime = 0;
    this.song3.pause();
    this.song3.currentTime = 0;
  }
}
