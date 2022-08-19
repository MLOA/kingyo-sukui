/// <reference types="@types/p5/global" />

class PoiManager {
  constructor(width, height, size) {
    this.pois = new Array();
    this.size = size;
    this.pos = { x: width / 2, y: height / 2 };
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
    stroke(0, 255, 0);
    fill(0, 255, 0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y + this.size / 1.5, this.size / 5, this.size);

    stroke(0, 255, 0);
    fill(255, 255, 255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    // 弾の描画
    this.pois.forEach((poi) => poi.draw());
  }

  shoot(posX, posY) {
    // console.log('shooting!');
    const poi = new Poi(this, this.size);
    poi.setPosition(createVector(posX, posY));
    poi.setVelocity(createVector(0, -10));
    this.pois.push(poi);
    // console.log(this.pois);
  }

  delete(targetPoi) {
    this.pois = this.pois.filter((poi) => poi !== targetPoi);
    // console.log('deleted poi');
  }
}
