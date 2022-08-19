/// <reference types="@types/p5/global" />

import { Enemy } from "./enemy";

export class DanmakuManager {
  constructor(lifeTime) {
    /** @type {Enemy[]} */
    this._enemies = new Array();
    this.lifeTime = lifeTime;
    this.isAlive = true;
  }

  update() {
    this.lifeTime--;
    if (this.lifeTime === 0) {
      this.isAlive = false;
    }
    this._enemies.forEach((enemy) => enemy.update());
  }

  draw() {
    this._enemies.forEach((enemy) => enemy.draw());
  }

  delete(targetEnemy) {
    this._enemies = this._enemies.filter((enemy) => enemy !== targetEnemy);
  }
}