/// <reference types="@types/p5/global" />

import { DanmakuManager } from './danmakuManager';
import { Enemy02 } from './enemy02';

export class DanmakuManagerRotate extends DanmakuManager {
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
    if (frameCount % 3 === 1) {
      const rotateDirectionList = [-1, 1];
      const rotateDirection =
        rotateDirectionList[
          Math.floor(Math.random() * rotateDirectionList.length)
        ];
      let enemy = new Enemy02(this, 10, rotateDirection);
      enemy.setPosition(createVector(this.pos.x, this.pos.y));
      enemy.setVelocity(
        createVector(rotateDirection, 0)
          .rotate(frameCount / 10.0)
          .mult(10),
      );
      this._enemies.push(enemy);
    }
  }
}
