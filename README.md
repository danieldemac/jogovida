<h1 align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif" alt="Blinker"/> Jogo da Vida de Conway <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Game_of_life_animated_glider.gif" alt="Glider"/></h1>


<img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif" alt="Planadores"/>
O Jogo da Vida é um autômato celular fascinante desenvolvido pelo renomado matemático britânico John Horton Conway em 1970. Este repositório contém uma implementação interativa do Jogo da Vida em uma página web, permitindo que os usuários experimentem e observem as complexas dinâmicas emergentes desse autômato celular.

## Descrição

O Jogo da Vida é um modelo matemático que opera em uma grade bidimensional de células. Cada célula pode estar viva ou morta, e a evolução das gerações é determinada por regras simples, resultando em padrões complexos e interessantes.

##Regras
O jogo da vida se passa em um arranjo bidimensional infinito de células que podem estar em um de dois estados, vivo ou morto. Cada célula interage com suas oito vizinhas, as células adjacentes horizontal, vertical e diagonalmente. O jogo evolui em unidades de tempo discretas chamadas de gerações. A cada nova geração, o estado do jogo é atualizado pela aplicação das seguintes regras:

- Toda célula morta com exatamente três vizinhos vivos torna-se viva (nascimento).
- Toda célula viva com menos de dois vizinhos vivos morre por isolamento.
- Toda célula viva com mais de três vizinhos vivos morre por superpopulação.
- Toda célula viva com dois ou três vizinhos vivos permanece viva.
As regras são aplicadas simultaneamente em todas as células para chegar ao estado da próxima geração.

## Funcionalidades

- **Interface interativa:** Visualize e experimente o Jogo da Vida em tempo real.
- **Controles simples:** Controle a evolução das gerações com botões intuitivos. ((Ainda em implementação))
- **Personalização:** Experimente diferentes padrões iniciais e observe como eles evoluem. ((Ainda em implementação))

## Como Usar

1. Clone este repositório:

    ```bash
    git clone https://github.com/danieldemac/game_Conway
    ```

2. Abra o arquivo `index.html` em seu navegador.

3. Experimente diferentes configurações iniciais e observe a evolução do jogo.

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões, correções ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE.md).
