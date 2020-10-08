var trex, gamestate, path, ground, obstaclesGroup, cloudsGroup, score, restart, gameover, quo

var trex_running, groundImage, obstacle6, obstacle5, obstacle4, obstacle2, obstacle3, obstacle1, cloudsImage, gameoverImage, restartImage

function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage = loadImage("ground2.png")
  obstacle6 = loadImage("obstacle6.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle1 = loadImage("obstacle1.png")
  cloudsImage = loadImage("cloud.png")
  gameoverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 400);
  //the trex is the main object in the trex run 
  trex = createSprite(30,350,1,1);
  trex.addAnimation("trex",trex_running);

  gamestate = "start";

  path = createSprite(200,355,400,1);

  //the line is the ground the trex runs on
  ground = createSprite(200,350,1000,1);

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  score = 0;

  restart = createSprite(300,270,20,20);
  gameover = createSprite(300,240,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.5;
  gameover.visible = false;
  restart.visible = false;
  restart.addImage(restartImage);
  restart.scale = 0.35;
}

function draw() {
  background("white");
  textSize(18);
  
  if(gamestate == "start"){
    trex.pause();
    trex.y = 350;
    text("score : " + score ,500,200);
  }
  
  if(gamestate == "start" && keyDown("space")){
    gamestate = "play";
  }
  
  if(gamestate == "play"){
    trex.play();
    //giving the trext the ability to jump
    if(keyDown("space") && trex.y >= 331){
      trex.velocityY = -15;
      //playSound("jump.mp3");
    }
    ground.velocityX = -8;
    spawnClouds();
    spawnObstacles();
    score = score + Math.round(getFrameRate()/60);
    
    //giving the trex gravity
    trex.velocityY = trex.velocityY + 1;
    
    if(score % 100 == 0){
    //playSound("checkPoint.mp3");
    }
    
    var quo = Math.round(score/200);
    if(quo%2 != 0){
      background("white");
      fill("black");
      text("score : " + score ,500,200);
    }
    if(quo%2 == 0){
      background("black");
      fill("white");
      text("score : " + score ,500 ,200);
    }
  }

  if(obstaclesGroup.isTouching(trex)){
    gamestate = "end";
    //playSound("die.mp3", false);
    //trex.velocityY = -15;
  }
  
  if(gamestate == "end"){
    ground.velocityX = 0;
    trex.pause();
    //trex.velocityY = 0;
    //trex.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible =true;
    text("score : " + score ,500,200);
  }
  
  if(mousePressedOver(restart)){
      gamestate = "start";
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      gameover.visible = false;
      restart.visible = false;
      score = 0;
    }

  //giving the trex an animation to show  that its running
  //trex.setCollider("rectangle",0,0,280,70);
  trex.setCollider("circle",0,0,40);
  
  //reducing the trex size
  trex.scale = 0.5;
  
  //giving the ground animation to shows its changing
  ground.addImage(groundImage);
  
  //making the line unlimited
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  //console.log('tavishi'+randomNumber(1,10)+'khairwar');
  
  //making sure the trex stays on the line
  trex.collide(path);
  
  path.visible = false;
  
  //displaying all the sprites on the screen
  drawSprites();
}

function spawnClouds(){
  if (frameCount%60 == 0){
   clouds = createSprite(600,Math.round(random(230,320))); 
   clouds.addImage(cloudsImage);
   clouds.velocityX = -4;
   clouds.scale = 0.75;
   //console.log(trex.depth);
   //console.log(clouds.depth);
   trex.depth = clouds.depth + 1;
   clouds.lifetime = 152;
   cloudsGroup.add(clouds);
  }
}

function spawnObstacles(){
  if (frameCount%50 == 0){
    var obstacles = createSprite(600,330,10,10);
    var rnd = Math.round(random(1,6))
    switch(rnd) {
      case 1: obstacles.addImage(obstacle1);
        break;
        case 2: obstacles.addImage(obstacle2);
        break;
        case 3: obstacles.addImage(obstacle3);
        break;
        case 4: obstacles.addImage(obstacle4);
        break;
        case 5: obstacles.addImage(obstacle5);
        break;
        case 6: obstacles.addImage(obstacle6);
        break;
    }
    //obstacles.addAnimation(obstacle+Math.round(random(1,6)));
    //console.log(rnd);
    obstacles.velocityX = -(8+score/500);
    obstacles.scale = 0.5;
    obstaclesGroup.add(obstacles);
  }
}
