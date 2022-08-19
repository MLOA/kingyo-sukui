/// <reference types="@types/p5/global" />

import { DanmakuManager } from './danmakuManager';
import { Enemy03 } from './enemy03';

export class DanmakuManagerStraight extends DanmakuManager {
  /** @type {(x: number, y: number) => void} */
  constructor(x, y) {
    super(x, y, 3 * 60);
    this._targetVector = createVector(0, height / 2);
  }

  update() {
    super.update();
    if (!this.isGenerating) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 60 == 1) {
      new Array(Math.floor(random(3, 8))).fill().map(() => {
        let enemy = new Enemy03(this, 10);
        enemy.setPosition(
          createVector(
            this.pos.x + random(-50, 50),
            this.pos.y + random(-50, 50),
          ),
        );
        enemy.setVelocity(this._targetVector.normalize().mult(10));
        this._enemies.push(enemy);
      });
    }
  }
}
