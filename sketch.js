const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var bg, ma, maImg;
var block, blockImg, lpipe, lpipeImg, spipe, spipeImg, blockGroup
var maCam, time = 0, score = 0;

function preload()
{
   bg = loadImage("assets/bg.png");
   maImg = loadImage("assets/standing.png") 
   blockImg = loadImage("assets/block.png")
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world
  
    ma = createSprite(100,570,20,20);
    ma.addImage(maImg);
    ma.scale = 0.1

    blockGroup = new Group();

    textSize(20);
    fill(255);
}

function draw()
{


    background(0,0,0);

    image(bg,0, 0, width, height);
    image(bg,-width, 0, width, height);
    image(bg,width, 0, width, height);
    image(bg,width*2, 0, width, height);
    image(bg,width*3, 0, width, height);
    image(bg,width*4, 0, width, height);
    image(bg,width*5, 0, width, height);

    maCam = ma.x;


    if(ma.x < width*5 + 500)
    {
        if(frameCount % 10 === 0)
        {
            time += 1;    
        }
    } 

    textSize(20);
    text("Time:"+ time, ma.x, ma.y - 100);

    camera.position.x = maCam;

    moveMa();
    spawnBlocks();



    rect(width*5 + 500, 10, 10, height);

    winOrLoss();

    drawSprites();

}

function moveMa()
{
    if(keyDown(RIGHT_ARROW))
    {
        ma.x += 10
    }


    if(keyDown(LEFT_ARROW))
    {
        ma.x -= 10
    }

    if(ma.y <= 580)
    {
        ma.y += 15;
    }

    if(keyDown(UP_ARROW))
    {
        ma.y -= 20
    }

    if(ma.y <= 0)
    {
        ma.y = 0;
    }

    
    if(keyDown(DOWN_ARROW))
    {
        ma.scale = 0.05;
    }
    else
    {
      ma.scale = 0.1
    }

}


function spawnBlocks()
{
    if(frameCount % Math.round(random(20, 50)) === 0)
    {
        block = createSprite(Math.round(random(500, width*5)), Math.round(random(10, height - 100)),40,10); 

        block.scale = 0.9;
        block.addImage(blockImg);
        

        blockGroup.add(block);

     }

     ma.collide(blockGroup)
}

function winOrLoss()
{
    if(ma.x > width*5 + 500)
    {
       score = time; 
       
        textSize(100);
        fill(255);

        if(score <= 115)
        {
            text("You Win", ma.x - 100, height/2);
        }
        else if(score >= 115)
        {
            text("You Lose", ma.x - 100, height/2);
        }
    }

}