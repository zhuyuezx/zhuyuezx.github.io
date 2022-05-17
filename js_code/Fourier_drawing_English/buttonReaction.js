function sideBarSetup() {
  // setup two mode buttons
  buttonStaticMode = createButton('static');
  buttonStaticMode.position(100, 20);
  buttonStaticMode.mousePressed(setStaticMode);
  buttonRollingMode = createButton('rolling');
  buttonRollingMode.position(buttonStaticMode.x + buttonStaticMode.width + 10, 20);
  buttonRollingMode.mousePressed(setRollingMode);
  // setup numVector slider
  numVectirSlider = createSlider(2, 300, 100, 1);
  numVectirSlider.position(210, 60);
  numVectirSlider.style('width', '160px');
  // setup rate slider
  rateSlider = createSlider(0.2, 2.5, 1, 0.1);
  rateSlider.position(210, 100);
  rateSlider.style('width', '160px');
  // setup speed slider
  speedSlider = createSlider(0.001, 0.05, 0.01, 0.001);
  speedSlider.position(210, 140);
  speedSlider.style('width', '160px');
  // setup stroke weight slider
  swSlider = createSlider(1, 10, 3, 1);
  swSlider.position(210, 180);
  swSlider.style('width', '160px');
  // setup svg selector
  svgSelect = createSelect();
  svgSelect.position(100, 215);
  svgSelect.style('width', '120px');
  svgSelect.style('height', '40px');
  svgSelect.style('font-size', '18px');
  svgSelect.option('pi symbol 1');
  svgSelect.option('pi symbol 2');
  svgSelect.option('Russia Contour');
  svgSelect.option('Greek Letter');
  svgSelect.option('Apple logo');
  svgSelect.option('Australia Contour');
  svgSelect.option('China Contour');
  svgSelect.option('Britain Contour');
  svgSelect.option('Brazil Contour');
  svgSelect.changed(svgSelectReaction);

  // setup svg input box and button
  svgInput = createInput();
  svgInput.position(80, 300);
  svgInput.style('width', '120px');
  svgInput.style('height', '40px');
  svgInput.style('font-size', '18px');

  svgButton1 = createButton('update');
  svgButton1.position(80, svgInput.y + svgInput.height + 10);
  svgButton1.mousePressed(button1Reaction);
  svgButton2 = createButton('clear');
  svgButton2.position(140, svgInput.y + svgInput.height + 10);
  svgButton2.mousePressed(button2Reaction);
}

function setStaticMode() {
  mode = 0;

  route.forEach(function(v) {
    v.x += width / 2 - width / 2 / rate;
    v.y += height / 2 - height / 2 / rate;
  });
  rate = lastRate = 1;
  // reset rate slider
  rateSlider.remove();
  rateSlider = createSlider(0.2, 2.5, 1, 0.1);
  rateSlider.position(210, 100);
  rateSlider.style('width', '160px');
  // reset speed slider
  speedSlider.remove();
  speedSlider = createSlider(0.001, 0.05, 0.01, 0.001);
  speedSlider.position(210, 140);
  speedSlider.style('width', '160px');
}

function setRollingMode() {
  mode = 1;

  // reset rate slider
  rateSlider.remove();
  rateSlider = createSlider(1, 15, 3, 0.1);
  rateSlider.position(210, 100);
  rateSlider.style('width', '160px');
  // reset speed slider
  speedSlider.remove();
  speedSlider = createSlider(0.0005, 0.02, 0.003, 0.0005);
  speedSlider.position(210, 140);
  speedSlider.style('width', '160px');
}

function svgSelectReaction() {
    var selectVal = svgSelect.value();
    if (selectVal == "pi symbol 1") {
      path = getPath("svg_files/PI_copy.svg");
      initialize();
    } else if (selectVal == "pi symbol 2") {
      path = getPath("svg_files/Pi-symbol.svg");
      initialize();
    } else if (selectVal == "Russia Contour") {
      path = getPath("svg_files/Russia.svg");
      initialize();
    } else if (selectVal == "Greek Letter") {
      path = getPath("svg_files/Xi.svg");
      initialize();
    } else if (selectVal == "Apple logo") {
        path = getPath("svg_files/apple.svg");
        initialize();
    } else if (selectVal == "Australia Contour") {
        path = getPath("svg_files/australia.svg");
        initialize();
    } else if (selectVal == "China Contour") {
        path = getPath("svg_files/China.svg");
        initialize();
    } else if (selectVal == "Britain Contour") {
        path = getPath("svg_files/Britain.svg");
        initialize();
    } else if (selectVal == "Brazil Contour") {
        path = getPath("svg_files/Brazil.svg");
        initialize();
    }
}

function button1Reaction() {
    var inputString = String(svgInput.value());
    if (inputString.length == 0) {
      return;
    }
    path = getSvgPath(inputString);
    initialize();
}

function button2Reaction() {
    svgInput.value('');
}