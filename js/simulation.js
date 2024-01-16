function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let speed = 5; // Defina a velocidade desejada (5 é a velocidade padrão)
let isRunning = true; // Flag para indicar se a simulação está em execução

function setup() {
  createCanvas(800, 600);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  reiniciarSimulacao();
}

function draw() {
  frameRate(speed); // Define a taxa de quadros por segundo

  background(255);

  for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
          let x = i * resolution;
          let y = j * resolution;
          if (grid[i][j] == 1) {
              fill(0);
              stroke(255);
              rect(x, y, resolution - 1, resolution - 1);
          }
      }
  }

  if (isRunning) {
      let next = make2DArray(cols, rows);

      // Compute next based on grid
      for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
              let state = grid[i][j];
              // Count live neighbors!
              let sum = 0;
              let neighbors = countNeighbors(grid, i, j);

              if (state == 0 && neighbors == 3) {
                  next[i][j] = 1;
              } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                  next[i][j] = 0;
              } else {
                  next[i][j] = state;
              }
          }
      }

      grid = next;
  }
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
          let col = (x + i + cols) % cols;
          let row = (y + j + rows) % rows;
          sum += grid[col][row];
      }
  }
  sum -= grid[x][y];
  return sum;
}

function atualizarVelocidade(valor) {
  speed = constrain(parseFloat(valor), 1, 60);
  document.getElementById("velocidadeAtual").innerText = speed;
}

function mousePressed() {
  if (!isRunning) {
      // Se a simulação estiver parada, permite adicionar/remover células
      let i = floor(mouseX / resolution);
      let j = floor(mouseY / resolution);
      grid[i][j] = 1 - grid[i][j];
  }
}

function toggleSimulation() {
  // Alterna o estado da simulação (parar/retomar)
  isRunning = !isRunning;
}

//Apaga a SImulação
function clearSimulation() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function reiniciarSimulacao() {
  // Cria uma nova grade com estados aleatórios
  for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
          grid[i][j] = floor(random(2));
      }
  }
}