/// <reference types="@types/p5/global" />

import { Enemy } from "./enemy";

export class Enemy01 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
  }

  draw() {
    stroke(255, 0, 0);
    noFill();
    push();
    translate(this.pos.x, this.pos.y);
    push();
    rotate(this._angle);
    rect(-15, -8, 30, 16);
    pop();
    pop();
  }
}
