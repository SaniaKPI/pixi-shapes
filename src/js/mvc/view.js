import {model} from "./model.js";


let view = {
    loadApp: function () {
        model.createCanvas();
        model.createShape();

        const requestNewFigure = (timerStart = Date.now()) => {
            const timeSpent = Date.now() - timerStart;
            if (timeSpent > 1000 / model.appData.shapesPerSec) {
                model.createShape();
                timerStart = Date.now();
            }
            requestAnimationFrame(() => {
                requestNewFigure(timerStart)
            });
        };
        requestNewFigure();
        view.displayGravity();
        view.displayShapesPerSec();
        view.displayUpdatingData();
        model.addButtonsListeners();

    },
    displayGravity: function () {
        document.getElementById('gravityValue').innerText = model.appData.gravity;
    },
    displayShapesPerSec: function () {
        document.getElementById('shapesPerSecond').innerText = model.appData.shapesPerSec;
    },
    displayUpdatingData: function () {
        document.getElementById('numOfShapes').innerText = model.appData.figuresAmount;
        document.getElementById('areaOfShapes').innerText = model.appData.totalSquare;
    }
};

 export {view}
