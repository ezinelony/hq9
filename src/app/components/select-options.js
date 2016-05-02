import React from "react";

export class SelectOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    setActive(child) {
        this.setState({"selectedId" : child.props.model.id});
    }

    getChildren() {
        let children = [];
        for(var i = 0, len = this.props.options.length; i < len; i++){
            let object = this.props.options[i];
            children.push(
                <this.props.childOption
                    key={`child_${this.props.groupId}_${i}`}
                    model={object}
                    active={this.state.selectedId === object.id ? "active" : ""}
                    groupId={this.props.groupId}
                    clickBubbleUp={this.setActive.bind(this)}
                    groupItemNo={this.props.parentItemNo}
                    groupItemTotal={this.props.parentItemTotalItems}
                    />
            );
        }
        return children;
    }

    render() {
        return (
            <div className={"options"}>
                {this.getChildren()}
            </div>
        );
    }
}