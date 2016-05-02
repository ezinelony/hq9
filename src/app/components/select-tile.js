import React from "react";
import {default as SelectActions}  from './../actions/select-action';

export class SelectTile extends React.Component {

    constructor(props) {
        super(props);
    }

    select(){

        if(typeof this.props.clickBubbleUp === "function"){
            this.props.clickBubbleUp(this);
        }
    }

    render() {
        let active = this.props.active || "";
        return (
            <button
                type={"button"}
                className={`${"select-tile btn btn-default"} ${active}`}
                onClick={this.select.bind(this)}
                >
                {this.props.model.text}
            </button>
        );
    }
}