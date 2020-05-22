// var canvas;
// var context;
// // make sure position is multiple of 10
// var foodPos = [
//   Math.floor(Math.random()*100) * 10,
//   Math.floor(Math.random()*60) * 10
// ];
// var snakePos = [100,50];
// var snakeBody = [[100,50], [90,50], [80,50]];
// var direction = "ArrowRight";
// var speed;
// var block = 10;
// var over = false;
// var score = 0;
// var framesPerSecond = 1000/30;

// window.onload = () => {
//   canvas = document.getElementById('canvas');
//   context = canvas.getContext('2d');
//   setInterval(() =>{
//     drawObjects();
//     snakeAnimation();
//     eatFood();
//   }, framesPerSecond);
//   document.addEventListener('keydown', snakeDirection, false);
//   document.addEventListener('mousedown', () => {
//     if(over){
//       resetGame();
//     }
//   })
// }

// function drawObjects(){
//   // background
//   createRectangle(0, 0, canvas.width, canvas.height, 'rgb(40, 40, 40)');
//   // food
//   createRectangle(foodPos[0], foodPos[1], block, block, 'rgb(128, 0, 128)');
//   // render body
//   snakeBody.splice(0, 0, [snakePos[0], snakePos[1]])
//   for (var i = 0; i < snakeBody.length; i++) {
//     var body = snakeBody[i];
//     createRectangle(body[0], body[1], block, block, 'rgb(0,255,0)');
//   }
//   // render score
//   context.font = "25px sans-serif";
//   context.fillText("Score: " + score, 20, 30);

//   if(over){
//     displayMessage("Game Over");
//   }

// }

// // determine the snakes direction
// function snakeDirection(event){
//   console.log(snakeBody);
//   changeTo = event.key
//   console.log("direction: " + direction);
//   console.log("changeTo: " + changeTo);
//   switch (changeTo) {
//     case "ArrowDown":
//       if (direction != "ArrowUp"){
//         direction = "ArrowDown";
//       }
//       break;
//     case "ArrowUp":
//       if (direction != "ArrowDown"){
//         direction = "ArrowUp";
//       }
//       break;
//     case "ArrowLeft":
//       if (direction != "ArrowRight"){
//         direction = "ArrowLeft";
//       }
//       break;
//     case "ArrowRight":
//       if (direction != "ArrowLeft"){
//         direction = "ArrowRight";
//       }
//       break;
//     default:
//       console.log("No matching direction");
//       return;
//   }
// }

// // move snake in given direction
// function snakeAnimation(){
//   if (over) {
//     return;
//   }
//   console.log(direction);
//   switch (direction) {
//     case "ArrowDown":
//       snakePos[1] += 10;
//       break;
//     case "ArrowUp":
//       snakePos[1] -= 10;
//       break;
//     case "ArrowLeft":
//       snakePos[0] -= 10;
//       break;
//     case "ArrowRight":
//       snakePos[0] += 10;
//       break;
//     default:
//       console.log("Didn't animate");
//       return;
//   }
//   gameOver();
// }

// // check if the snake ate the food
// function eatFood(){
//   if(snakePos[0] == foodPos[0] && snakePos[1] == foodPos[1]){
//     foodPos = [
//       Math.floor(Math.random()*72) * 10,
//       Math.floor(Math.random()*48) * 10
//     ];
//     score += 10;
//   } else {
//     snakeBody.pop()
//   }
// }

// // check for game over scenario
// function gameOver(){
//   if(snakePos[0] > canvas.width - 10 || snakePos[0] < 0){
//     over = true;
//   } else if (snakePos[1] > canvas.height - 10 || snakePos[1] < 0) {
//     over = true;
//   }

//   for (var i = 3; i < snakeBody.length; i++) {
//     var body = snakeBody[i]
//     console.log("Body array: " + body);
//     console.log("Snake possition: " + snakePos);
//     if (snakePos[0] == body[0] && snakePos[1] == body[1]) {
//       over = true;
//     }
//   }
// }

// // reset the game
// function resetGame(){
//   foodPos = [
//     Math.floor(Math.random()*72) * 10,
//     Math.floor(Math.random()*48) * 10
//   ];
//   snakePos = [100,50];
//   snakeBody = [[100,50], [90,50], [80,50]];
//   over = false;
//   score = 0;
//   direction = "ArrowRight";
// }

// // faster block creation
// function createRectangle(posX, posY, width, height, color){
//   context.fillStyle = color;
//   context.fillRect(posX, posY, width, height);
// }

// // display end of game message
// function displayMessage(message){
//   context.fillStyle = "rgb(0,255,0)"
//   context.font = "50px sans-serif";
//   context.fillText(message, 250, 250);
//   context.font = "25px sans-serif";
//   context.fillText("Click to continue", 275, 300)
// }

/*   NEON Snake*/
var canvas, ctx, context;
var score = 0;
var scores = [];
window.onload = function () {
  alert("This game works only on keyboard equipped devices.");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  document.querySelector(".value").innerHTML = this.score;
  // render X times per second
  var x = 8;
  setInterval(draw, 1000 / x);
};
// game world
var gridSize = (tileSize = 20); // 20 x 20 = 400
var nextX = (nextY = 0);
// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);
// apple
var appleX = (appleY = 15);
// draw
function draw() {
  // move snake in next pos
  snakeX += nextX;
  snakeY += nextY;
  // snake over game world?
  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }
  //snake bite apple?
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    score++;
    document.querySelector(".value").innerHTML = this.score;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }
  //paint background
  ctx.fillStyle = "rgb(36, 36, 36)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paint snake
  // Create gradient
  // Create gradient
  grd = ctx.createLinearGradient(0.0, 150.0, 300.0, 150.0);

  // Add colors
  grd.addColorStop(0.0, "rgba(247, 149, 51, 1.000)");
  grd.addColorStop(0.151, "rgba(243, 112, 85, 1.000)");
  grd.addColorStop(0.311, "rgba(239, 78, 123, 1.000)");
  grd.addColorStop(0.462, "rgba(161, 102, 171, 1.000)");
  grd.addColorStop(0.621, "rgba(80, 115, 184, 1.000)");
  grd.addColorStop(0.748, "rgba(16, 152, 173, 1.000)");
  grd.addColorStop(0.875, "rgba(7, 179, 155, 1.000)");
  grd.addColorStop(1.0, "rgba(111, 186, 130, 1.000)");
  ctx.fillStyle = grd;
  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );
    //snake bites it's tail?
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      scores.push(score);
      score = 0;
      document.querySelector(".value").innerHTML = this.score;
      console.log(scores[0]);
      tailSize = defaultTailSize;
    }
  }
  // paint apple
  ctx.fillStyle = grd;
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}
// input
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}
