import ActionTypes  from "./../constants/action-types";
import ApplicationDispatcher from "./../dispatchers/application-dispatcher";



let SelectActions = {
    clickAnswer: (data) => {
        ApplicationDispatcher.handleClickAction({
            actionType: ActionTypes.SELECT_ANSWER,
            data: data
        });
    }
};

export default SelectActions;