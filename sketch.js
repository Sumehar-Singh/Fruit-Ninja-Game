var PLAY = 1;
var END = 0;
var gameState = PLAY;

var knife, knifeImage;
var fruitGroup, fruit1, fruit2, fruit3, fruit4;
var enemyGroup, alien;

var gameOverImage;
var score;

function preload()
{
  //loading the images
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alien = loadAnimation("alien1.png","alien2.png");
  gameOverImage = loadImage("gameover.png");
}

function setup()
{
  createCanvas(600,600);
  
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  
  //creating fruit and enemy groups
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
  
  //reshaping the collider
  knife.setCollider("rectangle", 0, 0, 40, 60);
  //knife.debug = true;
}

function draw()
{
  background("skyblue");
  
  //displaying the score
  textSize(25);
  fill(0);
  text("Score = " + score, 250, 30);
  
  if(gameState === PLAY)
    {
      knife.x = mouseX;
      knife.y = mouseY;
      
      //spawning the fruits
      spawnFruits();
      
      //spawning the enemies
      spawnEnemies();
      
      //increasing the score by 1 when knife is touching with fruits
      if(fruitGroup.isTouching(knife))
        {
          fruitGroup.destroyEach();
          score = score + 1;
        }
      
      if(enemyGroup.isTouching(knife))
        {
          gameState = END;
        }
    }
  
  //changing the image of knife to game over when touching with       	enemy 
  if(gameState === END)
    {
      knife.addImage(gameOverImage);
      knife.scale = 1.3;
      knife.x = 300;
      knife.y = 270;
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
      
      textSize(18);
      text("Press R to Restart the Game!", 185, 320);
      
      if(keyDown("r"))
        {
          reset();
        }
    }
  
  drawSprites();
}

function reset()
{
  gameState = PLAY;
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  score = 0;
}

function spawnFruits()
{
  if(frameCount % 60 === 0)
    {
      var fruit = createSprite(610, 200, 20, 20);
      fruit.scale = 0.2;
      
      //generating random fruits
      var rand = Math.round(random(1,4))
      if(rand === 1)
        {
          fruit.addImage(fruit1);
        }
      else if(rand === 2)
        {
          fruit.addImage(fruit2);
        }
      else if(rand === 3)
        {
          fruit.addImage(fruit3);
        }
      else if(rand === 4)
        {
          fruit.addImage(fruit4);
        }
      
      var position = Math.round(random(1,2));
      if(position === 1)
        {
          fruit.x = -10;
          fruit.velocityX = (10 + (score/4));
        }
      else if(position === 2)
        {
          fruit.x = 610;
          fruit.velocityX = -(10 + (score/4));
        }
      
      fruit.y = Math.round(random(50,550));
      fruit.lifetime = 65;
      
      //adding fruits to the group
      fruitGroup.add(fruit);
    }
}

function spawnEnemies()
{
  if(frameCount % 200 === 0)
    {
      //spawning enemies
      var enemy = createSprite(610, 200, 20, 20);
      enemy.addAnimation("alien",alien);
      enemy.y = Math.round(random(100,400));
      var randPosition = Math.round(random(1,2));
      if(randPosition === 1)
        {
          enemy.x = -10;
          enemy.velocityX = (10 + (score/10))
        }
      else if(randPosition === 2)
        {
          enemy.x = 610;
          enemy.velocityX = -(10 + (score/10));
        }
      
      enemy.lifetime = 65;
      
      //adding enemy to the group
      enemyGroup.add(enemy);
    }
}