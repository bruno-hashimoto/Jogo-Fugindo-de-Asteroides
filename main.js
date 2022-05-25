var canvas = document.getElementById('canvas-background');
var ctx = canvas.getContext('2d');

// Player 1
let x_vermelho = 0;
let y_vermelho = 200;
let largura_vermelho = 30;
let altura_vermelho = 30;

// Player 2
let x_azul = 700;
let y_azul = 150;
let largura_azul = 40;
let altura_azul = 40;

let inimigos = [];

for (i = 0; i < 20; i++) {
    inimigos.push(
        {
            x: gerarValorRandomico(1, 400),
            y: gerarValorRandomico(1, 400),
            speed: gerarValorRandomico(1, 2),
            escala: gerarValorRandomico(1, 2)
        }
    );
}

let estado = true;

// Pontos = Segundos
let n = 0;
let variavelqualquer = setInterval(function () {
    n++;
}, 1000);

// Chamando gameloop a cada 50 milisegundos
gameLoop();

function detectarColisao(x_vermelho, y_vermelho, escala) {
    if (((x_vermelho + largura_vermelho * escala) > x_azul && x_vermelho < (x_azul + largura_azul)) && ((y_vermelho + altura_vermelho * escala) > y_azul && y_vermelho < (y_azul + altura_azul))) {
        // interrompe o game loop
        clearTimeout();
        gameOver();
    }
}

// Coração do jogo
function gameLoop() {
    if (!estado) {
        return
    }

    desenharQuadrado(x_vermelho, y_vermelho);
    desenharQuadrado(x_azul, y_azul);
    requestAnimationFrame(gameLoop);
    placar(n);

}

function desenharQuadrado(px, py) {
    //Limpar o canvas antes desenhar
    ctx.clearRect(0, 0, 800, 400);

    base_image2 = new Image();
    base_image2.src = './imagens/asteroide.png';

    inimigos.forEach(inimigo => {
        ctx.drawImage(base_image2, inimigo.x, inimigo.y, largura_vermelho * inimigo.escala, altura_vermelho * inimigo.escala)
        detectarColisao(inimigo.x, inimigo.y, inimigo.escala);

        inimigo.x += inimigo.speed;

        if (inimigo.x > 800) {
            inimigo.x = 0;
        }
    });

    base_image = new Image();
    base_image.src = './imagens/nave.png';
    ctx.drawImage(base_image, x_azul, y_azul, largura_azul, altura_azul);
}

window.onkeydown = pressionaTecla;

function pressionaTecla(tecla) {
    // esquerda
    if (tecla.keyCode == 37 && x_azul > 0) {
        x_azul = x_azul - 15;
    }
    // direita
    else if (tecla.keyCode == 39 && x_azul < 750) {
        x_azul = x_azul + 15;
    }
    // cima
    else if (tecla.keyCode == 38 && y_azul > 0 ) {
        y_azul = y_azul - 15;
    }
    // baixo
    else if (tecla.keyCode == 40 && y_azul < 350) {
        y_azul = y_azul + 15;
    }

    //console.log('código pressionado ' + tecla.keyCode);
}

function gameOver() {
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 300, 200);

    estado = false;
    // Pausa o incremento na variavel n
    clearInterval(variavelqualquer);
}

function placar(pontos = 0) {
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.fillText("Pontos: " + pontos, 20, 380);
}

function gerarValorRandomico(min, max) {
    return Math.random() * (max - min) + min;
}
