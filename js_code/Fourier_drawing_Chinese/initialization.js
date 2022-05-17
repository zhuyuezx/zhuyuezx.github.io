function initialize() {
    points = [];
    vectors = [];
    nVectors = [];
    route = [];
    pen = createVector(0, 0);
    commands = extractCommands(path);
    print(path);
    commandsAutoFill();
    samplePoints(commands);
    setVectors();
  }

function setVectors() {
    for (var n = 0; n < numVectors; n++) {
        var total = createVector(0, 0);
        for (var t = 0; t <= 1; t += 1.0 / points.length) {
            var v = points[parseInt(t * points.length)];
            var r = sqrt(v.x * v.x + v.y * v.y);
            var theta = atan2(v.y, v.x) - n * TWO_PI * t;
            total.add(createVector(r * cos(theta), r * sin(theta)));
        }
        total.div(points.length);
        vectors.push(total);
    }

    nVectors.push(createVector(0, 0));
    for (var n = 1; n < numVectors; n++) {
        var total = createVector(0, 0);
        for (var t = 0; t <= 1; t += 1.0 / points.length) {
            var v = points[parseInt(t * points.length)];
            var r = sqrt(v.x * v.x + v.y * v.y);
            var theta = atan2(v.y, v.x) + n * TWO_PI * t;
            total.add(createVector(r * cos(theta), r * sin(theta)));
        }
        total.div(points.length);
        nVectors.push(total);
    }
}

function extractCommands(path) {
    var res = [];
    var prev = "";
    for (var i = 0; i < path.length; i++) {
        var curr = path[i];
        if (('a' <= curr && curr <= 'z') || ('A' <= curr && curr <= 'Z')) {
            if (prev != "") {
                res.push(prev);
            }
            prev = "";
            res.push(curr);
        } else if ('0' <= curr && curr <= '9') {
            prev += curr;
        } else if (curr == ' ' || curr == ',' || curr == '\n') {
            if (prev != "") {
                res.push(prev);
            }
            prev = "";
        } else if (curr == '-') {
            if (prev == "") {
                prev += curr;
            } else {
                res.push(prev);
                prev = curr;
            }
        } else if (curr == '.') {
            if (prev == "" || prev == '-') {
                prev += curr;
            } else if (prev.includes('.')) {
                res.push(prev);
                prev = curr;
            } else {
                prev += curr;
            }
        }
    }
    if (prev != "") {
        res.push(prev);
    }
    return res;
}

function samplePoints(curves) {
    let lastPoint = createVector(0, 0);
    for (var i = 0; i < commands.length;) {
        //print("xPos: " + lastPoint.x + " yPos: " + lastPoint.y);
        var curr = commands[i];
        if (curr == "z") {
            lastPoint = createVector(0, 0);
            i++;
        }
        else if (curr == "v") {
            lastPoint.y += curves[i + 1];
            i += 2;
        }
        else if (curr == "V") {
            lastPoint.y = curves[i + 1];
            i += 2;
        }
        else if (curr == "h") {
            lastPoint.x += curves[i + 1];
            i += 2;
        }
        else if (curr == "H") {
            lastPoint.x = curves[i + 1];
            i += 2;
        }
        else if (curr == "m") {
            lastPoint.add(createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2])));
            i += 3;
        }
        else if (curr == "M") {
            lastPoint = createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2]));
            i += 3;
        }
        else if (curr == "l") {
            var p2 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2])));
            var step = dist(lastPoint.x, lastPoint.y, p2.x, p2.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, 1 - t).add(p5.Vector.mult(p2, t)));
            }
            lastPoint.set(p2);
            i += 3;
        }
        else if (curr == "L") {
            var p2 = createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2]));
            var step = dist(lastPoint.x, lastPoint.y, p2.x, p2.y);
            //print(step);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, 1 - t).add(p5.Vector.mult(p2, t)));
            }
            lastPoint.set(p2);
            i += 3;
        }
        else if (curr == "q") {
            var control = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2])));
            var p2 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 3]), parseFloat(curves[i + 4])));
            var step = dist(lastPoint.x, lastPoint.y, p2.x, p2.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t)).
                    add(p5.Vector.mult(control, 2 * t * (1 - t))).
                    add(p5.Vector.mult(p2, t * t)));
            }
            lastPoint.set(p2);
            i += 5;
        }
        else if (curr == "Q") {
            var control = createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2]));
            var p2 = createVector(parseFloat(curves[i + 3]), parseFloat(curves[i + 4]));
            var step = dist(lastPoint.x, lastPoint.y, p2.x, p2.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t)).
                    add(p5.Vector.mult(control, 2 * t * (1 - t))).
                    add(p5.Vector.mult(p2, t * t)));
            }
            lastPoint.set(p2);
            i += 5;
        }
        else if (curr == "t") {
            var lastControl = createVector(parseFloat(curves[i - 1]), parseFloat(curves[i - 2]));
            var lastEnd = createVector(parseFloat(curves[i - 3]), parseFloat(curves[i - 4]));
            var control = p5.Vector.add(lastPoint, p5.Vector.sub(lastEnd, lastControl));
            var p2 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2])));
            var step = dist(lastPoint.x, lastPoint.y, p2.x, p2.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t)).
                    add(p5.Vector.mult(control, 2 * t * (1 - t))).
                    add(p5.Vector.mult(p2, t * t)));
            }
            lastPoint.set(p2);
            i += 3;
        }
        else if (curr == "T") {
            var lastControl = createVector(parseFloat(curves[i - 1]), parseFloat(curves[i - 2]));
            var lastEnd = createVector(parseFloat(curves[i - 3]), parseFloat(curves[i - 4]));
            var control = p5.Vector.add(lastPoint, p5.Vector.sub(lastEnd, lastControl));
            var p2 = createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2]));
            var step = dist(lastPoint.x, lastPoint.y, p2.x, p2.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t)).
                    add(p5.Vector.mult(control, 2 * t * (1 - t))).
                    add(p5.Vector.mult(p2, t * t)));
            }
            lastPoint.set(p2);
            i += 3;
        }
        else if (curr == "c") {
            var p2 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2])));
            var p3 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 3]), parseFloat(curves[i + 4])));
            var p4 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 5]), parseFloat(curves[i + 6])));
            var step = dist(lastPoint.x, lastPoint.y, p4.x, p4.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t) * (1 - t)).
                    add(p5.Vector.mult(p2, 3 * t * (1 - t) * (1 - t))).
                    add(p5.Vector.mult(p3, 3 * t * t * (1 - t))).
                    add(p5.Vector.mult(p4, t * t * t)));
            }
            lastPoint.set(p4);
            i += 7;
        }
        else if (curr == "C") {
            var p2 = createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2]));
            var p3 = createVector(parseFloat(curves[i + 3]), parseFloat(curves[i + 4]));
            var p4 = createVector(parseFloat(curves[i + 5]), parseFloat(curves[i + 6]));
            var step = dist(lastPoint.x, lastPoint.y, p4.x, p4.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t) * (1 - t)).
                    add(p5.Vector.mult(p2, 3 * t * (1 - t) * (1 - t))).
                    add(p5.Vector.mult(p3, 3 * t * t * (1 - t))).
                    add(p5.Vector.mult(p4, t * t * t)));
            }
            lastPoint.set(p4);
            i += 7;
        }
        else if (curr == "s") {
            var lastControl = createVector(parseFloat(curves[i - 4]), parseFloat(curves[i - 3]));
            var lastEnd = createVector(parseFloat(curves[i - 2]), parseFloat(curves[i - 1]));
            var p2 = p5.Vector.add(lastPoint, p5.Vector.sub(lastEnd, lastControl));
            var p3 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2])));
            var p4 = p5.Vector.add(lastPoint, createVector(parseFloat(curves[i + 3]), parseFloat(curves[i + 4])));
            var step = dist(lastPoint.x, lastPoint.y, p4.x, p4.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t) * (1 - t)).
                    add(p5.Vector.mult(p2, 3 * t * (1 - t) * (1 - t))).
                    add(p5.Vector.mult(p3, 3 * t * t * (1 - t))).
                    add(p5.Vector.mult(p4, t * t * t)));
            }
            lastPoint.set(p4);
            i += 5;
        }
        else if (curr == "S") {
            var lastControl = createVector(parseFloat(curves[i - 4]), parseFloat(curves[i - 3]));
            var lastEnd = createVector(parseFloat(curves[i - 2]), parseFloat(curves[i - 1]));
            var p2 = p5.Vector.add(lastPoint, p5.Vector.sub(lastEnd, lastControl));
            var p3 = createVector(parseFloat(curves[i + 1]), parseFloat(curves[i + 2]));
            var p4 = createVector(parseFloat(curves[i + 3]), parseFloat(curves[i + 4]));
            var step = dist(lastPoint.x, lastPoint.y, p4.x, p4.y);
            step = 1 / max(30, step);
            for (var t = 0; t <= 1; t += step) {
                points.push(p5.Vector.mult(lastPoint, (1 - t) * (1 - t) * (1 - t)).
                    add(p5.Vector.mult(p2, 3 * t * (1 - t) * (1 - t))).
                    add(p5.Vector.mult(p3, 3 * t * t * (1 - t))).
                    add(p5.Vector.mult(p4, t * t * t)));
            }
            lastPoint.set(p4);
            i += 5;
        }
        else {
            console.log("Unknown command " + curr);
            i++;
        }
    }

}