/// <reference types="@types/p5/global" />

import { sketch } from 'p5js-wrapper';

import { Background } from './background';
import { GoldenFish } from './goldenFish';
import { PoiManager } from './poiManager';
import { DanmakuManagerRotate } from './danmakuManagerRotate';
import { DanmakuManagerSpread } from './danmakuManagerSpread';
import { DanmakuManagerStraight } from './danmakuManagerStraight';
import { DanmakuManager } from './danmakuManager';

/** @type {Background} */
let backgroundLayer;
/** @type {GoldenFish} */
let goldenFish;
/** @type {PoiManager} */
let poiManager;
/** @type {DanmakuManager[]} */
let danmakuManagers = [];

const width = 800;
const height = 800;
let isStarted = false;
let isFinished = false;
let score = 0;

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => startGame());

const reStartButton = document.querySelector('.restart-button');
reStartButton.addEventListener('click', () => restartGame());

const titleElm = document.querySelector('.title');
const playingScoreElm = document.querySelector('.playing-score');
const scoreElm = document.querySelector('.score');
const scoreValueElm = document.querySelector('.score-value');

sketch.setup = function () {
  frameRate(60);
  const canvas = createCanvas(width, height);
  canvas.parent('game');
  score = 0;
  backgroundLayer = new Background(width, height);
  goldenFish = new GoldenFish(width, height, 100);
  poiManager = new PoiManager(width, height, 30);
  danmakuManagers = [];
};

sketch.draw = function () {
  background(0);
  backgroundLayer.draw();

  if (!isPlaying()) return;
  if (frameCount % (60 * 2) === 0) {
    spawnDanmaku();
  }

  const mergedEnemies = danmakuManagers
    .map((danmakuManager) => danmakuManager._enemies)
    .flat();
  goldenFish.update(frameCount, mergedEnemies);
  poiManager.update(mouseX, mouseY, mergedEnemies);
  danmakuManagers.forEach((danmakuManager) => danmakuManager.update());
  if (goldenFish.life == 0) {
    finishGame();
  }

  goldenFish.draw();
  poiManager.draw();
  danmakuManagers.forEach((danmakuManager) => danmakuManager.draw());

  drawScore(score++);
};

sketch.mousePressed = function () {
  if (!isPlaying()) return;
  // finishGame();
  poiManager.shoot(mouseX, mouseY);
};

const isPlaying = () => {
  return isStarted && !isFinished;
};

const startGame = () => {
  console.log('Start Game');
  sketch.setup();
  isStarted = true;
  isFinished = false;
  titleElm.classList.add('invisible');
  playingScoreElm.classList.remove('invisible');
};

const finishGame = () => {
  console.log('Finish Game');
  isStarted = false;
  isFinished = true;
  scoreElm.classList.remove('invisible');
  playingScoreElm.classList.add('invisible');
};

const restartGame = () => {
  scoreElm.classList.add('invisible');
  startGame();
};

const drawScore = (score) => {
  playingScoreElm.textContent = score;
  scoreValueElm.textContent = score;
};

const spawnDanmaku = () => {
  danmakuManagers = danmakuManagers.filter(
    (danmakuManager) => danmakuManager.isAlive
  );
  if (danmakuManagers.length > 1) return;
  console.log('spawn');
  const rand = Math.floor(random(3));
  switch (rand) {
    case 0:
      danmakuManagers.push(new DanmakuManagerStraight(random(width), 0));
      break;
    case 1:
      danmakuManagers.push(
        new DanmakuManagerRotate(random(width), random(0, height / 4))
      );
      break;
    case 2:
      danmakuManagers.push(
        new DanmakuManagerSpread(random(width), random(height / 3))
      );
      break;
  }
};
