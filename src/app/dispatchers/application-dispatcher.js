import {Dispatcher} from 'flux';
import assign from "object-assign";

let ApplicationDispatcher =  assign(new Dispatcher(), {

    handleClickAction: function(action) {
        this.dispatch({
            source: "CLICK_ACTION",
            action: action
        });
    }
});

export default  ApplicationDispatcher;