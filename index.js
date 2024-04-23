// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdheight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImage;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdheight,
};

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //pipe speed
let velocityY = 0; //bird speed
let gravity = 0.2;

let gameOver = false;
let score = 0;

window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  context = board.getContext("2d");

  // draw bird

  //load images
  birdImage = new Image();
  birdImage.src = "./flappybird.png";
  birdImage.onload = () => {
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  requestAnimationFrame(update);
  setInterval(() => {
    if (gameOver) {
      return;
    }
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;
    let toppipe = {
      img: topPipeImg,
      x: pipeX,
      y: randomPipeY,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };

    pipeArray.push(toppipe);

    let bottompipe = {
      img: bottomPipeImg,
      x: pipeX,
      y: randomPipeY + pipeHeight + openingSpace,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };
    pipeArray.push(bottompipe);
  }, 800);
  document.addEventListener("keydown", (e) => {
    if (e.code == "Space" || e.code == "ArrowUp") {
      //jump
      velocityY = -6;

      //reset Game
      if (gameOver) {
        reset();
      }
    }
  });
  document.addEventListener("click", (e) => {
    //jump
    velocityY = -6;

    //reset Game
    if (gameOver) {
      reset();
    }
  });
  document.addEventListener("touchstart", (e) => {
    //jump
    velocityY = -6;

    //reset Game
    if (gameOver) {
      reset();
    }
  });
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  //bird
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true;
  }

  //pipes
  for (let index = 0; index < pipeArray.length; index++) {
    const element = pipeArray[index];
    element.x += velocityX;
    context.drawImage(
      element.img,
      element.x,
      element.y,
      element.width,
      element.height
    );

    if (!element.passed && bird.x > element.x + pipeWidth) {
      score += 0.5;
      element.passed = true;
    }

    if (detectCollision(bird, element)) {
      gameOver = true;
    }
  }

  //clear Pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift(); //remove first element
  }

  // Score
  context.fillStyle = "white";
  context.font = "45px sans-seriff";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("Game Over", 10, boardHeight / 2);
  }
}

function reset() {
  bird.y = birdY;
  pipeArray = [];
  score = 0;
  gameOver = false;
}
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
