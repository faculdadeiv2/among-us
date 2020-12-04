const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Setup de canvas e constantes de contexto
canvas.width = 500;
canvas.height = 500;
ctx.lineWidth = 5;

// Setup de imagens e constantes do meteoro
const image = document.getElementById('asteroid');
const image2 = document.getElementById('asteroid2');
const image3 = document.getElementById('asteroid3');
const images = [image, image2, image3];
const meteoriteScale = 4;

// Setup de estados do mouse
const mouseState = {
    x: 0,
    y: 0,
    clicked: false,
}
const crosshairPadding = 40;

// Setup de estados de tempo
const timeState = {
    lastSpawn: 0,
    timeSinceLastSpawn: 0,
    spawnDelay: 1000,
}

// Variáveis de meteoro
let meteoritesDestroyed = 0;
let meteorites = []

canvas.addEventListener('mousemove', (e) => {
    mouseState.x = e.layerX;
    mouseState.y = e.layerY;
});

canvas.addEventListener('mousedown', (e) => {
    mouseState.clicked = true;
    meteorites.forEach(meteorite => {
        if (
            Math.sqrt((mouseState.x-meteorite.x)*(mouseState.x-meteorite.x) + (mouseState.y-meteorite.y)*(mouseState.y-meteorite.y)) < meteorite.radius
        ) {
            meteorites = meteorites.filter(meteorit => meteorit.id !== meteorite.id);
            meteoritesDestroyed++;
        }
    })
});

function main() {
    clearCanvas();
    drawBackground();
    drawMeteorites();
    spawnMeteorite();
    drawCrosshair();
    drawText();
    requestAnimationFrame(main);
}

function drawBackground() {

    ctx.strokeStyle = 'rgb(33, 143, 24)';
    ctx.beginPath();
    ctx.moveTo(0, 2.5);
    ctx.lineTo(32.5, 2.5);
    ctx.moveTo(canvas.width - 32.5, 2.5);
    ctx.lineTo(canvas.width - 2.5, 2.5);
    ctx.lineTo(canvas.width - 2.5, 32.5);
    ctx.moveTo(canvas.width - 2.5, canvas.height - 32.5);
    ctx.lineTo(canvas.width - 2.5, canvas.height - 2.5);
    ctx.lineTo(canvas.width - 32.5, canvas.height - 2.5);
    ctx.moveTo(32.5, canvas.height - 2.5);
    ctx.lineTo(2.5, canvas.height - 2.5);
    ctx.lineTo(2.5, canvas.height - 32.5);
    ctx.moveTo(2.5, 32.5);
    ctx.lineTo(2, 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgb(56, 85, 70)';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = 'rgba(112, 176, 114, 1)';
    ctx.fillRect(25, 25, canvas.width - 50, canvas.height - 50);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCrosshair() {
    ctx.strokeStyle = 'rgba(45, 85, 25, 1)';
    ctx.strokeRect(
        mouseState.x - crosshairPadding / 2,
        mouseState.y - crosshairPadding / 2,
        crosshairPadding,
        crosshairPadding,
    );

    ctx.strokeRect(
        mouseState.x - crosshairPadding / 8,
        mouseState.y,
        crosshairPadding / 4,
        1,
    );

    ctx.strokeRect(
        mouseState.x,
        mouseState.y - crosshairPadding / 8,
        1,
        crosshairPadding / 4,
    );

    ctx.beginPath();
    ctx.moveTo(mouseState.x + crosshairPadding / 2 - 7.5, mouseState.y);
    ctx.lineTo(mouseState.x + crosshairPadding / 2 + 7.5, mouseState.y);
    ctx.moveTo(mouseState.x - crosshairPadding / 2 - 7.5, mouseState.y);
    ctx.lineTo(mouseState.x - crosshairPadding / 2 + 7.5, mouseState.y);
    ctx.moveTo(mouseState.x, mouseState.y - crosshairPadding / 2 - 7.5);
    ctx.lineTo(mouseState.x, mouseState.y - crosshairPadding / 2 + 7.5);
    ctx.moveTo(mouseState.x, mouseState.y + crosshairPadding / 2 - 7.5);
    ctx.lineTo(mouseState.x, mouseState.y + crosshairPadding / 2 + 7.5);
    ctx.closePath();
    ctx.stroke();
}

function drawMeteorites() {
    meteorites.forEach(meteorite => {
        meteorite.x += meteorite.speedX;
        meteorite.y += meteorite.speedY;
        ctx.fillStyle = "rgba(45, 125, 25, 1)";
        ctx.beginPath();
        ctx.drawImage(
            meteorite.image,
            meteorite.x - (meteorite.radius * meteoriteScale) / 2,
            meteorite.y - (meteorite.radius * meteoriteScale) / 2,
            (meteorite.radius * meteoriteScale),
            (meteorite.radius * meteoriteScale),
        );
        ctx.closePath();
        ctx.fill();
    });

    meteorites = meteorites.filter(meteorite => meteorite.x > -50 || meteorite.y < canvas.height + 50);
}

function createMeteorite() {
    meteorites.push({
        id: new Date().getTime(),
        image: images[Math.floor(Math.random() * images.length)], // Imagem aleatória do meteoro
        radius: Math.floor(Math.random() * 15) + 25,
        x: canvas.width,
        y: Math.floor(Math.random() * (canvas.width / 2) + 50),
        speedX: -Math.floor(Math.random() * 3) - 3,
        speedY: Math.floor(Math.random()) + 2
    });
}

function spawnMeteorite() {
    const now = new Date().getTime();
    timeState.timeSinceLastSpawn = now - timeState.lastSpawn;
    if (timeState.timeSinceLastSpawn > timeState.spawnDelay) {
        timeState.lastSpawn = now;
        timeState.timeSinceLastSpawn = 0;
        createMeteorite();
    }
}

function drawText() {
    // Destroyed
    ctx.font = '60px VT323';
    ctx.fillStyle = "rgba(45, 105, 25, 0.6)";
    ctx.fillText("Destroyed: " + meteoritesDestroyed, 100, canvas.height - 50);
}

main();