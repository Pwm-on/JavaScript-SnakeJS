/*
    1) Implementação dos itens básicos do projetos
    Nessa primeira parte, será implementado alguns itens de suma importância para o projeto
    como váriaveis, funções e elementos DOM a serem manipulados.
*/
// Configurando váriaveis globais utilizado no projeto.
const vel = 20 // Velocidade do movimento da Snake, sendo 20 px
var snake = []// Array que representa a Snake no jogo
var body = 3 // Tamanho da Snake no jogo
var pontos = 0 // Pontos adquiridos a capturar as Seeds
var hs = 0 // Abreviação de highscore, pontuação máxima alcançada
var px = 0 // Variável auxiliar para incremento e decremento no eixo x da velocidade
var py = 0 // Variável auxiliar para incremento e decremento no eixo y da velocidade
var pinicial = 0
var snakex // Posição final da Snake no eixo x
var snakey // Posição final da Snake no eixo y
var seedx // Posição final da Seed no eixo x
var seedy // Posição final da Seed no eixo y
var direcao = 0 // Váriavel responsável para fazer o controle da direção da Snake
var saida // Variável para finalização de loop de verificação da posição da Seed após ser coletada

// Configuração do DOM do projeto
var layout = document.getElementById("layout")
var layoutcontexto = layout.getContext("2d")
var pontuacao = document.getElementById("score")
var highscore = document.getElementById("highscore")
var pontuacao = document.getElementById("score")

/*
    2) Implementação das funções do jogo
    As funções abaixo fazem todo a lógica de processamento do jogo, como criação das Seeds
    e da movimentação da Snake. Mais detalhes sobre cada serão explicadas.
*/
// Função e chamada de função para movimentação da Snake
document.addEventListener("keydown", movimentosSnake)

/* 
    A movimentação da Snake funciona em conjunto com o evento "jogo", a função "movimentosSnake" 
    capta uma tecla dos direcionais e incrementa ou decrementa a velocidade no eixo x e no eixo y.
    Essa velocidade alterada então passa para a posição da Snake que é modificada constantemente
    na função intervalar "jogo", fazendo assim a Snake se movimentar.
*/

function movimentosSnake(event) {
    if (direcao == 0) {
        switch (event.keyCode) {
            case 37: // Esquerda
                px = -vel
                py = 0
                direcao = event.keyCode
                break
            case 38: // Acima
                px = 0
                py = -vel
                direcao = event.keyCode
                break
            case 39: // Direita
                px = +vel
                py = 0
                direcao = event.keyCode
                break
            case 40: // Abaixo
                px = 0
                py = +vel
                direcao = event.keyCode
                break
            default:
                break
        }
    }
    else {
        if (direcao == 37) {
            switch (event.keyCode) {
                case 38: // Acima
                    px = 0
                    py = -vel
                    direcao = 38
                    break
                case 40: // Abaixo
                    px = 0
                    py = +vel
                    direcao = 40
                    break
                default:
                    break
            }
        }
        if (direcao == 38) {
            switch (event.keyCode) {
                case 37: // Esquerda
                    px = -vel
                    py = 0
                    direcao = 37
                    break
                case 39: // Direita
                    px = +vel
                    py = 0
                    direcao = 39
                    break
            }
        }
        if (direcao == 39) {
            switch (event.keyCode) {
                case 38: // Acima
                    px = 0
                    py = -vel
                    direcao = 38
                    break
                case 40: // Abaixo
                    px = 0
                    py = +vel
                    direcao = 40
                    break
            }
        }
        if (direcao == 40) {
            switch (event.keyCode) {
                case 37: // Esquerda
                    px = -vel
                    py = 0
                    direcao = 37
                    break
                case 39: // Direita
                    px = +vel
                    py = 0
                    direcao = 39
                    break
            }
        }
    }
}

function fundoJogo() {
    layoutcontexto.fillStyle = 'aliceblue'
    layoutcontexto.fillRect(0, 0, layout.width, layout.height)
    layoutcontexto.strokeRect(0, 0, layout.width, layout.height)
}
// Função geradora do posicionamento da Snake
function posicaoSnake() {
    snakex = Math.ceil(Math.random() * layout.width)
    snakey = Math.ceil(Math.random() * layout.width)
    if (snakex % 20 != 0) snakex -= snakex % 20
    if (snakey % 20 != 0) snakey -= snakey % 20
}

// Função geradora do posicionamento da Snake
function posicaoSeed() {
    seedx = Math.ceil(Math.random() * layout.width)
    seedy = Math.ceil(Math.random() * layout.width)
    if (seedx == snakex && seedy == snakey) {
        while (seedx == snakex && seedy == snakey) {
            seedx = Math.ceil(Math.random() * layout.width)
            seedy = Math.ceil(Math.random() * layout.width)
        }
    }
    if (seedx % 20 != 0) seedx -= seedx % 20
    if (seedy % 20 != 0) seedy -= seedy % 20
}

// Chamada das funções de posicionamento para geração dos locais inicias da Snake e da Seed
posicaoSeed()
posicaoSnake()
var x = setInterval(jogo, 90)

function gameOver() {
    clearInterval(x)
}

function cobraSeMordendo() {
    for (var i = 0; i < snake.length; i++) {
        if (i > 4) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                return true
            }
        }
    }
    return false
}

function reiniciar() {
    pinicial = 0
    px = 0
    py = 0
    gameOver()
    var opcao = confirm("Deseja reiniciar o jogo?")
    if (opcao) {
        pontos = 0
        body = 2
        direcao = 0
        fundoJogo()
        posicaoSnake()
        posicaoSeed()
        pontuacao.innerText = "SCORE: " + pontos
        x = setInterval(jogo, 90)
    }
    else {
        alert("Goodbye")
    }
}

function jogo() {
    fundoJogo()
    layoutcontexto.fillStyle = "red"
    layoutcontexto.fillRect(seedx, seedy, 20, 20)
    snakex += px
    snakey += py
    snake.unshift({ x: snakex, y: snakey })
    layoutcontexto.fillStyle = "blue"
    for (var i = 0; i < snake.length; i++) {
        if (i == snake.length - 1) {
            layoutcontexto.fillStyle = "black"
        }
        layoutcontexto.fillRect(snake[i].x, snake[i].y, 20, 20)
        layoutcontexto.fillStyle = "#88aa00"
    }
    while (snake.length > body) {
        snake.pop()
    }

    //Captura das seeds.
    if (seedx == snakex && seedy == snakey) {
        body++
        do {
            posicaoSeed()
            for (var i = 0; i < snake.length; i++) {
                if (snake[i].x == seedx && snake[i].y == seedy) {
                    saida = 0
                    break
                }
                else {
                    saida = 1
                }
            }
        } while (saida == 0)
        pontos++
        pontuacao.innerText = "SCORE: " + pontos
        if (pontos >= hs) {
            hs++
            highscore.innerText = "HIGHSCORE: " + pontos
        }
        else {
            highscore.innerText = "HIGHSCORE: " + hs
        }
    }

    /*
        Estrutura condicional em caso da Snake colidir com a borda do jogo,
        causando o encerramento do mesmo. Se o jogador optar por repetir o jogo,
        o jogo iniciará com o status definido nas variáveis globais.
    */
    if (snake[0].x < 0 || snake[0].x > 400 || snake[0].y < 0 || snake[0].y > 400 || pontos == 398 || cobraSeMordendo()) {
        reiniciar()
    }
}