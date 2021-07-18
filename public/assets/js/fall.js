document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var width = window.innerWidth;
  var height = window.innerHeight;
  const button = document.querySelector("#fallbtn");
  const divLeft = document.querySelector("#left");
  const divRight = document.querySelector("#right");
  const divBox = document.querySelector("#box");
  const divCountDown = document.querySelector("#count-down");
  const spanScores = document.querySelector("#scores");
  const time = document.querySelector(".time");
  const timer = document.querySelector(".timer");
  var seconds = 60;


  const arrayColor = ['rgb(31, 75, 126)',
    '#ff1302',
    'rgb(6, 122, 255)',
    'rgb(255, 17, 17)',
    'rgba(218, 218, 218, 0.521)',
    'rgb(255, 255, 255)',
    'rgb(31, 75, 126)',
    'rgb(31, 75, 126)']
  var countDown = 3;

  var count = 0;
  function Ball(width, height, arrayColor) {
    this.color = arrayColor[Math.floor(Math.random() * 10)];
    this.width = width;
    this.height = height;
    this.radius = Math.floor(Math.random() * 100) + 40;
    this.left = Math.floor(Math.random() * (this.width - this.radius));
    this.top = -this.radius;
    this.speedY = 8;
  }

  Ball.prototype.draw = function (ball) {
    body.appendChild(ball);
    ball.style.width = ball.style.height = this.radius + "px";
    ball.style.top = this.top + "px";
    ball.style.left = this.left + "px";
    ball.style.background = this.color;

    setTimeout(function () {
      ball.remove();
      clearInterval(move);
    }, 5500);

    let random = Math.floor(Math.random() * this.speedY);
    var move = setInterval(function () {
      var top = parseInt(ball.style.top.substr(0, ball.style.top.length - 2)) + random;
      ball.style.top = top + "px";
      if (top > window.innerHeight) {
        ball.remove();
        clearInterval(move);
      }
    }, 10);

    ball.addEventListener("mouseover", function () {
      ball.remove();
      count += 1;
      if (ball.style.background === 'rgba(218, 218, 218, 0.521)') {
        spanScores.innerHTML = count + 4;
        console.log("+5")
      }
      if (ball.style.background === '#ff1302') {
        spanScores.innerHTML = count - 5;
        console.log("-5")
      }
    });
  }

  function countdown() {
    points = 0;
    var time = setInterval(function () {
  
      seconds--;
      timer.innerHTML = seconds;
      if (seconds === 0) {
        clearInterval(time);
        seconds = 60;
        button.disabled = false;
        timer.innterHTMLhide();

      }
    }, 1000);
  }

  function createBall() {
    var ball = document.createElement("div");
    ball.classList.add("ball");
    var ballRand = new Ball(width, height, arrayColor);
    ballRand.draw(ball);
  }

  button.addEventListener("click", function () {
    divLeft.style.height = "0px";
    divRight.style.height = "0px";
    button.style.display = "none";
    countdown();
    setTimeout(function () {
      let runCount = setInterval(function () {
        divCountDown.innerHTML = countDown;
        countDown--;
        if (countDown < 0) {
          divCountDown.style.display = "none";
          clearInterval(runCount);
          count = 0;
          var startCreateBall = setInterval(createBall, 300);
          setTimeout(function () {
            clearInterval(startCreateBall);
            divBox.style.transform = "translate(-50%,-50%)";
            spanScores.innerHTML = count;
          }, 55000);
        }
      }, 1000);
    }, 1000);
  });
});