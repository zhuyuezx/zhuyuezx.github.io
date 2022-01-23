---
layout: post
title:  "Tower of Hanoi and Recursion"
date:   2022-01-18 01:57:00
category: Coding
image: /images/image-1.jpg
---
Tower of Hanoi is a device made up of three rods and several disks with different diameters.
While we initially put all disks at the leftmost rod, the smallest at the top, while largest at the bottom.

## Rule of the Puzzle

Then, the objective of the puzzle is to move the entire stack to the last rod, **not violating following rules**, and you can refer to this illustration *(source: wikipedia - Tower of Hanoi)*

![gif illustration](/post-images/Tower-of-Hanoi/1.gif)
1. Only one disk may be moved at a time.
2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.
3. No disk may be placed on top of a disk that is smaller than it.

## Recursive Solution to Hanoi Tower

Interestingly, **the Tower of Hanoi is a classic example of using recusion solution**. 

Although the procedure count will grow exponentially with the increase in disk count, the logic of solving it is extremely straighforward. 

We can split into two cases, the base case and the recursive case. 

So, when we want to move "n" disks from one rod to another rod following the rules, there are two cases:
* When there are zero disk, so n = 0, The puzzle is automatically solved
* When n > 0, calling the not mentioned disk is the "third rod". We need to do three steps:
    1. move "n - 1" disks from starting rod to third rod
    2. move the biggest disk on the bottom to the destination
    3. move the remaining rod from third rod to destination
    
Yes, although this is somehow counterintuitive, by following these steps recursively, any kind of Hanoi Tower with three rods can be solved. 

**To illustrate this, so I used Processing to construct a program that follows such rule**.

## Code Implementation

**First, here is the ultimate effect**. Due to some mysterious bug, disks start from first and end at the second:
<iframe width="100%" height="574"
  src="https://www.youtube.com/embed/qxi6klso03Q">
</iframe>

* The disk class, which records relative information for a single disk:
{% highlight java %}
class disk{
  private int number;//original weight
  private int position;//bottom smallest, depend on pillar
  private int index;
  private float xpos, ypos, wid, hei;
  private float r, g, b;
  
  disk(int i, int total_disk){
    r = random(255);
    g = random(255);
    b = random(255);
    number = total_disk - i;
    index = i;
    position = total_disk - i;
    xpos = width / 5 - 75 + 7.5 * i;
    ypos = height * 2 / 3 - 30 * i;
    wid = 150 - 15 * i;
    hei = 30;
    fill(r, g, b);
    stroke(50);
    rect(xpos, ypos, wid, hei) ;
  }

}
{% endhighlight %}

* The class for three rods, which helps to record the moving of the disks and illustrate the process:

{% highlight java %}
class pegs{
  private ArrayList<disk> pillar1;
  private ArrayList<disk> pillar2;
  private ArrayList<disk> pillar3;
  
  pegs(){
    fill(0);
    noStroke();
    rect(0, height * 2 / 3, width, height / 3);
    rect(width / 5 - 10, height / 3 - 100, 20, height / 3 + 100);
    rect(width / 2 - 10, height / 3 - 100, 20, height / 3 + 100);
    rect(width * 4 / 5 - 10, height / 3 - 100, 20, height / 3 + 100);
    pillar1 = new ArrayList<disk>();
    pillar2 = new ArrayList<disk>();
    pillar3 = new ArrayList<disk>();
  }
  
  void initialize(int diskNum){
    for (int i = 1; i <= diskNum; i++){
      pillar1.add(new disk(i, diskNum));
    }
  }
  
  void moveDisk(int startPeg, int endPeg){
    disk moved;
    float original;
    ArrayList<disk> destination;
    if (startPeg == 1){
      moved = pillar1.remove(pillar1.size() - 1);
      original = width / 5;
    }
    else if (startPeg == 2){
      moved = pillar2.remove(pillar2.size() - 1);
      original = width / 2;
    }
    else {
      moved = pillar3.remove(pillar3.size() - 1);
      original = width * 4 / 5;
    }
    
    fill(255);
    strokeWeight(2);
    stroke(255);
    rect(moved.xpos - 1, moved.ypos - 1, moved.wid + 2, moved.hei);
    stroke(50);
    line(moved.xpos - 1, moved.ypos + moved.hei, moved.xpos + moved.wid + 2, moved.ypos + moved.hei);
    
    float xpos;
    if (endPeg == 1){
      pillar1.add(moved);
      xpos = width / 5;
      destination = pillar1;
    }
    else if (endPeg == 2){
      pillar2.add(moved);
      xpos = width / 2;
      destination = pillar2;
    }
    else {
      pillar3.add(moved);
      xpos = width * 4 / 5;
      destination = pillar3;
    }
    
    fill(0);
    noStroke();
    rect(original - 10, moved.ypos - 2, 20, 32);
    fill(moved.r, moved.g, moved.b);
    stroke(50);
    moved.xpos =  xpos - 75 + 7.5 * moved.index;
    moved.ypos = height * 2 / 3 - 30 * destination.size();
    rect(moved.xpos, moved.ypos, moved.wid, moved.hei);
  }
}
{% endhighlight %}

* The main class that initialize the settings and operates the moving (The code is not optimized since I first produce the moving sequence and then perform them in another section. Time limited, I may optimize it later):
{% highlight java %}
pegs setting;
String seq = determine_sequence(8, 1, 2);
int i = 0; 

void setup(){
  size(1080, 640);
  background(255);
  strokeWeight(2);
  //println(seq);
  setting = new pegs();
  setting.initialize(8);
  //setting.moveDisk(1, 3);
}

void draw(){
  delay(100);
  if (i < seq.length() / 2){
    String start = seq.substring(2 * i, 2 * i + 1);
    String end = seq.substring(2 * i + 1, 2 * i + 2);
    setting.moveDisk(int(start), int(end));
    i++;
  }
}

String determine_sequence(int numDisk, int startPeg, int endPeg){
  if (numDisk == 0){
    return "";
  }
  else{
    int thirdPeg = 9 - startPeg - endPeg;
    return determine_sequence(numDisk - 1, startPeg, thirdPeg) + 
    Integer.toString(startPeg) + Integer.toString(endPeg) + 
    determine_sequence(numDisk - 1, thirdPeg, endPeg);
  }
}
{% endhighlight %}
