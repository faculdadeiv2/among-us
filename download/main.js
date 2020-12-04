import { drawRoundedRectangle } from '../lib.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const uploadButtonPos = {    
    x: (canvas.width / 2) - 60,
    y: 250,
    width: 120,
    height: 40,
}

const state = {
    started: false,
    uploadProgress: 0,
    lastTimeChecked: 0,
    animations: 0,
}

const uploadTimes = [
    "Est Time: 1D 23h 44m 12s",
    "Est Time: 1D 23h 44m 12s",
    "Est Time: 22h 12m 56s",
    "Est Time: 22h 12m 56s",
    "Est Time: 22h 12m 56s",
    "Est Time: 5s",
    "Est Time: 4s",
    "Est Time: 3s",
    "Est Time: 2s",
    "Est Time: 1s",
]

const mousePos = {
    x: 0,
    y: 0,
}

canvas.addEventListener('mousedown', (e) => {
    mousePos.x = e.layerX;
    mousePos.y = e.layerY;
});

function checkMouseClick() {
    if (
        uploadButtonPos.x < mousePos.x &&
        uploadButtonPos.x + uploadButtonPos.width > mousePos.x &&
        uploadButtonPos.y < mousePos.y &&
        uploadButtonPos.y + uploadButtonPos.height > mousePos.y
    ) {        
        startUpload();
    }
}

function main() {
    drawBackground();
    drawWindow();
    if (state.started) {
        animateFloatingPaper();
        updateUploadState();
        drawFilledBar();
        drawProgressBar();
        drawProgressText();
        drawStaticText();
        drawEstimatedTime();
    } else {
        checkMouseClick();
        drawStartButton();
    }
    drawLeftFolder();
    drawRightFolder();
    requestAnimationFrame(main);
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(
        canvas.width / 2,
        0,
        canvas.width / 2,
        canvas.height
    );

    gradient.addColorStop(0, '#333');
    gradient.addColorStop(0.1, '#777');
    gradient.addColorStop(0.3, '#aaa');
    gradient.addColorStop(0.7, '#aaa');
    gradient.addColorStop(0.9, '#777');
    gradient.addColorStop(1, '#333');
    
    drawRoundedRectangle({
        ctx,
        fill: gradient,
        stroke: 'black',
        lineWidth: 4,
        radius: 10,
        x: 10,
        y: 10,
        width: canvas.width - 20,
        height: canvas.height - 20,
    });
}

function drawWindow() {
    const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
    );

    gradient.addColorStop(0, '#637685');
    gradient.addColorStop(0.25, '#6887A8');
    gradient.addColorStop(0.5, '#637685');
    gradient.addColorStop(0.75, '#6887A8');
    gradient.addColorStop(1, '#637685');

    drawRoundedRectangle({
        ctx,
        fill: gradient,
        stroke: 'black',
        lineWidth: 4,
        radius: 10,
        x: 40,
        y: 40,
        width: canvas.width - 80,
        height: canvas.height - 120,
    });
}

function drawLeftFolder() {
    const gradient = ctx.createLinearGradient(
        80,
        108,
        200,
        200,
    );

    gradient.addColorStop(0, 'rgb(214, 182, 132)');
    gradient.addColorStop(0.25, 'rgb(237, 207, 158)');
    gradient.addColorStop(0.5, 'rgb(221, 192, 148)');
    gradient.addColorStop(0.75, 'rgb(237, 207, 158)');
    gradient.addColorStop(1, 'rgb(214, 182, 132)');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#A18253';

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(80, 108);
    ctx.lineTo(100, 108);
    ctx.lineTo(120, 140);
    ctx.lineTo(80, 140);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // Rotations!
    ctx.beginPath();
    ctx.fillStyle = "#DCE4EA";
    ctx.strokeStyle = "#6D8297";
    ctx.translate(80, 120);
    ctx.rotate(Math.PI / -4);
    ctx.rect(-15, 15, 80, 60);
    ctx.translate(-80, -120);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#DCE4EA";
    ctx.strokeStyle = "#6D8297";
    ctx.translate(120, 160);
    ctx.rect(-40, -5, 80, 60);
    ctx.translate(-120, -160);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#A18253';
    ctx.rect(80, 120, 120, 80);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

}

function drawRightFolder() {

    ctx.beginPath();
    ctx.fillStyle = '#ECCE9D';
    ctx.strokeStyle = '#A18253';
    ctx.rect(405, 120, 120, 80);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = '#C2A26A';
    ctx.strokeStyle = '#A18253';
    ctx.moveTo(380, 130);
    ctx.lineTo(505, 130);
    ctx.lineTo(525, 200);
    ctx.lineTo(405, 200);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawProgressBar() {
    drawRoundedRectangle({
        ctx,
        fill: 'transparent',
        stroke: 'black',
        lineWidth: 4,
        radius: 10,
        x: 100,
        y: 250,
        width: 350,
        height: 25,
    });
}

function drawFilledBar() {
    drawRoundedRectangle({
        ctx,
        fill: 'white',
        lineWidth: 4,
        radius: 0,
        x: 103,
        y: 250,
        width: 344 * (state.uploadProgress / 100),
        height: 25,
    });
}

function drawProgressText() {
    ctx.font = '30px Roboto';
    ctx.fillStyle = "white";
    ctx.strokeText(Math.floor(state.uploadProgress) + "%", 470, 272.3);
    ctx.font = '30px Roboto';
    ctx.fillText(Math.floor(state.uploadProgress) + "%", 470, 272.3)
}

function drawStaticText() {

    // My Tablet
    ctx.font = '24px Roboto';
    ctx.fillStyle = "white";
    ctx.strokeText("My Tablet", 85, 230);
    ctx.font = '24px Roboto';
    ctx.fillText("My Tablet", 85, 230);

    // Headquarters
    ctx.font = '24px Roboto';
    ctx.fillStyle = "white";
    ctx.strokeText("Headquarters", 390, 230);
    ctx.font = '24px Roboto';
    ctx.fillText("Headquarters", 390, 230);
}

function drawEstimatedTime() {
    const uploadIndex = Math.floor(state.uploadProgress / 10);
    ctx.font = '24px Roboto';
    ctx.fillStyle = "white";
    ctx.strokeText(uploadTimes[uploadIndex], 100, 305);
    ctx.font = '24px Roboto';
    ctx.fillText(uploadTimes[uploadIndex], 100, 305);
}

function drawStartButton() {
    drawRoundedRectangle({
        ctx,
        fill: '#BCBBBD',
        stroke: 'black',
        lineWidth: 4,
        radius: 10,
        x: (canvas.width / 2) - 60,
        y: 250,
        width: 120,
        height: 40,
    });

    // Upload Text
    ctx.font = '24px Roboto';
    ctx.fillStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeText("Upload", canvas.width / 2 - 37.5, 278);
    ctx.font = '24px Roboto';
    ctx.fillText("Upload", canvas.width / 2 - 37.5, 278);
}

function startUpload() {
    state.lastTimeChecked = new Date().getTime();
    state.started = true;
    mousePos.x = 0;
    mousePos.y = 0;
}

function endUpload() {
    state.started = false;
    state.uploadProgress = 0;
    state.lastTimeChecked = 0;
    state.animations = 0;
}

function updateUploadState() {
    const now = new Date().getTime();
    const difference = now - state.lastTimeChecked;
    const secondDifference = difference;
    state.lastTimeChecked = now;
    state.uploadProgress += secondDifference / 100;

    if (state.uploadProgress > 100) {
        endUpload();
    }
}

function animateFloatingPaper() {
    if (
        (state.uploadProgress > 10 && state.uploadProgress < 30) || 
        (state.uploadProgress > 40 && state.uploadProgress < 60) || 
        (state.uploadProgress > 70 && state.uploadProgress < 90)
    ) {
        state.animateProgress = 
        ctx.beginPath();
        ctx.fillStyle = "#DCE4EA";
        ctx.strokeStyle = "#6D8297";
        ctx.translate(80 + (state.uploadProgress - state.animations) * 10 , 120);
        ctx.rotate(Math.PI * (state.uploadProgress - state.animations) / 100);
        ctx.rect(-15, 15, 80, 60);
        ctx.translate(-80 - (state.uploadProgress + state.animations) / 20, -120);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    if (state.uploadProgress > 30) {
        state.animations = 30;
        if (state.uploadProgress > 60) {
            state.animations = 60;
        }
    }
}

main();