/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class DanmakuManager {
  /** @type {(x: number, y: number, lifeTime: number) => void} */
  constructor(x, y, generatingTime) {
    this.pos = { x, y };
    /** @type {Enemy[]} */
    this._enemies = new Array();
    this.generatingTime = generatingTime;
    this.isAlive = true;
    this.isGenerating = true;
  }

  update() {
    this.generatingTime--;
    if (this.generatingTime == 0) {
      this.isGenerating = false;
    }
    this._enemies.forEach((enemy) => enemy.update());
  }

  draw() {
    this._enemies.forEach((enemy) => enemy.draw());
  }

  delete(targetEnemy) {
    this._enemies = this._enemies.filter((enemy) => enemy !== targetEnemy);
    if (this._enemies.length == 0) {
      this.isAlive = false;
    }
  }
}
