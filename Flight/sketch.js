let scl, cols, rows, w, h, speed, terrain, flying, flag;
function setup() {
    createCanvas(600, 600, WEBGL);
    scl = 10;
    cols = int(width/scl);
    rows = int(height/scl);
    terrain = [];
    for(let y = 0; y < rows; y++){
        let tmp = [];
        for(let x = 0; x < cols; x++){
            tmp.push(0);
        }
        terrain.push(tmp);
    }
    w = 1200;
    h = 900;
    speed = 0.2;
    offset_y = 0;
    flying = 0;
    flag = false;
    detailX = createSlider(10, 30, 20);
    detailX.position(10, height + 5);
    detailX.style('width', '600px');
}

function draw() {
    scl = detailX.value();
    flying -= 0.1;
    let offset_y = flying;
    // Create terrain
    for(let y = 0; y < rows; y++){
        let offset_x = 0;
        for(let x = 0; x < cols; x++){
            terrain[y][x] = map(noise(offset_x, offset_y), 0, 1, -50, 50);
            offset_x += 0.1;
        }
        offset_y += 0.1;
    }
    
    background(0);
    stroke(255);
    
    noFill();
    
    translate(width/2, height/2, 0);
    rotateX(PI/3);
    scale(3);
    translate(-w/2+200 , -h/2+150);
    
    // Draw terrain
    for(let y = 0; y < rows-1; y++){
        beginShape(TRIANGLE_STRIP);
        for(let x = 0; x < cols; x++){
            vertex(x*scl, y*scl, terrain[y][x]);
            vertex(x*scl, (y+1)*scl, terrain[y+1][x]);
        }
        endShape();
    }
}