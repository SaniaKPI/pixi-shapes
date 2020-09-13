import {model} from "./model.js";
import {view} from "./view.js";

let controller = {
    clearFigure:  function() {
        model.app.ticker.remove(this.fallDown);
        model.container.removeChild(this);
        this.destroy();
        model.appData.figuresAmount--;
        model.appData.totalSquare -= this.square;
        view.displayUpdatingData();

    },
    changeShapesPerSec: function (sign) {
        switch (sign) {
            case '-':
                if(model.appData.shapesPerSec > 0){
                    model.appData.shapesPerSec--;
                    view.displayShapesPerSec();
                }
                break;
            case '+':
                model.appData.shapesPerSec++;
                view.displayShapesPerSec();
                break;
        }
    },
    changeGravity: function (sign) {
        switch (sign) {
            case '-':
                if(model.appData.gravity >1){
                    model.appData.gravity--;
                    view.displayGravity();
                }
                break;
            case '+':
                model.appData.gravity++;
                view.displayGravity();
                break;

        }
    }
};

export {controller}
