let scale, global_scale, animate_btn, reset_btn, slider_scale, r, x0, y0, colors, step, flag, speed;

function setup() {
    createCanvas(1000, 600);
    x0 = width/2;
    y0 = height/2;
    scale = 100;
    step = 1;
    flag = false;    
    
    slider_scale = createSlider(1, 100, 10);
    slider_scale.position(0, height+30);
    slider_scale.style('width', width.toString()+'px');
    slider_scale.value(100);
    
    animate_btn = createButton('Animate');
    animate_btn.position(30, 30);
    animate_btn.mousePressed(animate);
    
    reset_btn = createButton('Reset');
    reset_btn.position(30, 60);
    reset_btn.mousePressed(reset);
    
    r = primes(Math.pow(10, 4));
    global_scale = (x0+100)/r[r.length-1];
    colors = generateColors(255, 153, 0, 0, 147, 255, r.length);
    frameRate(10000);
}


function draw() {
    background(0);
    
    // Spectral grid
    strokeWeight(1);
    stroke(49);
    noFill();
    line(0, y0, width, y0);
    line(x0, 0, x0, height);
    line(x0, y0, width, 0);
    line(x0, y0, width, height);
    line(x0, y0, 0, 0);
    line(x0, y0, 0, height);
    ellipseMode(CENTER);
    ellipse(x0, y0, width/5, width/5);
    ellipse(x0, y0, width*2/5, width*2/5);
    ellipse(x0, y0, width*3/5, width*3/5);
    ellipse(x0, y0, width*4/5, width*4/5);
    ellipse(x0, y0, width, width);
    
    if(flag){
        if(scale-step > 0){
            slider_scale.value(scale-step);
        }else{
            flag = false; 
        }
    }
    
    scale = slider_scale.value();
    
    strokeWeight(3);
    for(let i = 0; i < r.length; i++){
        stroke(colors[i][0], colors[i][1], colors[i][2]);
        point(x0+r[i]*cos(r[i])*scale*global_scale, y0+r[i]*sin(r[i])*scale*global_scale);
    }
}

function animate(){
    flag = !flag;
}

function reset(){
    slider_scale.value(100);
    scale = 100;
}

function generateColors(sr, sg, sb, er, eg, eb, n){
    let diffRed = er - sr;
    let diffGreen = eg - sg;
    let diffBlue = eb - sb;
    var colors = [];
    let rstep = diffRed/n, gstep = diffGreen/n, bstep = diffBlue/n;
    for(let i = 0; i < n; i++){
        colors.push([sr+rstep*i, sg+gstep*i, sb+bstep*i]);
    }
    return colors;
}

function primes(N) {
  let res = [2];
  for (let i = 3; i < N; i+=2) {
    let isPrime = true;
    for (let k = 0, limit = Math.sqrt(i); res[k] <= limit; ++k) {
      let d = res[k];
      if (i % d == 0) {isPrime = false;break;}
    }
    if (isPrime) res.push(i);
  }
  return res;
}

function wholes(N){
    let res = [];
    for(let i  = 1; i <= N; i++){
        res.push(i);
    }
    return res;
}