$(document).ready(function(){

  var canvas = document.getElementById('myCanvas');
  //stores the cavas element the game will be built on
  var ctx = canvas.getContext('2d');
  //stores the context that the canvas element is 2D so I can paint on it
  var ballRadius = 10;
  //defines radius for easier access
  var x = canvas.width/2;
  var y = canvas.height-30;
  //defining the ball coordinates
  var dx = 2;
  var dy = -2;
  //these variables are being used to change the ball location
  var paddleHeight = 10;
  var paddleWidth = 75;
  //defines the paddle height and width
  var paddleX = (canvas.width-paddleWidth)/2;
  var paddleY = canvas.height-paddleHeight;
  //defines where the paddle is located on the canvas
  var rightPressed = false;
  var leftPressed = false;
  //placeholder variables defining that the keys at default are not pressed

  $(document).on('keydown', keyDownHandler);
  $(document).on('keyup', keyUpHandler);
  //listeners for key presses and releases

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  //function that draws the paddle onto the canvas

  function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
  }
  //function that draws the ball .arc defines the circle (width, height, radius, start and end angel)

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    paddleBoundaries();
    collisionDetection();
    x += dx;
    y += dy;
  }
  //resets the canvas and defines ball and paddle location

  function collisionDetection(){
      if(x + dx > canvas.width - ballRadius  || x + dx < ballRadius) {
          dx = -dx;
      }

      if(y + dy < ballRadius) {
          dy = -dy;
      }
      else if(y + dy > canvas.height-ballRadius) {
          if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          }
          if(y + dy > canvas.height + 12) {
             alert("GAME OVER");
             document.location.reload();
             }
      }
  }

  //checks if the ball location is greater or less than any of the canvas borders. If its less than the bottom border,
  //trigger a game reset. If

  function keyDownHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = true;
      }
      else if(e.keyCode == 37) {
          leftPressed = true;
      }
  }

  function keyUpHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = false;
      }
      else if(e.keyCode == 37) {
          leftPressed = false;
      }
  }
//these functions allow movement where keycode 39 of pressing the right arrow sets the var to true,
//releasing it sets it to false. the same is true for the keycode 37 of the left arrow

  function paddleBoundaries(){

      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
      }
      else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
  }
//this if else statement sets paddle positioning when the vars change due to key press. the second half of the
//statement indicates that the paddle cannot go beyond the canvas border limits.

  setInterval(draw, 10);
  //calling setInterval on draw makes it so that the ball will be called every 10ms
  //until we stop it.


});
