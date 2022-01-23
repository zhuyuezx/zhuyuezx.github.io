---
layout: post
title:  "Game of Life by Processing"
date:   2022-01-17 16:27:24 -0500
category: Coding
image: /images/image-2.jpg
video: https://www.youtube.com/embed/EBoWzKMOGew
---
Game of life is a celluar automaton devised by mathematician John Horton Conway in 1970. 
By applying static rules on certain initial state, the game will evolve itself and produce dynamic yet complicated patterns.
This is a **"glider factory"** in Game of Life.

!["glider factory" in Game of Life](/post-images/Game-of-Life/1.gif)

This is a interesting pattern you can created in Game of Life.

![interesting pattern](/post-images/Game-of-Life/2.gif)

## Rule for Game of Life
Still, its rule is quite simple. As the game is played on a grid of square cells, it follows such rules:
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The machine is turing complete and has much more potential that it seems to be. 
I initialily saw related content on youtube and was greatly astonished by it. 

Thus, **I decided to use Processing to create my own version of the game.**

## Processing Code

I use java IDE instead of the Processing terminal for this code. Still, this can be transfromed to processing terminal by deleting the PApplet part:

**And here is effect of my first version code, and you can also get the code on my github repo "Processing Tutorial".**
<iframe width="100%" height="574"
  src="https://www.youtube.com/embed/EBoWzKMOGew">
</iframe>

The rpogram enable user to input initial value by using left and right mouse button, while **left click is to color it balck and right click is to make it white**. Then, by **pressing "Space" key you can start and stop the game process**. When in the drawing mode, you can alter cells as you like and then press space key to keep on, and vice versa.
{% highlight java %}
import processing.core.PApplet;

public class operator extends PApplet {
    grid game_of_life;
    boolean[][] drawBoard;
    boolean initialize = false;
    int size = 20;
    boolean drawFinish = false;

    public static void main(String[] args) {
        PApplet.main(operator.class.getName());
    }

    public void settings() {
//        size(1920, 1080);
        fullScreen();
    }

    public void draw() {
        if (!initialize) {
            //noStroke();
            stroke(50);
            strokeWeight(2);

            drawBoard = new boolean[height / size][width / size];
            game_of_life = new grid();
            //game_of_life.initialize();
            initialize = true;
        }
        if (!drawFinish) {
            if (mousePressed)
                game_of_life.change(mouseY / size, mouseX / size);
            if (keyPressed && key == ' ')
                drawFinish = true;

            game_of_life.display();
            return;
        }
        game_of_life.update();
        game_of_life.display();
        if (keyPressed && key == ' ')
            drawFinish = false;
    }

    private class grid {
        private boolean[][] cells;
        private boolean[][] next;
        int loc1 = width / size;
        int loc2 = height / size;

        public grid() {
            cells = new boolean[loc2][loc1];
            next = new boolean[loc2][loc1];
        }

        public void initialize() {
            for (int i = 0; i < loc2; i++) {
                for (int j = 0; j < loc1; j++) {
                    if (random(1) < 0.2)
                        cells[i][j] = true;
                }
            }
        }

        public void change(int i, int j) {
            if (mouseButton == LEFT) cells[i][j] = true;
            if (mouseButton == RIGHT) cells[i][j] = false;
        }

        public void update() {
            for (int i = 0; i < loc2; i++) {
                for (int j = 0; j < loc1; j++) {
                    int b_count = 0;
                    b_count += getIndex(i - 1, j - 1) ? 1 : 0;
                    b_count += getIndex(i - 1, j) ? 1 : 0;
                    b_count += getIndex(i - 1, j + 1) ? 1 : 0;
                    b_count += getIndex(i, j - 1) ? 1 : 0;
                    b_count += getIndex(i, j + 1) ? 1 : 0;
                    b_count += getIndex(i + 1, j - 1) ? 1 : 0;
                    b_count += getIndex(i + 1, j) ? 1 : 0;
                    b_count += getIndex(i + 1, j + 1) ? 1 : 0;

                    if (b_count < 2) {
                        assignBool(i, j, false);
                    } else if (b_count == 2) {
                        assignBool(i, j, cells[i][j]);
                    } else assignBool(i, j, b_count == 3);
                }
            }

            for (int i = 0; i < loc2; i++) {
                for (int j = 0; j < loc1; j++) {
                    cells[i][j] = next[i][j];
                    next[i][j] = false;
                }
            }
        }

        public void display() {
            for (int i = 0; i < loc2; i++) {
                for (int j = 0; j < loc1; j++) {
                    if (cells[i][j]) {
                        fill(0);
                    } else {
                        fill(255);
                    }
                    rect(size * j, size * i, size, size);
                }
            }
        }

        public boolean getIndex(int i, int j) {
            return cells[(loc2 + i) % loc2][(loc1 + j) % loc1];
        }

        public void assignBool(int i, int j, boolean assign) {
            next[(loc2 + i) % loc2][(loc1 + j) % loc1] = assign;
        }
    }
}
{% endhighlight %}
