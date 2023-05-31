var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car, car_running, car_collide;
var road, invisibleRoad, roadImage;

var obstaclesGroup, car_crashed1, car_crashed2, cone;

var score=0;

var gameOver, restart;



function preload(){
 car_running =  loadAnimation("car.png");
 car_collide = loadAnimation("carcrashed.png");
 
 
 roadImage = loadImage("road.png");
 
 car_crashed1 = loadImage("crashedcar.png");
 car_crashed2 = loadImage("crashedcar2.png");
 cone = loadImage("cone.png");
 
 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");
}

function setup() {
 createCanvas(300, 600);

boundary1 = createSprite(20,0,3,1200);
boundary2 = createSprite(140,0,3,1200);
 
car=createSprite(80,500,20,50);
 
 car.addAnimation("running", car_running);
 car.scale = 0.11;
 car.addAnimation("crashed", car_collide);
 car_collide.scale = 0.5;
 
 road = createSprite(500,0,1500,100);
 road.addImage("road",roadImage);
 road.y = road.height/2;
 road.x = road.width/1.5;
 road.scale = 2.2;
 
 
 gameOver = createSprite(90,400);
 gameOver.addImage(gameOverImg);
 
 
 restart = createSprite(60,140);
 restart.addImage(restartImg);
  
 gameOver.scale = 0.5;
 restart.scale = 1;
 
 gameOver.visible = false;
 restart.visible = false;
 
 invisibleRoad = createSprite(500,500,400,10);
 invisibleRoad.visible = false;
 
 
 obstaclesGroup = new Group();
 boundaryGroup = new Group();
 score = 0;
}

function draw() {
 //trex.debug = true;
 background("white");
 text("Score: "+ score,150,50,100,100);
 
 
if (gameState===PLAY){
 score = score + Math.round(getFrameRate()/60);
 
 

 
 if(keyDown("up") ) {
 car.velocityY = -3;
 car.velocityX = 0;
 }
 
 if(keyDown("down") ) {
    car.velocityY = +3;
    car.velocityX = 0;
}
 
if(keyDown("right") ) {
    car.velocityX = 3;
    car.velocityY = -1;
}
        
if(keyDown("left") ) {
    car.velocityX = -3;
    car.velocityY = -1;
    }
    

 car.collide(invisibleRoad);
 
 spawnObstacles();

 score.depth = 1;
 road.depth = -1;
 obstaclesGroup.depth = -1;

 
 if(obstaclesGroup.isTouching(car)){
 gameState = END;
 car.scale = 0.09;
 
 }
 if(boundary1.isTouching(car)){
    gameState = END;
    car.scale = 0.09;
    
 }   
 if(boundary2.isTouching(car)){
    gameState = END;
    car.scale = 0.09;
 } 
 }
 else if (gameState === END) {
 gameOver.visible = true;
 restart.visible = true;
 
 
 //set velcity of each game object to 0
 road.velocityY = 0;
 car.velocityY = 0;
 obstaclesGroup.setVelocityYEach(0);
 
 
 
 //change the trex animation
 car.changeAnimation("crashed",car_collide);
 
 
 //set lifetime of the game objects so that they are never destroyed
 obstaclesGroup.setLifetimeEach(0);
 
 if(mousePressedOver(restart)) {
 reset();
 }
 }
 
 
 drawSprites();
}

   function spawnObstacles() {
        if(frameCount % 60 === 0) {
        var obstacle = createSprite(random(50,90),0, 10, 40);
        obstacle.velocityY=+6;
        //generate random obstacles
        var rand = Math.round(random(1,3));
        switch(rand) {
        case 1: obstacle.addImage(car_crashed1);
        break;
        case 2: obstacle.addImage(car_crashed2);
        break;
        case 3: obstacle.addImage(cone);
        break;
        default: break;
        }
        
        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.08;
        obstacle.lifetime = 200;
        //add each obstacle to the group
        obstaclesGroup.add(obstacle);
        }
       }
       
       function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;

        

        car.changeAnimation("running", car_running);
        
        obstaclesGroup.destroyEach();
        
       
         score = 0;
       }
    