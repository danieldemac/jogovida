    // Variáveis globais
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const largura = canvas.width;
    const altura = canvas.height;
    const tamanhoCelula = 10; // Tamanho da célula
    const tabuleiro = new Array(largura / tamanhoCelula).fill(null).map(() => new Array(altura / tamanhoCelula).fill(0));

    let velocidadeAtual = 5;
    let intervaloTempo = 1000 / (velocidadeAtual + 0.1);
    let timer;

    function desenhaCelula(x, y) {
      ctx.fillStyle = (tabuleiro[x][y] === 1) ? "#ffffff" : "#000000";
      ctx.fillRect(x * tamanhoCelula, y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
    }

    function inicializar() {
      for (let x = 0; x < largura / tamanhoCelula; x++) {
        for (let y = 0; y < altura / tamanhoCelula; y++) {
          tabuleiro[x][y] = Math.random() < 0.5 ? 1 : 0;
        }
      }
      desenhaTabuleiro();
    }

    function desenhaTabuleiro() {
      for (let x = 0; x < largura / tamanhoCelula; x++) {
        for (let y = 0; y < altura / tamanhoCelula; y++) {
          desenhaCelula(x, y);
        }
      }
    }

    function calcularProximaGeracao() {
        // Cria uma nova matriz temporária para a próxima geração
        let novaGeracaoTemporaria = new Array(largura / tamanhoCelula);
        for (let i = 0; i < largura / tamanhoCelula; i++) {
          novaGeracaoTemporaria[i] = new Array(altura / tamanhoCelula);
        }
      
        for (let x = 0; x < largura / tamanhoCelula; x++) {
          for (let y = 0; y < altura / tamanhoCelula; y++) {
            let vizinhosVivos = 0;
            for (let i = x - 1; i <= x + 1; i++) {
              for (let j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && i < largura / tamanhoCelula && j >= 0 && j < altura / tamanhoCelula) {
                  vizinhosVivos += tabuleiro[i][j] === 1 ? 1 : 0;
                }
              }
            }
      
            // Aplica as regras ao tabuleiro temporário
            // Qualquer célula viva com dois ou três vizinhos vivos continua a viver para a próxima geração.
            if (tabuleiro[x][y] === 1 && (vizinhosVivos === 2 || vizinhosVivos === 3)) {
              novaGeracaoTemporaria[x][y] = 1;
            } 
            // Qualquer célula morta com exatamente três vizinhos vivos se torna uma célula viva, como se fosse por reprodução.
            else if (tabuleiro[x][y] === 0 && vizinhosVivos === 3) {
              novaGeracaoTemporaria[x][y] = 1;
            } 
            // Qualquer célula viva com menos de dois vizinhos vivos morre, como se fosse por subpopulação.
            else if(tabuleiro[x][y] === 1 && vizinhosVivos < 2){
              novaGeracaoTemporaria[x][y] = 0;
            } 
            // Qualquer célula viva com mais de três vizinhos vivos morre, como se fosse por superpopulação.
            else if (tabuleiro[x][y] === 1 && vizinhosVivos > 3){
              novaGeracaoTemporaria[x][y] = 0;
            }
            // Mantém o estado atual se nenhuma regra for aplicada
            else {
              novaGeracaoTemporaria[x][y] = tabuleiro[x][y];
            }
          }
        }
      
        // Atualiza o tabuleiro principal com as alterações da próxima geração
        tabuleiro.splice(0, tabuleiro.length, ...novaGeracaoTemporaria);
        desenhaTabuleiro();
      }

    function atualizarVelocidade(valor) {
      velocidadeAtual = parseFloat(valor);
      intervaloTempo = 1000 / (velocidadeAtual + 0.1);
      document.getElementById('velocidadeAtual').textContent = valor;
      reiniciarLoop();
    }

    function reiniciarLoop() {
      clearInterval(timer);
      timer = setInterval(calcularProximaGeracao, intervaloTempo);
    }

    function adicionarCelula(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      const cellX = Math.floor(mouseX / tamanhoCelula);
      const cellY = Math.floor(mouseY / tamanhoCelula);

      tabuleiro[cellX][cellY] = 1 - tabuleiro[cellX][cellY];
      
      desenhaCelula(cellX, cellY);
    }

    inicializar();
    timer = setInterval(calcularProximaGeracao, intervaloTempo);

    canvas.addEventListener("click", function(event) {
      clearInterval(timer);
      adicionarCelula(event);
    });