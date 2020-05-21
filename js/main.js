const UiSelectors = {
    brushColorSelector: 'brush-color',
    canvasColorSelector: 'canvas-color',
    brushSizeSelector: 'brush-size',
    clearButtonSelector: '[data-clear-btn]',
    saveButtonSelector: '[data-save-btn]',
};

const brushColor = document.getElementById(UiSelectors.brushColorSelector);
const canvasColor = document.getElementById(UiSelectors.canvasColorSelector);
const brushSize = document.getElementById(UiSelectors.brushSizeSelector);
const clearButton = document.querySelector(UiSelectors.clearButtonSelector);
const saveButton = document.querySelector(UiSelectors.saveButtonSelector);

const paths = [];
const currentPath = [];

let cnv;

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {
    cnv = createCanvas(640, 480);
    centerCanvas();
    background(canvasColor.value);
}

function windowResized() {
    centerCanvas();
}

function draw() {
    if (mouseIsPressed) {
        const point = {
            x: mouseX,
            y: mouseY,
            color: brushColor.value,
            size: brushSize.value
        };
        currentPath.push(point);
    }
    paths.forEach((path) => {
        beginShape();
        path.forEach(({ x, y, color, size }) => {
            vertex(x, y);
            strokeWeight(size);
            stroke(color);

        });
        endShape();

    });
    noFill();
}

function mousePressed() {
    currentPath.length = 0;
    paths.push(currentPath);
}

canvasColor.addEventListener('change', () => {
    background(canvasColor.value);
})

clearButton.addEventListener('click', () => {
    clear();
    setup();
});

saveButton.addEventListener('click', () => {
    save('myDraw.png');
});