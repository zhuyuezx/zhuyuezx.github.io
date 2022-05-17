var path;
var commands;
var points;
var numVectors = 101;
var rotateSpeed = 0.01;
var rate = 1.5;
var vectors;
var nVectors;
var route;
var pen;
var lastRate = rate;
var lastNumVector = numVectors;
var angle = 0;
var mode = 0; // 0 for static and 1 for rolling

let buttonStaticMode;
let buttonRollingMode;
let numVectirSlider;
let swSlider;
let rateSlider;
let speedSlider;
let svgSelect;
let svgInput;
let svgButton1;
let svgButton2;

function setup() {
  //createFullscreenCanvas();
  createCanvas(windowWidth, windowHeight);

  sideBarSetup();

  points = [];
  vectors = [];
  nVectors = [];
  route = [];
  pen = createVector(0, 0);
  //path = getPath("Pi-symbol.svg");
  path = getPath("svg_files/Pi-symbol.svg");
  initialize();

  //print all elements in commands
  // for (var i = 0; i < commands.length; i++) {
  //   print(commands[i]);
  // }
}

function draw() {
  background(0);
  numVectors = numVectirSlider.value();
  rate = rateSlider.value();
  rotateSpeed = speedSlider.value();
  if (lastNumVector != numVectors) {
    vectors = [];
    nVectors = [];
    setVectors();
    for (var n = 0; n < numVectors; n++) {
      vectors[n].rotate(n * angle);
      nVectors[n].rotate(-n * angle);
    }
    //route = [];
    lastNumVector = numVectors;
  }
  rotateVectors();
  if (mode == 0) {
    drawVectorsStatic();
    drawPathStatic();
  } else if (mode == 1) {
    drawVectorsRolling();
    drawPathRolling();
  }

  angle += rotateSpeed;
  angle %= TWO_PI;

  textSize(24);
  fill(200);
  noStroke();
  var labelMode = "展示模式：";
  text(labelMode, 10, 40);
  var labelLevel = "层数：" + (2 * numVectors - 2);
  text(labelLevel, 10, 80);
  var labelRate = "倍率：" + rate;
  text(labelRate, 10, 120);
  var labelSpeed = "速度：" + rotateSpeed;
  text(labelSpeed, 10, 160);
  var labelSW = "线宽：" + swSlider.value();
  text(labelSW, 10, 200);
  var labelSvgFile = "图案：";
  text(labelSvgFile, 10, 240);
  textSize(20);
  var labelSelfInput = "自定义输入：";
  text(labelSelfInput, 10, 285);
}

function rotateVectors() {
  for (var n = 0; n < numVectors; n++) {
    vectors[n].rotate(n * rotateSpeed);
    nVectors[n].rotate(-n * rotateSpeed);
  }
}

function commandsAutoFill() {
  var path = [];
  var pool = new Map([["m", 3], ["M", 3], ["z", 1],
  ["v", 2], ["V", 2], ["h", 2], ["H", 2],
  ["c", 7], ["C", 7], ["s", 5], ["S", 5],
  ["q", 5], ["Q", 5], ["t", 3], ["T", 3],
  ["l", 3], ["L", 3]]);
  var lastCommand = null;
  for (var i = 0; i < commands.length;) {
    var curr = commands[i];
    if (pool.get(curr) == null) {
      var val = -1;
    } else {
      var val = pool.get(curr);
    }
    if (val == -1) {
      if (lastCommand == null) {
        console.log("Badly formatted command");
      } else {
        path.push(lastCommand);
        val = pool.get(lastCommand);
        for (var j = 0; j < val - 1; j++) {
          path.push(commands[i + j]);
        }
        i += val - 1;
      }
    } else {
      lastCommand = curr;
      for (var j = 0; j < val; j++) {
        path.push(commands[i + j]);
      }
      i += val;
    }
  }
  commands = path;

  for (var i = 0; i < commands.length; i++) {
    print(commands[i]);
  }
}

/**
 * 
 * @param {String} file
 * @returns {String} 
 */
function getPath(file) {
  var rawFile = new XMLHttpRequest();
  var allText = "";
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
        //alert(allText);
      }
    }
  }
  rawFile.send(null);
  return getSvgPath(allText);
}

function getSvgPath(allText) {
  var path = String(allText.substring(allText.indexOf("<path")));
  path = path.substring(path.indexOf(" d=\"") + 4);
  path = path.substring(0, path.indexOf("\""));
  return path;
}