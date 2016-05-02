import ApplicationDispatcher from "./../dispatchers/application-dispatcher";
import ActionTypes from "./../constants/action-types";
import assign from "object-assign";
import callback from "./../utils/callback";
import Store from "./store";
import {Questions}  from './../data/questions';
import {default as QuestionAnswerOptions}  from './../data/question-answer-options';
import {Answers}  from './../data/answers';

let ApplicationStore = assign({

    getQuestions: function() {
       return  {
           "questionAndAnswers" : QuestionAnswerOptions
       }
    }

}, Store);

ApplicationStore.dispatchToken = ApplicationDispatcher.register(function(payload){
    let action = payload.action;

    switch(action.actionType){
        case ActionTypes.SELECT_ANSWER:
            ApplicationStore.setStore(action.data);
            ApplicationStore.emitClick()
            break;
        default:
            return true;
    }
});

export default ApplicationStore;