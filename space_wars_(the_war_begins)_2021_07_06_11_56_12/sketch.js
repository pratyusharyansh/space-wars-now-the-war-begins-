var backgroundimg1,backgroundimg2,heroimg,herofireimg;
var hero, assitant1img,assitant2img,assitant3img,assitant4img,boss;
var minialein1img,minialein2img;
var herofirecharge;
var Score = 0;
var herofirechargeG,minialien1G,minialien2G;
var GameState="Serve";
var bg,start,stimg;
var killCount = 0;
var gameover,gameoverimg;
var highestScore = 0;
var assitantG
var restart,restartimg;
function preload ()
{

  backgroundimg1=loadImage("background.jpg")
  heroimg=loadImage("hero1.png")
  herofireimg=loadImage("fire.png")
  minialein2img=loadImage("mini2.png")
  minialein1img=loadImage("mini1.png")
  backgroundimg2=loadImage("background 3.jpg");
  herofirechargeG = new Group();
  minialien1G = new Group();
  minialien2G = new Group();
  assitantG = new Group();
  stimg=loadImage("start.png");
  gameoverimg=loadImage("gameover.png");
  assitant1img=loadImage("v1.2.png")
  assitant2img=loadImage("v2.2.png")
  assitant3img=loadImage("v3.2.png")
  assitant4img=loadImage("v4.2.png")
  restartimg=loadImage("restart.jpg")
}

function setup(){
   createCanvas(400,400)
 
   bg=createSprite(200,200,400,400)
   bg.addImage(backgroundimg2);
  
   bg.scale=0.400;
   
   start=createSprite(200,200,20,30);
   start.addImage(stimg);
   start.scale=0.4;
   hero=createSprite(200,340,100,100);
   hero.addImage("boy",heroimg)
   hero.scale=0.5;
   //hero.debug = true;
  
   gameover=createSprite(200,200,20,20)
   gameover.addImage(gameoverimg)
   gameover.visible=false;
  gameover.scale=0.100;
}

function draw(){
  //Change background to black
    background("black");
    
    hero.x=mouseX;
    
    console.log(bg.y);
    if(GameState==="Serve")
    {
if(mousePressedOver(start))
{
  GameState="Play";
  
}
    }
    else if(GameState==="Play"){

      /*if (bg.y > 300){
        bg.y = 0;
      }
      bg.velocityY=1;*/
      start.visible=false;
      Score = Score + Math.round(getFrameRate()/60);
    bg.addImage(backgroundimg1);
    bg.scale=4;
    
if(minialien1G.isTouching(hero)||minialien2G.isTouching(hero)||assitantG.isTouching(hero)){
  GameState="End"
}
    if(keyDown("SPACE")  ){
      createfirecharge();
    }
    if(herofirechargeG.isTouching(minialien1G)  ){
      minialien1G.destroyEach();
      killCount = killCount + 1;
      
    }
   
    if(herofirechargeG.isTouching(assitantG)  ){
      assitantG.destroyEach();
      killCount = killCount + 1;
      
    }
    if( herofirechargeG.isTouching(minialien2G) ){
    
      minialien2G.destroyEach();
      killCount = killCount + 1;
    }

    if(Score > highestScore){
      highestScore = Score;
    }
    spawnAssitant();
      spwanAlein1();
      spwanAlein2();
  }else if (GameState==="End"){
    hero.destroy();
    gameover.visible=true;    
  }
    drawSprites();
    fill("white")
    textSize(15);
    
    text("Score : " + Score,150,30);
    text("Kill : " + killCount,10,30);
   // text("Highest Score : " + highestScore,250,30);
}

function spawnAssitant(){
  if (frameCount % 500 === 0){
    var assitant = createSprite(10,10,10,40);
    assitant.velocityY = 1;
    assitant.x=Math.round(random(10,390));
     var rand = Math.round(random(1,4  ));
     switch(rand) {
       case 1: assitant.addImage(assitant1img);
               break;
       case 2: assitant.addImage(assitant2img);
               break;
       case 3: assitant.addImage(assitant3img);
               break;
       case 4: assitant.addImage(assitant4img); 
               break;
       default: break;
     }
     assitantG.add(assitant);
  }
}
function spwanAlein1(){
  if(frameCount%90===0){
    var minialein1=createSprite(200,-10,10,10)
    minialein1.addImage("army",minialein1img) ;
    //minialein1.debug = true;
    minialein1.scale=0.4
    minialein1.velocity.y=(1 + Score / 100);
    minialien1G.add(minialein1);
    minialein1.x=Math.round(random(10,390));
  }
}

function spwanAlein2(){
  if(frameCount %90===0){
    var minialein2=createSprite(200,-10,10,10)
    minialein2.addImage("army2",minialein2img) ;
    minialein2.scale=0.4;
   // minialein2.debug = true;
    minialein2.velocity.y= (1 + Score / 100);
    minialien2G.add(minialein2);
    minialein2.x=Math.round(random(10,390));
   
  }
}



function createfirecharge() {
  var herofirecharge= createSprite(100, 100, 60, 10);
  herofirecharge.addImage(herofireimg);
  herofirecharge.x = hero.x;
  //herofirecharge.debug = true ;
  herofirecharge.y=300;
  herofirecharge.velocityY = -7;
  herofirecharge.lifetime =150;
  herofirecharge.scale = 0.05
  herofirechargeG.add(herofirecharge);
}