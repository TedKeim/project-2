document.addEventListener("DOMContentLoaded",function(){
    var body = document.body;
    var width = window.innerWidth;
    var height = window.innerHeight;
    const button = document.querySelector("#fallbtn");
    const divLeft = document.querySelector("#left");
    const divRight = document.querySelector("#right");
    const divBox = document.querySelector("#box");
    const divCountDown = document.querySelector("#count-down");
    const spanScores = document.querySelector("#scores");
    
    
    const arrayColor = ["#011C41","#F2E8C3","#F5A219","#F27612","#DA2A04","#FF77A6","#FFC7B2","#A0FEFE","#B6FFBC","#FFBBFF", "#7fff00"];
    var  countDown = 3;
   
    var count = 0;
    function Ball(width, height, arrayColor){
      this.color = arrayColor[Math.floor(Math.random()*10)];
      this.width = width;
      this.height = height;
      this.radius = Math.floor(Math.random()*100) + 40;
      this.left = Math.floor(Math.random() * (this.width - this.radius)) ;
      this.top = -this.radius; 
      this.speedY = 3;
    }
    Ball.prototype.draw = function(ball){
      body.appendChild(ball);
      ball.style.width = ball.style.height = this.radius + "px";
      ball.style.top = this.top + "px";
      ball.style.left = this.left + "px";
      ball.style.background = this.color;
      
      setTimeout(function(){
        ball.remove();
        clearInterval(move);
      },5500);
      
      let random = Math.floor(Math.random()* this.speedY);
      var move = setInterval(function(){
          var top = parseInt( ball.style.top.substr(0,ball.style.top.length - 2) ) + random;
          ball.style.top = top + "px";
          if(top > window.innerHeight){
            ball.remove();
            clearInterval(move);
          }
       },10);
      
       ball.addEventListener("click",function(){
         ball.remove();
         count+=1;
       });
    }
  
    function createBall(){
      var ball = document.createElement("div");
      ball.classList.add("ball");
      var ballRand = new Ball(width,height,arrayColor);
      ballRand.draw(ball);  
    }
 
    button.addEventListener("click",function(){
      divLeft.style.height = "0px";
      divRight.style.height = "0px";
      button.style.display = "none";
      setTimeout(function(){
        let runCount = setInterval(function(){
          divCountDown.innerHTML = countDown;
          countDown--;
          if(countDown < 0){
            divCountDown.style.display = "none";
            clearInterval(runCount);
            count = 0;
            var startCreateBall = setInterval(createBall,300);
            setTimeout(function(){
              clearInterval(startCreateBall);
              divBox.style.transform = "translate(-50%,-50%)";
              spanScores.innerHTML = count;
            },20000);
          }
        },1000);
      },1000);
    });
  });