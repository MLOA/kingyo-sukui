/// <reference types="@types/p5/global" />

export class Enemy {
  constructor(danmaku, size) {
    this.danmaku = danmaku;
    this.pos = createVector(); // 座標
    this._velocity = createVector(); // 移動ベクトル
    this._angle = 0; // 向き
    this.size = size;
  }

  update() {
    this.pos.add(this._velocity);
    this.collisionField();
  }

  draw() {}

  collisionField() {
    if (
      this.pos.x > 0 &&
      this.pos.x < width &&
      this.pos.y > 0 &&
      this.pos.y < height
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
