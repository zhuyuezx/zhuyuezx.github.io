---
layout: post
title:  "Simple Particle Collision Gravity System"
date:   2022-01-18 03:09:00
category: Coding
image: /images/image-6.jpg
---
This simple particle collsion and Gravity system is completed in 2021 summer. 
**The idea started from my motivation to build a physics engine**, but since that I cannot reach the level of building an engine and limited time, I just made the minimal and core program. Also, this only supports circle collisions.

**Here is the final effect. Also, by modifying coefficients of the code, you can alter the size, position, and amount of the obstacle, particles**, and also adding some cool effects, and here is an illustration:
![trailing effect](/post-images/Collision-System/1.gif)

## How does the code work
The core system is the collision system, and I use the vector calculation to model the motion of particles.
1. Each particle has attribute for speed in 2D, and represented in vector form
2. When one particle detects collision with another particle or an obstacle (distance is smaller than the radius added together), it transform the speed vector from the normal coordinate to the coordinate systemt that use the connecting line of two objects as unit vector for "x".
3. Then the program calculate the transformed vector (where I matrix calculation in linear algebra in the code). 
    By physics property, we know that the perpendicular sub-vector would not be affected and we only need to calculate the sum of two sub-vectors pointing towards each other (or to the same direction) on the connecting line. 
4. Finally, we transformed the resulting new speed vector back to the normal coordinate system, and the outcomes are the speed after collision.
5. Yet, there are many details not mentioned here due to the limitations of computer calculation. I will provide the code and you may check all the details.

Aside to text explaination, **here is the corresponding code for algorithm** (written in Processing based on Java):
{% highlight java %}
PVector[] ballCollision(PVector pos, PVector speed, PVector other_pos, PVector other_speed){
  float delta_x = other_pos.x - pos.x; float delta_y = other_pos.y - pos.y;
  // Step2 here
  float normal = sqrt(delta_x * delta_x + delta_y * delta_y); 
  PVector transform = new PVector(speed.x * delta_x / normal + speed.y * delta_y / normal, 
                                  speed.x * delta_y / normal - speed.y * delta_x / normal);
  PVector transform_other = new PVector(other_speed.x * delta_x / normal + other_speed.y * delta_y / normal,
                                        other_speed.x * delta_y / normal - other_speed.y * delta_x / normal);
  // Step3 here
  PVector new_speed = new PVector((transform.x + transform_other.x) / 2, transform.y); 
  PVector new_speed_other = new PVector((transform.x + transform_other.x) / 2, transform_other.y);
  
  PVector[] result = new PVector[2];
  // Step4 here
  result[0] = new PVector(new_speed.x * delta_x / normal + new_speed.y * delta_y / normal, 
                          new_speed.x * delta_y / normal - new_speed.y * delta_x / normal);
  result[1] = new PVector(new_speed_other.x * delta_x / normal + new_speed_other.y * delta_y / normal,
                                  new_speed_other.x * delta_y / normal - new_speed_other.y * delta_x / normal);
                                  
  
  return result;
}
{% endhighlight %}

# Other parts 
* Check Collision Algorithm:
{% highlight java %}
void checkCollision(ball other){
    float dist_sqr = (pos.x - other.pos.x) * (pos.x - other.pos.x) + (pos.y - other.pos.y) * (pos.y - other.pos.y);
    
    PVector[] result = new PVector[2];
    PVector[] pos_adjustment = new PVector[2];
    
    if (dist_sqr < (radius / 2) * 2 * (other.radius / 2) * 2){
      result = ballCollision(pos, speed, other.pos, other.speed);
      speed = result[0];
      other.speed = result[1];
      
      pos_adjustment = collision_pos_adjustment(pos, other.pos, radius, other.radius);
      pos = pos_adjustment[0];
      other.pos = pos_adjustment[1];
    }
  }
{% endhighlight %}

* Obstacle Collision Algorithm:
{% highlight java %}
PVector obstacle_collision_pos_adjustment(PVector pos, PVector other_pos, float radius, float other_radius){
  //println("pos.x: " + pos.x + " pos.y: " + pos.y + " other_pos.x: " + other_pos.x + " other_pos.y: " + other_pos.y);
  float dist = sqrt((pos.x - other_pos.x) * (pos.x - other_pos.x) + (pos.y - other_pos.y) * (pos.y - other_pos.y));
  float adjust_len = (radius / 2 + other_radius / 2 - dist);
  adjust_len ++;
  float k = (pos.y - other_pos.y) / (pos.x - other_pos.x);
  //println("dist: " + dist + " adjust_len: " + adjust_len + " k: " + k);
  PVector result;
  if (pos.x < other_pos.x){
    //print(1);
    result = new PVector(pos.x - adjust_len / sqrt(1 + k * k), pos.y - k * adjust_len / sqrt(1 + k * k));
  } 
  else{
    //print(2);
    result = new PVector(pos.x + adjust_len / sqrt(1 + k * k), pos.y + k * adjust_len / sqrt(1 + k * k));
  }
  
  return result;
}
{% endhighlight %}
When I wrote this program in 2021 summer, I was still a novice about Java coding, so I think my codes can be greatly optimized and extended if there's more time. I might finish that if I had more time.

**Also, the code for this post is way more longer than any other, so you can follow [this link](https://github.com/zhuyuezx/Processing_Tutorial/tree/master/src/main/java/proc/gravity_obbject_collision) to check the full details on github!**