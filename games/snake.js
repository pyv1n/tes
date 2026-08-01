const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const restartBtn = document.getElementById("restartBtn");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let direction;
let nextDirection;
let score;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let gameSpeed;
let gameLoop;
let paused;
let pulse = 0;

highScoreEl.textContent = highScore;

function init() {

    snake = [
        { x: 10, y: 10 }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };

    score = 0;
    paused = false;
    gameSpeed = 150;

    scoreEl.textContent = score;

    spawnFood();

    clearInterval(gameLoop);
    gameLoop = setInterval(update, gameSpeed);

}

function spawnFood() {

    while (true) {

        const x = Math.floor(Math.random() * tileCount);
        const y = Math.floor(Math.random() * tileCount);

        const onSnake = snake.some(part => part.x === x && part.y === y);

        if (!onSnake) {

            food = { x, y };
            return;

        }

    }

}

function update() {

    if (paused) return;

    direction = nextDirection;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Tabrak tembok
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= tileCount ||
        head.y >= tileCount
    ) {
        gameOver();
        return;
    }

    // Tabrak badan
    if (
        snake.some(part => part.x === head.x && part.y === head.y)
    ) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Makan makanan
    if (head.x === food.x && head.y === food.y) {

        score++;
        scoreEl.textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHighScore", highScore);
            highScoreEl.textContent = highScore;
        }

        // Tambah kecepatan setiap 5 poin
        if (score % 5 === 0 && gameSpeed > 60) {

            gameSpeed -= 10;

            clearInterval(gameLoop);
            gameLoop = setInterval(update, gameSpeed);

        }

        spawnFood();

    } else {

        snake.pop();

    }

    draw();

}

function draw() {

    // Background
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.05)";

    for (let i = 0; i <= tileCount; i++) {

        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();

    }

    // Makanan (Pulse Animation)
pulse += 0.15;

const radius = gridSize / 2.8 + Math.sin(pulse) * 2;

ctx.shadowColor = "#ef4444";
ctx.shadowBlur = 15;

ctx.fillStyle = "#ef4444";
ctx.beginPath();
ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    radius,
    0,
    Math.PI * 2
);
ctx.fill();

ctx.shadowBlur = 0;

    // Ular
    snake.forEach((part, index) => {

        ctx.fillStyle = index === 0 ? "#22c55e" : "#4ade80";

        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur = 10;

        ctx.fillRect(
            part.x * gridSize + 2,
            part.y * gridSize + 2,
            gridSize - 4,
            gridSize - 4
        );

        // Mata kepala ular
        if (index === 0) {

            ctx.shadowBlur = 0;
            ctx.fillStyle = "#ffffff";

            let eye1x, eye1y, eye2x, eye2y;

            if (direction.x === 1) {

                eye1x = part.x * gridSize + 14;
                eye2x = part.x * gridSize + 14;
                eye1y = part.y * gridSize + 5;
                eye2y = part.y * gridSize + 13;

            } else if (direction.x === -1) {

                eye1x = part.x * gridSize + 6;
                eye2x = part.x * gridSize + 6;
                eye1y = part.y * gridSize + 5;
                eye2y = part.y * gridSize + 13;

            } else if (direction.y === -1) {

                eye1x = part.x * gridSize + 5;
                eye2x = part.x * gridSize + 13;
                eye1y = part.y * gridSize + 6;
                eye2y = part.y * gridSize + 6;

            } else {

                eye1x = part.x * gridSize + 5;
                eye2x = part.x * gridSize + 13;
                eye1y = part.y * gridSize + 14;
                eye2y = part.y * gridSize + 14;

            }

            ctx.beginPath();
            ctx.arc(eye1x, eye1y, 2, 0, Math.PI * 2);
            ctx.arc(eye2x, eye2y, 2, 0, Math.PI * 2);
            ctx.fill();

        }

    });

}

function gameOver() {

    clearInterval(gameLoop);

    ctx.fillStyle = "rgba(0,0,0,.65)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = "20px Arial";
    ctx.fillText("Tekan R atau Restart", canvas.width / 2, canvas.height / 2 + 30);

}

document.addEventListener("keydown", (e) => {

    const key = e.key.toLowerCase();

    // Pause
    if (key === "p") {
        paused = !paused;
        return;
    }

    // Restart
    if (key === "r") {
        init();
        return;
    }

    // Atas
    if ((key === "arrowup" || key === "w") && direction.y !== 1) {
        nextDirection = { x: 0, y: -1 };
    }

    // Bawah
    if ((key === "arrowdown" || key === "s") && direction.y !== -1) {
        nextDirection = { x: 0, y: 1 };
    }

    // Kiri
    if ((key === "arrowleft" || key === "a") && direction.x !== 1) {
        nextDirection = { x: -1, y: 0 };
    }

    // Kanan
    if ((key === "arrowright" || key === "d") && direction.x !== -1) {
        nextDirection = { x: 1, y: 0 };
    }

});

restartBtn.addEventListener("click", init);

// Gambar pertama
draw();

// Mulai game
init();