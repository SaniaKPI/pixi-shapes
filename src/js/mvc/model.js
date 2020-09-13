import {view} from "./view.js";
import {controller} from "./controller.js";

let model = {
    appData: {
        width: 800,
        height: 600,
        gravity: 10,
        shapesPerSec: 1,
        figuresAmount: 0,
        totalSquare: 0
    },
    createCanvas: function () {
        model.app = new PIXI.Application({
            width: model.appData.width,
            height: model.appData.height,
            transparent: true,});

        model.container = new PIXI.Container();
        
        model.app.stage.addChild(model.container);

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, model.appData.width, model.appData.height);
        graphics.endFill();
        graphics.alpha = 0;
        graphics.interactive = true;
        graphics.buttonMode = true;

        graphics.on('pointerdown', ({data}) => {
            const {x, y} = data.global;
            model.createShape(x, y)
        });
        model.container.addChild(graphics);

        document.getElementById('canvasWrapper').appendChild(model.app.view);
    },
    createShape: function (x = model.randomInteger(70,model.appData.width-100), y = -90) {
        var shape = new PIXI.Graphics();
        shape.beginFill(model.getRandomColor());
        shape.square = model.drawRandomShape(shape);
        shape.endFill();
        shape.position.set(x,y);
        shape.interactive = true;
        shape.buttonMode = true;
        model.appData.figuresAmount++;
        model.appData.totalSquare += shape.square;
        //shape.num = figuresAmount;
        model.app.stage.addChild(shape);
        shape.on('pointerdown', () => controller.clearFigure.bind(shape)());
        shape.fallDown = function () {
            shape.position.y += (model.appData.gravity);
            (shape.position.y > (model.appData.height + 50))&&controller.clearFigure.bind(shape)();
        };
        model.app.ticker.add(shape.fallDown);
        view.displayUpdatingData();
        return shape;
    },
    addButtonsListeners: function () {
        document.getElementById('decrementNumOfShapes').addEventListener('click', () => {
            controller.changeShapesPerSec('-')
        });
        document.getElementById('incrementNumOfShapes').addEventListener('click', () => {
            controller.changeShapesPerSec('+')
        });
        document.getElementById('decrementGravity').addEventListener('click', () => {
            controller.changeGravity('-')
        });
        document.getElementById('incrementGravity').addEventListener('click', () => {
            controller.changeGravity('+')
        });
    },
    drawRandomShape: function (shape) {
        switch (model.randomInteger(1,7)) {
            case 1 :
                shape.drawCircle(0,0,50);
                return Math.round(Math.PI*(50*50));
            case 2 :
                shape.drawEllipse(0,0,70,30);
                return Math.round(Math.PI*(70*30));
            case 3 :
                shape.drawPolygon(50,0,100,60,0,60);
                return 60*50;
            case 4 :
                shape.drawRect(0,0,100,60);
                return 100*60;
            case 5 :
                shape.drawPolygon(0,40,50,20,100,40,100,80,0,80,0,40);
                return (100*40) + (10*50);
            case 6 :
                shape.drawPolygon(0,40,50,30,100,40,100,80,50,90,0,80,0,40);
                return 100*50;
            case 7 :
                shape.drawEllipse(0,0,50,30);
                shape.drawCircle(-40,20,15);
                shape.drawCircle(40,-20,15);
                shape.drawCircle(-50,5,15);
                shape.drawCircle(50,0,15);
                return Math.round( Math.PI*(50*30) + Math.PI*(15*15) + Math.PI*(15*15));
        }
    },
    randomInteger: function (min, max) {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getRandomColor: function () {
        return "0x"+((1<<24)*Math.random()|0).toString(16);
    }
};

export {model}
