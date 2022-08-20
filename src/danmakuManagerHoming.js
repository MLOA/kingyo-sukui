/// <reference types="@types/p5/global" />

import { DanmakuManager } from './danmakuManager';
import { Enemy04 } from './enemy04';

export class DanmakuManagerHoming extends DanmakuManager {
  /** @type {(x: number, y: number, direction: number, target: GoldenFish) => void} */
  constructor(x, y, direction, target) {
    super(x, y, 3 * 60);
    this.rotateDirection = direction;
    this.target = target;
  }

  update() {
    super.update();
    if (!this.isGenerating) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 30 === 0) {
      let enemy = new Enemy04(this, 20);
      enemy.setPosition(createVector(this.pos.x, this.pos.y));
      enemy.setVelocity(
        createVector(this.rotateDirection, 0).rotate(TWO_PI).mult(5),
      );
      enemy.setTargetPosition(
        createVector(this.target.pos.x, this.target.pos.y),
      );
      this._enemies.push(enemy);
    }
  }
}
