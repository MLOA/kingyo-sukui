/// <reference types="@types/p5/global" />

class SpreadDanmakuManager extends DanmakuManager {
  constructor() {
    super(100);
  }

  update() {
    super.update();
    if (!this.isAlive) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 2 === 1) {
      let enemy = new Enemy01(this, 10);
      enemy.setPosition(createVector(width / 2, height / 2));
      enemy.setVelocity(p5.Vector.random2D().mult(5));
      this._enemies.push(enemy);
    }
  }
}
