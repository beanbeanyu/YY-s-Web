let currentScene = 1;
let Img1, Img2, Img3, Img4, Img8;
let lineY = 140;
let circle;
let Fish1 = [], boom = [];
let textColor;
let fishCaughtCount = 0;
function preload() {
  Img1 = loadImage('background.jpeg');
  Img2 = loadImage('Mouse.png');
  Img3 = loadImage('fisher.png');
  Img4 = loadImage('fish1.png');
  Img8 = loadImage('boom.png');
  Img9 = loadImage('sun.png');
  Img10=loadImage('Cloud.png');
}

function setup() {
  createCanvas(400, 600);
  textColor = color(2, 62, 128);
  fishCaughtCount = 0;
  resetGame();
}
  function resetGame() {
  lineY = 140;
  Fish1 = [];
  boom = [];

  //fishing line
  circle = new Circle(mouseX, lineY, 10);
// fish1
  for (let i = 0; i < 20; i++) {
    let x = random(0, width); 
    let speedX = random(0.6,2.4); 
    let y = random(150, 550); 
    Fish1.push({ x: x, y: y, speedX: speedX }); 
  }
  // boom
  for (let i = 0; i < 20; i++) {
    let x = random(0, width); 
    let speedX3 = random(0.8,2.9); 
    let y = random(158, 550); 
    boom.push({ x: x, y: y, speedX3: speedX3 }); 
  }
}

function draw() {
  background(220);
  if (currentScene === 1) {
    scene1();
  } else if (currentScene === 2) {
    scene2(); 
  } else if (currentScene === 3) {
    scene3(); 
  }
  else if (currentScene === 4) { 
    gameOverScreen();
  }
  else if (currentScene === 5) {
    scene5(); 
  }
}
//homepage
function scene1() {
  image(Img1, 0, 0, 400, 600);
  // change start color
  if (mouseX > 160 && mouseX < 240 &&  mouseY > 476 && mouseY < 506) {
    textColor = color(255, 0, 0);
  } else {
   textColor = color(2, 62, 128);
  }
// Start button
  push();
  textSize(24);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(142, 202, 229);
  ellipse(162, 491, 30);
  ellipse(240, 491, 30);
  rect(160, 476, 80, 30);
  fill(textColor);
  text("Start", 200, 493);
//change intro color, mouse on
  if (mouseX > 160 && mouseX < 240 && mouseY > 541 && mouseY < 571) {
    textColor = color(255, 0, 0);
  } else {
    textColor = color(2, 62, 128);
  }
// Intro button
  fill(142, 202, 229);
  ellipse(162, 556, 30);
  ellipse(240, 556, 30);
  rect(160, 541, 80, 30);
  fill(textColor);
  text("Intro", 200, 557);
pop();
  // Mouse image
  image(Img2, mouseX - 35, mouseY - 35, 60, 100);
}


// Fishing game scene
function scene2() {
  background(120, 200, 250);
//Sun
  image(Img9,100,20,180,280);
// Water surface
  noStroke();
  fill(20, 60, 120);
  rect(0, 150, 400, 480);
// Fisherman
  image(Img3, mouseX - 40, 110, 80, 120);
//line up and down
  if (keyIsPressed) {
    if (key === 'w' || key === 'W') {
      lineY = max(lineY - 2, 140); 
    }
    if (key === 's' || key === 'S') {
      lineY = min(lineY + 2, 550); 
    }
  }
circle.update(mouseX - 40, lineY); 
  circle.display(); 
  //line
stroke(0);
  strokeWeight(1);
  line(circle.x, 140, circle.x, lineY); 
  line(mouseX - 40, 140, mouseX + 6, 140); 
// Fish collision
  for (let i = Fish1.length - 1; i >= 0; i--) {
    let fish = Fish1[i];
    image(Img4, fish.x, fish.y, 40, 60);
    fish.x += fish.speedX;
    //move
    if (fish.x > width) {
      fish.x = -30;
      fish.y = random(150, 560);
    }
//catch fish, ,fish miss,number up, =15,win
    if (collides(circle, fish, 40, 60)) {
      Fish1.splice(i, 1);
      fishCaughtCount++;
      console.log("Fish collision");
      if (fishCaughtCount >= 15) {
        currentScene = 5;
        return;
      }
    }
  }

  // Boom collision
  for (let i = boom.length - 1; i >= 0; i--) {
    let Boom = boom[i];
    image(Img8, Boom.x, Boom.y, 40, 60);
    Boom.x += Boom.speedX3;
//move
    if (Boom.x > width) {
      Boom.x = -50; 
      Boom.y = random(150, 560);
    }
//collides, restart
if (collides(circle, Boom, 40, 60)) {
      console.log("Boom collision! Restarting game.");
      currentScene = 4; 
   fishCaughtCount = 0;
      return;   
}
  }
}


//intro
function scene3(){
  background(135,206,250);
  let waveHeight = 10;
  let waveLength = 5;
  let waveSpeed = 0.5;
  let timewave = frameCount * waveSpeed;
 ///wave
noStroke();
  fill(0, 102, 204);
  beginShape();
  for (let a = 0; a <= width; a += 5) {
    let b = 120 + sin((a + timewave) * 0.05) * waveHeight;
    vertex(a, b);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
//fisher
  let fisherX = 305;
  let fisherY = 90 + sin((fisherX + timewave) * -0.05) * waveHeight;
  image(Img3, fisherX, fisherY, 80, 120);
//rules
  textSize(18);
  fill(135, 206, 250);
  push();
  fill(255);
  text("Go! Fishing", 135, 200);
  pop();
  text("Game Name:", 20, 200);
  text("Intro: Players need to catch ___ fish and ", 20, 250);
  push();
  fill(255);
  text("all", 260, 250);
  pop();
  text("be careful _____________________while fishing!", 20, 300);
  push();
  fill(255);
  text("don't catch a bomb", 108, 300);
  pop();
  text("How to Play: Use the ________ to control.", 20, 350);
  push();
  fill(255);
  text("Mouse", 208, 350);
  pop();
  text("character movement, __ and __ to control", 20, 400);
  push();
  fill(255);
  text("w", 210, 400);
  text("s", 270, 400);
  pop();
  text("the fishing line direction, and press ______ ", 20, 450);
  push();
  fill(255);
  text("space", 325, 450);
  pop();
  text(" to cast the fishing line again.", 20, 500);
//buttom back
  ellipse(162, 556, 30);
  ellipse(240, 556, 30);
  rect(160, 541, 80, 30);
   //change back color
   if(mouseX > 138 && mouseX < 276 &&
        mouseY > 526 && mouseY < 576){
   textColor = color(255,0,0);
     }
  else{
     textColor = color(2, 62, 128);
     }
  push();
  fill(textColor)
  textAlign(CENTER, CENTER);
   textSize(24);
  text("Back",200, 557)
  pop();
      //mouse
      image(Img2,mouseX-35,mouseY-35,60,100)
}


//gameover
function gameOverScreen() {
  push();
    background(0); 
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 20);
    textSize(16);
    text("Press 'R' to Restart", width / 2, height / 2 + 20);
  pop();
}


//win
function scene5() {
  background(0); 
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win the Game!", width / 2, height / 2 - 20);
}


//switch scenes,mouse click
function mousePressed() {
  switch (currentScene) {
    case 1:
      if (mouseX > 166 && mouseX < 246 && mouseY > 476 && mouseY < 506) {
        currentScene = 2;
      } else if (mouseX > 166 && mouseX < 246 && mouseY > 541 && mouseY < 571) {
        currentScene = 3;
      }
      break;
    case 2:
      break;
    case 3:
      if (mouseX > 138 && mouseX < 276 && mouseY > 526 && mouseY < 576) {
        currentScene = 1;
      }
      break;
  }
}

//collision
function collides(circle, object, w, h) {
  let closestX = constrain(circle.x, object.x, object.x + w);
  let closestY = constrain(circle.y, object.y, object.y + h);
  
  let distanceX = circle.x - closestX;
  let distanceY = circle.y - closestY;

  return (distanceX * distanceX + distanceY * distanceY) < (circle.radius * circle.radius);
}

//circle clss
class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    stroke(1);
    fill(0);
    ellipse(this.x, this.y, this.radius * 0.2);
  }
}


//keypress
function keyPressed() {
  if (key === ' ') {
    lineY = 140; 
  }
  if (currentScene === 4 && (key === 'r' || key === 'R')) {
   resetGame();
      currentScene = 1;
   }
}