import React from "react";
import ApplicationStore  from './../stores/application-store';
import {QuestionOptions} from './question-options';
import {default  as Feedback} from './../data/feedback';
import {default  as Therapists} from './../data/therapists';
import {Carousel} from 'react-bootstrap';
import {SelectOptions} from './select-options';
import {SelectTile} from './select-tile'
import {AnswerTile} from './answer-tile'

export class QuestionsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    transitionToThankYouPage() {
        this.props.history.push('/thank-you');
    }

    componentWillMount() {
        ApplicationStore.addSelectListener(this.receiveOptionClickEvent.bind(this), true);
    }

    componentWillUnMount() {
        ApplicationStore.removeSelectListener(this.receiveOptionClickEvent.bind(this));
    }

    receiveOptionClickEvent() {
        let score  = this.getScore();
        this.setState({"feedback" : this.getFeedbackMessage(score), "totalScore": score});

        if(this.isComplete()){
            this.transitionToThankYouPage();
        }
    }

    isComplete() {
        let therapistQuestionId = Therapists[0].question.id;
        //Once you answer the therapist selection option, you are free to move one
        if(ApplicationStore.getScoreData()[therapistQuestionId] === 0){
            return true;
        }

        return this.hasTherapistsSuggestions() ? false : Object.keys(ApplicationStore.getScoreData()).length === 9;
    }

    getScore(){
        const scores = ApplicationStore.getScoreData();
        let score  = 0;
        const questionKeys = Object.keys(scores);
        for(var i = 0, len = questionKeys.length; i < len; i++){
            score += scores[questionKeys[i]];
        }

        return score;
    }

    getFeedbackMessage(score) {
        let feedback = "None";
        if(score >= 20 ){
            feedback = Feedback[20];
        } else if(score >= 15){
            feedback = Feedback[15];
        }else if(score >= 10){
            feedback = Feedback[10];
        } else if(score >= 5){
            feedback = Feedback[5];
        }

        return feedback;
    }

    hasTherapistsSuggestions() {
        return this.state.totalScore  >= 15;
    }

    getChildren() {
        let questionsTileArray = [];
        let questionAndAnswers = ApplicationStore.getQuestions();
        let options = questionAndAnswers.questionAndAnswers;
        let i = 0, len = options.length, includeTherapists = this.hasTherapistsSuggestions();
        let totalItems = includeTherapists ? (len+1) : len;

        for( i; i < len; i++){
            let record = options[i];
            this.createOption(questionsTileArray, record, i, AnswerTile, totalItems);
        }

        if(includeTherapists){
            this.createOption(questionsTileArray, Therapists[0], i, AnswerTile, totalItems);
        }

        return questionsTileArray;
    }

    createOption(collection, record, index, childOptionTile, total) {
        collection.push(
            <Carousel.Item key={`it-a-a_${index}_${record.question.id}`}>
                <QuestionOptions
                    question={record.question}
                    options={record.options}
                    key={`q-a-a_${index}_${record.question.id}`}
                    childOption={childOptionTile}
                    total={total}
                    itemNo={index+1}
                    />
            </Carousel.Item>
        );
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    getScoreLevel(score) {
        let level = "panel-success";
        if(score >= 20 ){
            level = "panel-danger";
        } else if(score >= 15){
            level = "panel-warning";
        }else if(score >= 10){
            level = "panel-primary";
        } else if(score >= 5){
            level = "panel-info";
        }

        return level;
    }

    render() {

        return(
            <div className={"questions-view"}>
                Patient Health Questionnaire (PHQ-9)
                Over the last two weeks, how often have you been bothered by any of the following problems?
                <Carousel
                    activeIndex={this.state.index}
                    direction={this.state.direction}
                    onSelect={this.handleSelect.bind(this)}
                    wrap={false}
                    >
                    {this.getChildren()}
                </Carousel>
                <div className={"running-conclusion"}>
                    <div className={this.getScoreLevel(this.state.totalScore || 0)}>
                        <div className={"panel-heading"}>
                            <h3 className={"panel-title"}>
                                {this.state.feedback || "None"}
                            </h3>
                        </div>
                        <div className={"panel-body"}>Score: {this.state.totalScore || 0}/27 </div>
                    </div>
                </div>
            </div>
    );

    }
};