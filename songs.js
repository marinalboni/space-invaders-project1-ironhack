class Song {
  constructor(levelIndex) {
    this.levelIndex = levelIndex;
    this.song1 = new Audio();
    this.song2 = new Audio();
    this.song3 = new Audio();
    this.song1.src = "./sounds/versao2.wav";
    this.song2.src = "./sounds/nfase-2.wav";
    this.song3.src = "./sounds/musica-chefao2.mp3";
  }

  play() {
    if (this.levelIndex <= 4) {
      this.song1.play();
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
