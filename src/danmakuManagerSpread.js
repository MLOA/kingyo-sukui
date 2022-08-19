/// <reference types="@types/p5/global" />

import { DanmakuManager } from './danmakuManager';
import { Enemy01 } from './enemy01';

export class DanmakuManagerSpread extends DanmakuManager {
  /** @type {(x: number, y: number) => void} */
  constructor(x, y) {
    super(x, y, 3 * 60);
  }

  update() {
    super.update();
    if (!this.isGenerating) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 30 === 0) {
      const DIV = 32;
      for (let i = 0; i < DIV; i++) {
        let enemy = new Enemy01(this, 10);
        enemy.setPosition(createVector(this.pos.x, this.pos.y));
        enemy.setVelocity(
          createVector(1, 0)
            .rotate((TWO_PI / DIV) * i)
            .mult(5)
        );
        this._enemies.push(enemy);
      }
    }
  }
}
