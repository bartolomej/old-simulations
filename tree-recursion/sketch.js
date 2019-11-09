const lengthInput = document.getElementById('length-input');
const widthInput = document.getElementById('width-input');
const angleInput = document.getElementById('angle-input');
const scaleInput = document.getElementById('scale-input');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let lineLength = 130;
let lineWidth = 1.5;
let angle = 70;
let scale = 0.65;


window.onload = function () {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  read("mousemove");
  read("keydown");
  updateDraw();
};

function read(eventType) {
  let prevLength = 50;
  let prevWidth = 1;
  let prevAngle = 0.4;
  let prevScale = 0.4;

  lengthInput.addEventListener(eventType, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('length').innerHTML = lengthInput.value;
      if (lengthInput.value !== prevLength) {
        updateDraw();
        prevLength = lengthInput.value;
        lineLength = Number.parseInt(lengthInput.value);
      }
    });
  });

  widthInput.addEventListener(eventType, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('width').innerHTML = widthInput.value;
      if (widthInput.value !== prevWidth) {
        updateDraw();
        prevWidth = widthInput.value;
        lineWidth = Number.parseFloat(widthInput.value)/100;
      }
    });
  });

  angleInput.addEventListener(eventType, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('angle').innerHTML = angleInput.value;
      if (angleInput.value !== prevAngle) {
        updateDraw();
        prevAngle = angleInput.value;
        angle = Number.parseFloat(angleInput.value)/100;
      }
    });
  });

  scaleInput.addEventListener(eventType, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('scale').innerHTML = scaleInput.value;
      if (scaleInput.value !== prevScale) {
        updateDraw();
        prevScale = scaleInput.value;
        scale = Number.parseFloat(scaleInput.value)/100;
      }
    });
  });

}


function updateDraw() {
  drawTree(ctx, angle, scale, lineWidth, lineLength);
}


function drawTree(ctx, angle, scale, width, length, color = false) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width/2, canvas.height/1.7);
  ctx.rotate(Math.PI);
  ctx.save();
  branch(length, angle, scale);

  function branch(length, angle, scale) {
    ctx.fillRect(0, 0, width, length);
    if (length < 2) return;
    ctx.save();
    ctx.translate(0, length);
    ctx.rotate(-angle);
    if (color) ctx.fillStyle = getRndColor();
    branch(length * scale, angle, scale);
    ctx.rotate(angle * 2);
    if (color) ctx.fillStyle = getRndColor();
    branch(length * scale, angle, scale);
    ctx.restore();
  }

  function getRndColor() {
    let r = 255*Math.random()| 0,
      g = 255*Math.random()| 0,
      b = 255*Math.random()| 0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}