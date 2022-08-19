/// <reference types="@types/p5/global" />

import { DanmakuManager } from "./danmakuManager";
import { Enemy03 } from "./enemy03";

export class DanmakuManagerStraight extends DanmakuManager {
  constructor() {
    super(1000);
    this._targetVector = createVector(width / 2, height / 2);
  }

  update() {
    super.update();
    if (!this.isAlive) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 60 === 1) {
      this._targetVector = p5.Vector.random2D();
    }

    if (frameCount % 60 < 30 && frameCount % 5 === 1) {
      let enemy = new Enemy03(this, 10);
      enemy.setPosition(createVector(width / 2, height / 2));
      enemy.setVelocity(this._targetVector.normalize().mult(10));
      this._enemies.push(enemy);
    }
  }
}
