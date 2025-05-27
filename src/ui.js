const UI = {
  canvas: null,
  ctx: null,
  width: 400,
  height: 600,
  sprites: {},

  async loadImage(name, src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
      this.sprites[name] = img;
    });
  },

  async init() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Wczytaj grafiki z poprawnymi ścieżkami
    await this.loadImage("android1", "/src/assets/android1.png");
    await this.loadImage("android2", "/src/assets/android2.png");
    await this.loadImage("factory", "/src/assets/factory.png");
    await this.loadImage("bg", "/src/assets/background.png");

    this.canvas.addEventListener('click', (e) => {
      // Pozycja kliknięcia względem canvas
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Kliknięcie w centralnego androida = tap
      if (x > 160 && x < 240 && y > 120 && y < 200) {
        Game.tap();
      }
      // Kliknięcie w "Koparkę"
      if (y > 320 && y < 360 && x > 30 && x < 70) {
        Game.buyAndroid(0);
      }
      // Kliknięcie w "Drona"
      if (y > 380 && y < 420 && x > 30 && x < 70) {
        Game.buyAndroid(1);
      }
      // Kliknięcie w fabrykę
      if (y > 500 && y < 540 && x > 30 && x < 70) {
        Game.buyFactory();
      }
    });

    this.update();
  },

  update() {
    // Tło
    this.ctx.fillStyle = "#181825";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Tło pixel-art
    if (this.sprites.bg) {
      this.ctx.drawImage(this.sprites.bg, 0, 0, this.width, 100);
    }

    // Licznik Bitów
    this.ctx.font = "26px monospace";
    this.ctx.fillStyle = "#21f6ff";
    this.ctx.fillText(`Bity: ${Math.floor(Game.bity)}`, 20, 50);

    // Tap-android (centralny)
    if (this.sprites.android1) {
      this.ctx.drawImage(this.sprites.android1, 160, 120, 80, 80);
    }
    this.ctx.font = "16px monospace";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText("TAP!", 185, 220);

    // Androidy (koparka i dron)
    if (this.sprites.android1) {
      this.ctx.drawImage(this.sprites.android1, 30, 320, 40, 40);
    }
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Koparka x${Game.androids[0].count} (kup: ${Game.androids[0].cost} Bitów)`, 80, 350);

    if (this.sprites.android2) {
      this.ctx.drawImage(this.sprites.android2, 30, 380, 40, 40);
    }
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Dron x${Game.androids[1].count} (kup: ${Game.androids[1].cost} Bitów)`, 80, 410);

    // Fabryka
    if (this.sprites.factory) {
      this.ctx.drawImage(this.sprites.factory, 30, 500, 40, 40);
    }
    this.ctx.fillStyle = "#fffa";
    this.ctx.fillText(`Fabryka LVL ${Game.factory.level} (kup: ${Game.factory.cost} Bitów)`, 80, 530);

    // Info o przyroście
    this.ctx.font = "16px monospace";
    this.ctx.fillStyle = "#21f6ff";
    this.ctx.fillText(`+${Game.bityPerTap}/tap, +${Game.bityPerSec.toFixed(1)}/sek`, 20, 80);
  },

  animateTap() {
    // Tu możesz dodać animacje po tapnięciu (np. efekt rozbłysku, animowany tekst)
  }
};
