/// <reference types="@types/p5/global" />

import { DanmakuManager } from './danmakuManager';

export class Enemy {
  /** @type {(danmaku: DanmakuManager, size: number) => void} */
  constructor(danmaku, size) {
    this.danmaku = danmaku;
    this.pos = createVector(); // 座標
    this._velocity = createVector(); // 移動ベクトル
    this._angle = 0; // 向き
    this.size = size;
    this.orbits = [];
  }

  update() {
    this.orbits.push({ pos: this.pos.copy(), angle: this._angle });
    if (this.orbits.length > 10) {
      this.orbits.shift();
    }
    this.pos.add(this._velocity);
    this.collisionField();
  }

  draw() {}

  collisionField() {
    if (
      this.pos.x > -15 &&
      this.pos.x < width + 15 &&
      this.pos.y > -15 &&
      this.pos.y < height + 15
    ) {
      return;
    }
    this.destroy();
  }

  destroy() {
    this.danmaku.delete(this);
  }

  setPosition(position) {
    this.pos = position;
  }

  setVelocity(velocity) {
    this._velocity = velocity;
    this._angle = this._velocity.heading();
  }
}
