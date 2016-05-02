import React from "react";
import {SelectOptions} from './select-options';
import {AnswerTile} from './answer-tile';

export class QuestionOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               <div className={"question-text"}> {this.props.question.text} </div>
                <div className={"question-options"}>
                    <SelectOptions
                        options={this.props.options}
                        groupId={this.props.question.id}
                        childOption={this.props.childOption || AnswerTile}
                        parentItemNo={this.props.itemNo}
                        parentItemTotalItems={this.props.total}
                    />
                </div>
            </div>
        );
    }
}