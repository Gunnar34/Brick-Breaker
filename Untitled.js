$(document).ready(function(){
  setDraw();
  var canvas = document.getElementById('myCanvas');
  //stores the canvas element the game will be built on
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
  var upPressed = false;
  //placeholder variables defining that the keys at default are not pressed
  var brickRowCount = 3;
  var brickColumnCount = 5;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;
  //brick field variables
  var score = 0;
  //var for storing score

  var bricks = [];
    brickLoop();
  //empty array and two for loops that hold and change the brick cloumns and rows

  $(document).on('keydown', keyDownHandler);
  $(document).on('keyup', keyUpHandler);
  //listeners for key presses and releases

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "rgb(0, 150, 255)";
    ctx.fill();
    ctx.closePath();
  }
  //function that draws the paddle onto the canvas

  function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "rgb(0, 200, 255)";
      ctx.fill();
      ctx.closePath();
  }
  //function that draws the ball .arc defines the circle (width, height, radius, start and end angel)

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }
  //self explanatory function

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    paddleMovementAndBoundaries();
    collisionDetection();
    drawScore();
    x += dx;
    y += dy;
  }
  //resets the canvas and calls all functions to draw location and detect collision

  function drawBricks() {
      for(c=0; c<brickColumnCount; c++) {
          for(r=0; r<brickRowCount; r++) {
              if(bricks[c][r].status == 1) {
              var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
              //brick dimensions
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#0095DD";
              ctx.fill();
              ctx.closePath();
              }
          }
      }
  }
  //draws the bricks by looping through the array defined above

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
      for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    console.log(b);
                    if(score == brickRowCount*brickColumnCount) {
                      alert('next Level');
                      ctx.canvas.height += 150;
                      ctx.canvas.width += 150;
                      for(c=0; c<brickColumnCount; c++) {
                        for(r=0; r<brickRowCount; r++) {
                              console.log(b);
                              b.status = 1;
                          }
                        }
                      brickRowCount += 1;
                      brickColumnCount += 2;
                      brickLoop();
                      setDraw();
                      score = 0;
                      paddleX = (canvas.width-paddleWidth)/2;
                      paddleY = canvas.height-paddleHeight;
                      x = canvas.width/2;
                      y = canvas.height-30;

                    }
                  }
              }
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

  function paddleMovementAndBoundaries(){

      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
      }
      else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
  }
  //this if else statement sets paddle positioning when the vars change due to key press. the second half of the
  //statement indicates that the paddle cannot go beyond the canvas border limits.
var intervalID;
function setDraw(){
  if (intervalID) {
    console.log('interval cleared');
        clearInterval(intervalID);
    }
    intervalID = setInterval(draw, 10);
}

  //calling setInterval on draw makes it so that the ball will be called every 10ms
  //until we stop it.

  function brickLoop(){
    for(c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(r=0; r<brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

});
