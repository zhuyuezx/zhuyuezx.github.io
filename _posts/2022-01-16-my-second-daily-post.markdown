---
layout: post
title:  "Intersting Cardioid Shape from Plate Reflection"
date:   2022-01-16 03:29:00
category: Daily
image: /images/image-16.jpg
---
Last week I was sorting tableware and plates washed by washing machine, and the lighting rays from the light on top of me was reflected by plate's outer contour and form the shape of cardoid - this was really the first time I noticed such obvious pattern. This reminds me of [Mathologer's tutorial video](https://www.youtube.com/watch?v=qhbuKbxJsk8&t=0s) I saw on youtube, and also the [coding train tutorial](https://www.youtube.com/watch?v=bl3nc_a1nvs&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=190) on how to create cardioid-related shapes by connecting equidistant points around circumference.

### I took a picture for this phenomenon.
### It's a little bit vague, but you can clearly see the shape
![plate cardioid](/post-images/Daily-Cardioid/1.png)

### What causes this phenomenon?

Mathologer's explaination is straighforward and easy-to-understand, so I use his reasonings here:
1. Suppose there's one point light source on an arbitary position of plate's circumference, and there exists a beam of light that start from the source that travel across the plate and reflected by wall of the plate. Its reflection would hit another point on the circumference accordingly.
2. As the tangent line of the reflection is one radius of the plate's circle, we know that the travelling distance of incident light is the same as that of the outgoing light. Then, we can transfrom this into radian explaination. As incident light travels same amount of radians as the outgoing light beam, we can say that the outgoing light travels twice the distance of incident light, with multiplier "2".
3. Then, we can return back to the mechanism of using connecting lines to form cardioid. **We pick $$n$$ equidistance points on the circumference**, and then ,in clockwise sequence, mark them from 1, 2, 3, ..., to n. After that, we connect 1 with 2, 2 with 4, 3 with 6, ..., k with 2k (if 2k exceed n, take the remainder). In this case, if $$n$$ is large enough, the overall shape would resemble cardioid. 
4. Finally, think of the light source and reflection also simulation method, w**e can see that they are indeed the same concept. There are just infinite many points on the plate circumference and form the cardiod with multiplier 2**. Moreover, if you have a mug with straight vertical walls around, you would see much more obvious shape under light, **just like this**:
![mug](/post-images/Daily-Cardioid/2.jpg)

### Code Simulation

After that, I referenced to coding train's tutorial video and made my own colorful dynamic cardioid builder - pretty cool I think.
<iframe width="100%" height="600"
  src="https://www.youtube.com/embed/l_T-HNBRddA">
</iframe>

### Processing Code
{% highlight java %}
float r;
float factor = 0;

public void setup() {
  fullScreen();
}

public void draw() {
  colorMode(HSB);
  background(0);
  r = (float) height / 2 - 16;
  int total = 360;
  factor += 0.025;

  String timeMsg = "Time Table Rate: " + (int) factor;
  textSize(20);
  text(timeMsg, 40, 40);

  translate(width / 2, height / 2);
  stroke(255, 150);
  strokeWeight(2);
  noFill();
  ellipse(0, 0, r * 2, r * 2);

  strokeWeight(2);
  for (int i = 0; i < total; i++) {
    float rad = i * TWO_PI / total;
    PVector a = getVector(i, total);
    PVector b = getVector(i * factor, total);

    stroke(map(i, 0, total, 255, 0), 160, 250, 100);
    line(a.x, a.y, b.x, b.y);
  }
}

public PVector getVector(float index, float total) {
  float angle = map(index % total, 0, total, 0, TWO_PI);
  PVector v = PVector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}
{% endhighlight %}