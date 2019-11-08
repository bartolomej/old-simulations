const lengthInput = document.getElementById('length-input');
const widthInput = document.getElementById('width-input');
const angleInput = document.getElementById('angle-input');
const scaleInput = document.getElementById('scale-input');
const clearInput = document.getElementById('clear-input');
const colorInput = document.getElementById('color-input');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


window.onload = function () {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  read("mousemove");
  read("keydown");
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
        prevLength = lengthInput.value
      }
    });
  });

  widthInput.addEventListener(eventType, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('width').innerHTML = widthInput.value;
      if (widthInput.value !== prevWidth) {
        updateDraw();
        prevWidth = widthInput.value
      }
    });
  });

  angleInput.addEventListener(eventType, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('angle').innerHTML = angleInput.value;
      if (angleInput.value !== prevAngle) {
        updateDraw();
        prevAngle = angleInput.value
      }
    });
  });

  scaleInput.addEventListener(eventType, () => {
    window.requestAnimationFrame( () => {
      document.getElementById('scale').innerHTML = scaleInput.value;
      if (scaleInput.value !== prevScale) {
        updateDraw();
        prevScale = scaleInput.value
      }
    });
  });

  clearInput.addEventListener('change', () => {
    window.requestAnimationFrame( () => {
      updateDraw();
    });
  });

  rotationInput.addEventListener('change', () => {
    window.requestAnimationFrame( () => {
      updateDraw();
    });
  });

}


function updateDraw() {
  drawTree(ctx,
    Number.parseFloat(angleInput.value)/100,
    Number.parseFloat(scaleInput.value)/100,
    Number.parseFloat(widthInput.value)/100,
    Number.parseInt(lengthInput.value),
    clearInput.checked,
    colorInput.checked);
}


function drawTree(ctx, angle, scale, width, length, clear = true, color = false) {
  ctx.resetTransform();
  if (clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
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