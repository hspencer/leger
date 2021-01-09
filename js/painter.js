class Painter {

  constructor(x, y, angle, length, step, color) {
    this.x = x;
    this.y = y;
    this.a = angle;
    this.s = step;
    this.l = round(length);
    this.steps = round(length / step);
    this.left = Math.random() < 0.5;
    this.seed = round(random(10000));
    this.c = color;
    this.count = 0;
    this.fade = 255 / this.steps;
    this.legers = [];
    this.allLegersDead = false;
    this.alive = true;
  }

  go() {
    let angle;
    if (this.left) {
      angle = this.a - HALF_PI;
    } else {
      angle = this.a + HALF_PI;
    }

    if (this.alive) {
      noiseSeed(this.seed);
      let newLength = noise(millis() / 3900) * 300;
      this.c = color(red(this.c), green(this.c), blue(this.c), 255 - this.fade * this.count);

      let nx = this.x + cos(this.a) * this.s;
      let ny = this.y + sin(this.a) * this.s;

      this.legers.push(new Leger(this.x, this.y, angle, this.s, newLength, this.c));

      this.count++;
      this.x = nx;
      this.y = ny;

      if (addingPainters && oneIn(99)) {
        let newAngle;
        if (oneIn(2)) {
          newAngle = this.a - HALF_PI + random(-0.2, 0.2);
        } else {
          newAngle = this.a + HALF_PI + random(-0.2, 0.2);
        }
        let painter = new Painter(
          nx,
          ny,
          newAngle,
          random(190, 700),
          1,
          palete()
        );
        p.push(painter);
      }
    }

    for (let i = 0; i < this.legers.length; i++) {
      this.legers[i].go();
      if (!this.legers[i].alive) {
        this.legers.splice(i, 1);
      }
    }

    if (this.legers.length === 0) {
      this.allLegersDead = true;
    }

    if (this.count > this.steps || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.alive = false;
      addingPainters = false;
    }

    if (p.length >= maxPainters) {
      addingPainters = false;
    }
  }
}