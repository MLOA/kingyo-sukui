/// <reference types="@types/p5/global" />

import { Poi } from "./poi";

export class PoiManager {
  constructor(width, height, size) {
    /** @type {Poi[]} */
    this.pois = new Array();
    this.size = size;
    this.pos = { x: width / 2, y: height / 2 };
    this.color = "#00ff00";
  }

  update(cursorX, cursorY, enemies) {
    // ポインターの更新
    this.pos.x = cursorX;
    this.pos.y = cursorY;

    // 弾の更新
    this.pois.forEach((poi) => poi.update(enemies));
  }

  draw() {
    // ポインターの描画
    stroke(this.color);
    fill(this.color);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y + this.size / 1.5, this.size / 5, this.size);

    stroke(this.color);
    fill(255, 255, 255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    // 弾の描画
    this.pois.forEach((poi) => poi.draw());
  }

  shoot(posX, posY) {
    // console.log('shooting!');
    const poi = new Poi(this, this.size, this.color);
    poi.setPosition(createVector(posX, posY));
    poi.setVelocity(createVector(0, -10));
    this.pois.push(poi);
    this.changeColor();
    // console.log(this.pois);
  }

  delete(targetPoi) {
    this.pois = this.pois.filter((poi) => poi !== targetPoi);
    // console.log('deleted poi');
  }

  changeColor() {
    const colorList = [
      "#00ff00", // 緑
      "#ff0000", // 赤
      "#0000ff", // 青
      "#ffff00", // 黄
      "#ff00ff", // 紫
      "#00ffff", // 水
    ];
    this.color = colorList[Math.floor(Math.random() * colorList.length)];
  }
}
