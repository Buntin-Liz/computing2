//Euler法

const eulerSteps = 1000;
const h = 1;
const xLeft = -100;
const xRight = 100;
const yTop = 100;
const yBottom = -100;

const x1 = [0, 50];
const d = x1.length;
let t1 = 0;

function setup() {
    createCanvas(600, 600);
    background(255);
    applyTransform();
    drawVectorField(20);
}

function draw() {
    applyTransform();
    const x2 = new Array(d);
    const dx1 = new Array(d);
    const buffer = new Array(d);
    for (let i = 0; i < d; i++) {
        buffer[i] = x1[i];
    }

    for (let i = 0; i < eulerSteps; ++i) {
        const t2 = t1 + h / eulerSteps;
        dx(t1, x1, dx1);
        for (let j = 0; j < d; ++j) {
            x2[j] = x1[j] + (h / eulerSteps) * dx1[j];
        }
        stroke(0, 0, 255);
        line(
            -50 * sin(t1 / 2),
            50 * cos(t1 / 2),
            -50 * sin(t2 / 2),
            50 * cos(t2 / 2)
        );

        t1 = t2;
        for (let j = 0; j < d; ++j) {
            x1[j] = x2[j];
        }
    }
    stroke(255, 0, 0);
    line(buffer[0], buffer[1], x2[0], x2[1]);
}
//ベクトル場
function dx(t, xt, dxt) {
    var r = sqrt(xt[0] ** 2 + xt[1] ** 2);
    dxt[0] = (r / 2) * cos(atan2(xt[1], xt[0]) + (1 / 2) * PI);
    dxt[1] = (r / 2) * sin(atan2(xt[1], xt[0]) + (1 / 2) * PI);
}

function applyTransform() {
    resetMatrix();
    scale(width / (xRight - xLeft), height / (yBottom - yTop));
    translate(-xLeft, -yTop);
    strokeWeight((xRight - xLeft) / width);
}

function drawVectorField(steps) {
    const tmpX = new Array(2);
    const tmpDx = new Array(2);
    const xStep = (xRight - xLeft) / steps;
    const yStep = (yTop - yBottom) / steps;
    for (let x = xLeft; x <= xRight; x += xStep) {
        for (let y = yBottom; y <= yTop; y += yStep) {
            tmpX[0] = x;
            tmpX[1] = y;
            dx(0, tmpX, tmpDx);
            drawVector(tmpX[0], tmpX[1], tmpDx[0], tmpDx[1]);
        }
    }
}

function drawVector(x, y, dx, dy) {
    const d = dist(0, 0, dx, dy) / 50;
    const theta = atan2(dy, dx);
    stroke(0);
    line(x, y, d * cos(theta) + x, d * sin(theta) + y);
}
