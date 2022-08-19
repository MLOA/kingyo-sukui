/// <reference types="@types/p5/global" />

import { DanmakuManager } from "./danmakuManager";
import { Enemy04 } from "./enemy04";

export class DanmakuManagerHoming extends DanmakuManager {
  /** @type {(x: number, y: number) => void} */
  constructor(x, y, target) {
    super(x, y, 2 * 60);
    this.target = target;
  }

  update() {
    super.update();
    if (!this.isAlive) return;
    this.addEnemy();
  }

  addEnemy() {
    if (frameCount % 30 === 0) {
      for (let i = 0; i < 12; i++) {
        let enemy = new Enemy04(this, 10);
        const RotateDirectionList = [-1, 1];
        const RotateDirection =
          RotateDirectionList[
            Math.floor(Math.random() * RotateDirectionList.length)
          ];
        enemy.setPosition(createVector(this.pos.x, this.pos.y));
        enemy.setVelocity(
          createVector(RotateDirection, 0)
            .rotate(TWO_PI * i)
            .mult(5)
        );
        enemy.setTargetPosition(
          createVector(this.target.pos.x, this.target.pos.y)
        );
        this._enemies.push(enemy);
      }
    }
  }
}
