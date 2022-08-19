/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class Enemy04 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
    this._targetPosition = createVector();
  }

  update() {
    let speed = this._velocity.mag();
    this.setVelocity(
      this._velocity
        .add(this._targetPosition.copy().sub(this.pos).normalize().mult(0.1))
        .normalize()
        .mult(speed),
    );
    return super.update();
  }

  draw() {
    stroke(255, 0, 255);
    noFill();
    push();
    translate(this.pos.x, this.pos.y);
    push();
    rotate(this._angle);
    rect(-15, -8, 30, 16);
    pop();
    pop();
  }

  setTargetPosition(position) {
    this._targetPosition = position;
  }
}
