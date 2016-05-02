import {Dispatcher} from 'flux';
import assign from "object-assign";

let ApplicationDispatcher =  assign(new Dispatcher(), {

    handleClickAction: function(action) {
        this.dispatch({
            source: "CLICK_ACTION",
            action: action
        });
    },

    handleQuestionnaireFinisedAction: function(action) {
        this.dispatch({
            source: "FINISHED_QUESTIONNAIRE_ACTION",
            action: action
        });
    }
});

export default  ApplicationDispatcher;