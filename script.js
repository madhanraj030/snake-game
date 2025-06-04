const gameBoard = document.getElementById('gameBoard')
const context = gameBoard.getContext('2d')
const scoreVal = document.getElementById('scoreVal')


let HEIGHT = gameBoard.height;
let WIDTH = gameBoard.width;
let UNIT = 25;
let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0
let active = true;
let started = false;
let paused = false

window.addEventListener('keydown',keyPress)

function keyPress(event){
    if(!started){
        started = true;
        selectTick();
    }
    //pause when space is pressed
    if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused = false;
            selectTick()
        }
        else{
            paused = true;
        }
    }
    let LEFT = 37
    let RIGHT = 39
    let UP = 38
    let DOWN = 40

    switch(true){
        case (event.keyCode == LEFT && xVel != UNIT):
            xVel = -UNIT
            yVel = 0
            break;
        case (event.keyCode == RIGHT && xVel != -UNIT):
            xVel = UNIT
            yVel = 0
            break;
        case (event.keyCode == UP && yVel != UNIT):
            xVel = 0
            yVel = -UNIT
            break;
        case (event.keyCode == DOWN && yVel != -UNIT):
            xVel = 0
            yVel = UNIT
            break;
    }
}

let snake =[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT*1,y:0},
    {x:0,y:0}
]

startGame();

function startGame(){
    context.fillStyle = '#212121'
    context.fillRect(0,0,WIDTH,HEIGHT)
    createFood();
    displayFood();
    //drawSnake();
    //snakeMove();
    //clearBoard();
    drawSnake()
}
function clearBoard(){
    context.fillStyle = '#212121'
    context.fillRect(0,0,WIDTH,HEIGHT)
}

function createFood(){
    foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT
}

function displayFood(){
    context.fillStyle = 'red'
    context.fillRect(foodX,foodY,UNIT,UNIT)
}

function drawSnake(){
    context.fillStyle = 'aqua'
    context.strokeStyle = '#212121'
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}

function snakeMove(){
    const head = { x:snake[0].x+xVel,
                    y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x == foodX && snake[0].y == foodY){
        createFood();
        score+=1
        scoreVal.textContent = score
    }
    else 
        snake.pop()
}

function selectTick(){
    if(active && !paused){
        setTimeout(()=>{
            clearBoard()
            displayFood()
            snakeMove()
            drawSnake()
            checkGameOver()
            selectTick()
        },200)
    }
    else if(!active){
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!",WIDTH/2,HEIGHT/2)
    }
}

function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
        case (snake[0].x >= WIDTH):
        case (snake[0].y < 0):
        case (snake[0].y >= HEIGHT):
            active = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            active = false;
            return;
        }
    }
}




