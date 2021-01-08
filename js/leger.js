class Leger {
  constructor(x, y, angle, width, length, color) {
    this.x = x;
    this.y = y;
    this.a = angle;
    this.w = width;
    this.l = length;
    this.c = color;
    //
    this.life = 200;
    this.s = this.l / this.life;
    this.alpha = 255;
    this.alive = true;

  }

  go() {
    if (this.alpha > 1) {
      let nx = this.x + cos(this.a) * this.s;
      let ny = this.y + sin(this.a) * this.s;

      // left
      let xl = this.x + cos(this.a - HALF_PI) * this.w / 2;
      let yl = this.y + sin(this.a - HALF_PI) * this.w / 2;
      let nxl = nx + cos(this.a - HALF_PI) * this.w / 2;
      let nyl = ny + sin(this.a - HALF_PI) * this.w / 2;

      // right
      let xr = this.x + cos(this.a + HALF_PI) * this.w / 2;
      let yr = this.y + sin(this.a + HALF_PI) * this.w / 2;
      let nxr = nx + cos(this.a + HALF_PI) * this.w / 2;
      let nyr = ny + sin(this.a + HALF_PI) * this.w / 2;

      fill(this.c);
      noStroke();

      beginShape();
      vertex(xl, yl);
      vertex(nxl, nyl);
      vertex(nxr, nyr);
      vertex(xr, yr);
      endShape();

      //stroke(0, 30);
      //line(nxl, nyl, nxr, nyr);

      this.x = nx;
      this.y = ny;

      this.alpha *= 0.97568;
      this.c = color(red(this.c), green(this.c), blue(this.c), this.alpha);
    } else { this.alive = false; }

  }
}