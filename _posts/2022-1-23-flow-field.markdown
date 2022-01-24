---
layout: post
title:  "Flowfield Art Based on Perlin Noise"
date:   2022-01-23 06:30:00
category: Coding
image: /images/image-11.jpg
---
Perlin noise is a pretty handy algorithm that can create many interesting generative arts, just like what I'll introduce in this post. So, let me first introduce what is perlin noise.

## What is Perlin Noise
Perlin noise is a type of gradient noise developed by Ken Perlin. It can produce random values with successiveness that resembles natural noise. 

One example is to use perlin noise to generate terrain. Here is the 3D terrain created using perlin noise, and also Minecraft use such technique to generate terrain with randomness. Moreover, that's why you can input specific seed to get same terrain - same coefficient will always create the same graph.
![3D](/post-images/Flowfield/1.png)

**The algorithm can be separated into three steps, and I will use the 2D illustration on [WikiPedia](https://en.wikipedia.org/wiki/Perlin_noise) to explain:**
1. Define an n-dimensional grid where each grid intersection has associated with it a fixed random n-dimensional unit-length gradient vector, except in the one dimensional case where the gradients are random scalars between -1 and 1.
![how1](/post-images/Flowfield/how1.png)

2. **Take the dot product between its gradient vector and the offset vector to the candidate point**. This dot product will be zero if the candidate point is exactly at the grid corner.

    For a point in a two-dimensional grid, this will require the computation of 4 offset vectors and dot products, while in three dimensions it will require 8 offset vectors and 8 dot products. In general, the algorithm has $$O(2^{n})$$ complexity, where $$n$$ is the number of dimensions.
![how2](/post-images/Flowfield/how2.png)

3. Interpolate between $2^n$ points with function that has zero first derivative at the $$2^n$$ grid nodes. **It's okay to just use linear interpolation, or smoothstep function for more natural performance.**
![how3](/post-images/Flowfield/how3.png)

## Applying FLowfield and Particle System

### Here is the tutorial video, where most following details are included
<iframe width="100%" height="600"
  src="https://youtube.com/embed/0LJURVf6kMI">
</iframe>

With perlin noise, we can get random 2D vector for each pixel value. Then, we can consider these vectors as **force that particles would receive at those points**, and this is exactly the idea of flowfield. 

### Here is the an arbitary flowfield I created:
You can think of those vectors as seaweed that drifts alongwith invisible water flows, where we can then add particles in.

![flowfield](/post-images/Flowfield/2.gif)

### Finally, we can add particles in and draw their traces. 
By applying HSB color settings according to their x postions, and adjusting all aspects of parameters like colorRange, interval length, particle size, particle amount... I can create interesting graphs with no limit!
### Increasing Flowfield Variation
![flowfield1](/post-images/Flowfield/screen-1.jpg)
### Increasing Color Range
![flowfield2](/post-images/Flowfield/screen-2.jpg)
### Decreasing the Flowfield Force
![flowfield3](/post-images/Flowfield/screen-3.jpg)

### Here is the complete code:
{% highlight java %}
float angle = 0;
float strength = 0.005;
float noiseValue;
float speed = 100;
float angleMag = 1;
float colorFreq = 1.5;
float transparency = 150;

ArrayList<Particle> particles;

void setup() {
  fullScreen();
  background(0);
  colorMode(HSB);
  particles = new ArrayList<Particle>();
}

void draw() {
  for (Particle p : particles) p.update();

  if (particles.size() < 10000) {
    for (int i = 0; i < 10; i++)
      particles.add(new Particle(random(width), random(height)));
  }
}

class Particle {

  PVector pos;
  PVector vel;

  Particle(float x, float y) {
    pos = new PVector(x, y);
    vel = new PVector(0, 0);
  }

  void update() {
    if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) 
      return;

    noiseValue = noise(pos.x * strength, pos.y * strength);
    vel = PVector.fromAngle(noiseValue * angleMag * TWO_PI);
    vel.setMag(speed);
    pos.add(PVector.div(vel, frameRate));
    display();
  }

  void display() {
    fill((255 * noiseValue * colorFreq) % 255, 255, 255, transparency);
    noStroke();
    ellipse(pos.x, pos.y, 0.5, 0.5);
  }
}
{% endhighlight %}