const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sineNumber = document.getElementById('sineN');
const startF = document.getElementById('startF');
const nextF = document.getElementById('nextF');
const startR = document.getElementById('startR');
const nextR = document.getElementById('nextR');
const button = document.getElementById('update');


window.onload = function () {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  window.requestAnimationFrame(() => {
    draw([
      { r: 100, f: 0.04, t: 0 },
      { r: 60, f: 0.08, t: 0 },
      { r: 50, f: 0.12, t: 0 },
      { r: 40, f: 0.16, t: 0 },
      { r: 30, f: 0.20, t: 0 },
      { r: 20, f: 0.24, t: 0 },
      { r: 10, f: 0.28, t: 0 },
    ])
  });
  //read("mousemove");
  //read("keydown");
};

button.addEventListener('click', () => { updateDraw() });

function read(event) {
  let prevN = 10;
  let prevStartF = 10;
  let prevNextF = 2;
  let prevStartR = 40;
  let prevNextE = 10;

  sineNumber.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('sineN').innerHTML = sineNumber.value;
      if (sineNumber.value !== prevN) {
        updateDraw();
        prevN = sineNumber.value
      }
    });
  });

  startF.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('startF').innerHTML = startF.value;
      if (startF.value !== prevStartF) {
        updateDraw();
        prevStartF = startF.value
      }
    });
  });

  nextF.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('nextF').innerHTML = nextF.value;
      if (nextF.value !== prevNextF) {
        updateDraw();
        prevNextF = nextF.value
      }
    });
  });

  startR.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('startR').innerHTML = startR.value;
      if (startR.value !== prevStartR) {
        updateDraw();
        prevStartR = startR.value
      }
    });
  });

  nextR.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('nextR').innerHTML = nextR.value;
      if (nextR.value !== prevNextE) {
        updateDraw();
        prevNextE = nextR.value
      }
    });
  });

}

function updateDraw() {
  let circles = [];
  let n = Number.parseInt(sineNumber.value)/10;
  let sf = Number.parseInt(startF.value)/1000;
  let nf = Number.parseInt(nextF.value)/100;
  let sr = Number.parseInt(startR.value);
  let nr = Number.parseInt(nextR.value);
  console.log({
    n: n,
    sf: sf,
    nf: nf,
    sr: sr,
    nr: nr
  });
  circles.push({
    r: sr,
    f: sf,
    t: 0
  });
  for (let i = 1; i < n; i++) {
    circles.push({
      r: circles[i-1].r / 2,
      f: circles[i-1].f + nf / 10,
      t: 0
    })
  }
  window.requestAnimationFrame(() => draw(circles));
  console.log(circles);
}

function draw(circles) {
  let wave = [];
  return (function animate() {
    for(let i = 0; i < circles.length; i++)
      circles[i].t += circles[i].f;
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(300, 220);
    ctx.beginPath();
    let fy = 0;
    for (let i = 0; i < circles.length; i++) {
      let x = circles[i].r * Math.cos(circles[i].t);
      let y = circles[i].r * Math.sin(circles[i].t);
      ctx.arc(0, 0, circles[i].r, 0, 2 * Math.PI, false);
      ctx.moveTo(0, 0);
      //ctx.closePath();
      ctx.lineTo(x, y);
      //ctx.closePath();
      ctx.save();
      ctx.translate(x, y);
      fy += y;
    }
    for (let i = 0; i < circles.length; i++) ctx.restore();
    wave.unshift({y: fy});
    drawWave();
    window.requestAnimationFrame(animate);
  })();
  function drawWave() {
    ctx.translate(500, 0);
    for (let i = 0; i < wave.length; i++)
      ctx.arc(i+10, wave[i].y, 1, 0, 2 * Math.PI, false);
    if (wave.length > 1000) wave.pop();
    ctx.stroke();
  }
}