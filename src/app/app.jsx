import React from 'react'
import {QuestionsView} from './components/questions-view';

export class App extends React.Component {

    render() {
        return (<QuestionsView key={'app-view'} index={0} direction={null} history={this.props.history}/>);
    }
}