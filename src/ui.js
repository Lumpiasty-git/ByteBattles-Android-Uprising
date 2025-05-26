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

    // Wczytaj grafiki
    await this.loadImage("android1", "assets/android1.png");
    await this.loadImage("android2", "assets/android2.png");
    await this.loadImage("factory", "assets/factory.png");
    await this.loadImage("bg", "assets/background.png");

    this.canvas.addEventListener('click', (e) => {
      // Kliknięcie w centralny obszar = tap
      if (e.offsetY > 100 && e.offsetY < 300) {
        Game.tap();
      }
      // Androidy
      if (e.offsetY > 320 && e.offsetY < 370) {
        Game.buyAndroid(0);
      }
      if (e.offsetY > 380 && e.offsetY < 430) {
        Game.buyAndroid(1);
      }
      // Fabryka
      if (e.offsetY > 500 && e.offsetY < 550) {
        Game.buyFactory();
      }
    });

    this.update();
  },

  update() {
    // Tło
    this.ctx.fillStyle = "#181825";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Pixel-art tło
    if (this.sprites.bg) {
      this.ctx.drawImage(this.sprites.bg, 0, 0, this.width, 100);
    }

    // Licznik Bitów
    this.ctx.font = "26px monospace";
    this.ctx.fillStyle = "#21f6ff";
    this.ctx.fillText(`Bity: ${Math.floor(Game.bity)}`, 20, 50);

    // Tap android (główna animacja)
    this.ctx.drawImage(this.sprites.android1, 160, 120, 80, 80);
    this.ctx.font = "16px monospace";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText("TAP!", 185, 220);

    // Androidy
    this.ctx.drawImage(this.sprites.android1, 30, 320, 40, 40);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Koparka x${Game.androids[0].count} (kup: ${Game.androids[0].cost} Bitów)`, 80, 350);

    this.ctx.drawImage(this.sprites.android2, 30, 380, 40, 40);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Dron x${Game.androids[1].count} (kup: ${Game.androids[1].cost} Bitów)`, 80, 410);

    // Fabryka
    this.ctx.drawImage(this.sprites.factory, 30, 500, 40, 40);
    this.ctx.fillStyle = "#fffa";
    this.ctx.fillText(`Fabryka LVL ${Game.factory.level} (kup: ${Game.factory.cost} Bitów)`, 80, 530);

    // Info o przyroście
    this.ctx.font = "16px monospace";
    this.ctx.fillStyle = "#21f6ff";
    this.ctx.fillText(`+${Game.bityPerTap}/tap, +${Game.bityPerSec.toFixed(1)}/sek`, 20, 80);
  },

  animateTap() {
    // Tu można dodać animację efektu po tapie (np. rozbłysk, +1 wyskakujący tekst)
  }
};
