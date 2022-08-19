/// <reference types="@types/p5/global" />

import { Enemy } from "./enemy";

export class Enemy02 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
  }

  draw() {
    stroke(100, 100, 255);
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
