/// <reference types="@types/p5/global" />

import { DanmakuManager } from './danmakuManager';
import { Enemy02 } from './enemy02';

export class DanmakuManagerRotate extends DanmakuManager {
  /** @type {(x: number, y: number, direction: number) => void} */
  constructor(x, y, direction) {
    super(x, y, 3 * 60);
    this.rotateDirection = direction;
  }

  update() {
    super.update();
    if (!this.isGenerating) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 3 === 1) {
      let enemy = new Enemy02(this, 10, this.rotateDirection);
      enemy.setPosition(createVector(this.pos.x, this.pos.y));
      enemy.setVelocity(
        createVector(1, 0)
          .rotate((this.rotateDirection * frameCount) / 10.0)
          .mult(10),
      );
      this._enemies.push(enemy);
    }
  }
}
