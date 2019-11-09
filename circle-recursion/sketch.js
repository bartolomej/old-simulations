const lengthInput = document.getElementById('length-input');
const widthInput = document.getElementById('width-input');
const angleInput = document.getElementById('angle-input');
const scaleInput = document.getElementById('scale-input');
const rotationInput = document.getElementById('rotation-input');
const clearInput = document.getElementById('clear-input');
const colorInput = document.getElementById('color-input');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let angle = 0.25;
let scale = 0.52;
let lineWidth = 1.56;
let lineLength = 150;
let rotation = 3.65;


window.onload = function () {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  read("mousemove");
  read("keydown");
  updateDraw();
};

function read(event) {
  let prevLength = 50;
  let prevWidth = 1;
  let prevAngle = 0.4;
  let prevScale = 0.4;
  let prevRotation = 0.5;

  lengthInput.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('length').innerHTML = lengthInput.value;
      if (lengthInput.value !== prevLength) {
        updateDraw();
        prevLength = lengthInput.value;
        lineLength = Number.parseInt(lengthInput.value);
      }
    });
  });

  widthInput.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('width').innerHTML = widthInput.value;
      if (widthInput.value !== prevWidth) {
        updateDraw();
        prevWidth = widthInput.value;
        lineWidth = Number.parseFloat(widthInput.value)/100;
      }
    });
  });

  angleInput.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('angle').innerHTML = angleInput.value;
      if (angleInput.value !== prevAngle) {
        updateDraw();
        prevAngle = angleInput.value;
        angle = Number.parseFloat(angleInput.value)/100;
      }
    });
  });

  scaleInput.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('scale').innerHTML = scaleInput.value;
      if (scaleInput.value !== prevScale) {
        updateDraw();
        prevScale = scaleInput.value;
        scale = Number.parseFloat(scaleInput.value)/100;
      }
    });
  });

  rotationInput.addEventListener(event, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('rotation').innerHTML = rotationInput.value;
      if (rotationInput.value !== prevRotation) {
        updateDraw();
        prevRotation = rotationInput.value;
        rotation = Number.parseInt(rotationInput.value)/60;
      }
    });
  });

  clearInput.addEventListener('change', () => {
    window.requestAnimationFrame( () => {
      updateDraw();
    });
  });

}


function updateDraw() {
  drawFractalCircle(ctx, angle, scale, rotation, lineWidth, lineLength, clearInput.checked, colorInput.checked);
}

function drawFractalCircle(ctx, angle, scale, rotation, width, length, clear = true, color = false) {
  ctx.resetTransform();
  if (clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate((canvas.width/3)*2, canvas.height/1.7);
  ctx.rotate(Math.PI);
  branch(length, angle, scale);

  function branch(length, angle, scale) {
    ctx.fillRect(0, 0, width, length);
    if (length < 1) return;
    ctx.save();
    ctx.translate(0, length);
    ctx.rotate(-rotation*angle);
    if (color) ctx.fillStyle = getRndColor();
    branch(length - scale, angle, scale);
    ctx.restore();
  }

  function getRndColor() {
    let r = 255*Math.random()| 0,
        g = 255*Math.random()| 0,
        b = 255*Math.random()| 0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}