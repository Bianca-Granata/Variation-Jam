/** snake game variation
 * 
 * Bianca Granata
 * 
 * the snake game variation is similar to the typical game but with a twist
 * 
 * 
 * variation 1
 * The "food" in which the snake has to eat moves, therefore the snake has to catch it
 * 
 * variation 2
 * snake game but by clicking the mouse, it allows to generates more food 
 * 
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */
//"use strict";
//creating the scoreboard


const numStars = 100;

//creating the scoreboard
var scoreboard = 0;

let foods = [
  {
    x: 400,
    y: 125,
    size: 50,
    buzziness: 40
  },
  {
    x: 500,
    y: 300,
    size: 14,
    buzziness: 4
  },
  {
    x: 180,
    y: 50,
    size: 30,
    buzziness: 20
  }
];

//declaring the vars for the grid
let columns; let rows;
let size = 20; //change this later to 20
let grid = [];//var for the grid
let snakeHead; //the snake's head
let movement; //the snake's movement
let gameOver;
let lenght;
//creates the canvas
function setup() {
  createCanvas(640, 580);
  frameRate(5);
  //the creates the hidden background grid for the snake
  rows = height / size;
  columns = width / size;
  //creates the array
  for (let c = 0; c < columns; c++) {
    grid[c] = [];
    for (let r = 0; r < rows; r++) {
      grid[c][r] = 0;
    }
  }
  //this part I referenced  the youtube videos 
  snakeHead = createVector(int(random(0, columns)),
    int(random(0, rows)));
  movement = createVector(0, 0);
}

function createFood() {
  //generate a random food
  let food = {
    x: random(0, width),
    y: random(0, height),
    size: random(2, 10),
    buzziness: random(2, 8)
  };
  return food;
}

//adding all the pieces together
function draw() {
  background(0);
  drawGrid();
  removeTail();
  textSize(15);
  text(scoreboard, 350, 40);

  checkSnakeHeadFoodOverlap();//making sure the snake eats

  snakeHead.add(movement);
  grid[snakeHead.x][snakeHead.y] = 1;
  //adding the game over
  if (gameOver == false) {
    grid[snakeHead.x][snakeHead.y] = 1;
  }
  //drawSnake();
  for (let food of foods) {
    moveFood(food);
    drawFood(food);
  }

  //added fro the for-loop code 
  for (let i = 0; i < numStars; i++) {
    drawStar();
  }
  //location of the food
  //grid[food.x][food.y] = -1;
}


function moveFood(food) {
  food.x += random(-food.buzziness, food.buzziness);
  food.y += random(-food.buzziness, food.buzziness);
}

function drawFood(food) {
  push();
  noStroke();
  fill(255, 0, 68);
  ellipse(food.x, food.y, food.size);
  pop();
}
//to remove the tail of the snake when it moves
function removeTail() {
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      if (grid[c][r] > 0) {
        grid[c][r] -= 1;
      }
    }
  }
}
//attempt at making the snake move
function drawSnake() {
  push();
  noStroke();
  fill(60, 0, 255);
  size: (50);
  triangle(mouseX, mouseY);// DONT FORGOT TO ADD THE SIZE
  pop();
}
//the stars...or maybe snow??? no. they are stars
function drawStar() {
  const x = random(0, width);
  const y = random(0, height);
  const diameter = random(2, 5);

  push();
  fill(0);
  noStroke();
  ellipse(x, y, diameter);
  pop();

}
//this creates the grid
function drawGrid() {
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      if (grid[c][r] == 0) {
        fill(255);
      } else {
        fill(41, 0, 245);
      }
      rect(c * size, r * size, size, size);
    }
  }
}

function mousePressed() {
  //create more food
  const moveFood = createFood();
  foods.push(moveFood);
}
//moving the snake using the keys pressed
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    movement = createVector(-1, 0);
  } else if (keyCode == RIGHT_ARROW) {
    movement = createVector(1, 0);
  } else if (keyCode == UP_ARROW) {
    movement = createVector(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    movement = createVector(0, 1);
  }
}
//making the snake EAT IT'S FOOD.
function checkSnakeHeadFoodOverlap() {
  // Get distance from snake to the food/ pink circles
  const d = dist(snakeHead.x, snakeHead.y, foods.x, foods.y);
  // Check if it's an overlap
  // Check if it's an overlap
  const eaten = (d < snakeHead.size / 2 + foods.size / 2);
  if (eaten) {
    //each time the snake eats a point is added to the scoreboard
    scoreboard = scoreboard + 1;
    // Reset the food
    resetFood();
  }
}