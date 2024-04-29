let board,context,birdImage,topPipeImg,bottomPipeImg,boardWidth=360,boardHeight=640,birdWidth=34,birdheight=24,birdX=boardWidth/8,birdY=boardHeight/2,bird={x:birdX,y:birdY,width:birdWidth,height:birdheight},pipeArray=[],pipeWidth=64,pipeHeight=512,pipeX=boardWidth,pipeY=0,velocityX=-2,velocityY=0,gravity=.2,gameOver=!1,_dfkj=0;function update(){if(requestAnimationFrame(update),!gameOver){context.clearRect(0,0,board.width,board.height),velocityY+=gravity,bird.y=Math.max(bird.y+velocityY,0),context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height),bird.y>board.height&&(gameOver=!0);for(let e=0;e<pipeArray.length;e++){const i=pipeArray[e];i.x+=velocityX,context.drawImage(i.img,i.x,i.y,i.width,i.height),!i.passed&&bird.x>i.x+pipeWidth&&(_dfkj+=.5,i.passed=!0),detectCollision(bird,i)&&(gameOver=!0)}for(;pipeArray.length>0&&pipeArray[0].x<-pipeWidth;)pipeArray.shift();context.fillStyle="white",context.font="45px sans-seriff",context.fillText(_dfkj,5,45),gameOver&&context.fillText("Game Over",10,boardHeight/2)}}function reset(){bird.y=birdY,pipeArray=[],_dfkj=0,gameOver=!1}function detectCollision(e,i){return e.x<i.x+i.width&&e.x+e.width>i.x&&e.y<i.y+i.height&&e.y+e.height>i.y}window.onload=(()=>{(board=document.getElementById("board")).height=boardHeight,context=board.getContext("2d"),(birdImage=new Image).src="./flappybird.png",birdImage.onload=(()=>{context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height)}),(topPipeImg=new Image).src="./toppipe.png",(bottomPipeImg=new Image).src="./bottompipe.png",requestAnimationFrame(update),setInterval(()=>{if(gameOver)return;let e=pipeY-pipeHeight/4-Math.random()*(pipeHeight/2),i=board.height/4,t={img:topPipeImg,x:pipeX,y:e,width:pipeWidth,height:pipeHeight,passed:!1};pipeArray.push(t);let r={img:bottomPipeImg,x:pipeX,y:e+pipeHeight+i,width:pipeWidth,height:pipeHeight,passed:!1};pipeArray.push(r)},1500),document.addEventListener("keydown",e=>{"Space"!=e.code&&"ArrowUp"!=e.code||(velocityY=-6,gameOver&&reset())}),document.addEventListener("click",e=>{velocityY=-6,gameOver&&reset()}),document.addEventListener("touchstart",e=>{velocityY=-6,gameOver&&reset()})});