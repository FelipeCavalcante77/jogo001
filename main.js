let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
let ballRadius = 9;
let x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
let y = canvas.height - 40;
let dx = 2;
let dy = -2;

let paddleHeight = 12;
let paddleWidth = 72;

// Posição inicial da raquete
let paddleX = (canvas.width - paddleWidth) / 2;

let rowCount = 5;
let columnCount = 9;
let brickWidth = 54;
let brickHeight = 18;
let brickPadding = 12;
let topOffset = 40;
let leftOffset = 33;
let score = 0;

let gameStarted = false; // Variável para rastrear se o jogo começou

// Bricks array
let bricks = [];
for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        // Set position of bricks
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

// EventListener e função de movimento do mouse
document.addEventListener('mousemove', mouseMoveHandler, false);

// Move paddle with mouse
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Desenhar a raquete
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// Desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
// Desenhar os tijolos
function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + leftOffset;
                let brickY = r * (brickHeight + brickPadding) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Acompanhar a pontuação
function trackScore() {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Score : ' + score, 8, 24);
}

// Verificar se a bola atingiu os tijolos
function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // Check win
                    if (score === rowCount * columnCount) {
                        alert('Você Ganhou, parabéns! = )');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Função principal
function init() {
    if (!gameStarted) {
        // Aguarde a barra de espaço para iniciar o jogo
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // Detect left and right walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Detectar parede superior
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Detect paddle hits
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // If ball doesn't hit paddle
            alert('Game Over! =(');
            document.location.reload();
        }
    }

    // Parede inferior
    if (y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }

    // Mover a bola
    x += dx;
    y += dy;
}

// Iniciar o jogo quando a barra de espaço for pressionada
document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        gameStarted = true;
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        // Mova a raquete para a direita (aumentando a posição da raquete)
        paddleX += 70; // Ajuste o valor conforme necessário
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        // Mova a raquete para a direita (aumentando a posição da raquete)
        paddleX -= 70; // Ajuste o valor conforme necessário
    }
});
setInterval(init, 10);