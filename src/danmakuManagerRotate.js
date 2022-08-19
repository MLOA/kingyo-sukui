/// <reference types="@types/p5/global" />

import { DanmakuManager } from "./danmakuManager";
import { Enemy02 } from "./enemy02";

export class DanmakuManagerRotate extends DanmakuManager {
  constructor() {
    super(1000);
  }

  update() {
    super.update();
    if (!this.isAlive) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 3 === 1) {
      let enemy = new Enemy02(this, 10);
      enemy.setPosition(createVector(width / 2, height / 2));
      enemy.setVelocity(
        createVector(1, 0)
          .rotate(frameCount / 10.0)
          .mult(10)
      );
      this._enemies.push(enemy);
    }
  }
}
