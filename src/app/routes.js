import React from 'react';
import { render } from 'react-dom'
import { hashHistory, Route, Router } from 'react-router';
import {App} from './app';
import {ThankYou} from './components/thank-you';

render((
    <Router histroy={hashHistory}>
        <Route path="/" component={App}></Route>
        <Route path="/thank-you" component={ThankYou} />
    </Router>
), document.getElementById("dashboard"));
