SnakeJS
    O seguinte projeto da Snake foi realizado utilizando HTML e JavaScript.

Índice
    1) Valores globais
    2) Funções

    1) Valores globais
        a) const vel = 20 // Velocidade do movimento da Snake, sendo 20 px

        b) var snake = []// Array que representa a Snake no jogo

        c) var body = 3 // Tamanho da Snake no jogo

        d) var pontos = 0 // Pontos adquiridos a capturar as Seeds

        e) var hs = 0 // Abreviação de highscore, pontuação máxima alcançada

        f) var px = 0 // Variável auxiliar para incremento e decremento no eixo x da velocidade

        g) var py = 0 // Variável auxiliar para incremento e decremento no eixo y da velocidade

        h) var snakex // Posição final da Snake no eixo x

        i) var snakey // Posição final da Snake no eixo y

        j) var seedx // Posição final da Seed no eixo x

        k) var seedy // Posição final da Seed no eixo y

        l) var direcao = 0 // Váriavel responsável para fazer o controle da direção da Snake

        m) var saida // Variável para finalização de loop de verificação da posição da Seed após ser coletada

    2) Funções

        a) function movimentosSnake: 
            O movimento da snake é feita com base nos eventos de tecla ("keydown"). Ao ser pressionado uma das teclas
            direcionais, a Snake move-se para cima (event.keycode == 37), para cima (event.keycode == 38), para direita
            (event.keycode == 39) e para baixo (event.keycode == 40). Para que a Snake não altere em 180º a sua trajétoria
            (ou seja, quando a Snake estiver em uma direção não alterar na direção oposta), é utilizada a variável "direção".
            Inicialmente, "direção" vale 0 é quando o jogador apertar qualquer um dos direcionais, seu valor será o mesmo da
            tecla apertada. Isso fará com que na próxima tecla que o jogador aperta, a Snake irá atender somente o valor da
            direção: se na primeira interação o jogador apertar para esquerda, "direção" receberá o valor 37 e quando o jogador
            apertar qualquer tecla, a Snake só aceitará as teclas acima e abaixo e só sairá do looping ao pressionar essas teclas.
            No caso do exemplo acima citado, se a primeira for pra esquerda, a segunda for acima, o próximo looping será relacionado
            a tecla para cima e assim sucessivamente até que ocorra o fim do jogo, onde "direção" voltará ao valor inicial de 0.

        b) function fundoJogo:
            Essa função é responsável por gerar o canvas do jogo. Ele é incluido dentro da função jogo para que toda vez
            que tiver um intervalo de 80ms (definido pelo setinterval), todo o fundo da aplicação é gerado.

        c) function posicaoSnake: 
            Essa função gera a posição inicial da snake, que consiste de duas vertentes: snakex e snakey. Snakex é responsável
            por quantificar o valor da posição no eixo x e snakey no eixoy. O calculo dela consiste em uma função geradora de números aleatorios multiplicado por 400, pois
            esse é o tamanho original do canvas. Depois é aplicado a função matemática ceil para que o valor da posicação da Snake vá de 1 até 400. Como os quadrantes são
            múltiplos de 20, pega-se o valor da posição e retira-se o modulo de 20 para dar números múltiplos de 20.

        d) function posicaoSeed:
            Semelhante a função "posicaoSnake", porém é implementada para a Seed (alimento) que a Snake vai capturar. É chamada no ínicio do jogo e quando houver captura da
            Seed.

        e) function jogo:
            Função principal de todo o código, ocorrendo a cada 90 ms. Responsável por colorir a Seed e a Snake. De início é colorido o canvas responsável pela Seed (seedx 
            e seedy). Após isso, é feito o laço que pinta a Snake (cabeça na cor azul e a cauda na cor preta). Os valores de snakex e snakey é incrementado de px e py (ambas
            setadas na função "movimentosSnake") que é responsável por fazer o movimento da Snake em relação as teclas pressionadas. Os valores da snakex e snakey é inseridas
            na Snake atráves do vetor "snake" utilizando a função unshift (que insere os valores no início do vetor). Um laçõ é feito para fazer a pintura da snake seguindo a ordem
            azul, verde e preto. Como o movimento da snake influencia na "pintura", existe um laço while que retira do final do vetor (pelo metodo pop). Se a "cabeça" da snake
            (representado pelo indíce 0) encontrar com a Seed, é gerado uma nova posição de seed no canvas. Se caso a nova posição Seed coincidir com alguma posição da Snake, é 
            feito um laço até que não coincidam a Seed com alguma parte da Snake. Feita a captura da Seed, aumenta-se os pontos e em caso dos pontos serem iguais ao highscore,
            é mostrado na tela o contador com a pontuação atualizada a cada ponto novo, caso contrário, é mostrado a pontuação atual e o ponto alcançado. Se ocorrer de uma das
            condições de finalização do jogo (choque da cabeça da Snake contra as paredes, quando a função "cobraSeMordendo" retorna true ou quando 
            o total de pontos é 398), reinicia-se o jogo.
            
        f) function cobraSeMordendo:
            Um dos casos de finalização do jogo, quando a cabeça da Snake encostar em uma das partes do corpo, o jogo é finalizado e é chamada a função "reiniciar" onde
            será feita a reinicialização do jogo. Se ocorrer, essa função retorna true, caso contrário, retorna-se false.

        g) function gameOver:
            Essa função fica responsável por finalizar o setInterval assinalado pela variável x. Ela é chamada quando uma das condições de finalização do jogo é chamada,
            pausando o jogo.

        h) function reiniciar:
            Quando as condições de termíno do jogo são alcançadas (choque da cabeça da Snake contra as paredes, quando a função "cobraSeMordendo" retorna true ou quando 
            o total de pontos é 398). As variáveis px e py recebem 0 para deixar a Snake parada, "pontos" é zerado, "posicaoSnake" e "posicaoSeed" são chamadas para gerar
            para o próximo jogo, "body" e "direcao" retornam aos valores originais (2 e 0, respectivamente).