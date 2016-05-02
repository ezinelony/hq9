import React from "react";
import {default as SelectActions}  from './../actions/select-action';
import {SelectTile} from './select-tile';

export class AnswerTile extends SelectTile {

    constructor(props) {
        super(props);
    }

    select(){
        let scoreData ={"questionId": this.props.groupId, "score": this.props.model.score} ;
        SelectActions.clickAnswer(scoreData);
        super.select();
    }
}