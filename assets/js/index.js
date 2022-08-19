/// <reference types="@types/p5/global" />

let danmaku, poi, backgroundLayer, goldenFish;

function setup() {
  const width = 600;
  const height = 600;
  createCanvas(width, height);
  backgroundLayer = new Background(width, height);
  goldenFish = new GoldenFish(width, height, 100);
  poiManager = new PoiManager(width, height, 50);
  danmaku01 = new SpreadDanmakuManager();
}

function draw() {
  background(0);
  backgroundLayer.draw();

  goldenFish.update(frameCount);
  // 一旦enemiesは空
  poiManager.update(mouseX, mouseY, danmaku01._enemies);
  danmaku01.update();

  goldenFish.draw();
  poiManager.draw();
  danmaku01.draw();
}

function mouseClicked() {
  poiManager.shoot(mouseX, mouseY);
}
