---
layout: post
title:  "Interpret .svg Then Draw Using Fourier Transform"
date:   2022-05-16 19:18:00
category: Coding
image: /images/image-17.jpg
---

After watching [3blue1brown's video](https://www.youtube.com/watch?v=r6sGWTCMz2k), I decided to make my own version using p5.js, which I can put it on my website.

This is all based on this simple equation, where you can get the detail in video through link uphead.

![equation](/post-images/Fourier-Drawing/equation1.jpg)

Feel free to try yourself, **and you can find the source 
code at [my github site](https://github.com/zhuyuezx/Processing_Tutorial/tree/master/src/main/java/P5_JS%20project/Fourier_drawing).**

<a class="js_code_link" href="/js_code/Fourier_drawing_English/index.html" style="font-size:300%">{{ "*link to the interactive interface (English)*" | escape }}</a>

<a class="js_code_link" href="/js_code/Fourier_drawing_Chinese/index.html" style="font-size:300%">{{ "*link to the interactive interface (Chinese)*" | escape }}</a>

**Here is the core code for determining vectors in different levels:**

{% highlight java %}
int numVectors;
List<PVector> points; // store sampled points
List<PVector> vectors; // store vectors that rotate CCW
List<PVector> nVectors; // store vectors that rotate CW

public void setVectors() {
    for (int n = 0; n < numVectors; n++) {
        PVector total = new PVector(0, 0);
        for (float t = 0; t <= 1; t += 1.0 / (float) points.size()) {
            PVector v = points.get((int) (t * points.size()));
            float r = sqrt(v.x * v.x + v.y * v.y);
            float theta = atan2(v.y , v.x) - n * TWO_PI * t;
            total.add(new PVector(r * cos(theta), r * sin(theta)));
        }
        total.div(points.size());
        vectors.add(total);
    }
    nVectors.add(new PVector(0, 0));
    for (int n = 1; n < numVectors; n++) {
        PVector total = new PVector(0, 0);
        for (float t = 0; t <= 1; t += 1.0 / (float) points.size()) {
            PVector v = points.get((int) (t * points.size()));
            float r = sqrt(v.x * v.x + v.y * v.y);
            float theta = atan2(v.y, v.x) + n * TWO_PI * t;
            total.add(new PVector(r * cos(theta), r * sin(theta)));
        }
        total.div(points.size());
        nVectors.add(total);
    }
}

// rotate vector in each round
public void rotateVectors() {
    for (int n = 0; n < numVectors; n++) {
        vectors.get(n).rotate(n * rotateSpeed);
        nVectors.get(n).rotate(-n * rotateSpeed);
    }
}
{% endhighlight %}