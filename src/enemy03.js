/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class Enemy03 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
  }

  draw() {
    stroke(0, 0, 255);
    noFill();
    push();
    translate(this.pos.x, this.pos.y);
    push();
    rotate(this._angle);
    ellipse(-8, -8, 24, 24);
    pop();
    pop();
  }
}
