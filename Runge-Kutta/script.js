//Runge-Kutta法
//数値解を赤、解析解を青で表示
const xLeft = -100;
const xRight = 100;
const yTop = 100;
const yBottom = -100;
let t1 = 0;
const x1 = [0.0, 50.0];
const h = 0.1;
const ifDrawVectorField = true;
const drawVectorStep = 20;

function setup() {
    createCanvas(600, 600);
    background(255);
    applyTransform();
    if (ifDrawVectorField) {
        drawVectorField(drawVectorStep);
    }
}

function draw() {
    applyTransform();
    const d = x1.length;
    const x2 = new Array(d);
    const tmp = new Array(d);
    const f1 = new Array(d);
    const f2 = new Array(d);
    const f3 = new Array(d);
    const f4 = new Array(d);

    const t2 = t1 + h;

    dx(t1, x1, f1);
    for (let j = 0; j < d; ++j) {
        tmp[j] = x1[j] + (h * f1[j]) / 2;
    }
    dx(t1, tmp, f2);
    for (let j = 0; j < d; ++j) {
        tmp[j] = x1[j] + (h * f2[j]) / 2;
    }
    dx(t1, tmp, f3);
    for (let j = 0; j < d; ++j) {
        tmp[j] = x1[j] + h * f3[j];
    }
    dx(t1, tmp, f4);

    for (let j = 0; j < d; ++j) {
        x2[j] = x1[j] + (h * (f1[j] + 2 * f2[j] + 2 * f3[j] + f4[j])) / 6;
    }
    //数値解を赤で表示
    stroke(255, 0, 0);
    line(x1[0], x1[1], x2[0], x2[1]);
    //解析解を青で表示
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

function dx(t, xt, dxt) {
    let r = sqrt(xt[0] ** 2 + xt[1] ** 2);
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
