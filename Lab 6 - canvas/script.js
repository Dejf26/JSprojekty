fpscounter = document.getElementById("fps");
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let ballCountInput = document.getElementById('ballCount');
let connectionDistance = 100;
let lineWidth = 2;
let constantSpeed = 2;
let balls = [];
let animationId;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createBall() {
  return {
    x: getRandomInt(20, canvas.width - 20),
    y: getRandomInt(20, canvas.height - 20),
    radius: 10,
    dx: constantSpeed * (Math.random() < 0.5 ? 1 : -1),
    dy: constantSpeed * (Math.random() < 0.5 ? 1 : -1),
  };
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

function drawLine(ball1, ball2) {
  ctx.beginPath();
  ctx.moveTo(ball1.x, ball1.y);
  ctx.lineTo(ball2.x, ball2.y);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
    }

    drawBall(ball);

    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const distance = Math.sqrt((ball.x - otherBall.x)**2 + (ball.y - otherBall.y)**2);

      if (distance < connectionDistance * 2) {
        drawLine(ball, otherBall);
      }
    }
  }

  animationId = requestAnimationFrame(update);
}

function startAnimation() {
  const count = parseInt(ballCountInput.value) || 10;
  balls = []; 
  for (let i = 0; i < count; i++) {
    const ball = createBall();
    balls.push(ball);
  }

  cancelAnimationFrame(animationId); 
  update();
}

function resetAnimation() {
  balls = []; 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cancelAnimationFrame(animationId); 
}

function changeConnectionDistance(value) {
  connectionDistance = value;
}

function changeLineWidth(value) {
  lineWidth = value;
}

let frameCount = 0;

function updateFrame() {
  frameCount++;
  requestAnimationFrame(updateFrame);
}

updateFrame();

setInterval(() => {
  let fps = frameCount;
  frameCount = 0;
  fpscounter.innerHTML = fps + " fps";
}, 1000);