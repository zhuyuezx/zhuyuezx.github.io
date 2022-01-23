---
layout: post
title:  "Generative Arts based on Processing Part2"
date:   2022-01-19 23:44:00
category: Coding
image: /images/image-9.jpg
---
**Same as part1, the codes and ideas are based on tutorials of [thedotisblack creative coding](https://www.youtube.com/c/thedotisblack), and you can find many more interesting content in his channel**.

Still, I made some customization to his design and here I will show my works based on him.

I want to say thank you to this youtuber, and he showed me unlimited potential of Processing.

### 3D Rotation Splitting Grid 
<iframe width="100%" height="646"
  src="https://www.youtube.com/embed/oCQHQv5qmsY">
</iframe>

### Recursive Nervous Square Tunnel Effect
![Ep7](/post-images/Generative-Art-p2/Ep7.gif)

### Moire Pattern Visualization
![Ep21](/post-images/Generative-Art-p2/Ep21.gif)

## Corresponding Processing Code
### 3D Rotation Splitting Grid 
{% highlight java %}
int grid = 400;
float angle;
int mx = 80, my = 135;
float scaleVar = 1;
int resetCounter = 1;

public void setup() {
  size(1920, 1070, P3D);
  rectMode(CENTER);
  fill(255, 0, 0);
  noStroke();

  mx = (width - floor((float) width / (grid * 2)) * grid * 2) / 2;
  my = (height - floor((float) height / (grid * 2)) * grid * 2) / 2;
}

public void draw() {
  background(15, 20, 30);
  translate((float) width / 2, (float) height / 2);
  scaleVar = lerp(scaleVar, map(angle, 0, 180, 
    (float) (resetCounter - 0.7), resetCounter), (float)0.1);
  scale(scaleVar);

  for (int i = mx + grid - width / 2; i < width / 2 - mx; i += grid * 2) {
    for (int j = my + grid - height / 2; j < height / 2 - my; j += grid * 2) {
      pushMatrix();
      translate(i, j);
      // top left
      pushMatrix(); 
      translate((float) -grid / 2, (float) -grid / 2);
      rotateX(radians(angle)); rotateY(-radians(angle));
      rect(0, 0, grid, grid);
      popMatrix();
      // top right
      pushMatrix();
      translate((float) grid / 2, (float) -grid / 2);
      rotateY(radians(angle)); rotateX(-radians(angle));
      rect(0, 0, grid, grid);
      popMatrix();
      // bottom left
      pushMatrix();
      translate((float) -grid / 2, (float) grid / 2);
      rotateY(radians(angle)); rotateX(radians(angle));
      rect(0, 0, grid, grid);
      popMatrix();
      // bottom right
      pushMatrix();
      translate((float) grid / 2, (float) grid / 2);
      rotateX(-radians(angle)); rotateY(-radians(angle));
      rect(0, 0, grid, grid);
      popMatrix();

      popMatrix();
    }
  }
  angle++;

  if (angle >= 180) {
    grid /= 2;
    if (grid <= 10) {
      grid = 400;
      resetCounter = 0;
    }
    angle = 0;
    resetCounter += 1;
  }
}
{% endhighlight %}

### Recursive Nervous Square Tunnel Effect
{% highlight java %}
float x, y;
float dia = (float) (1000 / 0.92);
float sw = 5;
NervousSquare nervousSquare;

public void setup() {
  size(960, 720);
  x = (float) width / 2;
  y = (float) height / 2;
  nervousSquare = new NervousSquare(x, y, 0, dia, sw);
}

public void draw() {
  background(40);
  fill(40, 40, 40);
  noStroke();
  stroke(40);
  rectMode(CENTER);
  strokeWeight(sw);

  background(238, 238, 238);
  nervousSquare.display();
  nervousSquare.update(width, height, 1000);
}

public class NervousSquare {
  float x, y;
  int layer;
  private final NervousSquare inner;
  float dia;
  float sw;

  public NervousSquare(float x, float y, int layer, float dia, float sw) {
    this.x = x;
    this.y = y;
    this.layer = layer + 1;
    this.dia = (float) (dia * 0.92);
    this.sw = (float) (sw * 0.92);
    if (layer < 100) {
      this.inner = new NervousSquare(this.x, this.y, this.layer, this.dia, this.sw);
    } else {
      this.inner = null;
    }
  }

  public void display() {
    strokeWeight(sw);
    float colorIndex = (float) (layer * 1.2);
    fill(colorIndex * 8, 255 - colorIndex * 20, 255 - colorIndex * 8);
    rect(x, y, dia, dia);
    if (inner != null) inner.display();
  }

  public void update(float xpos, float ypos, float dia_) {
    x += random(-sw, sw);
    y += random(-sw, sw);

    if (layer == 1) {
      x = (float)width /2;
      y = (float)height /2;
    } else {
      x = PApplet.constrain(x, xpos - dia_ / 2 + dia / 2, xpos + dia_ / 2 - dia / 2);
      y = PApplet.constrain(y, ypos - dia_ / 2 + dia / 2, ypos + dia_ / 2 - dia / 2);
    }
    if (inner != null) inner.update(x, y, dia);
  }
}
{% endhighlight %}

### Moire Pattern Visualization
{% highlight java %}
float xStep = 20;
float xStepCounter = 1;
float angle = 10;

public void setup() {
  size(960, 720);
  stroke(0);
  strokeCap(CORNER);
  strokeWeight(xStep / 2);
}

public void draw() {
  background(255);
  xStep = map(xStepCounter, 0, width, width, 15);
  if (xStepCounter < width) xStepCounter+=2;

  strokeWeight(xStep / 2);
  translate((float) width / 2, (float) height / 2);
  for (int x = -width / 2; x < width / 2; x += xStep) {
    line(x, (float) -height / 2, x, (float) height / 2);
  }

  rotate(radians(angle));
  for (int x = -width / 2; x < width / 2; x += xStep) {
    line(x, (float) -height / 2, x, (float) height / 2);
  }
  if (xStepCounter >= width) 
    angle += 0.1;
}
{% endhighlight %}