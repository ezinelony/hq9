import ApplicationDispatcher from "./../dispatchers/application-dispatcher";
import ActionTypes from "./../constants/action-types";
import assign from "object-assign";
import callback from "./../utils/callback";
import {EventEmitter} from "events";

let _data = {};
let _store = {
    setStore : function(data){
       _data[data.questionId] = data.score;
    }
};

let Store = assign(_store, EventEmitter.prototype, {
    emitClick: function(event) {
        this.emit(event || ActionTypes.SELECT_ANSWER);
    },

    attachListener: function(event, cb, everyTime){
        let when = everyTime ? this.on : this.once;
        when.apply(this, [event, cb]);
    },

    addSelectListener: function(cb, everyTime){
        this.attachListener(ActionTypes.SELECT_ANSWER, cb, everyTime);
    },

    removeSelectListener: function(cb){
        this.removeListener(ActionTypes.SELECT_ANSWER, cb);
    },

    addFinishedListener: function(cb, everyTime){
        this.attachListener(ActionTypes.FINISHED_QUESTIONNAIRE, cb, everyTime);
    },

    removeFinishedListener: function(cb){
        this.removeListener(ActionTypes.FINISHED_QUESTIONNAIRE, cb);
    },

    getScoreData: function(){
        return _data;
    }
});

export default Store;