/*

Homenaje a Fernand Leger

*/

let p;
let addingPainters, addingLegers;
count;

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
      }else{
        addingLegers = true;
      }
    }
  } else {
    blendMode(BLEND);
    fill(255, 10);
    noStroke();
    rect(0, 0, width, height);
    count++;
    if (count > 200) {
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
  let pal = ["#86134D", "#580C2E", "#CD1F3F", "#9B743F", "#CEBC00", "#B94900"];
  return pal[int(random(pal.length))];
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
    random(90, 600),
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
  fill(255);
  rect( 0, height - 420, 400, 400);
  fill(0, 150);
  for(let painter of p){
    text("painter "+count+" length "+painter.length+ " -- alive? "+painter.alive, x, y);
    count++;
    y+= 16;
  }

  text("addingPainters? "+addingPainters + "\taddingLegers? "+addingLegers, x, y);
}
