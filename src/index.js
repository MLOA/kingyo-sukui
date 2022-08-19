/// <reference types="@types/p5/global" />

import { sketch } from "p5js-wrapper";

import { Background } from "./background";
import { GoldenFish } from "./goldenFish";
import { PoiManager } from "./poiManager";
import { DanmakuManagerRotate } from "./danmakuManagerRotate";
import { DanmakuManagerSpread } from "./danmakuManagerSpread";
import { DanmakuManagerStraight } from "./danmakuManagerStraight";
import { DanmakuManager } from "./danmakuManager";

/** @type {Background} */
let backgroundLayer;
/** @type {GoldenFish} */
let goldenFish;
/** @type {PoiManager} */
let poiManager;
/** @type {DanmakuManager[]} */
let danmakuManagers = [];

const width = 600;
const height = 600;
let isStarted = false;
let isFinished = false;
let score = 0;

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => startGame());

const reStartButton = document.querySelector(".restart-button");
reStartButton.addEventListener("click", () => restartGame());

const titleElm = document.querySelector(".title");
const playingScoreElm = document.querySelector(".playing-score");
const scoreElm = document.querySelector(".score");
const scoreValueElm = document.querySelector(".score-value");

sketch.setup = function () {
  frameRate(60);
  const canvas = createCanvas(width, height);
  canvas.parent("game");
  score = 0;
  backgroundLayer = new Background(width, height);
  goldenFish = new GoldenFish(width, height, 100);
  poiManager = new PoiManager(width, height, 50);
  danmakuManagers = [
    new DanmakuManagerRotate(),
    new DanmakuManagerSpread(),
    new DanmakuManagerStraight(),
  ];
};

sketch.draw = function () {
  background(0);
  backgroundLayer.draw();

  if (!isPlaying()) return;
  const mergedEnemies = danmakuManagers
    .map((danmakuManager) => danmakuManager._enemies)
    .flat();

  // [
  //   ...danmaku01._enemies,
  //   ...danmaku02._enemies,
  //   ...danmaku03._enemies,
  // ];
  goldenFish.update(frameCount, mergedEnemies);
  poiManager.update(mouseX, mouseY, mergedEnemies);
  danmakuManagers.forEach((danmakuManager) => danmakuManager.update());

  goldenFish.draw();
  poiManager.draw();
  danmakuManagers.forEach((danmakuManager) => danmakuManager.draw());

  drawScore(score++);
};

sketch.mousePressed = function () {
  if (!isPlaying()) return;
  finishGame();
  poiManager.shoot(mouseX, mouseY);
};

const isPlaying = () => {
  return isStarted && !isFinished;
};

const startGame = () => {
  console.log("Start Game");
  sketch.setup();
  isStarted = true;
  isFinished = false;
  titleElm.classList.add("invisible");
  playingScoreElm.classList.remove("invisible");
};

const finishGame = () => {
  console.log("Finish Game");
  isStarted = false;
  isFinished = true;
  scoreElm.classList.remove("invisible");
  playingScoreElm.classList.add("invisible");
};

const restartGame = () => {
  scoreElm.classList.add("invisible");
  startGame();
};

const drawScore = (score) => {
  playingScoreElm.textContent = score;
  scoreValueElm.textContent = score;
};
