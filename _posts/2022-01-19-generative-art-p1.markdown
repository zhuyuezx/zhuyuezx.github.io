---
layout: post
title:  "Generative Arts based on Processing Part1"
date:   2022-01-19 23:44:00
category: Coding
image: /images/image-3.jpg
---
**First to mention, this part is purely based on tutorials of [thedotisblack creative coding](https://www.youtube.com/c/thedotisblack), and you can find many more interesting content in his channel**.

Still, I made some customization to his design and here I will show my works based on him.

I want to say thank you to this youtuber, and he showed me unlimited potential of Processing.

Then, let's move on to the works!
### Curve with Oscillating Stroke Weight
![Ep2](/post-images/Generative-Art-p1/Ep2.gif)

### Dynamic [Vera Molnar](https://en.wikipedia.org/wiki/Vera_Moln%C3%A1r) Alogrithm
![Ep3](/post-images/Generative-Art-p1/Ep3.gif)

### Effect Generated by Recursive Overlapping Rotating Squares  
<iframe width="100%" height="600"
  src="https://www.youtube.com/embed/v_kb8EiopAI">
</iframe>

### Crossing Rotation Systems
<iframe width="100%" height="600"
  src="https://www.youtube.com/embed/4XROzokoXuU">
</iframe>

## Corresponding Processing Code

### Curve with Oscillating Stroke Weight
{% highlight java %}
float sw, alpha;
float yStep = 10; 
float arcSize = 450;

void setup() {
  size(960, 720);
}

void draw() {
  background(238);
  mouseX = constrain(mouseX, 10, width);
  mouseY = constrain(mouseY, 10, height);
  noFill();
  stroke(20);

  for (float y = arcSize / 3; y < height - arcSize / 3; y += yStep) {

    sw = map(sin(radians(y + alpha)), -1, 1, 2, yStep);
    strokeWeight(sw);
    for (float x1 = arcSize / 2; x1 < width + arcSize; x1 += arcSize) {
      arc(x1, y, arcSize / 2, arcSize / 2, 0, PI);
    }

    sw = map(sin(radians(y - alpha)), -1, 1, 2, yStep);
    strokeWeight(sw);
    for (float x2 = 0; x2 < width + arcSize; x2 += arcSize) {
      arc(x2, y, arcSize / 2, arcSize / 2, PI, TWO_PI);
    }
  }
  alpha++;
}
{% endhighlight %}

### Dynamic [Vera Molnar](https://en.wikipedia.org/wiki/Vera_Moln%C3%A1r) Alogrithm
{% highlight java %}
color[] colArray = {color(255, 255, 255), color(200, 5, 20), color(55, 188, 25), color(15, 25, 250), 
  color(125, 235, 250), color(240, 245, 15), color(160, 60, 235)};
int grid = 100;
int margin = 100;
int squareCount = 2 * margin;

void setup() {
  size(960, 720);
}

public void draw() {
  background(15, 20, 30);
  stroke(255);
  float size = (float)(grid * 0.6);

  for (int i = 2 *margin; i < width - margin && i <= squareCount; i += grid) {
    for (int j = 2 * margin; j < height - margin && j <= squareCount; j += grid) {
      int colArrayNum = (int)random(7);
      stroke(colArray[colArrayNum]);
      strokeWeight(3);
      generateBlock(7, size, i, j);
    }
  }
  delay((int)random(200, 500));
  squareCount += grid;
  squareCount = constrain(squareCount, 0, width);
}

public void generateBlock(int overLay, float size, int i, int j) {
  for (int num = 0; num < overLay; num++) {
    float x1 = -random(size); float y1 = -random(size);
    float x2 = random(size); float y2 = -random(size);
    float x3 = random(size); float y3 = random(size);
    float x4 = -random(size); float y4 = random(size);

    strokeWeight(3);
    pushMatrix();
    translate(i, j);
    quad(x1, y1, x2, y2, x3, y3, x4, y4);
    popMatrix();
  }
}
{% endhighlight %}

### Effect Generated by Recursive Overlapping Rotating Squares
{% highlight java %}
float angle;
float angle2 = 0;

public void settings() {
  size(960, 720);
}

public void draw() {
  background(0, 15, 30);
  rectMode(CENTER);
  stroke(0, 15, 30);
  strokeWeight(25);

  translate((float) width / 2, (float) height / 2);
  float scaleVar = map(sin(radians(angle2)), -1, 1, 0.75, 5);
  scale(scaleVar);

  for (int i = 0; i < 150; i++) {
    fill(i * 10, 255 - i * 25, 255 - i * 10);
    scale((float) 0.95);
    rotate(radians(angle));
    rect(0, 0, 600, 600);
  }
  angle += 0.1;
  angle2 += 1;
}
{% endhighlight %}

### Crossing Rotation Systems
{% highlight java %}
float angle;

public void settings() {
  size(960, 720);
}

public void draw() {
  noStroke();
  fill(color(0, 15, 30));

  background(255);
  float x = width;
  float dia = 100;
  int num = 150;

  translate((float) width / 2, (float) height / 2);
  for (float a = 0; a < 360; a += 22.5) {
    rotate(radians(a));
    pushMatrix();
    for (int i = 0; i < num; i++) {
      scale((float) 0.95);
      rotate(radians(angle));
      ellipse(x, 0, dia, dia);
    }
    popMatrix();

    pushMatrix();
    for (int i = 0; i < num; i++) {
      scale((float) 0.95);
      rotate(-radians(angle));
      ellipse(x, 0, dia, dia);
    }
    popMatrix();
  }
  angle += 0.05;
}
{% endhighlight %}