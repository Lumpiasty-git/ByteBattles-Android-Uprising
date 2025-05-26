const Game = {
  bity: 0,
  bityPerTap: 1,
  bityPerSec: 0,
  lastTick: 0,
  androids: [
    { name: "Koparka", count: 0, cost: 10, bonus: 0.2, sprite: "assets/android1.png" },
    { name: "Dron", count: 0, cost: 100, bonus: 2, sprite: "assets/android2.png" }
  ],
  factory: { level: 0, cost: 50, bonus: 0.5, sprite: "assets/factory.png" },
  tickInterval: 1000,

  init() {
    this.bity = 0;
    this.bityPerTap = 1;
    this.bityPerSec = 0;
    this.lastTick = Date.now();
  },

  start() {
    setInterval(this.tick.bind(this), this.tickInterval);
  },

  tap() {
    this.bity += this.bityPerTap;
    UI.update();
    UI.animateTap();
  },

  buyAndroid(idx) {
    let andr = this.androids[idx];
    if (this.bity >= andr.cost) {
      this.bity -= andr.cost;
      andr.count++;
      this.updateBityPerSec();
      andr.cost = Math.floor(andr.cost * 1.5);
      UI.update();
    }
  },

  buyFactory() {
    if (this.bity >= this.factory.cost) {
      this.bity -= this.factory.cost;
      this.factory.level++;
      this.updateBityPerSec();
      this.factory.cost = Math.floor(this.factory.cost * 2);
      UI.update();
    }
  },

  updateBityPerSec() {
    let total = 0;
    for (const a of this.androids) {
      total += a.count * a.bonus;
    }
    total += this.factory.level * this.factory.bonus;
    this.bityPerSec = total;
  },

  tick() {
    this.bity += this.bityPerSec;
    UI.update();
  }
};