/*

Homenaje a Fernand Leger

*/

let p;
let addingPainters, addingLegers;
let maxPainters = 17;
let count;


let pal;

function preload(){
  pal = loadImage("pal.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
}

function draw() {
  // debug();
  if (addingLegers) {
    for (let painter of p) {
      painter.go();
      if (painter.allLegersDead) {
        
        p.splice(painter, 1);
        addingLegers = false;
        setTimeout(() => { console.log("Waiting 5..."); }, 5000);
      }else{
        addingLegers = true;
      }
    }
  } else {
    blendMode(BLEND);
    fill(255, 30);
    noStroke();
    rect(0, 0, width, height);
    count++;
    if (count > 250) {
      init();
    }

    if (p.length === 0) {
      addingPainters = false;
      count = 0;
    }
  }
}


function mousePressed() {
  // x, y, angle, length, step
  let painter = new Painter(
    mouseX,
    mouseY,
    random(TWO_PI),
    random(90, 600),
    1,
    palete()
  );
  p.push(painter);
}


function palete() {
  let col = pal.get(round(random(pal.width)), round(random(pal.height)));
  return col;
}

function oneIn(num) { 
  if (Math.random(1) < 1 / num) {
    return true;
  } else {
    return false;
  }
}

function init() {
  background(255);
  p = [];
  blendMode(MULTIPLY);
  addingPainters = true;
  addingLegers = true;
  count = 0;
  let painter = new Painter(
    width / 2,
    height / 2,
    random(TWO_PI),
    random(190, 700),
    1,
    palete()
  );
  p.push(painter);
}

function debug() {
  textFont("Arial", 12);
  let x = 20;
  let y = height - 400;
  let count = 1;
  blendMode(BLEND);
  fill(255, 50);
  noStroke();
  rect( 0, height - 420, 300, 400);
  fill(0, 90);
  for(let painter of p){
    text("painter "+count+" length "+painter.length+ " -- alive? "+painter.alive, x, y);
    count++;
    y+= 16; // interlínea
  }

  text("addingPainters? "+addingPainters + "\taddingLegers? "+addingLegers, x, y);
}

function keyTyped(){
  if(key === ' '){}
  if(key === 's' || key === 'S'){
    saveFile();
  }
}

function saveFile() {
	let filename = "leger-" + year() + month() + day() + "-" + hour() + minute() + second() + ".png";
	let file = createImage(width, height);
	file = get();
	file.save(filename, 'png');
}