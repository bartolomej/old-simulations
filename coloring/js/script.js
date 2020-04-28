window.addEventListener('load', onLoad);

let colorInput;
let imageInput;
let dimensionsText;
let color = null;
let table;

function onLoad () {
  colorInput = document.getElementById('select-color');
  imageInput = document.getElementById('select-image');
  dimensionsText = document.getElementById('show-dimensions');
  registerListeners();
}

function registerListeners () {
  colorInput.addEventListener('input', e => color = e.target.value);
  imageInput.addEventListener('input', e => onImageSelect(e.target.value));
}

function setImageDimensions (x, y) {
  dimensionsText.innerText = `width: ${x}px, height: ${y}px`
}

function onImageSelect (image) {
  let imageData;
  switch (image) {
    case 'image1':
      imageData = slika1;
      break;
    case 'image2':
      imageData = slika2;
      break;
    case 'image3':
      imageData = slika3;
      break;
    case 'image4':
      imageData = slika4;
      break;
    default:
      throw new Error(`Image ${image} doesn't exist`);
  }
  let width = imageData[0];
  let data = [];
  let rowData = [];
  for (let i = 1; i < imageData.length; i++) {
    if (rowData.length === width) {
      data.push(rowData);
      rowData = [];
    }
    rowData.push(imageData[i]);
  }
  setImageDimensions(data[0].length, data.length);
  drawImage(data);
}

function getCell (x, y) {
  const cell = (x, y) => document.getElementById(`${x},${y}`);
  let neighbours = [
    cell(x, y - 1),
    cell(x + 1, y),
    cell(x, y + 1),
    cell(x - 1, y)
  ].filter(e => !!e);
  return { cell: cell(x, y), neighbours }
}

async function pause (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function onCellClick (x, y, e) {
  if (!color) {
    return alert("Choose coloring color");
  }
  let visited = {};
  let start = getCell(x, y);
  let startColor = start.cell.className;
  let field = start.neighbours;
  while (true) {
    let nColored = 0;
    await pause(100);
    let nextField = [];
    for (let i = 0; i < field.length; i++) {
      const cell = field[i];
      const [x, y] = cell.id.split(',').map(parseFloat);
      if (cell.className === startColor) {
        cell.className = color;
        visited[cell.id] = true;
        nColored++;
        nextField.push(...getCell(x, y).neighbours);
      }
    }
    field = nextField;
    if (nColored === 0) {
      break;
    }
  }
}

function drawImage (image) {
  const container = document.querySelector('#body');
  if (container.children.length > 0) {
    container.getElementsByTagName('table')[0].remove();
  }
  table = document.createElement('table');
  for (let i = 0; i < image.length; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < image[i].length; j++) {
      const td = document.createElement('td');
      td.className = `siva${image[i][j]}`;
      td.id = `${j},${i}`;
      td.addEventListener('click', e => onCellClick(j, i, e));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  container.appendChild(table);
}
