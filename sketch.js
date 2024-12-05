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
 * snake game but reverse, the snake has to avoid being "caught" by the food
 * 
 * variation 3
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */
//"use strict";

const numStars = 100;

/*let foods = [
  {
    x: 100,
    y: 125,
    size: 10,
    buzziness: 2
  },
  {
    x: 160,
    y: 170,
    size: 14,
    buzziness: 4
  },
  {
    x: 180,
    y: 50,
    size: 30,
    buzziness: 20
  }
]; */

//declaring the vars for the grid
let columns; let rows;
let size = 20; //change this later to 20
let grid = [];//var for the grid
//the food
//let food;

//creates the canvas
function setup() {
  createCanvas(640, 580);

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
}

/*function createFood() {
  //generate a random food
  let food = {
    x: random(0, width),
    y: random(0, height),
    size: random(2, 10),
    buzziness: random(2, 8)
  };
  return food;
} */

//adding all the pieces together
function draw() {
  background(0);
  drawGrid();
  /* for (let food of foods) {
     //moveFood(food);
     drawFood(food);
   }*/


  //added fro the for-loop code 
  for (let i = 0; i < numStars; i++) {
    drawStar();
  }
  //location of the food
  //grid[food.x][food.y] = -1;
}


/*function moveFood(food) {
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
*/
//the stars...or maybe snow??? no. they are stars
function drawStar() {
  const x = random(0, width);
  const y = random(0, height);
  const diameter = random(2, 5);

  push();
  fill(255);
  noStroke();
  ellipse(x, y, diameter);
  pop();

}
//this creates the grid
function drawGrid() {
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows; r++) {
      if (grid[c][r] == 0) {
        fill(0);

      }
      rect(c * size, r * size, size, size);
    }
  }
}

/*function keyPressed() {
  //the food starts to move
  const food = moveFood();
  foods.push(moveFood);
}*/