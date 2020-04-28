window.addEventListener('load', onLoad);
window.addEventListener('resize', onResize);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);

let canvas;
let context;
let selectedCircle;
let circles = [];

function onLoad () {
  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');
  document.body.appendChild(canvas);
  onResize();
  initialize();
  requestAnimationFrame(animate);
}

function onResize () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onMouseDown (e) {
  let mousePosition = new Vector(e.clientX, e.clientY);
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].distance(mousePosition) < circles[i].radius) {
      selectedCircle = circles[i];
    }
  }
}

function onMouseUp (e) {
  if (selectedCircle) {
    selectedCircle = null;
  }
}

function onMouseMove (e) {
  let mousePosition = new Vector(e.clientX, e.clientY);
  if (selectedCircle) {
    selectedCircle.position = mousePosition;
  }
}

function initialize () {
  const n = 200;
  for (let i = 0; i < n; i++) {
    const circle = new Circle(
      Math.random() * 50,
      new Vector(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      ), i
    )
    circles.push(circle);
  }
}

function animate () {
  context.resetTransform();
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    for (let j = 0; j < circles.length; j++) {
      const target = circles[j];
      const source = circles[i];
      if (source && target.id !== source.id && source.intersects(target)) {
        let normal = target.position.subtractImmutable(source.position);
        let overlap = 0.5 * (normal.length() - (source.radius + target.radius));
        const displace = normal.normalizeImmutable().multiplyImmutable(overlap);
        source.position.add(displace);
        target.position.subtract(displace);
        // draw intersection line
        context.beginPath();
        context.moveTo(source.position.x, source.position.y);
        context.lineTo(source.position.x + normal.x, source.position.y + normal.y)
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
      }
    }
  }
  requestAnimationFrame(animate);
}

class Circle {

  constructor (radius, position, id) {
    this.id = id;
    this.mass = radius;
    this.radius = radius;
    this.position = position;
    this.color = 'white';
  }

  distance (c) {
    if (c instanceof Vector) {
      return Math.sqrt(
        (c.x - this.position.x) ** 2 +
        (c.y - this.position.y) ** 2
      )
    }
    if (c instanceof Circle) {
      return Math.sqrt(
        (c.position.x - this.position.x) ** 2 +
        (c.position.y - this.position.y) ** 2
      )
    }
  }

  update () {
    context.moveTo(this.position.x, this.position.y);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }

  intersects (c) {
    return this.distance(c) <= (c.radius + this.radius);
  }

  intersectionLine (c) {
    return -1 / this.distance(c);
  }

}

class Vector {

  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  multiply (n) {
    this.x *= n;
    this.y *= n;
  }

  normalizeImmutable () {
    return new Vector(
      this.x / this.length(),
      this.y / this.length()
    )
  }

  multiplyImmutable (n) {
    return new Vector(
      this.x * n,
      this.y * n
    )
  }

  add (v) {
    this.x += v.x;
    this.y += v.y;
  }

  subtract (v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  subtractImmutable (v) {
    return new Vector(
      this.x - v.x,
      this.y - v.y
    )
  }

  length () {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  get slope () {
    return this.y / this.x;
  }

}
