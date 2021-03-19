const { STROKE } = require("./p5");
var s;
var scl;
var speed;
var food;
var score;
var level;
var acceleration;

function setup() {
    createCanvas(600, 600); 
    scl = 20;
    speed = 0.2;
    food = {
        sz: 10,
        x: 0,
        y: 0    
    };
    score = 0;
    level = 0;
    acceleration = 0.05;
    food.x = floor(random(0, 600-food.sz));
    food.y = floor(random(0, 600-food.sz));
    
    s = new Snake();
    food_obj = new Food(food);
    frameRate(60);
}

function draw() {
    background(50);
    if(s.eat(food.x, food.y, food.sz)){
        food.x = floor(random(0, 600-food.sz));
        food.y = floor(random(0, 600-food.sz));
        food_obj = new Food(food);
        score++;
    }
    s.update();
    if(int(score/2) > level){
        level = int(score/2);
        speed += acceleration
    }
    food_obj.show();
    s.show();
    textSize(30);
    textAlign(CENTER);
    textFont("Arial");
    textStyle(BOLD);
    text("Score: "+score.toString(), 300, 50)
}

function maxRepetition(arr){
    if(arr.length == 0) return null;
    
    var modeMap = {};
    var maxEl = arr[0], maxCount = 1;
    for(var i = 0; i < arr.length; i++){
        var el = arr[i];
        
        if(modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        
        if(modeMap[el] > maxCount){
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxCount;
}

function keyPressed(){
    if(keyCode === UP_ARROW){
        if(s.yspeed === speed){
            s.reset();
        }
        s.turn(0, -speed);
    }else if(keyCode === RIGHT_ARROW){
        if(s.xspeed === -speed){
            s.reset();
        }
        s.turn(speed, 0);
    }else if(keyCode === LEFT_ARROW){
        if(s.xspeed === speed){
            s.reset();
        }
        s.turn(-speed, 0);
    }else if(keyCode === DOWN_ARROW){
        if(s.yspeed === -speed){
            s.reset();
        }
        s.turn(0, speed);
    }
}

function Food(food){
    this.food = food;
    this.show = function(){
        fill(0, 255, 0);
        rect(this.food.x, this.food.y, this.food.sz, this.food.sz);
    }
    
}

function Snake(){
    this.x = 0;
    this.y = 0;
    this.xspeed = speed;
    this.yspeed = 0;
    this.prev = [[this.x, this.y]];

    this.update = function(){
        this.x += this.xspeed*scl;
        this.y += this.yspeed*scl;
        
        if(this.x+scl > 600) this.x = 600-scl;
        if(this.y+scl > 600) this.y = 600-scl;
        if(this.x <= 0) this.x = 0;
        if(this.y <= 0) this.y = 0;
        
        this.prev.push([this.x, this.y])
        if(this.prev.length > level+2){
            this.prev.shift();
        }
        
        if(maxRepetition(this.prev) > 1){
            this.reset();
        }
    };
    this.show = function(){
        for(let i = 0; i < this.prev.length; i++){
            noStroke();
            fill(255);
            rect(this.prev[i][0], this.prev[i][1], scl, scl);
        }
    };
    this.turn = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
    this.eat = function(x, y, sz){
        var d = dist(int((2*this.x+scl)/2), int((2*this.y+scl)/2), int((2*x+sz)/2), int((2*y+sz)/2));
        return d <= scl;
    }
    this.reset = function(){
        print("You died!");
        this.x = 0;
        this.y = 0;
        score = 0;
        level = 0;
        speed = 0.2;
        this.xspeed = speed;
        this.yspeed = 0;
        this.prev = [[this.x, this.y]];
    }
}